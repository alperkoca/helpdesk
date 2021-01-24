import * as api from '../api/index';
import {CategoryActionTypes} from '../actions/actionTypes/categoryActionTypes';


export const getCategory = () => async (dispach) => {
    try{
        const { data } = await api.getMainCategories();
        dispach({type: CategoryActionTypes.FETCH, payload: data.data});
    }
    catch (error){
        console.log(error);
    }
}

export const createCategory = (formData, history) => async (dispach) => {
    try{
        const {data} = await api.createCategory(formData);
        dispach({type: CategoryActionTypes.CREATE_CATEGORY, payload: data});
        history.push('/category');
    }
    catch(error){
        console.log(error);
    }
}

export const updateCategory = (id, formData, history) => async (dispach) => {
    try{
        const {data} = await api.updateCategory(id, formData);
        dispach({type: CategoryActionTypes.UPDATE_CATEGORY, payload: data});
        history.push('/category');
    }
    catch(error){
        console.log(error);
    }
}

export const deleteCategory = (id, history) => async (dispach) => {
    try{
        await api.deleteCategory(id);
        dispach({type: CategoryActionTypes.DELETE_CATEGORY, payload: id});
    }
    catch(error)
    {
        console.log(error);
    }
}