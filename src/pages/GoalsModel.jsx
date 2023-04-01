import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const GoalsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <FaPlus /> Add Goal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>       <Form.Control type="text" placeholder="Enter goal title" />

</Form.Group>
<Form.Group>
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" rows={3} placeholder="Enter goal description" />
</Form.Group>
<Form.Group>
  <Form.Label>Due Date</Form.Label>
  <Form.Control type="date" />
</Form.Group>
<Form.Group>
  <Form.Label>Priority</Form.Label>
  <Form.Control as="select">
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Label>Status</Form.Label>
  <Form.Control as="select">
    <option>Not Started</option>
    <option>In Progress</option>
    <option>Completed</option>
  </Form.Control>
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
<Button variant="success" onClick={handleClose}>
Save Goal
</Button>
</Modal.Footer>
</Modal>
</>
);
};

export default GoalsModal;
             
