import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {
  Container, Item, Input, Header,
  Body, Content, Title, Button, Text,
  Form, Label, Icon, Left, Right, Spinner
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { LogoutToken, adduser, adduserredux } from './actions';

const validate = values => {
  const error = {};
  // error.email = '';
  // error.username = '';
  // error.password = '';
  // error.name = '';
  // error.title = '';
  // error.sallary = '';
  let un = values.username;
  let fn = values.name;
  let ema = values.email;

  if (values.email === undefined) {
    ema = '';
  }
  if (values.username === undefined) {
    un = '';
  }
  if (values.name === undefined) {
    fn = '';
  }

  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (un.length > 10) {
    error.username = 'max 10 characters';
  }
  if (un.length < 1) {
    error.username = 'Please enter username';
  }
  if (fn.length < 1) {
    error.name = 'Please enter User full Name';
  }
  return error;
};

// const submit = values => {
//   console.log('submitting form', values);
// };


export class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }
  componentDidMount() {
    console.log('Component mounted');
    this.props.reset();
  }

  logout() {
    //Clear Token
    console.log("Logging out()");
    this.props.LogoutToken(null);
    AsyncStorage.removeItem('@app:session');
    Actions.Login();
    console.log("Logged out");
  }

  renderButton() {
    if (this.props.user.logging !== undefined) {
      if (this.props.user.logging === true) {
        return (
          <Spinner style={{ flex: 1, }} />
        );
      }
    }
    return (
      <Button rounded primary
        onPress={this.props.handleSubmit(this.props.submitin)}
        style={{ flex: 1, }} >
        <Icon active name="ios-add" />
        <Text>ADD</Text>
      </Button>
    );
  }

  renderInput({ input, label, type, key, secure, meta: { touched, error, warning } }) {
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError} key={key} floatingLabel>
        <Label>{label}    <Text style={{ color: 'red' }}>    {error}</Text></Label>
        <Input {...input} key="1{key}" secureTextEntry={secure} />
        {hasError ? <Icon name='close-circle' /> : <Icon />}
      </Item>
    );
  }

  render() {
    //console.log(this.props);

    const { handleSubmit, reset } = this.props;
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>Add User</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.logout()} >
              <Icon active name="ios-log-out-outline" />
            </Button>
          </Right>
        </Header>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content padder>
            {/* <ScrollView scrollEnabled={false}> */}
            <Form>
              <Field key='1' name={'username'} label='User Name' component={this.renderInput} />
              <Field key='2' name={'password'} label='Password' secure component={this.renderInput} />
              <Field key='3' name={'email'} label='Email' component={this.renderInput} />
              <Field key='4' name={'name'} label='Full Name' component={this.renderInput} />
              <Field key='5' name={'title'} label='Title' component={this.renderInput} />
              <Field key='6' name={'sallary'} label='Sallary' component={this.renderInput} />
              <Text style={{ color: 'red', alignContent: 'center', flex: 1 }} >{this.props.user.errors.message}</Text>
              <View style={{ flexDirection: "row", paddingTop: 20, }}>
                {this.renderButton()}
                <Button rounded danger onPress={reset} style={{ flex: 1, }} >
                  <Icon active name="trash" />
                  <Text>Reset</Text>
                </Button>
              </View>
            </Form>
            {/* </ScrollView> */}
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.users
  };
}

const mapDispatchToProps = (dispatch, getState) => {
  return bindActionCreators({
    submitin: adduserredux,
    LogoutToken
  }, dispatch, getState);
};

UserAdd = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserAdd);
export default reduxForm({ form: 'adduser', validate })(UserAdd);
