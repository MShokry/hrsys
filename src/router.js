import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {Root} from 'native-base';
// import { Container, Text,  } from 'native-base';
import Welcome from './welcome';
import UserAdd from './Useradd';
import Login from './login';
import { Font, AppLoading } from 'expo';

class Rutes extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    console.log("test5");
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
          <Scene key="Welcome" component={Welcome} title="Welcome"  hideNavBar1={true} />
          <Scene key="UserAdd" component={UserAdd} title="Adding"  hideNavBar={true} 
          onSubmit={(values) => alert.alert('Submitted!', JSON.stringify(values))}
          />
          <Scene key="Login" component={Login} initial={true} title="Login" />
        </Scene>
      </Router>
    );
  }
}

export default Rutes;
