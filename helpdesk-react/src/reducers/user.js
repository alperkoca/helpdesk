import { UserActionTypes } from '../actions/actionTypes/userActionTypes';


const userReducer = (users = { users: [], total: 0 }, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return action.payload;
        case UserActionTypes.FETCH_USER:
            var usr = users.users.find(x => x._id === action.payload._id);
            if (usr) {
                users.users = users.users.map(x => x._id === action.payload._id ? action.payload : x);
            }
            else {
                users.users.push(action.payload);
                users.total += 1;
            }
            return users;
        case UserActionTypes.CREATE_USER:
            users.users.push(action.payload);
            users.total += 1;
            return users;
        case UserActionTypes.UPDATE_USER:
            users.users = users.users.map(x => x._id === action.payload._id ? action.payload : x);
            return users;
        default:
            return users;
    }
}


export default userReducer;