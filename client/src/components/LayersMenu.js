import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Button, Modal } from 'react-bootstrap';

const prepareList = list => list.map((e) => ({...e, id: `item-${e.layerIndex}`, content: `item ${e.layerIndex}`}));

const reorder = (list, startIndex, endIndex) => {
  const result = list.concat([]);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#ffffff",
  padding: grid,
  width: "100%" 
});

class LayersMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: prepareList(this.props.textBoxes.concat(this.props.imageBoxes).sort((a,b)=>{return b.layerIndex - a.layerIndex})),
      showEditModal: false,
      editItem: null
    };
  }

  deleteLayer = (layerIndex) => {
    let newLayers = this.state.layers.filter((e)=>{return e.layerIndex!=layerIndex});
    this.props.updateLayers(newLayers);
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log("before:");
    this.state.layers.forEach((item)=>{
        console.log(item.url)
    })
    const layers = reorder(
      this.state.layers,
      result.source.index,
      result.destination.index
    );

    console.log("after:");
    layers.forEach((item)=>{
        console.log(item.url)
    })

    this.setState({
        layers: layers
    }, ()=>{this.props.updateLayers(layers)});
  }

  componentDidUpdate = (prevProps) => {
    console.log("\tLayersMenu component did update");
    if (this.props.textBoxes!== prevProps.textBoxes || this.props.imageBoxes!==prevProps.imageBoxes){
        this.setState({
            layers: prepareList(this.props.textBoxes.concat(this.props.imageBoxes).sort((a,b)=>{return b.layerIndex - a.layerIndex}))
        });
    }
}
  componentDidMount= () => {
    console.log("\tLayersMenu component did mount");
    /*
    this.setState({
        layers: prepareList(this.props.textBoxes.concat(this.props.imageBoxes).sort((a,b)=>{return a.layerIndex - b.layerIndex}))
    });*/
}

handleShowEditModal = () =>{
  this.setState((prevState)=>({showEditModal: !prevState.showEditModal}))
}

  render() {
    let imageURL, text, fontSize, color;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.editItem!==null && this.state.editItem!==undefined ? 
          <Modal show={this.state.showEditModal} onHide={this.handleShowEditModal}>
              <Modal.Header closeButton>
                  <Modal.Title>{this.state.editItem.url!==undefined ? "Edit Image" : "Edit Text"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                { this.state.editItem.url!==undefined ?
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">Image URL</span>
                      </div>
                      <input type="text" class="form-control" placeHolder="http://example.com/image.jpg" defaultValue={this.state.editItem.url} aria-label="ImageURL" aria-describedby="basic-addon1" 
                      ref={node => {imageURL = node;}}/>
                  </div>
                  :
                  <div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Text</span>
                        </div>
                        <input type="text" class="form-control" placeHolder="Example Text" defaultValue={this.state.editItem.text} aria-label="TextBoxText" aria-describedby="basic-addon1" 
                        ref={node => {text = node;}}/>
                    </div>
                    <div className="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Font Size</span>
                        </div>
                        <input type="number" required={true} min="2" max="144" className="form-control" name="fontSize"  ref={node => {
                            fontSize = node;
                        }} placeholder="Font Size" defaultValue={this.state.editItem.fontSize} />
                    </div>
                    <div className="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Color</span>
                        </div>
                        <input type="color" required={true} className="form-control" name="color"  ref={node => {
                            color = node;
                        }} placeholder="Color" defaultValue={this.state.editItem.color} />
                    </div>
                  </div>
                  }
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleShowEditModal}>
                      Cancel 
                  </Button>
                  <Button variant="primary" 
                          onClick={() =>{
                                          this.handleShowEditModal(); 
                                          let newLayers = this.state.layers.map((item)=>{
                                            if (item.layerIndex!==this.state.editItem.layerIndex) return item;
                                            else{
                                              if (item.url!==undefined){
                                                return {...item, url: imageURL.value}
                                              }
                                              else{
                                                return {...item, text: text.value, fontSize: parseInt(fontSize.value), color: color.value}
                                              }
                                            }
                                          });
                                          this.props.updateLayers(newLayers);
                                      }}>
                  Enter 
                  </Button>
              </Modal.Footer>
          </Modal> : <div/>
        }
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.layers.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div className="bg-dark"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="container" > 
                        <div className="row" style={{overflowWrap:"normal"}}>
                          <div className="col-md-8" style={{verticalAlign: "middle", overflow:"hidden", overflowWrap:"normal", whiteSpace: "nowrap", textOverflow: "ellipsis",display:"block"}}>
                            {item.url!==undefined ? "Img: " + item.url : "Text: " + item.text}
                          </div>
                          <div className="col-md-2 ">
                            <Button variant="primary" size="sm" 
                                onClick={() => {
                                  this.setState({editItem: item}, this.handleShowEditModal);
                                }}
                              >
                               Edit 
                            </Button>
                          </div>
                          <div className="col-md-2 ">
                            <Button variant="danger" size="sm" 
                                onClick={() => {
                                  this.deleteLayer(item.layerIndex);
                                }}
                              >
                                delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default LayersMenu;