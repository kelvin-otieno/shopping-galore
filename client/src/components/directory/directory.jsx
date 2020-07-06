import React from "react";
import MenuItem from "../menu-item/menu-item";
import "./directory.scss";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const Directory = ({sections}) => {
  return (
    <div>
      <div className="directory-menu container-fluid">
        <div className="row">
          {sections.map((section) => (
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
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
