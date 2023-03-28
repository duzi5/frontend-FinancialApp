import React, { useState, useEffect } from 'react';

import { api } from '../api/axios';
import { Table, FormControl, Button } from 'react-bootstrap';

const EditableUserList= () => {
  const [users, setUsers] = useState([]);

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  

  
  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const handleSave = async (user) => {
    await api.put(`/api/users/${user._id}`, user);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Is Client</th>
          <th>Is Manager</th>
          <th>Is Admin</th>
          <th>Is Consultant</th>
          <th>Last Visit</th>
          <th>Avatar</th>
          <th>Moves</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>
              <FormControl
                type="text"
                name="name"
                value={user.name}
                onChange={(e) => handleInputChange(e, index)}
              />
            </td>
            <td>
              <FormControl
                type="text"
                name="email"
                value={user.email}
                onChange={(e) => handleInputChange(e, index)}
              />
            </td>
            <td>{user.is_client ? 'Yes' : 'No'}</td>
            <td>{user.is_manager ? 'Yes' : 'No'}</td>
            <td>{user.is_admin ? 'Yes' : 'No'}</td>
            <td>{user.is_consultor ? 'Yes' : 'No'}</td>
            <td>{user.lastVisit}</td>
            <td>
              {user.avatar ? (
                <img src={user.avatar} alt="User Avatar" width="50" height="50" />
              ) : (
                'No Avatar'
              )}
            </td>
            <td>{JSON.stringify(user.moves)}</td>
            <td>
              <Button variant="primary" onClick={() => handleSave(user)}>
                Save
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EditableUserList;
