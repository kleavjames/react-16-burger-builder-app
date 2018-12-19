import React, { Component } from 'react'
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  }

  async componentDidMount() {
    try {
      const ingredients = await axios.get(`https://react-my-burger-app-64f35.firebaseio.com/ingredients.json`);
      this.setState({
        ingredients: ingredients.data
      })
    } catch(err) {
      this.setState({ error: true });
    }
  }

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    this.setState({ purchasable: sum > 0 });
  }

  addIngredient = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchase(updatedIngredients);
  }

  removeIngredient = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchase(updatedIngredients);
  }

  purchaseModal = () => {
    this.setState({ purchasing: true })
  }

  purchaseContinue = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burgerPreview = this.state.error? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burgerPreview = (
        <>
          <Burger
            ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable} 
            ordered={this.purchaseModal} />
        </>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchase={() => this.setState({ purchasing: false })} 
        continuePurchase={this.purchaseContinue}
        price={this.state.totalPrice} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClose={() => this.setState({ purchasing: false })}>
          {orderSummary}
        </Modal>
        {burgerPreview}
      </>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);