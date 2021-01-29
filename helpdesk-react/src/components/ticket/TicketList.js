import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../actions/ticket';
import {Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const TicketList = () => {

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTickets());
  }, // eslint-disable-next-line
    [])

    const handleRowClick = (id) => {
      history.push("/tickets/" + id);
    }

  return <div className="card">
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th>Ticket<br />Number</th>
              <th>Create Date</th>
              <th style={{ minWidth: "230px" }}>Category</th>
              <th style={{ minWidth: "130px" }}>Creator</th>
              <th style={{ minWidth: "500px" }}>Summary</th>
              <th>Status</th>
              <th style={{ minWidth: "130px" }}>Assignee</th>
              <th>Replies</th>
              <th style={{ minWidth: "130px" }}>Last Replier</th>
              <th>Last Reply Date</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {
              tickets.map(ticket =>
                <tr key={ticket._id}>
                  <td>{ticket.ticketNumber}</td>
                  <td>{moment(ticket.createdAt).format("DD.MM.yyyy")}</td>
                  <td>{`${ticket.category.mainCategory.name} -> ${ticket.category.name}`}</td>
                  <td>{ticket.createdUser.firstLastName}</td>
                  <td><Link to={`/ticketdetail/${ticket._id}`}>{ticket.summary}</Link> </td>
                  <td><span style={{ color: ticket.status.color }}>{ticket.status.name}</span></td>
                  <td>{ticket.assignee.firstLastName}</td>
                  <td>Replies</td>
                  <td>Last Replier</td>
                  <td>Last Activity Date</td>
                  <td><span style={{ color: ticket.priority.color }}>{ticket.priority.name}</span></td>
                  <td><span style={{ color: moment().isAfter(ticket.dueDate) ? "red" : "" }}> {moment(ticket.dueDate).format("DD.MM.yyyy")}</span></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
}


export default TicketList;