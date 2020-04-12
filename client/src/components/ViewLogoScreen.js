import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    console.log("ViewLogoScreen rendering");
                    
                    refetch();

                    return (
                        <div className="container">
                            <nav class="navbar navbar-dark bg-dark">
                                <Link to="/"><a class="navbar-brand" href="#">Home</a></Link>
                            </nav>

                            <div className="row">
                                <div className="col-md-4"> 
                                    <div className="card card-default ">
                                        <div className="card-body">
                                            <div className="card-heading">
                                                <h3 className="card-title">
                                                    View Logo
                                                </h3>
                                            </div>
                                            <div className="card card-default bg-dark" >
                                                <div className="card-body">
                                                    <dl style={{color: "#ffffff"}}>
                                                        <dt>Text:</dt>
                                                        <dd>{data.logo.text}</dd>
                                                        <dt>Color:</dt>
                                                        <dd>{data.logo.color}</dd>
                                                        <dt>Font Size:</dt>
                                                        <dd>{data.logo.fontSize}</dd>
                                                        <dt>Background Color:</dt>
                                                        <dd>{data.logo.backgroundColor}</dd>
                                                        <dt>Border Color:</dt>
                                                        <dd>{data.logo.borderColor}</dd>
                                                        <dt>Border Radius:</dt>
                                                        <dd>{data.logo.borderRadius}</dd>
                                                        <dt>Border Width:</dt>
                                                        <dd>{data.logo.borderWidth}</dd>
                                                        <dt>Padding:</dt>
                                                        <dd>{data.logo.padding}</dd>
                                                        <dt>Margins:</dt>
                                                        <dd>{data.logo.margins}</dd>
                                                        <dt>Last Updated:</dt>
                                                        <dd>{new Date(data.logo.lastUpdate).toString()}</dd>

                                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                            {(removeLogo, { loading, error }) => (
                                                                <div>
                                                                    <form
                                                                        onSubmit={e => {
                                                                            e.preventDefault();
                                                                            removeLogo({ variables: { id: data.logo._id } });
                                                                        }}>
                                                                        <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                                    <button type="submit" className="btn btn-danger">Delete</button>
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

                                <div className="col-md-8" style={{overflow: "auto"}}>
                                    <div style={{color: data.logo.color, fontSize: data.logo.fontSize+"pt", backgroundColor: data.logo.backgroundColor,
                                                borderColor: data.logo.borderColor, borderRadius: data.logo.borderRadius+"px", borderWidth: data.logo.borderWidth+"px",
                                                padding: data.logo.padding+"px", margin: data.logo.margins+"px", borderStyle: "solid", position: "absolute"}}>
                                        <pre style={{color: data.logo.color}}>{data.logo.text}</pre>
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

export default ViewLogoScreen;