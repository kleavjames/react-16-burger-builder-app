import React, { Component } from 'react';

import classes from './Modal.css';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('[Modal] WillUpdate')
  }

  render() {
    return (
      <>
        <BackDrop show={this.props.show} clicked={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ?  '1' : '0'}}>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;