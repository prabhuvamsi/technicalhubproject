// SwitchModel.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Switch.css';
// import { Row } from 'reactstrap';
import { Row, Col, Button } from "reactstrap";


const AxiosAPI = axios.create();

const SwitchModel = () => {
  const [permissions, setPermissions] = useState({
    add: false,
    edit: false,
    delete: false
  });

    useEffect(() => {
      // Fetch initial permissions from the backend when component mounts
      fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
      try {
        const response = await AxiosAPI.get('http://localhost:5000/api/getpermission');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

  const handleSwitchChange = async (permission) => {
    const newState = !permissions[permission];
    console.log("Switch toggled for permission:", permission, "to state:", newState);
    setPermissions(prevState => ({
      ...prevState,
      [permission]: newState
    }));
    await updatePermission(permission, newState); // Call the function to update the permission state on the backend
  };

  const updatePermission = async (permission, newState) => {
    try {
      await AxiosAPI.put(`http://localhost:5000/api/addstudent/${permission}`, { newState });
      // Handle success
    } catch (error) {
      console.error('Error updating permission:', error);
      // Handle error
    }
  };

  return (
    <div className="toggle-switch-container">
      <div className="toggle-switch"><Row>
            <Col md="4"><label className="switch">
          <input
            type="checkbox"
            checked={permissions.add}
            onChange={() => handleSwitchChange('add')}
          />
          <span className="slider"></span>
        </label></Col>
        <Col md="4"><label className="switch">
          <input
            type="checkbox"
            checked={permissions.edit}
            onChange={() => handleSwitchChange('edit')}
          />
          <span className="slider"></span>
          
        </label></Col>
        <Col md="4"><label className="switch">
          <input
            type="checkbox"
            checked={permissions.delete}
            onChange={() => handleSwitchChange('delete')}
          />
          <span className="slider"></span>
        </label></Col>
          </Row>
          <Row>
        
            <Col md="4"> <p>Add Permission</p></Col>
            <Col md="4"><p>Edit permission</p></Col>
            <Col md="4"><p>Delete permission</p></Col>


          </Row>
       
       

      </div>
      </div>
  );
};

export default SwitchModel;
