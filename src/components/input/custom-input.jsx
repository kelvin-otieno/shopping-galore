import React, { Component } from "react";

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { type, id, text, value, name, onChange } = this.props;
    return (
      <div>
        <div className="input-field">
          <label htmlFor={id}>{text}</label>
          <input
            type={type}
            id={id}
            value={value}
            name={name}
            onChange={onChange}
            required
          />
        </div>
      </div>
    );
  }
}

export default CustomInput;
