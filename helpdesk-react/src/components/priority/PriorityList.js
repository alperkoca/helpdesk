import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPriorities } from '../../actions/priority';

const PriorityList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPriorities());
    }, // eslint-disable-next-line
        []);

    const priorities = useSelector(x => x.priority);

    return <>
        <div className="card">
            <div className="card-header">
                <div className="card-tools">
                    <Link to="/priority/add" className="btn btn-primary">
                        <i className="fas fa-plus"></i>
                    New Priority
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Priority Name</th>
                            <th>Importance Factor</th>
                            <th>Blocked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            priorities.map((s) => <tr key={s._id}>
                                <td><span style={{ color: s.color }}>{s.name}</span></td>
                                <td>{s.importance_factor}</td>
                                <td>
                                    {
                                        s.blocked ? <i className="far fa-check-circle" style={{ color: "red" }}></i> : <i className="far fa-circle"></i>
                                    }
                                </td>
                                <td>
                                    <Link to={`/priority/edit/${s._id}`} className="btn btn-warning text-white ml-2 mb-2"><i className="far fa-edit"></i> Edit</Link>
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

export default PriorityList;