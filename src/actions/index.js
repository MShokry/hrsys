import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';
import { Actions } from 'react-native-router-flux';
import { SubmissionError } from 'redux-form';

const api = create({
    //    baseURL: 'https://msn-hr-system.herokuapp.com/api/v1',
    baseURL: 'https://hrsys-restless-koala.eu-gb.mybluemix.net/api/v1',
    // baseURL: "https://httpbin.org",

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 30000
});

export const adduser = (values) => ({
    type: 'Add User',
    payload: values
});

export const adduserredux = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: 'logging' });
        console.log('Response form  Valuse', JSON.stringify(values));
        api.setHeader('token', getState().users.token);
        //https://msn-hr-system.herokuapp.com/api/v1/user
        api
            .post('/user', values)
            .then((r) => {
                console.log('Response form adduser', r);
                if (r.ok === true) {
                    dispatch(adduser(r.data));
                } else {
                    dispatch(loginusererror(r));
                    //throw new SubmissionError({ error: { 'email': 'ERROR' } });
                    throw new SubmissionError({ email: 'ERROR' });
                }
            })
            .catch((e) => console.log('submitting form Error ', e));
    };
};

export const loginuser = (token) => ({
    type: 'Login User',
    payload: token
});

export const LogoutToken = (token) => ({
    type: 'Logout User Token',
    payload: token
});

export const loginusererror = (values) => ({
    type: 'Login Error',
    payload: values
});


export const loginuserredux = (values) => {
    return dispatch => {
        dispatch({ type: 'logging' });
        console.log('Requesting Login For', JSON.stringify(values));
        api
            .post('/login', JSON.stringify(values))
            .then((r) => {
                console.log('Response form ', r);
                if (r.ok === true) {
                    // Save Current token
                    AsyncStorage.setItem('@app:session', r.data.token);
                    dispatch(loginuser(r.data.token));
                } else {
                    dispatch(loginusererror(r));
                }
            })
            .catch((e) => console.log('submitting form Error ', e));
    };
};
