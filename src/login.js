import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expo from 'expo';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Label, Icon, Spinner } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { loginuserredux } from './actions';

const validate = values => {
  const error = {};
  error.username = '';
  error.password = '';
  let un = values.username;
  let ema = values.email;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.username === undefined) {
    un = '';
  }

  if (un.length > 10) {
    error.username = 'max 10 characters';
  }
  if (un.length < 1) {
    error.username = 'Please enter username';
  }

  return error;
};

// const submit = values => {
//   console.log('submitting form', values);
// };
export class Login extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
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

  renderButton() {
    
    if (this.props.users.logging !== undefined) {
      if (this.props.users.logging === true) {
        return (
          <Spinner style={{ flex: 1, }} />
        );
      }
    }
    return (
      <Button rounded primary
        onPress={this.props.handleSubmit(this.props.loggin)}
        style={{ flex: 1, }} >
        <Icon active name="home" />
        <Text>Login</Text>
      </Button>
    );
  }
  render() {
    const { handleSubmit, reset } = this.props;
    // console.log(this.props);

    return (

      <Container>
        <Header>
          <Body>
            <Title>Login</Title>
          </Body>
        </Header>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content padder>
            {/* <ScrollView scrollEnabled={false}> */}
            <Form>
              <Field key='1' name={'username'} label='User Name' component={this.renderInput} />
              <Field key='2' name={'password'} label='Password' secure component={this.renderInput} />
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
  // users: state.users
  return {
    users: state.users
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loggin: loginuserredux,
  }, dispatch);
};

Login = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Login);
export default reduxForm({ form: 'login', validate })(Login);
