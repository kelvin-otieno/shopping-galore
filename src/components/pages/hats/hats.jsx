import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop.js";
import Collection from "../../collection/collection.jsx";

class Hats extends Component {
  constructor(props) {
    super(props);
    this.state = {shops:SHOP_DATA  };
  }


  render() {
      const hats = this.state.shops.filter((item) => item.title.toLowerCase() === "hats")
    return (
      <div className="hats">
         <Collection title={hats[0].title} items={hats[0].items} />
      </div>
    );
  }
}

export default Hats;
