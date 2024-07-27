import React, { useState } from "react";
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Breadcrumbs from "../../components/Common/Breadcrumb"
const AxiosAPI = axios.create();


const Softwareaddform = () => {
  const [formData, setFormData] = useState({
    id: "",
    softwareName: "",
    alias: "",
    version: "",
    serialNumber: "",
    purchaseDate: "",
    expirationDate: "",
    licenseType: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend API
      await AxiosAPI.post('http://localhost:5000/api/addform', formData);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Add software data" breadcrumbItem="softwareData" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle>Software License Form</CardTitle>
                

                <AvForm onSubmit={handleSubmit}>
                  <AvField
                    className="mb-3"
                    name="id"
                    label="Technicalhub ID"
                    placeholder="EnterTechnicalhub ID"
                    type="number"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                  <AvField
                    className="mb-3"
                    name="softwareName"
                    label="Software Name"
                    placeholder="Enter Software Name"
                    type="text"
                    value={formData.softwareName}
                    onChange={handleChange}
                    required
                  />
                  <AvField
                  className="mb-3"
                  name="alias"
                  label="User"
                  placeholder="Enter User Name"
                  type="text"
                  value={formData.alias}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="version"
                  label="Version"
                  placeholder="Enter Version"
                  type="text"
                  value={formData.version}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="serialNumber"
                  label="Serial Number"
                  placeholder="Enter Serial Number"
                  type="text"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="purchaseDate"
                  label="Purchase Date"
                  placeholder="Enter Purchase Date"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="expirationDate"
                  label="Expiration Date"
                  placeholder="Enter Expiration Date"
                  type="date"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="licenseType"
                  label="License Type"
                  placeholder="Enter License Type"
                  type="text"
                  value={formData.licenseType}
                  onChange={handleChange}
                  required
                />
                <AvField
                  className="mb-3"
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                  
                  <FormGroup className="mb-0">
                    <div>
                      <Button type="submit" color="primary" className="ms-1">
                        Submit
                      </Button>{" "}
                     
                    </div>
                  </FormGroup>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Softwareaddform;
