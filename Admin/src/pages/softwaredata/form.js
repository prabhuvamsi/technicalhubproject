import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
const axiosAPI = axios.create()
// http://localhost:5000/api/addlogin


function MyForm() {
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      role: role,
      userId: event.target.formUserId.value,
      password: event.target.formPassword.value
    };

    try {
      const response = await axiosAPI.post('http://localhost:5000/api/adduser', formData);
      console.log('Form submitted successfully!', response.data);
      window.location.reload()
      // Reset the form fields if needed
      event.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" value={role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formUserId">
        <Form.Label>User ID</Form.Label>
        <Form.Control type="text" name="formUserId" placeholder="Enter user ID" />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="formPassword" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formButtons">
      <Button variant="outline-success" type="submit" style={{ marginTop: "10px" }}>
        Submit</Button>{' '}
        
        
      </Form.Group>
    </Form>
  );
}

export default MyForm;
