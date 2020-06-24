import styled from "styled-components";

export const SpinnerDiv = styled.div`
  border: 5px solid #eeeeee ;
  border-top: 5px solid #90caf9;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translateY(-50%);
  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
