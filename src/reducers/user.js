const initialState = {
  logging: false,
  token: null,
  errors: {
    'email': '',
    'username': '',
    'password': '',
    'name': '',
    'title': '',
    'sallary': '',
    'message': '',
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Add User':
      return { ...state, logging: false, };
    case 'logging':
      return { ...state, logging: true, errors: {} };
    case 'Logout User Token':
      console.log('Logging out redux');
      return { ...state, logging: false, token: null };
    case 'Login User':
      console.log('Logging', action.payload);
      return { ...state, logging: false, token: action.payload };
    case 'Login Error':
      const { status, problem } = action.payload;
      if (problem === 'CLIENT_ERROR') {
        return { ...state, logging: false, errors: { 'message': status + ' UnAutanticated Try Again' } };
      } else if (problem === 'SERVER_ERROR') {
        return {
          ...state, logging: false,
          errors: { 'message': status + ' Server Error Try Again' }
        };
      } else if (problem === 'TIMEOUT_ERROR') {
        return {
          ...state, logging: false,
          errors: { 'message': 'TimeOut Error Please check your connection' }
        };
      } else if (problem === 'CONNECTION_ERROR') {
        return {
          ...state, logging: false,
          errors: { 'message': 'Connection Error Please check your connection' }
        };
      } else if (problem === 'NETWORK_ERROR') {
        return {
          ...state, logging: false,
          errors: { 'message': 'Network Error Please check your connection' }
        };
      }
      return {
        ...state, logging: false, errors: { 'message': 'UnKown Error' }
      };
    default:
      return state;
  }
};
