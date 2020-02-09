import React, { Component } from "react";

class ProductDetails extends Component {
  handleSave = () => {
    // Navigate to /products
    this.props.history.push('/products');
  };

  render() {
      console.log(this.props.match.params.id);
      
    return (
      <div>
        <h1>Product Details - {this.props.match.params.id} </h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default ProductDetails;
