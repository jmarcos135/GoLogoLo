import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header">
                                            Recent Work
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {data.logos.sort((a, b) => { return Date.parse(b.lastUpdate)-Date.parse(a.lastUpdate)}).map((logo, index) => (
                                                <li key={index} className='home_logo_link list-group-item'>
                                                    <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="card card-default bg-dark" id="home_banner_container">
                                        GoLogoLo<br />
                                        Logo Maker
                                    </div>
                                    <div>
                                        <Link className="btn btn-success" id="add_logo_button" to="/create">Add Logo</Link>
                                    </div>
                                </div>
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
