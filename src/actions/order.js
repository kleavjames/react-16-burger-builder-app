import axios from '../axios-orders';
import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START
} from './actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData
    }
  };
}

export const purchaseBurgerFail = error => {
  return {
    type: PURCHASE_BURGER_FAIL,
    payload: {
      error: error
    }
  };
}

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  }
}

export const purchaseBurger = orderData => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post(`/orders.json`, orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch(err) {
      dispatch(purchaseBurgerFail(err));
    }
  }
}

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: { orders }
  }
}

export const fetchOrdersFail = error => {
  return {
    type: FETCH_ORDERS_FAIL,
    payload: { error }
  }
}

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return async dispatch => {
    try {
      dispatch(fetchOrdersStart())

      const orders = await axios.get('/orders.json');
      const fetchOrders = [];
      for (let key in orders.data) {
        fetchOrders.push({
          ...orders.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchOrders))
    } catch(err) {
      dispatch(fetchOrdersFail(err))
    }
  }
}