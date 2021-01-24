import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signup, singin} from '../../actions/auth';

const initialState = { firstLastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    document.body.className = "hold-transition register-page";

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispach = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispach(signup(formData, history));
        }
        else{
            dispach(singin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }


    return (
        <>
            <div className="register-box">
                <div className="register-logo">
                    <b>Helpdesk</b>
                </div>

                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">
                            {isSignUp ? "Register a new membership" : "Sign in to start your session"} 
                            </p>

                        <form onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Full name" name="firstLastName" onChange={handleChange} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>)
                            }
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            {isSignUp && (<div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Retype password" name="confirmPassword" onChange={handleChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>)
                            }
                            <div className="row">
                                <div className="col-8">

                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block" >
                                        {isSignUp ? "Register" : "Login"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <button className="text-center btn" onClick={switchMode}>
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Auth;
