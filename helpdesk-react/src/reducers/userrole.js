import {UserRoleActionTypes} from '../actions/actionTypes/userRoleActionTypes';


const userRoleReducer = (userRoles = [], action) => {
    switch (action.type) {
        case UserRoleActionTypes.FETCH_USER_ROLES:
            return action.payload;
        default:
            return userRoles;
    }
}


export default userRoleReducer;
