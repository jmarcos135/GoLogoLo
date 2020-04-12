import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margins: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margins: $margins),
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
            logoText : "goLogoLo Logo",
            color : "#FF0000",
            fontSize : 24,
            backgroundColor : "#cccc44",
            borderColor: "#444444",
            borderRadius: 5,
            borderWidth: 2,
            padding: 5,
            margins: 10
            //borderStyle: LogoDefaults.BORDER_STYLE
        };

        this.logo = null;
    }


    isWithinRange = (e) => {
        let val=parseInt(e.target.value); let min=parseInt(e.target.min) ;let max=parseInt(e.target.max); 
        return (val>=min && val<=max);
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margins;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <nav class="navbar navbar-dark bg-dark">
                            <Link to="/"><a class="navbar-brand" href="#">Home</a></Link>
                        </nav>

                        <div className="row">
                            <div className="col-md-4">
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
                                                    addLogo({ variables: { text: text.value, 
                                                                        color: color.value, 
                                                                        fontSize: parseInt(fontSize.value), 
                                                                        backgroundColor: backgroundColor.value,
                                                                        borderColor: borderColor.value,
                                                                        borderRadius:  parseInt(borderRadius.value),
                                                                        borderWidth: parseInt(borderWidth.value),
                                                                        padding: parseInt(padding.value),
                                                                        margins: parseInt(margins.value)
                                                                        } });
                                                }}>
                                                    <div className="form-group">
                                                        <label htmlFor="text">Text:</label>
                                                        <input type="text" required={true} className="form-control" name="text" onChange={(e) => this.setState({logoText: e.target.value})} ref={node => {
                                                            text = node;
                                                        }} placeholder="Text" defaultValue={this.state.logoText}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="color">Color:</label>
                                                        <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({color: e.target.value})} ref={node => {
                                                            color = node;
                                                        }} placeholder="Color" defaultValue={this.state.color}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fontSize">Font Size:</label>
                                                        <input type="number" required={true}  min="2" max="144" className="form-control" name="fontSize" onChange={(e) => {if (this.isWithinRange(e)) this.setState({fontSize: e.target.value});}} ref={node => {
                                                            fontSize = node;
                                                        }} placeholder="Font Size" defaultValue={this.state.fontSize}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({backgroundColor: e.target.value})} ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="Background Color" defaultValue={this.state.backgroundColor}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderColor">Border Color:</label>
                                                        <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({borderColor: e.target.value})} ref={node => {
                                                            borderColor = node;
                                                        }} placeholder="Border Color" defaultValue={this.state.borderColor}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                        <input type="number" required={true} min="0" max="144" className="form-control" name="borderRadius" onChange={(e) =>{ if (this.isWithinRange(e)) this.setState({borderRadius: e.target.value})}} ref={node => {
                                                            borderRadius = node;
                                                        }} placeholder="Border Radius" defaultValue={this.state.borderRadius} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderWidth">Border Width:</label>
                                                        <input type="number" required={true} min="0" max="144" className="form-control" name="borderWidth" onChange={(e) => {if (this.isWithinRange(e)) this.setState({borderWidth: e.target.value})}} ref={node => {
                                                            borderWidth = node;
                                                        }} placeholder="Border Width" defaultValue={this.state.borderWidth}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="padding">Padding:</label>
                                                        <input type="number" required={true} min="0" max="144" className="form-control" name="padding" onChange={(e) => {if (this.isWithinRange(e)) this.setState({padding: e.target.value})}} ref={node => {
                                                            padding = node;
                                                        }} placeholder="Padding" defaultValue={this.state.padding}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="margins">Margins:</label>
                                                        <input type="number" required={true} min="0" max="144" className="form-control" name="margins" onChange={(e) => {if (this.isWithinRange(e)) this.setState({margins: e.target.value})}} ref={node => {
                                                            margins = node;
                                                        }} placeholder="Margins" defaultValue={this.state.margins}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8" style={{overflow: "auto"}}>
                                <div style={{color: this.state.color, fontSize: this.state.fontSize+"pt", backgroundColor: this.state.backgroundColor,
                                            borderColor: this.state.borderColor, borderRadius: this.state.borderRadius+"px", borderWidth: this.state.borderWidth+"px",
                                            padding: this.state.padding+"px", margin: this.state.margins+"px", borderStyle: "solid", position: "absolute" }}>
                                    <pre style={{color: this.state.color}}>{this.state.logoText}</pre>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;