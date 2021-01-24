import * as api from '../api/index'
import {StatusActionTypes} from './actionTypes/statusActionTypes'

export const getStatuses = () =>  async (dispatch) => {
    try {
        const {data} = await api.getStatuses();
        dispatch({type: StatusActionTypes.FETCH_STATUS, payload: data.data});
    } catch (error) {
        console.log(error);
    }
}

export const createStatus = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.createStatus(formData);
        dispatch({type: StatusActionTypes.CREATE_STATUS, payload:data.data});
        history.push('/status');
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = (id, formData, history) => async (dispatch) => {
    try {
        const {data} = await api.updateStatus(id, formData);
        dispatch({type: StatusActionTypes.UPDATE_STATUS, payload:data.data});
        history.push('/status');
    } catch (error) {
        console.log(error);
    }
}

export const deleteStatus = (id) => async (dispatch) => {
    try {
        await api.deleteStatus(id);
        dispatch({type: StatusActionTypes.DELETE_STATUS, payload: id});
    } catch (error) {
        console.log(error);
    }
}