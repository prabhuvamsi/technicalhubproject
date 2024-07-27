import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import axios from "axios";
import * as XLSX from 'xlsx';
import Button from 'react-bootstrap/Button';
import Addtodata from "./addtodata";

const AxiosAPI = axios.create();

const FirstFloor = () => {
  const [products, setProducts] = useState([]);
  const [showAddPage, setShowAddPage] = useState(false);
  const [permissions, setPermissions] = useState({
    add: false,
    edit: false,
    delete: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchPermissions();
    fetchData();
  }, []);

  const fetchPermissions = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get('role') || '';

      let response;

      if (role === 'admin') {
        setPermissions({ add: true, edit: true, delete: true });
      } else {
        response = await AxiosAPI.get('http://localhost:5000/api/getpermission');
        setPermissions(response.data);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getforth");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProducts(data);  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (productId) => {
    if (!(permissions && permissions.delete)) {
      alert("You do not have permission to delete products.");
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
  
    if (isConfirmed) {
      AxiosAPI.delete(`http://localhost:5000/api/hard1/${productId}`)
        .then((res) => {
          console.log(res.data);
          alert("Product deleted successfully");
          fetchData();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("An error occurred while deleting the product");
        });
    }
  };

  const handleDownloadExcel = () => {
    if (products.length === 0) {
      alert("No data to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = products.filter((product) =>
      `${product.name} ${product.id} ${product.serialNumber}`.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  

  const handleEdit = (product) => {
    if (permissions && permissions.edit) {
      setEditingProduct(product);
  
    } else {
      alert("You do not have permission to edit products.");
    }
  };
  

  const handleSave = async () => {
    try {
      // Add editDate to the editingProduct object
      const updatedProductData = {
        ...editingProduct,
        editDate: new Date() // Set the editDate to the current date/time
      };
  
      const response = await AxiosAPI.put(`http://localhost:5000/api/thubs/${editingProduct._id}`, updatedProductData);
      console.log(response.data);
      alert("Changes saved successfully");
      setEditingProduct(null);
      fetchData(); // Fetch updated data after saving
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes");
    }
  };
  

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleInputChange = (event, columnName) => {
    setEditingProduct({
      ...editingProduct,
      [columnName]: event.target.value
    });
  };
  const handleAttributeChange = (event, index, field) => {
    const updatedAttributes = [...editingProduct.attributes];
    updatedAttributes[index][field] = event.target.value;
    setEditingProduct({
      ...editingProduct,
      attributes: updatedAttributes
    });
  };
  

  const renderProducts = () => {
    const productsToRender = searchQuery ? filteredProducts : products;
    return productsToRender.map((product, index) => (
      <tr  key={index}>
              <td>
          {editingProduct && editingProduct._id === product._id ? (
            <input
              type="text"
              value={editingProduct.id}
              onChange={(event) => handleInputChange(event, 'id')}
              style={{width:"100px"}}

            />
          ) : (
            product.id
          )}
        </td>
        
        <td>
          {editingProduct && editingProduct._id === product._id ? (
            <input
              type="text"
              value={editingProduct.name}
              onChange={(event) => handleInputChange(event, 'name')}
              style={{width:"100px"}}

            />
          ) : (
            product.name
          )}
        </td>
        <td>
          {editingProduct && editingProduct._id === product._id ? (
            <input
              type="text"
              value={editingProduct.serialNumber}
              onChange={(event) => handleInputChange(event, 'serialNumber')}
              style={{width:"100px"}}

            />
          ) : (
            product.serialNumber
          )}
        </td>
        <td>
          {editingProduct && editingProduct._id === product._id ? (
            <input
              type="text"
              value={editingProduct.category}
              onChange={(event) => handleInputChange(event, 'category')}
              style={{width:"100px"}}

            />
          ) : (
            product.category
          )}
        </td>
        <td>
  {editingProduct && editingProduct._id === product._id ? (
    <div>
      {editingProduct.attributes.map((attribute, i) => (
        <div key={i}>
          <input
            type="text"
            value={attribute.name}
            onChange={(event) => handleAttributeChange(event, i, 'name')}
            style={{width:"100px"}}

          />
          :
          <input
            type="text"
            value={attribute.value}
            onChange={(event) => handleAttributeChange(event, i, 'value')}
            style={{width:"100px"}}
           
          />
          <br />
        </div>
      ))}
    </div>
  ) : (
    // Display the types in a format you prefer
    product.attributes.map((attribute, i) => (
      <span key={i}>{attribute.name}: {attribute.value}<br/></span>
    ))
  )}
</td>
        
        <td>
          {editingProduct && editingProduct._id === product._id ? (
            <>
              <Button variant="outline-success" onClick={handleSave}>Save</Button>{' '}
              <Button variant="outline-danger" onClick={handleCancel}>Cancel</Button>{' '}
            </>
          ) : (
            <Button variant="outline-primary" onClick={() => handleEdit(product)}>Edit</Button>
          )}
        </td>
          <td><Button variant="outline-danger" onClick={() => handleDelete(product._id)}>Delete</Button></td>
         
      </tr>
    ));
  };

  const onClickAdd = () => {
    if (permissions && permissions.add) {
      setShowAddPage(true);
    } else {
      alert("You do not have permission to add products.");
    }
  };

  return (
    <div className="page-container">
       {showAddPage ? (
          <Addtodata />
        ) : (
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Button variant="outline-primary" onClick={onClickAdd}>Add Data</Button>{' '}
                  <Button variant="outline-success" onClick={handleDownloadExcel}>Download</Button>{' '}
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Thub ID</th>
                      <th>Name</th>
                      <th>Serial Number</th>
                      <th>Category</th>
                      <th>Types</th>
                      <th>Edit Details</th>
                      <th>Delete Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderProducts()}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
        )}
    </div>
  );
};

export default FirstFloor;
