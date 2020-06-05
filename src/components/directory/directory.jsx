import React, { Component } from "react";
import MenuItem from "../menu-item/menu-item";
import "./directory.scss";
import sections from "../../data/sections";

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      sections: [],
    };
  }

  componentDidMount() {
    this.setState({ sections }, () => console.log(this.state.sections));
  }

  render() {
    return (
      <div>
        <div className="directory-menu container-fluid">
          <div className="row">
            {this.state.sections.map((section) => (
              <MenuItem
                title={section.title}
                key={section.id}
                imageUrl={section.imageUrl}
                size = {section.size}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;
