import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const OrderSummary = ( props ) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span
            style={{textTransform: 'capitalize'}}>{igKey}
          </span>: {props.ingredients[igKey]}
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
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' btnClicked={props.cancelPurchase}>Cancel</Button>
      <Button btnType='Success' btnClicked={props.continuePurchase}>Continue</Button>
    </>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  cancelPurchase: PropTypes.func,
  continuePurchase: PropTypes.func
}

export default OrderSummary;