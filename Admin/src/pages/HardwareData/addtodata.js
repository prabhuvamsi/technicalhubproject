import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AxiosAPI = axios.create();

const Addtodata = () => {
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    serialNumber: "",
    category: "",
    attributes: [{ attributeName: "", attributeValue: "" }]
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const productData = {
        id: formData.id,
        name: formData.name,
        serialNumber: formData.serialNumber,
        category: formData.category,
        attributes: formData.attributes.map(attr => ({
          name: attr.attributeName,
          value: attr.attributeValue
        }))
      };

      if (selectedOption) {
        // Perform corresponding action based on selected option
        if (selectedOption === '1.1') {
          await AxiosAPI.post('http://localhost:5000/api/postflootdata', productData);
        }if (selectedOption === '1.2') {
          await AxiosAPI.post('http://localhost:5000/api/Addfirstfloor', productData);
        }if (selectedOption === '2.1') {
          await AxiosAPI.post('http://localhost:5000/api/Addfirst', productData);
        }if (selectedOption === '2.2') {
          await AxiosAPI.post('http://localhost:5000/api/Addsecond', productData);
        }if (selectedOption === '3.1') {
          await AxiosAPI.post('http://localhost:5000/api/Addthird', productData);
        }if (selectedOption === '3.2') {
          await AxiosAPI.post('http://localhost:5000/api/Addforth', productData);
        }if (selectedOption === '4.1') {
          await AxiosAPI.post('http://localhost:5000/api/Addsixth', productData);
        }if (selectedOption === '4.2') {
          await AxiosAPI.post('http://localhost:5000/api/Addseventh', productData);
        }
      }
      
      // Reset form data after successful submission
      setFormData({
        id: "",
        name: "",
        serialNumber: "",
        category: "",
        attributes: [{ attributeName: "", attributeValue: "" }]
      });
      setSelectedOption(null);
      console.log("Form submitted successfully");
      window.history.goBack();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const newAttributes = [...formData.attributes];
    newAttributes[index] = { ...newAttributes[index], [name]: value };
    setFormData(prevState => ({
      ...prevState,
      attributes: newAttributes
    }));
  };

  const addAttribute = () => {
    setFormData(prevState => ({
      ...prevState,
      attributes: [...prevState.attributes, { attributeName: "", attributeValue: "" }]
    }));
  };
  const history = useHistory();

  const handleCancel = () => {
    history.goBack(); // Navigate back using React Router's history
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Product Form</CardTitle>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Label for="productId" className="col-md-2 col-form-label">
                        <strong>Product ID</strong>
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          className="form-control"
                          id="id"
                          name="id"
                          value={formData.id}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label for="name" className="col-md-2 col-form-label">
                        <strong>Name</strong>
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label for="serialNumber" className="col-md-2 col-form-label">
                        <strong>Serial Number</strong>
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          className="form-control"
                          id="serialNumber"
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label for="category" className="col-md-2 col-form-label">
                        <strong>Category</strong>
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          className="form-control"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label for="floorDropdown" className="col-md-2 col-form-label">
                        <strong>Floor</strong>
                      </Label>
                      <Col md={10}>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                          <DropdownToggle caret>
                            {selectedOption || 'Select Floor'}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => setSelectedOption('1.1')}>1.1</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('1.2')}>1.2</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('2.1')}>2.1</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('2.2')}>2.2</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('3.1')}>3.1</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('3.2')}>3.2</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('4.1')}>4.1</DropdownItem>
                            <DropdownItem onClick={() => setSelectedOption('4.2')}>4.2</DropdownItem>
                            {/* Add other options as needed */}
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row>
                    {formData.attributes.map((attr, index) => (
                      <Row className="mb-3" key={index}>
                        <Label for={`attributeName${index}`} className="col-md-2 col-form-label">
                          <strong>Type</strong>
                        </Label>
                        <Col md={4}>
                          <Input
                            type="text"
                            className="form-control"
                            id={`attributeName${index}`}
                            name="attributeName"
                            value={attr.attributeName}
                            onChange={(e) => handleAttributeChange(e, index)}
                          />
                        </Col>
                        <Label for={`attributeValue${index}`} className="col-md-2 col-form-label">
                          <strong>Value</strong>
                        </Label>
                        <Col md={4}>
                          <Input
                            type="text"
                            className="form-control"
                            id={`attributeValue${index}`}
                            name="attributeValue"
                            value={attr.attributeValue}
                            onChange={(e) => handleAttributeChange(e, index)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button type="button" color="primary"  onClick={addAttribute}>
                      Add Types
                    </Button>
                    <Button type="submit" style={{marginLeft:"10px"}} color="primary">
                      Submit
                    </Button>
                    <Button type="button" style={{marginLeft:"10px"}} color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Addtodata;
