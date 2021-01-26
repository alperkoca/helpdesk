import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../../actions/categories';
import { getPriorities } from '../../actions/priority';
import { getUsers } from '../../api/index';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextEditor from '../helpers/TextEditor';

const initialState = { mainCategoryId: "", category: "", summary: "", assignee: "", attachment: null, dueDate: Date.now(), priority: "", description: "" };


const CreateTicket = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [editorText, setEditorText] = useState("");

    const categories = useSelector((state) => state.category);
    const priorities = useSelector((state) => state.priority);

    const priorityOptions = priorities.map(x => ({ value: x._id, label: x.name, foreColor: x.color }));

    const priorityColorOptions = {

        option: (styles, { data }) => {
            return {
                ...styles,
                color: data.foreColor
            }
        },
        singleValue: (styles, { data }) => {
            return {
                ...styles,
                color: data.foreColor
            }
        }
    }

    useEffect(() => {
        if (categories && categories.length === 0)
            dispatch(getCategory());
        if (priorities && priorities.length === 0)
            dispatch(getPriorities());
    }, // eslint-disable-next-line
        []);

    const handleChange = (e) => {
        console.log(e);
        if (e.target.type === "file") {
            if(e.target.files.length > 0)
            {
                console.log(e.target.files[0]);
                setFormData({ ...formData, [e.target.name]: e.target.files[0] });
            }
            else setFormData({ ...formData, [e.target.name]: null });
        }
        else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleAssigneeChange = (e) => {
        setFormData({ ...formData, assignee: e.value });
    }

    const handlePriorityChange = (e) => {
        setFormData({ ...formData, assignee: e.value });
    }

    const loadOptions = (inputValue, callback) => {
        getUsers(1, 10, inputValue)
            .then(x => x.data)
            .then(data => data.data)
            .then(data => callback(data.map(x => ({ value: x._id, label: <div><img src="https://picsum.photos/30/30" className="img-circle" height="30px" width="30px" alt="profile" /> {`${x.firstLastName} <${x.email}>`} </div> }))))
    }

    const handleChangeEditor = () => {
        setFormData({ ...formData, description: editorText });
    }


    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">

                        <div className="form-group">
                            <label htmlFor="mainCategory">Main Category</label>
                            <select id="mainCategory" name="mainCategoryId" className="form-control" onChange={handleChange}>
                                <option></option>
                                {
                                    categories.filter(x => !x.mainCategory).map((c) => <option value={c._id} key={c._id}>{c.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" className="form-control" name="category" onChange={handleChange}>
                                <option></option>
                                {
                                    formData.mainCategoryId &&
                                    categories.find(x => x._id === formData.mainCategoryId)?.categories?.map((c) => <option value={c._id} key={c._id}>{c.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="summary">Summary</label>
                            <input type="text" className="form-control" id="summary" name="summary" placeholder="Summary" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assignee">Assignee</label>
                            <AsyncSelect cacheOptions loadOptions={loadOptions} name="assignee" defaultOptions onChange={handleAssigneeChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <input type="file" id="attachment" name="attachment" className="form-control" onChange={handleChange} ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <DatePicker className="form-control" selected={formData.dueDate} onChange={date => setFormData({ ...formData, dueDate: date })} dateFormat="dd.MM.yyyy" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <Select options={priorityOptions} styles={priorityColorOptions} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <TextEditor setEditorText={setEditorText} handleChangeEditor={handleChangeEditor} />
                        </div>
                        {
                            JSON.stringify(formData)
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}


export default CreateTicket;