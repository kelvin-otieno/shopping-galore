import React, { Component } from "react";
import SHOP_DATA from "../../../data/shop";
import CollectionPreview from "../../collection-preview/collection-preview";
import './shop.scss'

class Shop extends Component {
  constructor() {
    super();
    this.state = { shops: SHOP_DATA };
  }

  //   componentDidMount() {
  //     this.setState({ shops: SHOP_DATA });
  //   }

  render() {
    return (
      <div className = "shop">
        {/* <h3>Collections</h3> */}
        {this.state.shops.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}

export default Shop;
