import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateStatus, createStatus, getStatuses } from '../../actions/statuses';


const initialState = { isSetted: false, name: "", color: "#000", blocked: false, isClosesTicket: false };

const StatusAdd = (props) => {

    const [formData, setFormData] = useState(initialState);
    const [color, setColor] = useState(formData.color);
    const dispatch = useDispatch();
    const history = useHistory();
    const id = props?.match?.params?.id;

    useEffect(() => {
        dispatch(getStatuses())
    }, // eslint-disable-next-line
        []);

    const statuses = useSelector((state) => state.status);

    if (id && !formData.isSetted) {
        const status = statuses.find(x => x._id === id);
        if (status){
            setFormData({ isSetted: true, name: status.name, color: status.color, blocked: status.blocked, isClosesTicket: status.isClosesTicket });
            setColor(status.color);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateStatus(id, formData, history));
        }
        else {
            dispatch(createStatus(formData, history));
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

    const handleSketchPickerChange = (color, event) => {
        setColor(color);
    }

    const handleSketchPickerChangeComplate = () => {
        setFormData({ ...formData, color: color.hex });
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" placeholder="Name" name="name" onChange={handleChange} value={formData?.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="color" className="col-sm-2 col-form-label">Color</label>
                        <div className="col-sm-10">
                            <SketchPicker color={color} onChange={handleSketchPickerChange} onChangeComplete={handleSketchPickerChangeComplate} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">

                        </div>

                        <div className="form-check col-sm-10">
                            <input className="form-check-input mr-2" type="checkbox" id="isClosesTicket" name="isClosesTicket" onChange={handleChange} checked={formData?.isClosesTicket} />
                            <label className="form-check-label" htmlFor="isClosesTicket" >Close Ticket</label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">

                        </div>

                        <div className="form-check col-sm-10">
                            <input className="form-check-input mr-2" type="checkbox" id="blocked" name="blocked" onChange={handleChange} checked={formData?.blocked} />
                            <label className="form-check-label" htmlFor="blocked" >Blocked</label>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary float-right" > {id ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}

export default StatusAdd
