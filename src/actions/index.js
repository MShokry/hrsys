import { create } from 'apisauce';

const api = create({
    // baseURL: "https://api.github.com",
    // headers: { 'Accept': 'application/vnd.github.v3+json' }
    baseURL: "https://msn-hr-system.herokuapp.com/api/v1",
    // baseURL: "https://httpbin.org",

    headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YjI0ODM0NTE1NTUxZjU2ODU4MzQ0ZDQiLCJpYXQiOjE1MjkxMTk3MjV9.V4PC8Xr0kMr4OFq59mPS3EvcEMa9aAKtZvltKSa3b2o",
        'Accept': 'application/json',
        "Content-Type": "Content-Type: application/json",
    }
});

export const adduser = (values) => ({
    type: 'Add User',
    payload: values
});

export const adduserredux = (values) => {
    return dispatch => {
        dispatch({ type: "Loading" });
        console.log("Response form  Valuse", JSON.stringify(values));
        api
            .get('/user', JSON.stringify(values))
            .then((r) => {
                console.log('Response form ', r.data);
                dispatch(adduser(r.data));
            })
            .catch((e) => console.log('submitting form Error ', e));
    };
};

export const loginuser = (values) => ({
    type: 'Login User',
    payload: values
});


export const loginuserredux = (values) => {
    return dispatch => {
        dispatch({ type: "logging" });
        console.log("Response form  Valuse", JSON.stringify(values));
        api
            .post('/login', JSON.stringify(values))
            .then((r) => {
                console.log('Response sss form ', r.data);
            })
            .catch((e) => console.log('submitting form Error ', e));

        api
            .post('/login', values)
            .then((r) => {
                console.log('Response form ', r.data);
                dispatch(loginuser(r.data));
            })
            .catch((e) => console.log('submitting form Error ', e));
    };
};
