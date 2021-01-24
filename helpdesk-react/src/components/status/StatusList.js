import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStatuses } from '../../actions/statuses';

const StatusList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatuses());
    }, // eslint-disable-next-line
        []);

    const statuses = useSelector(x => x.status);

    return <>
        <div className="card">
            <div className="card-header">
                <div className="card-tools">
                    <Link to="/status/add" className="btn btn-primary">
                        <i className="fas fa-plus"></i>
                    New Status
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Status Name</th>
                            <th>Close Ticket</th>
                            <th>Blocked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statuses.map((s) => <tr key={s._id}>
                                <td><span style={{ color: s.color }}>{s.name}</span></td>
                                <td>
                                    {
                                        s.isClosesTicket ? <i className="far fa-check-circle" style={{ color: "#00ff00" }}></i> : <i className="far fa-circle"></i>
                                    }
                                </td>
                                <td>
                                    {
                                        s.blocked ? <i className="far fa-check-circle" style={{ color: "red" }}></i> : <i className="far fa-circle"></i>
                                    }
                                </td>
                                <td>
                                    {
                                     !s.isSystemStatus && <Link to={`/status/edit/${s._id}`} className="btn btn-warning text-white ml-2 mb-2"><i className="far fa-edit"></i> Edit</Link> 
                                    }
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    </>
}

export default StatusList;