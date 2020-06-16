import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop.js";
import Collection from "../../collection/collection.jsx";
import "./sneakers.scss";

class Sneakers extends Component {
  constructor(props) {
    super(props);
    this.state = { shops: SHOP_DATA };
  }

  render() {
    const sneakers = this.state.shops.filter(
      (item) => item.title.toLowerCase() === "sneakers"
    );
    return (
      <div className="sneakers">
        <Collection title={sneakers[0].title} items={sneakers[0].items} />
      </div>
    );
  }
}

export default Sneakers;
