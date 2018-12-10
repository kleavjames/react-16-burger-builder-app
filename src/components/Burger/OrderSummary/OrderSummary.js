import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span
            style={{textTransform: 'capitalize'}}>{igKey}
          </span>: {this.props.ingredients[igKey]}
        </li>
      )
    })

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' btnClicked={this.props.cancelPurchase}>Cancel</Button>
        <Button btnType='Success' btnClicked={this.props.continuePurchase}>Continue</Button>
      </>
    );
  }
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  cancelPurchase: PropTypes.func,
  continuePurchase: PropTypes.func
}

export default OrderSummary;