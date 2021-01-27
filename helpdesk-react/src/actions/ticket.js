import * as api from '../api/index'
import {TicketActionTypes} from './actionTypes/ticketActionTypes'



export const createTicket = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.createTicket(formData);
        dispatch({type: TicketActionTypes.CREATE_TICKET, payload:data.data});
        history.push('/tickets');
    } catch (error) {
        console.log(error);
    }
}

export const getTickets = () => async(dispatch) => {
    try{
        const {data} = await api.getTickets();
        dispatch({type: TicketActionTypes.FETCH_TICKET, payload:data.data});
    }
    catch(error)
    {
        console.log(error);
    }
}