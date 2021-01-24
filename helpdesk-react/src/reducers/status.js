import {StatusActionTypes} from '../actions/actionTypes/statusActionTypes';


const statusReducer = (statuses = [], action) => {
    switch (action.type) {
        case StatusActionTypes.FETCH_STATUS:
            return sortStatus(action.payload);
        case StatusActionTypes.CREATE_STATUS:
            return sortStatus([...statuses, action.payload]);
        case StatusActionTypes.UPDATE_STATUS:
            return sortStatus(statuses.map(x => x._id === action.payload._id ? action.payload : x));
        case StatusActionTypes.DELETE_STATUS:
            return statuses.filter(x => x._id !== action.payload);
        default:
            return statuses;
    }
}

const sortStatus = (sender) => {
    return sender.sort((a, b) => (a.name > b.name) ? 1 : -1);
}



export default statusReducer;