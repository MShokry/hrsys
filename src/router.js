import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Root } from 'native-base';
import { Font, AppLoading } from 'expo';

import Welcome from './welcome';
import UserAdd from './Useradd';
import Login from './login';

class Rutes extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    //Load Fonts
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    // Load Data From Storage
    this.setState({ loading: false });
  };

  render() {
    console.log('test4');
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }

    return (
      <Router hideNavBar={true} >
        <Scene key="root">
          <Scene key="Welcome" component={Welcome} title="Welcome"  hideNavBar={true} />
          <Scene key="UserAdd" component={UserAdd} title="Adding"  hideNavBar={true} />
          <Scene key="Login" component={Login} initial={true} title="Login"/>
        </Scene>
      </Router>
    );
  }
}

export default Rutes;
