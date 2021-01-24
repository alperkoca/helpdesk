import { PriorityActionTypes } from '../actions/actionTypes/priorityActionType';

const priorityReducer = (priorities = [], action) => {
    switch (action.type) {
        case PriorityActionTypes.FETCH_PRIORITY:
            return sortPriority(action.payload);
        case PriorityActionTypes.CREATE_PRIORITY:
            return sortPriority([...priorities, action.payload]);
        case PriorityActionTypes.UPDATE_PRIORITY:
            return sortPriority(priorities.map(x => x._id === action.payload._id ? action.payload : x));
        default:
            return priorities;
    }
}

const sortPriority = (sender) => {
    return sender.sort((a, b) => (a.importance_factor < b.importance_factor) ? 1 : -1);
}

export default priorityReducer;