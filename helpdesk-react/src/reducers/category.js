import { CategoryActionTypes } from "../actions/actionTypes/categoryActionTypes";


const categoryReducer = (categories = [], action) => {
    switch (action.type) {
        case CategoryActionTypes.FETCH:
            return sortCategory(action.payload);
        case CategoryActionTypes.CREATE_CATEGORY:
            return sortCategory([...categories, action.payload]);
        case CategoryActionTypes.UPDATE_CATEGORY:
            return sortCategory(categories.map((c) => c._id === action.payload._id ? action.payload : c));
        case CategoryActionTypes.DELETE_CATEGORY:
            return categories.filter((c) => c._id !== action.payload);
        default:
            return categories;
    }
}

const sortCategory = (sender) => {
    return sender.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

export default categoryReducer;