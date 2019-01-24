import axios from '../axios-orders';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  ERROR_FETCH_INGREDIENTS
} from './actionTypes';

export const addIngredient = type => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ingredientName: type
    }
  };
}

export const removeIngredient = type => {
  return {
    type: REMOVE_INGREDIENT,
    payload: {
      ingredientName: type
    }
  }
}

const setIngredients = (ings) => {
  return {
    type: SET_INGREDIENTS,
    payload: {
      ingredients: ings
    }
  }
}

const fetchIngredientsFailed = () => {
  return {
    type: ERROR_FETCH_INGREDIENTS
  }
}

export const initialIngredients = () => {
  return async dispatch => {

    try {
      const ingredients = await axios.get(`https://react-my-burger-app-64f35.firebaseio.com/ingredients.json`);
      dispatch(setIngredients(ingredients.data))
    } catch(err) {
      dispatch(fetchIngredientsFailed())
    }

  }
}