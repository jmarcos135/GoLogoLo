import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


class LoginScreen extends Component {

    render() {
        let email, pass;
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
                                </li>
                            </ul>
                        </span>
                    </div>
                </nav>

                <div className="container" style={{backgroundColor: "white", height: "100vh", minHeight: "100vh"}}>
                    <br/>
                    <br/>
                    <div className="row justify-content-center">
                        <h1>Sign In</h1>
                    </div>
                    <div className="row justify-content-center">
                        <form action="/login" method="post" style={{textAlign: "center"}}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" ref={(node)=>{pass=node;}} aria-describedby="emailHelp"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" ref={(node)=>{pass=node;}}/>
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                <label class="form-check-label" for="exampleCheck1">Keep me signed in</label>
                            </div>
                            <button type="submit" value="Log In" class="btn btn-primary">Enter Site</button>
                            <h6 id="emailHelp" class="form-text text-secondary">Register Account</h6>
                            <h6 id="emailHelp" class="form-text text-secondary">Forgot Password?</h6>
                            <a href="/auth/google">Sign In with Google</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;
