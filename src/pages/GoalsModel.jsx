import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "react-query";
import { api } from "../api/axios";

const GoalsModal = () => {
  const [show, setShow] = useState(false);
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Not Started",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addGoal = async (goal) => {
    const { data } = await api.post("/goals", goal, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  };

  const mutation = useMutation(addGoal, {
    onSuccess: () => {
      handleClose();
    },
    onError: (error) => {
      console.error("Error adding goal:", error);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoal({ ...goal, [name]: value });
  };

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
              <Form.Label>Title</Form.Label>{" "}
              <Form.Control
                type="text"
                name="title"
                value={goal.title}
                onChange={handleChange}
                placeholder="Enter goal title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={goal.description}
                onChange={handleChange}
                placeholder="Enter goal description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={goal.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={goal.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={goal.status}
                onChange={handleChange}
              >
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
          <Button variant="success" onClick={() => mutation.mutate(goal)}>
            Save Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalsModal;
