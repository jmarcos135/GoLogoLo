import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Rnd } from 'react-rnd';
import * as html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

/*
const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margins
            lastUpdate
        }
    }
`;*/

const GET_LOGO = gql`
    query logo($userId: String, $logoId: String) {
        logo(userId: $userId, logoId: $logoId) {
            _id
            logos {
                _id
                name
                width
                height
                backgroundColor
                borderColor
                borderRadius
                borderWidth
                textBoxes {
                    _id
                    layerIndex
                    text
                    fontSize
                    color
                    x
                    y
                }
                imageBoxes {
                    _id
                    layerIndex
                    url
                    width
                    height
                    x
                    y
                }
                lastUpdate
            }
        }
    }
`;
const DELETE_LOGO = gql`
  mutation removeLogo($userId: String!, $logoId: String!) {
    removeLogo(userId: $userId, logoId:$logoId) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
    constructor(props) {
        super(props);
    }

    handleDownloadImage = (logoNode, name) =>{
        /* kind of works but not really
        html2canvas(logoNode, {
            allowTaint: true,
            useCors: true
            }).then(function(canvas) {
                document.body.appendChild(canvas);
                var img = canvas.toDataURL('image/png')
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = img;
                link.click();
            });
        */
       /*
       html2canvas(logoNode, {
            allowTaint: true,
            logging: true,
            useCORS: true,
      }).then((canvas) => {
        var url = canvas.toDataURL("image/png");
        window.open(url, "_blank");
      });
      */
        html2canvas(logoNode, {
            logging: true,
            useCORS: true,
            proxy: "/"
            }).then((canvas) =>{
                var url = canvas.toDataURL("image/png");
                //window.open(url, "_blank");
                saveAs(url, name.concat(".jpeg"));
            });
    }

    getDataUri = (targetUrl, callback) =>{
        console.log("request made");
        var request = new XMLHttpRequest();
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        request.open('GET', proxyUrl + targetUrl, true);
        request.responseType = 'blob';
        request.onload = function() {
            console.log("request loading");
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload = function(e){
                console.log("reader loading");
                //return e.target.result;
                callback(e.target.result);
            };
        };
        request.send();
    };

    render() {
        let logoNode;

        console.log("ViewLogoScreen rendering");
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ userId: this.props.match.params.userId, logoId: this.props.match.params.id }}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    
                    refetch();
                    let logo = data.logo.logos[0];
                    return (
                        <div className="">
                            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                                <Link to={`/users/${this.props.match.params.userId}`}><a class="navbar-brand" href="#">GoLogoLo</a></Link>
                                <div class="collapse navbar-collapse" id="navbarText">
                                    <ul class="navbar-nav mr-auto">
                                    </ul>
                                    <span class="navbar-text">

                                        <ul class="navbar-nav mr-auto">
                                            <li class="nav-item">
                                                <Link to="/"><a class="navbar-link" href="#">Logout</a></Link>
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </nav>
                            <div className="row" >
                                <div className="col-md-4 col-lg-3" > 
                                    <div className= "card card-default bg-light">
                                        <div className="card-body">
                                            <div className="card-heading">
                                                <h3 className="card-title">
                                                    View Logo
                                                </h3>
                                            </div>
                                            <div className="card card-default bg-dark">
                                                <div className="card-body" >
                                                    <dl style={{color: "#ffffff"}}>
                                                        <dt>Name:</dt>
                                                        <dd>{logo.name}</dd>
                                                        <dt>Width:</dt>
                                                        <dd>{logo.width}</dd>
                                                        <dt>Height:</dt>
                                                        <dd>{logo.height}</dd>
                                                        <dt>Background Color:</dt>
                                                        <dd>{logo.backgroundColor}</dd>
                                                        <dt>Border Color:</dt>
                                                        <dd>{logo.borderColor}</dd>
                                                        <dt>Border Radius:</dt>
                                                        <dd>{logo.borderRadius}</dd>
                                                        <dt>Border Width:</dt>
                                                        <dd>{logo.borderWidth}</dd>
                                                        <dt>Last Updated:</dt>
                                                        <dd>{new Date(logo.lastUpdate).toString()}</dd>

                                                        <Mutation mutation={DELETE_LOGO} key={logo._id} onCompleted={() => this.props.history.push(`/users/${this.props.match.params.userId}`)}>
                                                            {(removeLogo, { loading, error }) => (
                                                                <div>
                                                                    <form
                                                                        onSubmit={e => {
                                                                            e.preventDefault();
                                                                            removeLogo({ variables: { userId: this.props.match.params.userId, logoId: logo._id } });
                                                                        }}>
                                                                    <button type="button" className="btn btn-light" style={{marginRight: "4px"}}
                                                                        onClick = {()=>{this.handleDownloadImage(logoNode, logo.name)}}
                                                                    >
                                                                        <i class="fa fa-download"></i>
                                                                    </button>
                                                                    <Link to={`/users/${this.props.match.params.userId}/edit/${logo._id}`} className="btn btn-success"><i class="fa fa-pencil"></i> Edit</Link>&nbsp;
                                                                    <button type="submit" className="btn btn-danger"><i class="fa fa-trash"></i> Delete</button>
                                                                    </form>
                                                                    {loading && <p>Loading...</p>}
                                                                    {error && <p>Error :( Please try again</p>}
                                                                </div>
                                                            )}
                                                        </Mutation>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-md-8 col-lg-9 d-flex justify-content-center" style={{overflow: "auto"}}>
                                    <div className="align-self-center" style={{display: "block", width: logo.width+"px", height: logo.height+"px", backgroundColor: logo.backgroundColor,
                                                borderColor: logo.borderColor, borderRadius: logo.borderRadius+"px", borderWidth: logo.borderWidth+"px",
                                                borderStyle: "solid", position: "absolute" }} ref={node=>{logoNode = node;}} >

                                    {
                                        (logo.textBoxes.concat(logo.imageBoxes)).sort((a, b) => {return a.layerIndex-b.layerIndex}).map((item)=>{
                                        //if (item.url!==undefined) this.getDataUri(item.url, (base64) => {console.log(base64); this.imgData = base64;});
                                        console.log("img data: " + this.imgData);
                                        //this.imgData.find((img)=>(img.id===item._id)).data
                                        return <Rnd
                                            size={item.url!==undefined ? {width:item.width, height:item.height} : {width:"auto", height:"auto"}}
                                            maxWidth={logo.width}
                                            maxHeight={logo.height}
                                            enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false} } 
                                            disableDragging={true}
                                            bounds="parent"
                                            position={{ x: item.x, y: item.y }}
                                            >
                                            {item.url!==undefined ? (<img  crossOrigin="anonymous" src={item.url} draggable="false" alt="Cannot retrieve image!" height={item.height+"px"} width={item.width+"px"}></img>) 
                                            : (<div style={{overflow:"hidden", width:"auto", height:"auto", maxWidth:logo.width.value+"px", maxHeight: logo.height.value+"px"}}><pre style={{fontSize:item.fontSize+"px", color: item.color,  overflow:"hidden"}}>{item.text}</pre></div>)}
                                        </Rnd>})
                                    }

                                    </div>
                                </div> 

                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

/*
*/

export default ViewLogoScreen;