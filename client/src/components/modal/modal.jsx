import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./modal.scss";

class Modal extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    const { text, header, handleClick } = this.props;
    return (
      <div>
        <button
          className="waves-effect waves-light btn modal-trigger green"
          data-target="modal1"
        >
          <i className="material-icons right">smartphone</i>LIPA NA MPESA
        </button>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <h4>{header}</h4>
            <p>{text}</p>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-red btn-flat red left" >
              Close
            </button>
            <button className="modal-close waves-effect waves-white btn-flat green" onClick = {handleClick}>
              Pay
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
