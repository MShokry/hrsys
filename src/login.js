import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {
 Container, Item, Input,
 Header, Body, Content, Title, Button,
 Text, Form, Label, Icon, Spinner, Root
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { AppLoading } from 'expo';
import { loginuserredux, loginuser } from './actions';


const validate = values => {
 const error = {};
 error.username = '';
 error.password = '';
 let un = values.username;
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
  this.state = { loading: true };
  this.renderInput = this.renderInput.bind(this);
 }

 async componentWillMount() {
  console.log('Will mount');
  if (this.props.users.token === null) {
   await AsyncStorage.getItem('@app:session').then(token => {
    // use token
    console.log('Checking Storage');
    if (token !== null) {
     // Save Token to state
     this.props.loginuser(token);
     console.log('Token in the Storage ', token);
    }
   });
  }
  this.setState({ loading: false });
 }

 componentDidUpdate() {
  console.log('Component Updates !!');
  if (this.props.users.token !== null) {
   console.log('Logging User Has Token');
   this.props.reset();
   Actions.UserAdd();
  }
 }

 renderInput({ input, label, type, key, secure, meta: { touched, error, warning } }) {
  let hasError = false;
  if (error !== undefined) {
   hasError = true;
  }
  return (
   <Item error={hasError} key={key} floatingLabel>
    <Label>{label}<Text style={{ color: 'red' }}>      {error}</Text></Label>
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
   <Button
    rounded primary
    onPress={this.props.handleSubmit(this.props.loggin)}
    style={{ flex: 1, }}
   >
    <Icon active name="home" />
    <Text>Login</Text>
   </Button>
  );
 }
 render() {
  const { reset } = this.props;
  // console.log(this.props);
  // Loading wihle storage reading

  if (this.state.loading) {
   return (
    <Root>
     <AppLoading />
    </Root>
   );
  }
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
       <Text style={{ color: 'red', alignContent: 'center', flex: 1 }} >
        {this.props.users.errors.message}
       </Text>
       <View style={{ flexDirection: 'row', paddingTop: 20, }}>
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
function mapStateToProps(state) {
 // users: state.users
 return {
  users: state.users
 };
}
const mapDispatchToProps = (dispatch, getState) => {
 return bindActionCreators({
  loggin: loginuserredux,
  loginuser
 }, dispatch, getState);
};

Login = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Login);
export default reduxForm({ form: 'login', validate })(Login);
