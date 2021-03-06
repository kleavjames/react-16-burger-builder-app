import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const BuildControls = ( props ) => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ];

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => {
        return <BuildControl
                  key={ctrl.label}
                  label={ctrl.label}
                  added={() => props.ingredientAdded(ctrl.type)}
                  removed={() => props.ingredientRemoved(ctrl.type)}
                  disabled={props.disabled[ctrl.type]} />
      })}
      <br />
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
        Order Now</button>
    </div>
  );
}

BuildControls.propTypes = {
  price: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func
}

export default BuildControls;