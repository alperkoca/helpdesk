import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, getUser, updateUser } from '../../actions/user';
import { getUserRoles } from '../../actions/userRoles';


const initialState = { isSetted: false, firstLastName: "", email: "", password: "", passwordConfirm: "", roles: [], blocked: false };

const UserAdd = (props) => {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const id = props?.match?.params?.id;
    const [selectedTab, setSelectedTab] = useState("general");

    useEffect(() => {
        if (userRoles.length === 0)
            dispatch(getUserRoles());
    }, // eslint-disable-next-line
        []);

    useEffect(() => {
        if (!users.users.find(x => x._id === id)) {
            dispatch(getUser(id))
                .then(() => setUser());
        }
        else
            setUser();
    }, // eslint-disable-next-line
        []);

    const setUser = () => {
        const user = users.users.find(x => x._id === id);
        if (user) {
            setFormData({ isSetted: true, firstLastName: user.firstLastName, email: user.email, password: user.password, passwordConfirm: user.password, roles: user.roles, blocked: user.blocked });
        }
        else {

        }
    }

    const users = useSelector((state) => state.user);
    const userRoles = useSelector((state) => state.userRoles);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateUser(id, formData, history));
        }
        else {
            dispatch(createUser(formData, history));
        }
    }

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        }
        else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }
    const handleRoles = (e) => {
        if (e.target.checked) {
            formData.roles.push(e.target.value);
            setFormData({ ...formData });
        }
        else {
            setFormData({ ...formData, roles: formData.roles.filter(x => x !== e.target.value) });
        }
    }
    return (
        <div className="card card-primary card-outline card-outline-tabs">
            <form onSubmit={handleSubmit} >
                <div className="card-header p-0 border-bottom-0">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <button type="button" className={`nav-link ${selectedTab === "general" ? "active" : ""}`} onClick={() => setSelectedTab("general")}>General</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className={`nav-link ${selectedTab === "userroles" ? "active" : ""}`} onClick={() => setSelectedTab("userroles")}>User Roles</button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {
                        selectedTab === "general" && <>
                            <div className="form-group row">
                                <label htmlFor="firstLastName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="firstLastName" placeholder="Full Name" name="firstLastName" required onChange={handleChange} value={formData?.firstLastName} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">E Mail</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" required disabled={id} placeholder="E Mail" name="email" onChange={handleChange} value={formData?.email} />
                                </div>
                            </div>
                            {
                               !id && <>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="password" required placeholder="Password" name="password" onChange={handleChange} value={formData?.password} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="passwordConfirm" className="col-sm-2 col-form-label">Password Confirm</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="passwordConfirm" required placeholder="Password Confirm" name="passwordConfirm" onChange={handleChange} value={formData?.passwordConfirm} />
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="form-group row">
                                <div className="col-sm-2">

                                </div>

                                <div className="form-check col-sm-10">
                                    <input className="form-check-input mr-2" type="checkbox" id="blocked" name="blocked" onChange={handleChange} checked={formData?.blocked} />
                                    <label className="form-check-label" htmlFor="blocked" >Blocked</label>
                                </div>
                            </div>
                        </>
                    }
                    {
                        selectedTab === "userroles" && <>
                            <div className="form-group">
                                {
                                    userRoles.map(x => <div className="form-check" key={x._id}>
                                        <input className="form-check-input" id={x._id} type="checkbox" onChange={handleRoles} value={x.name} checked={formData.roles.includes(x.name)} />
                                        <label className="form-check-label" htmlFor={x._id}>{x.description}</label>
                                    </div>
                                    )

                                }
                            </div>
                        </>
                    }
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary float-right" > {id ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}

export default UserAdd
