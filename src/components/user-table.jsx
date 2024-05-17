import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, editUser } from '../redux/slices/userSlice';

export const UserTable = ({users}) => {
    const dispatch = useDispatch();
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', phone: '', address: { city: '', zipcode: '' } });

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };
    
    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setEditFormData(user);
    };
    
    const handleSaveEdit = () => {
        dispatch(editUser(editFormData));
        setEditUserId(null);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'city' || name === 'zipcode') {
            setEditFormData({ ...editFormData, address: { ...editFormData.address, [name]: value } });
        } else {
            setEditFormData({ ...editFormData, [name]: value });
        }
    };

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City with Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {
                  editUserId === user.id ?
                  <Form.Control type="text" name="name" value={editFormData.name} onChange={handleChange} /> :
                  user.name
                }
              </td>
              <td>
                {
                  editUserId === user.id ?
                  <Form.Control type="email" name="email" value={editFormData.email} onChange={handleChange} /> :
                  user.email
                }
              </td>
              <td>
                {
                  editUserId === user.id ?
                  <Form.Control type="text" name="phone" value={editFormData.phone} onChange={handleChange} /> :
                  user.phone
                }
              </td>
              <td>
                {
                  editUserId === user.id ?
                  <>
                    <Form.Control type="text" name="city" value={editFormData.address.city} onChange={handleChange} />
                    <Form.Control type="text" name="zipcode" value={editFormData.address.zipcode} onChange={handleChange} />
                  </> :
                  `${user.address.city}, ${user.address.zipcode}`
                }
              </td>
              <td>
                <Row>
                {
                  editUserId === user.id ?
                  <>
                    <Col md="auto">
                      <Button variant="success" onClick={handleSaveEdit}>Save</Button>
                    </Col>
                    <Col md="auto">
                      <Button variant="secondary" onClick={() => setEditUserId(null)}>Cancel</Button>
                    </Col>
                  </> :
                  <>
                    <Col md="auto">
                      <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
                    </Col>
                    <Col md="auto">
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    </Col>
                  </>
                }
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
}