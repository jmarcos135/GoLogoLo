import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_LOGOS = gql`
    query user($userId: String) {
        user(id: $userId) {
            _id
            email
            password
            logos{
                _id
                name
                lastUpdate
            }
        }
    }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS} variables={{ userId: this.props.match.params.userId}}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    refetch();

                    return (
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

                            <div className="container" style={{backgroundColor: "white", height: "100vh", minHeight: "100vh"}}>
                                <br />
                                <div className="row" >
                                    <div className="col-md-12">
                                        <nav class="navbar navbar-light bg-light">
                                            <div class="d-flex flex-grow-1 mr-auto">
                                                <h4>Recent Logos</h4>
                                            </div>
                                            <ul class="navbar-nav ml-auto flex-nowrap">
                                                <li class="nav-item">
                                                    <Link className="btn btn-success" id="add_logo_button" to="/create"><i class="fa fa-pencil"></i> New Logo</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                                <div className="row" >
                                    <div className="col-md-12">
                                        <ul className="list-group list-group-flush" style={{minHeight: "60vh", maxHeight: "75vh", overflow: "scroll"}}>
                                        {data.user.logos.length==0 ? <h6><br></br>You currently have no logos</h6> : 
                                            data.user.logos.sort((a, b) => { return Date.parse(b.lastUpdate)-Date.parse(a.lastUpdate)}).map((logo, index) => (
                                                <li key={index} className='home_logo_link list-group-item'>
                                                    <Link to={`/view/${logo._id}`}>{logo.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                                <br/>

                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
