import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import { Button, Modal } from 'react-bootstrap';

const ADD_LOGO = gql`
    mutation addLogo(
        $userId: String!
        $name: String!,
        $width: Int!,
        $height: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $textBoxes: [textBoxInput],
        $imageBoxes: [imageBoxInput]) {
        addLogo(
            userId: $userId,
            name: $name,
            width: $width,
            height: $height,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            textBoxes: $textBoxes,
            imageBoxes: $imageBoxes),
             {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {


    constructor(props) {
        super(props);
        // initial state with default logo attributes 

        this.state = {
            userId: "5ebc3e37ffbda00ce3d1d399",
            name: "goLogoLo Logo",
            width: 500,
            height: 500,
            backgroundColor : "#cccc44",
            borderColor: "#444444",
            borderRadius: 5,
            borderWidth: 2,
            textBoxes: [],
            imageBoxes: [],
            x: 100,
            y: 100,
            showImgModal: false,
            showTextModal: false
        };

        this.logo = null;
    }


    isWithinRange = (e) => {
        let val=parseInt(e.target.value); let min=parseInt(e.target.min) ;let max=parseInt(e.target.max); 
        return (val>=min && val<=max);
    }

    printState = () =>{

    }

    handleShowImgModal = () => {
        this.setState({
            showImgModal : !this.state.showImgModal
        });
    }

    handleShowTextModal= () => {
        this.setState({
            showTextModal : !this.state.showTextModal
        });
    }

    render() {
        let name, width, height, backgroundColor, borderColor, borderRadius, borderWidth, textBoxes, imageBoxes, imageURL;
        console.log("imageBoxes:  " + this.state.imageBoxes.length);
        console.log(...this.state.imageBoxes);
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="">
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                            <Link to="/"><a class="navbar-brand" href="#">GoLogoLo</a></Link>
                            <div class="collapse navbar-collapse" id="navbarText">
                                <ul class="navbar-nav mr-auto">
                                </ul>
                                <span class="navbar-text">

                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Logout</a>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </nav>

                        <div className="">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card card-default">
                                        <div className="card-body">
                                            <div className="card-heading">
                                                <h3 className="card-title">
                                                    Create Logo
                                                </h3>
                                            </div>
                                            <div className="card card-default bg-dark" style={{color: "#ffffff"}}>
                                                <div className="card-body">
                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        addLogo({ variables: { userId: this.state.userId,
                                                                            name: name.value, 
                                                                            width: parseInt(width.value), 
                                                                            height: parseInt(height.value), 
                                                                            backgroundColor: backgroundColor.value,
                                                                            borderColor: borderColor.value,
                                                                            borderRadius:  parseInt(borderRadius.value),
                                                                            borderWidth: parseInt(borderWidth.value),
                                                                            textBoxes: this.state.textBoxes,
                                                                            imageBoxes: this.state.imageBoxes 
                                                                            } });
                                                    }}>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name:</label>
                                                            <input type="text" required={true} className="form-control" name="name" onChange={(e) => this.setState({name: e.target.value}, this.printState)} ref={node => {
                                                                name = node;
                                                            }} placeholder="Name" defaultValue={this.state.name}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="width">Width:</label>
                                                            <input type="number" required={true}  min="2" max="500" className="form-control" name="width" onChange={(e) => {if (this.isWithinRange(e)) this.setState({width: e.target.value}, this.printState);}} ref={node => {
                                                                width = node;
                                                            }} placeholder="Width" defaultValue={this.state.width}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="height">Height:</label>
                                                            <input type="number" required={true}  min="2" max="500" className="form-control" name="height" onChange={(e) => {if (this.isWithinRange(e)) this.setState({height: e.target.value}, this.printState);}} ref={node => {
                                                                height = node;
                                                            }} placeholder="Height" defaultValue={this.state.height}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({backgroundColor: e.target.value}, this.printState)} ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" defaultValue={this.state.backgroundColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({borderColor: e.target.value}, this.printState)} ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" defaultValue={this.state.borderColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" required={true} min="0" max="144" className="form-control" name="borderRadius" onChange={(e) =>{ if (this.isWithinRange(e)) this.setState({borderRadius: e.target.value}, this.printState) }} ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={this.state.borderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderWidth">Border Width:</label>
                                                            <input type="number" required={true} min="0" max="144" className="form-control" name="borderWidth" onChange={(e) => {if (this.isWithinRange(e)) this.setState({borderWidth: e.target.value}, this.printState)}} ref={node => {
                                                                borderWidth = node;
                                                            }} placeholder="Border Width" defaultValue={this.state.borderWidth}/>
                                                        </div>
                                                        <div className="container"> 
                                                            <div className="row">
                                                                <div className="col-md-6 d-flex justify-content-center">
                                                                    <Button variant="primary" onClick={this.handleShowTextModal}>
                                                                           Insert Text 
                                                                    </Button>

                                                                    <Modal show={this.state.showTextModal} onHide={this.handleShowTextModal}>
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>Insert Text</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={this.handleShowTextModal}>
                                                                                Cancel
                                                                            </Button>
                                                                            <Button variant="primary" 
                                                                                    onClick={() =>{
                                                                                                    this.handleShowImgModal(); 
                                                                                                    this.setState((prevState) => {
                                                                                                        return {textBoxes: prevState.textBoxes.push({index: prevState.textBoxes.length ,text: "asdf", fontSize: 12, color: "#e31717", width: 30, height: 30, x: 0, y: 0})}})
                                                                                                }}>
                                                                                Enter 
                                                                            </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>

                                                                <div className="col-md-6 d-flex justify-content-center">
                                                                    <Button variant="primary" onClick={this.handleShowImgModal}>
                                                                           Insert Image 
                                                                    </Button>

                                                                    <Modal show={this.state.showImgModal} onHide={this.handleShowImgModal}>
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>Insert Image</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div class="input-group mb-3">
                                                                                <div class="input-group-prepend">
                                                                                    <span class="input-group-text" id="basic-addon1">Image URL</span>
                                                                                </div>
                                                                                <input type="text" class="form-control" placeHolder="http://example.com/image.jpg" aria-label="ImageURL" aria-describedby="basic-addon1" 
                                                                                ref={node => {imageURL = node;}}/>
                                                                            </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={this.handleShowImgModal}>
                                                                                Cancel 
                                                                            </Button>
                                                                            <Button variant="primary" 
                                                                                    onClick={() =>{
                                                                                                    this.handleShowImgModal(); 
                                                                                                    this.setState((prevState) => {
                                                                                                        let newImageBoxArr = prevState.imageBoxes;
                                                                                                        newImageBoxArr.push({index: prevState.imageBoxes.length ,url: imageURL.value, width: 30, height: 30, x: 0, y: 0});
                                                                                                        return {imageBoxes: newImageBoxArr}})
                                                                                                }}>
                                                                            Enter 
                                                                            </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>
                                                            </div>
                                                            
                                                            <br/>
                                                            <div className="row">
                                                                <div className="col-md-12 d-flex justify-content-center">
                                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9 d-flex justify-content-center" style={{overflow: "auto"}}>
                                    <div className="align-self-center" style={{display: "block", width: this.state.width+"px", height: this.state.height+"px", backgroundColor: this.state.backgroundColor,
                                                borderColor: this.state.borderColor, borderRadius: this.state.borderRadius+"px", borderWidth: this.state.borderWidth+"px",
                                                borderStyle: "solid", position: "absolute" }}>

                                    {
                                        this.state.imageBoxes.map((item)=>(
                                        <Rnd
                                            size={{ width: item.width,  height: item.height }}
                                            bounds="parent"
                                            onDragStop={(e, d) => { 
                                                this.setState(prevState => ({
                                                    imageBoxes: prevState.imageBoxes.map((imageBox) => {
                                                       if (imageBox.index !== item.index) return imageBox;
                                                       return {
                                                           ...imageBox,
                                                           x: d.x,
                                                           y: d.y
                                                        }

                                                    })
                                                }))

                                             }}
                                            position={{ x: item.x, y: item.y }}
                                            onResize={(e, direction, ref, delta, position) => {
                                                this.setState(prevState => ({
                                                    imageBoxes: prevState.imageBoxes.map((imageBox) => {
                                                       if (imageBox.index !== item.index) return imageBox;
                                                       return {
                                                            ...imageBox,
                                                            width: ref.style.width,
                                                            height: ref.style.height,
                                                            ...position
                                                        }

                                                    })
                                                }))
                                                this.setState({
                                                width: ref.style.width,
                                                height: ref.style.height,
                                                ...position,
                                                });
                                            }}>
                                            <img src={item.url} draggable="false" alt="Lamp" width={item.width} height={item.height}></img>
                                        </Rnd>))
                                    }

                                    </div>
                                </div>

                                <Rnd
                                    size={{ width: 50,  height: 50 }}
                                    position={{ x: this.state.x, y: this.state.y }}
                                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                                    onResizeStop={(e, direction, ref, delta, position) => {
                                        this.setState({
                                        width: ref.style.width,
                                        height: ref.style.height,
                                        ...position,
                                        });
                                    }}
                                    >
                                   asdf;klasdfas 
                                </Rnd>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;