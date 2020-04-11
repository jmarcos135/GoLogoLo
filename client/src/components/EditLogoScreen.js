import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margins: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margins: $margins
                ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logoText : "",
            color : "",
            fontSize : "",
            backgroundColor :  "",
            borderColor: "",
            borderRadius: "",
            borderWidth: "",
            padding: "",
            margins: "",
            //borderStyle: LogoDefaults.BORDER_STYLE
        };

        this.logo = null;
    }

    componentDidMount = () => {
        console.log("EditLogoScreen did mount");
        this.setState({
            text: this.logo.text,
            color : this.logo.color, 
            fontSize : this.logo.fontSize, 
            backgroundColor : this.logo.backgroundColor, 
            borderColor: this.logo.borderColor, 
            borderRadius: this.logo.borderRadius,
            borderWidth: this.logo.borderWidth, 
            padding: this.logo.padding,
            margins: this.logo.margins 
            //borderStyle: LogoDefaults.BORDER_STYLE
        });
    }

    isWithinRange = (e) => {
        let val=parseInt(e.target.value); let min=parseInt(e.target.min) ;let max=parseInt(e.target.max); 
        return (val>=min && val<=max);
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margins;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    this.logo = data.logo;
                    console.log("LOGO: " + this.logo);

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
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
                                                            Edit Logo
                                                        </h3>
                                                    </div>
                                                    <div className="card card-default bg-dark" style={{color: "#ffffff"}}>                                            
                                                        <div className="card-body">
                                                            <form  onSubmit={e => {
                                                                e.preventDefault();
                                                                updateLogo({ variables: { 
                                                                                            id: data.logo._id, 
                                                                                            text: text.value, 
                                                                                            color: color.value, 
                                                                                            fontSize: parseInt(fontSize.value),
                                                                                            backgroundColor: backgroundColor.value,
                                                                                            borderColor: borderColor.value,
                                                                                            borderRadius: parseInt(borderRadius.value),
                                                                                            borderWidth: parseInt(borderWidth.value),
                                                                                            padding: parseInt(padding.value),
                                                                                            margins: parseInt(margins.value),
                                                                                        } });
                                                                /*
                                                                text.value = "";
                                                                color.value = "";
                                                                fontSize.value = "";
                                                                backgroundColor.value = "";
                                                                borderColor.value = "";
                                                                borderRadius.value = "";
                                                                borderWidth.value = "";
                                                                padding.value = "";
                                                                margins.value = "";
                                                                */
                                                            }}>
                                                                <div className="form-group">
                                                                    <label htmlFor="text">Text:</label>
                                                                    <input type="text" required={true} className="form-control" name="text" onChange={(e) => this.setState({text: e.target.value})} ref={node => {
                                                                        text = node;
                                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="color">Color:</label>
                                                                    <input type="color" required={true} className="form-control" name="color" onChange={(e) => this.setState({color: e.target.value})} ref={node => {
                                                                        color = node;
                                                                    }} placeholder="Color" defaultValue={data.logo.color} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="fontSize">Font Size:</label>
                                                                    <input type="number" required={true} min="2" max="144" className="form-control" name="fontSize" onChange={(e)=>{if (this.isWithinRange(e)) this.setState({fontSize: e.target.value})}} ref={node => {
                                                                        fontSize = node;
                                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                                    <input type="color" required={true} className="form-control" name="backgroundColor" onChange={(e)=>this.setState({backgroundColor: e.target.value})} ref={node => {
                                                                        backgroundColor = node;
                                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderColor">Border Color:</label>
                                                                    <input type="color" required={true} className="form-control" name="borderColor" onChange={(e)=>this.setState({borderColor: e.target.value})} ref={node => {
                                                                        borderColor = node;
                                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                                    <input type="number" required={true} min="0" max="144" className="form-control" name="borderRadius" onChange={(e)=>{ if (this.isWithinRange(e)) this.setState({borderRadius: e.target.value})}} ref={node => {
                                                                        borderRadius = node;
                                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                                    <input type="number" required={true} min="0" max="144" className="form-control" name="borderWidth" onChange={(e)=>{if (this.isWithinRange(e)) this.setState({borderWidth: e.target.value})}} ref={node => {
                                                                        borderWidth= node;
                                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="padding">Padding:</label>
                                                                    <input type="number" required={true} min="0" max="144" className="form-control" name="padding" onChange={(e)=>{if (this.isWithinRange(e)) this.setState({padding: e.target.value})}} ref={node => {
                                                                        padding = node;
                                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="margins">Margins:</label>
                                                                    <input type="number" required={true} min="0" max="144" className="form-control" name="margins" onChange={(e)=>{if (this.isWithinRange(e)) this.setState({margins: e.target.value})}} ref={node => {
                                                                        margins = node;
                                                                    }} placeholder="margins" defaultValue={data.logo.margins} />
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


                                        <div className="col-md-8">
                                            <div style={{color: this.state.color, fontSize: this.state.fontSize+"pt", backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor, borderRadius: this.state.borderRadius+"px", borderWidth: this.state.borderWidth+"px",
                                                        padding: this.state.padding+"px", margin: this.state.margins+"px", borderStyle: "solid", position: "absolute" }}>
                                                <pre style={{color: this.state.color}}>{this.state.text}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}


export default EditLogoScreen;