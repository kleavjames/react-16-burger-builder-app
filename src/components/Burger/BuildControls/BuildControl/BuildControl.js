import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const BuildControl = ( props ) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.More}
        onClick={props.added}>+</button>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}>-</button>
    </div>
  );
}

BuildControl.propTypes = {
  removed: PropTypes.func,
  disabled: PropTypes.bool
}

export default BuildControl;