import React, { Component } from "react";
import CustomInput from "../../input/custom-input";
import "./sign-in.scss";
import CustomButton from "../../custom-button/custom-button";
import { googleSignInStart, emailSignInStart } from "../../../redux/user/user.action";
import { connect } from "react-redux";

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
    const { email, password } = this.state;
    const {emailSignInStart} = this.props
      emailSignInStart(email,password)
      // await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    let { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="container-fluid">
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
                type="button"
                onClick={googleSignInStart}
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

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password})),
  
});

export default connect(null, mapDispatchToProps)(SignIn);
