import {AuthActionTypes} from '../actions/actionTypes/authActionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AuthActionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        case AuthActionTypes.LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;