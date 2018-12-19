import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {
  state ={
    orders: [],
    loading: true
  }

  async componentDidMount() {
    try {
      const orders = await axios.get('/orders.json');
      const fetchOrders = [];
      for (let key in orders.data) {
        fetchOrders.push({
          ...orders.data[key],
          id: key
        });
      }
      this.setState({
        loading: false,
        orders: fetchOrders
      });
    } catch(err) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))}
      </div>
    );
  }
}

export default ErrorHandler(Orders, axios);