import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import CustomButton from "../../custom-button/custom-button";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ name: "", email: "", password: "", confirmpassword: "" });
  };

  handleChange = (event) => {
    let { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <div className="row">
          <h4>I don't have an account</h4>
          <h6>Sign up with your email and password</h6>
          <form onSubmit={this.handleSubmit}>
            <CustomInput
              type="text"
              id="name"
              text="Display Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <CustomInput
              type="email"
              id="email"
              text="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <CustomInput
              type="Password"
              id="password"
              text="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <CustomInput
              type="Password"
              id="confirmpassword"
              text="Confirm Password"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.handleChange}
            />
            <div>
              <CustomButton
                type="submit"
                className="btn waves-effect waves-dark left sign-in-sign-up"
              >
                SIGN UP
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
