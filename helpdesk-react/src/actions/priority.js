import * as api from '../api/index'
import { PriorityActionTypes } from './actionTypes/priorityActionType';


export const getPriorities = () => async (dispatch) => {
    try {
        const {data} = await api.getPriorities();
        dispatch({ type: PriorityActionTypes.FETCH_PRIORITY, payload: data.data });
    }
    catch (error) {
        console.log(error);
    }
}

export const createPriorities = (formdata, history) => async (dispatch) => {
    try {
        const {data} = await api.createPriority(formdata);
        dispatch({ type: PriorityActionTypes.CREATE_PRIORITY, payload: data.data });
        history.push("/priority");
    }
    catch (error) {
        console.log(error);
    }
}

export const updatePriorities = (id, formdata, history) => async (dispatch) => {
    try {
        const {data} = await api.updatePriority(id, formdata);
        dispatch({ type: PriorityActionTypes.UPDATE_PRIORITY, payload: data.data });
        history.push("/priority");
    }
    catch (error) {
        console.log(error);
    }
}