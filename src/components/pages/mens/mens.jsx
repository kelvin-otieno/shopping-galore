import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop.js";
import Collection from "../../collection/collection.jsx";
import "./mens.scss";

class Mens extends Component {
  constructor(props) {
    super(props);
    this.state = { shops: SHOP_DATA };
  }

  render() {
    const mens = this.state.shops.filter(
      (item) => item.title.toLowerCase() === "mens"
    );
    return (
      <div className="mens">
        <Collection title={mens[0].title} items={mens[0].items} />
      </div>
    );
  }
}

export default Mens;
