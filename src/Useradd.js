import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expo from 'expo';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Label, Icon } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { adduser,adduserredux } from './actions';

const validate = values => {
  const error = {};
  error.email = '';
  error.username = '';
  error.password = '';
  error.fullname = '';
  error.title = '';
  error.sallary = '';
  let un = values.username;
  let fn = values.fullname;
  let ema = values.email;

  if (values.email === undefined) {
    ema = '';
  }
  if (values.username === undefined) {
    un = '';
  }
  if (values.fullname === undefined) {
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
    error.fullname = 'Please enter User full Name';
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
    const { handleSubmit, reset } = this.props;
    // console.log(this.props);

    return (

      <Container>
        <Header>
          <Body>
            <Title>Redux Form</Title>
          </Body>
        </Header>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content padder>
            {/* <ScrollView scrollEnabled={false}> */}
            <Form>
              <Field key='1' name={'username'} label='User Name' component={this.renderInput} />
              <Field key='2' name={'password'} label='Password' secure component={this.renderInput} />
              <Field key='3' name={'email'} label='Email' component={this.renderInput} />
              <Field key='4' name={'fullname'} label='Full Name' component={this.renderInput} />
              <Field key='5' name={'title'} label='Title' component={this.renderInput} />
              <Field key='6' name={'sallary'} label='Sallary' component={this.renderInput} />

            <View style={{ flexDirection: "row", paddingTop: 20, }}>
              <Button rounded primary onPress={handleSubmit(this.props.submitin)} style={{ flex: 1, }} >
                <Icon active name="ios-add" />
                <Text>Add</Text>
              </Button>
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
  user: state.users

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    submitin: adduserredux,

  }, dispatch);
};

UserAdd = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserAdd);
export default reduxForm({ form: 'add', validate })(UserAdd);
