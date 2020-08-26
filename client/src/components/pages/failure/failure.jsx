import React, { Component } from "react";
import "./failure.scss";
// import { Collapsible } from "materialize-css";

import "materialize-css/dist/css/materialize.min.css";

class FailurePage extends Component {
  render() {
    const { location } = this.props;

    const errorMessage =decodeURI(location.search.replace("?error_message=", "")) ;
    return (
      <div className=" z-depth-4 container failure">
        

        <div>
          <p className="failure-message left">Payment failed</p>
        </div>

        <div className="img-div">
          <img
            className=""
            src={require("../../../images/error_icon.svg")}
            alt=""
          />
        </div>

        <p className=" center">{errorMessage}</p>
      </div>
    );
  }
}


export default FailurePage;
