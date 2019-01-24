import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  ERROR_FETCH_INGREDIENTS
} from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const burgerBuilderReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      }

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      }

    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.payload.ingredients.salad,
          bacon: action.payload.ingredients.bacon,
          cheese: action.payload.ingredients.cheese,
          meat: action.payload.ingredients.meat
        },
        totalPrice: initialState.totalPrice,
        error: false
      }

    case ERROR_FETCH_INGREDIENTS:
      return {
        ...state,
        error: true
      }

    default:
      return state;
  }

};

export default burgerBuilderReducer;