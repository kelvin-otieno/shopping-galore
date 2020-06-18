import React, { Component } from "react";
import "./collection-item.scss";
import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";

class CollectionItem extends Component {
   addItemToCart = (id, name, price, imageUrl) => {
    this.props.addToCart({
      id,
      name,
      price,
      imageUrl,
    });
  };

  render() {
    const { id, name, price, imageUrl } = this.props;
    return (
      <div>
        <div className="collection-item col s12 m6 l3">
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              height: "350px",
              backgroundRepeat:"no-repeat",
              backgroundSize:"cover"
            }}
            className="valign-wrapper image"
          >
            <button
              className="btn waves-effect waves-red grey add-button"
              onClick={() => this.addItemToCart(id, name, price, imageUrl)}
            >
              ADD TO CART
            </button>
          </div>

          <div>
            <span className="left hoverable name">{name}</span>
            <span className="right price hoverable">{`${"$"}${price}`}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cartItem) => dispatch(addToCart(cartItem)),
  };
};

export default connect(null, mapDispatchToProps)(CollectionItem);
