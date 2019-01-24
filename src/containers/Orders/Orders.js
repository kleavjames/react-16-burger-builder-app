import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import { fetchOrders } from '../../actions'
import Order from '../../components/Order/Order';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // state ={
  //   orders: [],
  //   loading: true
  // }

  async componentDidMount() {
    this.props.onFetchOrders()
    // try {
    //   const orders = await axios.get('/orders.json');
    //   const fetchOrders = [];
    //   for (let key in orders.data) {
    //     fetchOrders.push({
    //       ...orders.data[key],
    //       id: key
    //     });
    //   }
    //   this.setState({
    //     loading: false,
    //     orders: fetchOrders
    //   });
    // } catch(err) {
    //   this.setState({ loading: false });
    // }
  }

  render() {
    let orders = <Spinner />

    if (this.props.orders) {
      orders = this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));