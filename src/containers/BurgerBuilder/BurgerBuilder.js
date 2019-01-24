import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import {
  addIngredient,
  removeIngredient,
  initialIngredients,
  purchaseInit
} from '../../actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../Hoc/ErrorHandler/ErrorHandler';

class BurgerBuilder extends Component {
  state = {
    // purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  }

  async componentDidMount() {
    this.props.onInitIngredients();
    // try {
    //   const ingredients = await axios.get(`https://react-my-burger-app-64f35.firebaseio.com/ingredients.json`);
    //   this.setState({
    //     ingredients: ingredients.data
    //   })
    // } catch(err) {
    //   this.setState({ error: true });
    // }
  }

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  // addIngredient = (type) => {
  //   const updatedCount = this.state.ingredients[type] + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }; 
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });

  //   this.updatePurchase(updatedIngredients);
  // }

  // removeIngredient = (type) => {
  //   if (this.state.ingredients[type] <= 0) {
  //     return;
  //   }

  //   const updatedCount = this.state.ingredients[type] - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice - priceDeduction;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });

  //   this.updatePurchase(updatedIngredients);
  // }

  purchaseModal = () => {
    this.setState({ purchasing: true })
  }

  purchaseContinue = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push(`price=${this.state.totalPrice}`);
    // const queryString = queryParams.join('&');
    this.props.onInitPurchase()
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burgerPreview = this.props.error? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ingredients) {
      burgerPreview = (
        <>
          <Burger
            ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchase(this.props.ingredients)} 
            ordered={this.purchaseModal} />
        </>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        cancelPurchase={() => this.setState({ purchasing: false })} 
        continuePurchase={this.purchaseContinue}
        price={this.props.totalPrice} />
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }

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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.orders.purchased
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onIngredientAdded: (type) => dispatch(addIngredient(type)),
    onIngredientRemove: (type) => dispatch(removeIngredient(type)),
    onInitIngredients: () => dispatch(initialIngredients()),
    onInitPurchase: () => dispatch(purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ErrorHandler(BurgerBuilder, axios));