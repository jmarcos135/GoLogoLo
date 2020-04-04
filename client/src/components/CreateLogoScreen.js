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

        this.state = {
            logoText : "",
            color : "",
            fontSize : "",
            backgroundColor : "",
            borderColor: "",
            borderRadius: "",
            borderWidth: "",
            padding: "",
            margins: "",
            //borderStyle: LogoDefaults.BORDER_STYLE
        };

        this.logo = null;
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margins;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-md-4" onSubmit={e => {
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
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margins.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" onChange={(e) => this.setState({text: e.target.value})} ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" onChange={(e) => this.setState({color: e.target.value})} ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" onChange={(e) => this.setState({fontSize: e.target.value})} ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="color" onChange={(e) => this.setState({backgroundColor: e.target.value})} ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="color" onChange={(e) => this.setState({borderColor: e.target.value})} ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" onChange={(e) => this.setState({borderRadius: e.target.value})} ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" className="form-control" name="borderWidth" onChange={(e) => this.setState({borderWidth: e.target.value})} ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" name="padding" onChange={(e) => this.setState({padding: e.target.value})} ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margins">Margins:</label>
                                        <input type="number" className="form-control" name="margins" onChange={(e) => this.setState({margins: e.target.value})} ref={node => {
                                            margins = node;
                                        }} placeholder="Margins" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                                <div className="col-md-8">
                                    <div style={{color: this.state.color, fontSize: this.state.fontSize+"pt", backgroundColor: this.state.backgroundColor,
                                                borderColor: this.state.borderColor, borderRadius: this.state.borderRadius+"px", borderWidth: this.state.borderWidth+"px",
                                                padding: this.state.padding+"px", margin: this.state.margins+"px", borderStyle: "solid", position: "absolute" }}>
                                        <pre style={{color: this.state.color}}>{this.state.text}</pre>
                                    </div>
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