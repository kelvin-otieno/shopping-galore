import React from "react";

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <div>
      <button {...otherProps}>{children}</button>
    </div>
  );
};

export default CustomButton;
