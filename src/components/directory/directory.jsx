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
    this.setState({ sections });
  }

  render() {
    return (
      <div>
        <div className="directory-menu container-fluid">
          <div className="row">
            {this.state.sections.map((section) => (
              <MenuItem
                key={section.id}
                title={section.title}
                imageUrl={section.imageUrl}
                size={section.size}
                linkUrl={section.linkUrl}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;
