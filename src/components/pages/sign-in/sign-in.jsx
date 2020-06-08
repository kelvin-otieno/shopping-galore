import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import "./sign-in.scss";
import CustomButton from "../../custom-button/custom-button";

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
                className="btn black white-text waves-effect waves-light left"
              >
                SIGN IN
              </CustomButton>

              <CustomButton className="btn blue white-text waves-effect right">
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
