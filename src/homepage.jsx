import React from "react";
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="menus-container container-fluid">
      <div className="row ">
        <div className="col s12 m6 l4">
          <div className="menu-item valign-wrapper">
            <div className="description ">
              <h4 className="flow-text  title">HATS</h4>
              <p className="flow-text subtitle">SHOP NOW</p>
            </div>
          </div>
        </div>

        <div className="col s12 m6 l4">
          <div className=" menu-item valign-wrapper">
            <div className="description">
              <h3 className="flow-text title">JACKETS</h3>
              <p className="flow-text subtitle">SHOP NOW</p>
            </div>
          </div>
        </div>

        <div className="col s12 m6 l4">
          <div className=" menu-item valign-wrapper">
            <div className="description">
              <h3 className="flow-text title">SNEAKERS</h3>
              <p className="flow-text subtitle"> SHOP NOW</p>
            </div>
          </div>
        </div>

        <div className="col s12 m6 l6">
          <div className=" menu-item valign-wrapper">
            <div className="description">
              <h3 className="flow-text title">WOMENS</h3>
              <p className="flow-text subtitle"> SHOP NOW</p>
            </div>
          </div>
        </div>

        <div className="col s12 m6 l6">
          <div className=" menu-item valign-wrapper">
            <div className="description">
              <h3 className="flow-text title">MENS</h3>
              <p className="flow-text subtitle"> SHOP NOW</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
