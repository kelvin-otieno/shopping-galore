import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import CustomButton from "../../custom-button/custom-button";
import { connect } from "react-redux";
import { signUpStart } from "../../../redux/user/user.action";
import './sign-up.scss'

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
    const  {signUpStart} = this.props
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else {
      try {
        
        signUpStart(displayName,email,password)
        // const { user } = await auth.createUserWithEmailAndPassword(
        //   email,
        //   password
        // );
        // await createUserProfileDocument(user, { displayName });
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
      <div className = "container-fluid">
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

const mapDispatchToProps = dispatch => ({
  signUpStart : (displayName,email,password) => dispatch(signUpStart({displayName,email,password}))
})

export default connect(null,mapDispatchToProps)(SignUp);
