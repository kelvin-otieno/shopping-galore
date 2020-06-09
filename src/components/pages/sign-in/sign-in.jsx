import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import "./sign-in.scss";
import CustomButton from "../../custom-button/custom-button";
import { signInWithGoogle } from "../../../firebase/firebase.utils";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    let { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="main-div">
        <div className="row">
          <h4>I already have an account</h4>
          <h6>Sign In with your email and password</h6>
          <form onSubmit={this.handleSubmit}>
            <CustomInput
              type="Email"
              id="sign-in-email"
              text="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <CustomInput
              type="Password"
              id="sign-in-password"
              text="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div>
              <CustomButton
                type="submit"
                className="btn waves-effect waves-dark left sign-in-sign-up"
              >
                SIGN IN
              </CustomButton>

              <CustomButton
                onClick={signInWithGoogle}
                className="btn white-text waves-effect right google-sign-in"
              >
                SIGN IN WITH GOOGLE
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
