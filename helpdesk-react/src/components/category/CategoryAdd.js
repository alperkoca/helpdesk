import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategory, createCategory, updateCategory } from '../../actions/categories';


const initialState = { isSetted: false, name: "", blocked: false, mainCategory: "" }

const CategoryAdd = (props) => {

    const id = props?.match?.params?.id

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCategory());

    },// eslint-disable-next-line
     []);

    const categories = useSelector((state) => state.category);

    if (id && !formData.isSetted) {
        const editcategory = categories.find(c => c._id === id);
        if (editcategory)
            setFormData({ isSetted: true, name: editcategory.name, blocked: editcategory.blocked, mainCategory: editcategory.mainCategory?._id });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id){
            dispatch(createCategory(formData, history));
        }
        else{
            dispatch(updateCategory(id, formData, history));
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
                        <label htmlFor="mainCategory" className="col-sm-2 col-form-label">Main Category</label>
                        <div className="col-sm-10">
                            <select className="form-control" id="mainCategory" name="mainCategory" onChange={handleChange} value={formData?.mainCategory} >
                                <option value=""></option>
                                {
                                    categories.map(x => !x.mainCategory && <option value={x._id} key={x._id}>{x.name}</option>)
                                }
                            </select>
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


export default CategoryAdd;