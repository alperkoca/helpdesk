import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../actions/user';
import Paginate from '../helpers/Paginate';

const UserList = (props) => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const limit = 10;

    useEffect(() => {
        dispatch(getUsers(currentPage, limit, search));
    }, // eslint-disable-next-line
        [currentPage, search]);

    const usersR = useSelector(x => x.user);
    const users = usersR.users;
    const total = usersR.total;

    const searchHandle = (e) => {
        if (e.keyCode === 13)
            setSearch(searchText);

    }

    const searchChangeHandle = (e) =>{
        setSearchText(e.target.value);
    }

    const searchClickHandle = () => {
        setSearch(searchText);
    }


    return <>
        <div className="card">
            <div className="card-header">
                <div className="card-tools" >
                    <div className="row">
                        <div className="input-group" >
                            <input type="text" name="search" className="form-control float-right" placeholder="Search" onKeyDown={searchHandle} onChange={searchChangeHandle} />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-default" onClick={searchClickHandle}><i className="fas fa-search"></i></button>
                            </div>
                            <Link to="/users/add" className="btn btn-primary ml-3 mr-3"><i className="fas fa-plus"></i> New User</Link>
                        </div>


                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>E Mail</th>
                                <th>Blocked</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((s) => <tr key={s._id}>
                                    <td>{s.firstLastName}</td>
                                    <td>{s.email}</td>
                                    <td>
                                        {
                                            s.blocked ? <i className="far fa-check-circle" style={{ color: "red" }}></i> : <i className="far fa-circle"></i>
                                        }
                                    </td>
                                    <td>
                                        <Link to={`/users/edit/${s._id}`} className="btn btn-warning text-white ml-2 mb-2"><i className="far fa-edit"></i> Edit</Link>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-5">
                    </div>
                    <div className="col-sm-12 col-md-7">
                        <Paginate setCurrentPage={setCurrentPage} currentPage={currentPage} total={total} limit={limit} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserList;