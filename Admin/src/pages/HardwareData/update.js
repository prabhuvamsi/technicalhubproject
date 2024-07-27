// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button
} from "reactstrap";

// Axios instance
const AxiosAPI = axios.create();

// Component
const Updateform = ({onCancel , productId }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    serialNumber: "",
    category: "",
    attributes: [{ name: "", value: "" }]
  });

  // Fetch product data on component mount if productId exists
  useEffect(() => {
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

  // Fetch product data from backend
  const fetchProductData = async (productId) => {
    try {
      const response = await AxiosAPI.get(`http://localhost:5000/api/getfirstfloor/${productId}`);
      const productData = response.data.softdata; // assuming data is nested under 'softdata' key
      setFormData({
        id: productData.id || "",
        name: productData.name || "",
        serialNumber: productData.serialNumber || "",
        category: productData.category || "",
        attributes: productData.attributes.map(attr => ({
          name: attr.name || "",
          value: attr.value || ""
        }))
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        id: formData.id,
        name: formData.name,
        serialNumber: formData.serialNumber,
        category: formData.category,
        attributes: formData.attributes
      };

      // Determine whether to add or update product based on productId
      if (productId) {
        await AxiosAPI.put(`http://localhost:5000/api/updateproduct/${productId}`, productData);
      } else {
        await AxiosAPI.post('http://localhost:5000/api/addproduct', productData);
      }

      // Reset form data
      setFormData({
        id: "",
        name: "",
        serialNumber: "",
        category: "",
        attributes: [{ name: "", value: "" }]
      });
      console.log("Form submitted successfully");
      window.history.goBack(); // Navigate back to previous page
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle input change for attributes
  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const newAttributes = [...formData.attributes];
    newAttributes[index] = { ...newAttributes[index], [name]: value };
    setFormData(prevState => ({
      ...prevState,
      attributes: newAttributes
    }));
  };

  // Add new attribute
  const addAttribute = () => {
    setFormData(prevState => ({
      ...prevState,
      attributes: [...prevState.attributes, { name: "", value: "" }]
    }));
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{productId ? "Update Product" : "Add Product"}</CardTitle>
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
                            name="name"
                            value={attr.name}
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
                            name="value"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(e, index)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button type="button" color="primary" onClick={addAttribute}>
                      Add Type
                    </Button>
                    <Button type="submit" style={{marginLeft:"10px"}} color="primary">
                      {productId ? "Update" : "Submit"}
                    </Button>
                    <Button type="button" style={{marginLeft:"10px"}} color="secondary" onClick={onCancel}>
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

export default Updateform;
