import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserTable } from './components/user-table';
import { fetchUsers } from './redux/slices/userSlice';

const CreateUserModal = lazy(() => 
  import("./components/create-user-modal").then(module => {
    return { default: module.CreateUserModal}
  })
)

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App container mt-5">
      <Row>
        <Col>
          <h2>User Management</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            Add User
          </Button>
        </Col>
      </Row>
      <UserTable users={users}/>

      {/* Modals */}
      <Suspense fallback={<div>Loading...</div>}>
        {show && (
          <CreateUserModal  handleClose={handleClose}/>
        )}
      </Suspense>
    </div>
  );
}

export default App;
