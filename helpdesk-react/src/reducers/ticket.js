import {TicketActionTypes} from '../actions/actionTypes/ticketActionTypes';


const ticketReducer = (tickets = [], action) => {
    switch (action.type) {
        case TicketActionTypes.FETCH_TICKET:
            return action.payload;
        case TicketActionTypes.CREATE_TICKET:
            return [...tickets, action.payload];
        case TicketActionTypes.UPDATE_TICKET:
            return tickets.map(x => x._id === action.payload._id ? action.payload : x);
        case TicketActionTypes.DELETE_TICKET:
            return tickets.filter(x => x._id !== action.payload);
        default:
            return tickets;
    }
}





export default ticketReducer;