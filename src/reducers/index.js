import { combineReducers } from 'redux';

import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer
});

export default rootReducer;