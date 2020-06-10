import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import CustomButton from "../../custom-button/custom-button";
import {
  auth,
  createUserProfileDocument,
} from "../../../firebase/firebase.utils";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDocument(user, { displayName });
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
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
              id="displayName"
              text="Display Name"
              name="displayName"
              value={this.state.displayName}
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
              name="confirmPassword"
              value={this.state.confirmPassword}
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
