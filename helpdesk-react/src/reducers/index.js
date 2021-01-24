import { combineReducers } from 'redux';
import category from './category';
import auth from './auth'
import status from './status'
import priority from './priority';
import user from './user';
import userRoles from './userrole';


export default combineReducers({
    category,
    auth,
    status,
    priority,
    user,
    userRoles
});