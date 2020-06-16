import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop.js";
import Collection from "../../collection/collection.jsx";
import "./jackets.scss";

class Jackets extends Component {
  constructor(props) {
    super(props);
    this.state = { shops: SHOP_DATA };
  }

  render() {
    const jackets = this.state.shops.filter(
      (item) => item.title.toLowerCase() === "jackets"
    );
    return (
      <div className="jackets">
        <Collection title={jackets[0].title} items={jackets[0].items} />
      </div>
    );
  }
}

export default Jackets;
