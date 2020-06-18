import React from "react";
import "./checkout-page.scss";

const CheckoutPage = () => {
  return (
    <div className="container checkout-page">
      <table className="responsive-table centered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <img src={require("../../../images/jackets.png")} alt="" />
            </td>
            <td>Shearling Jacket</td>
            <td>
              {/* <tr className="inner-row">
                <div className = "center">
                  <td>&lt;</td>
                  <td>1</td>
                  <td>&gt;</td>
                </div>
              </tr> */}
              <div>
                  <span>&lt;</span>
                  <span>1</span>
                  <span>&gt;</span>
              </div>
            </td>
            <td>$0.87</td>
            <td>x</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutPage;
