import * as api from '../api/index'
import { UserActionTypes } from '../actions/actionTypes/userActionTypes'


export const getUsers = (page, limit, search) => async (dispatch) => {
    try {
        const { data } = await api.getUsers(page, limit, search);
        dispatch({ type: UserActionTypes.FETCH_USERS, payload: { users: data.data, total: data.count } });
    }
    catch (error) {
        console.log(error);
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: UserActionTypes.FETCH_USER, payload: data.data });
    }
    catch (error) {
        console.log(error);
    }
}

export const createUser = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createUser(formData);
        dispatch({ type: UserActionTypes.CREATE_USER, payload: data.data });
        history.push('/users');
    }
    catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, formData);
        dispatch({ type: UserActionTypes.UPDATE_USER, payload: data.data });
        history.push('/users');
    }
    catch (error) {
        console.log(error);
    }
}