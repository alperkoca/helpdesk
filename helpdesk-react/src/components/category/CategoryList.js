import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, deleteCategory } from '../../actions/categories';
import { Modal, Button } from 'react-bootstrap';

const CategoryList = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [modalc, setmodalc] = useState(null);


  useEffect(() => {
    dispatch(getCategory());
  },
    // eslint-disable-next-line
    [])

  const categories = useSelector(x => x.category);

  const handleDelete = (category) => {
    setDeleteModalShow((prev) => !prev);
    setmodalc(category);
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteCategory(modalc._id, history))
    .then(() => handleDelete(null));
    
  }

  return <>
    <div className="card">
      <div className="card-header">
        <div className="card-tools">
          <Link to="/category/add" className="btn btn-primary">
            <i className="fas fa-plus"></i>
                    New Category
                    </Link>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Main Category</th>
              <th>Blocked</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(x => (
                <tr key={x._id}>
                  <td>{x.name}</td>
                  <td>{x.mainCategory?.name}</td>
                  <td>
                    {
                      x.blocked ? <i className="far fa-check-circle" style={{ color: "red" }}></i> : <i className="far fa-circle"></i>
                    }
                  </td>
                  <td className="mx-auto">
                    <Link to={`/category/edit/${x._id}`} className="btn btn-warning text-white ml-2 mb-2"><i className="far fa-edit"></i> Edit</Link>
                    <Button onClick={() => handleDelete(x)} className="btn btn-danger ml-2 mb-2"> <i className="fas fa-ban"></i> Delete</Button>

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
    <Modal show={deleteModalShow}>
      <Modal.Header>Delete Warnings</Modal.Header>
      <Modal.Body>
        Dou you want to delete `{modalc?.name}` category?<br />
        <span className="text-danger font-weight-bold">If you delete this category, it will be deleted tickets which linked to this category?</span>

      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" onClick={handleDeleteConfirm}>Confirm</Button>
        <Button className="btn-success" onClick={handleDelete}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  </>
}


export default CategoryList;