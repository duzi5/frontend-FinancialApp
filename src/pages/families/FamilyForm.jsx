import { useState } from 'react';
import { useQuery } from 'react-query';
import { Form, Input, Button } from 'react-bootstrap';
import { api } from '../../api/axios';

const FamilyForm = () => {
  const [name, setName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: usersData, isLoading: usersLoading } = useQuery('users', fetchUsers);

  const createUser = async () => {
    const familyData = {
      name,
      members: selectedMembers,
    };

    try {
      const response = await api.post('/families/family', familyData);

      if (response.status === 201) {
        // Clear form fields
        setName('');
        setSelectedMembers([]);
      } else {
        console.error('Failed to create family');
      }
    } catch (error) {
      console.error('Failed to create family:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevMembers) => [...prevMembers, memberId]);
    setSearchQuery('');
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prevMembers) => prevMembers.filter((member) => member !== memberId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const filteredUsers = usersData?.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="familyName">
        <Form.Label>Family Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="members">
        <Form.Label>Members</Form.Label>
        <Form.Control
          as="select"
          multiple
          value={selectedMembers}
          onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, (option) => option.value))}
          size="5"
          custom
        >
          {filteredUsers?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </Form.Control>
        <Form.Control
          type="text"
          placeholder="Search members"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" disabled={usersLoading}>
        Add Family
      </Button>
    </Form>
  );
};

const fetchUsers = async () => {
  try {
    const response = await api.get('/users/all');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
};

export default FamilyForm;
