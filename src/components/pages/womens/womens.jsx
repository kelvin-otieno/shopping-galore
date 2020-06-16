import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop.js";
import Collection from "../../collection/collection.jsx";
import "./womens.scss";

class Womens extends Component {
  constructor(props) {
    super(props);
    this.state = { shops: SHOP_DATA };
  }

  render() {
    const womens = this.state.shops.filter(
      (item) => item.title.toLowerCase() === "womens"
    );
    return (
      <div className="womens">
        <Collection title={womens[0].title} items={womens[0].items} />
      </div>
    );
  }
}

export default Womens;
