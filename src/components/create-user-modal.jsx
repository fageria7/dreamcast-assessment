import { Form, Button, Modal } from 'react-bootstrap';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

export const CreateUserModal = ({handleClose}) => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const zipcodeRef = useRef();

  const onSaveClicked = () => {
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: {
        city: cityRef.current.value,
        zipcode: zipcodeRef.current.value
      }
    }
    dispatch(addUser(newUser));
    handleClose();
  };

  return (
      <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-4">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              ref={nameRef}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              ref={emailRef}
              type="email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              ref={phoneRef}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              ref={cityRef}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="zipcode"
              ref={zipcodeRef}
              type="text"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={onSaveClicked}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}