import * as api from '../api/index';
import {AuthActionTypes} from '../actions/actionTypes/authActionTypes';


export const singin = (formData, history) => async(dispach) => {
    try {
        const {data} = await api.singIn(formData);
        dispach({type: AuthActionTypes.AUTH, data});

        history.push(history.location.pathname);
        
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispach) => {
    try{
        const {data} = await api.singUp(formData);
        dispach({type: AuthActionTypes.AUTH, data});
        history.push('/');
    }
    catch(error)
    {
        console.log(error);
    }
}