import React from "react";
import { SpinnerDiv } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <SpinnerDiv /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
