const initialState = {
    logging: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'Add User':
            return { ...state };
        case 'logging':
            return { ...state, logging: true };
        case 'Login User':
            return { ...state, logging: false };
        default:
            return state;
    }
};
