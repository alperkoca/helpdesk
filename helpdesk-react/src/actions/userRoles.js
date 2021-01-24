import * as api from '../api/index'
import { UserRoleActionTypes } from '../actions/actionTypes/userRoleActionTypes'


export const getUserRoles = (page, limit, search) => async (dispatch) => {
    const { data } = await api.getUserRoles();
    dispatch({ type: UserRoleActionTypes.FETCH_USER_ROLES, payload: data.data });
}