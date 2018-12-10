import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggle = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }))
  }

  render () {
    return (
      <>
        <Toolbar drawerToggleClicked={this.sideDrawerToggle} />
        <SideDrawer
          closed={this.sideDrawerClose}
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </>
    );
  }
}

export default Layout;