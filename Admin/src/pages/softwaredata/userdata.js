import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

const AxiosAPI = axios.create();

const Userdata = () => {
  const [userData, setUserData] = useState([]);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/getuserdata")
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching userdata:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    AxiosAPI.delete(`http://localhost:5000/api/deleteuser/${userId}`)
      .then((res) => {
        console.log(res.data);
        alert("User deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("An error occurred while deleting the user:", error);
      });
  };

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleSave = () => {
    // Send edited user data to backend for saving
    AxiosAPI.put(`http://localhost:5000/api/updateuser/${editedUser._id}`, editedUser)
      .then((res) => {
        console.log(res.data);
        alert("User updated successfully");
        // Clear edited user state and reload data
        setEditedUser({});
        window.location.reload();
      })
      .catch((error) => {
        console.error("An error occurred while updating the user:", error);
      });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditedUser(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role</th>
                        <th>UserId</th>
                        <th>Password</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.role}</td>
                          <td>
                            {editedUser._id === user._id ?
                              <input
                                type="text"
                                value={editedUser.userId || ''}
                                onChange={(e) => handleInputChange(e, 'userId')}
                              />
                              :
                              user.userId
                            }
                          </td>
                          <td>
                            {editedUser._id === user._id ?
                              <input
                                type="password"
                                value={editedUser.password || ''}
                                onChange={(e) => handleInputChange(e, 'password')}
                              />
                              :
                              user.password
                            }
                          </td>
                          <td>
                            {editedUser._id === user._id ?
                              <React.Fragment>
                                
                                <Button variant="outline-success" onClick={handleSave}>Save</Button>{' '}
                                <Button variant="outline-warning" onClick={() => setEditedUser({})}>Cancel</Button>
                              </React.Fragment>
                              :
                              
                              <Button variant="outline-primary" onClick={() => handleEdit(user)}>Edit</Button>
                            }
                            {' '}
                            <Button variant="outline-danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Userdata;
