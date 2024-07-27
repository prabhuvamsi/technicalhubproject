import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as XLSX from 'xlsx';
import Button from 'react-bootstrap/Button';

import axios from "axios";

const AxiosAPI = axios.create();

const SoftwareData = () => {
  const [softwareData, setSoftwareData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [permissions, setPermissions] = useState({
    add: false,
    edit: false,
    delete: false
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
    fetchPermissions();
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
      const response = await AxiosAPI.get("http://localhost:5000/api/getsoftware");
      setSoftwareData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (rowId) => {
    if (permissions && permissions.edit) {
      setEditingRowId(rowId);
      setEditingProduct(softwareData.find(item => item._id === rowId));
      setEditedValues(softwareData.find(item => item._id === rowId));
  
    } else{
      alert("You do not have permission to edit products.");
    }
  
  };
  const handleDownloadExcel = () => {
    if (softwareData.length === 0) {
      alert("No data to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(softwareData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'softwareData');
    XLSX.writeFile(workbook, 'softwareData.xlsx');
  };

  const handleSave = async () => {
    try {
      const updatedProductData = {
        ...editedValues,
        editDate: new Date()
      };
  
      const response = await AxiosAPI.put(`http://localhost:5000/api/thubesssss/${editedValues._id}`, updatedProductData);
      console.log(response.data);
      alert("Changes saved successfully");
      setEditingRowId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes");
    }
  };

   const handleDelete = (productId) => {
    if (!(permissions && permissions.delete)) {
      alert("You do not have permission to delete products.");
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
  
    if (isConfirmed) {
      AxiosAPI.delete(`http://localhost:5000/api/software/${productId}`)
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

  const handleInputChange = (e, field) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const dataTable = {
    columns: [
      { label: "Software Name", field: "softwareName", sort: "asc", width: 100 },
      { label: "Version", field: "version", sort: "asc", width: 100 },
      { label: "Serial Number", field: "serialNumber", sort: "asc", width: 100 },
      { label: "Purchase Date", field: "purchaseDate", sort: "asc", width: 100 },
      { label: "Expiration Date", field: "expirationDate", sort: "asc", width: 100 },
      { label: "License Type", field: "licenseType", sort: "asc", width: 100 },
      { label: "User", field: "alias", sort: "asc", width: 100 },
      { label: "Description", field: "description", sort: "asc", width: 100 },
      { label: "Edit Data", field: "actions", width: 300 },
      { label: "Delete", field: "delete", width: 200},
    ],
    rows: softwareData.map((item) => ({
      id: item._id,
      softwareName: editingRowId === item._id ? (
        <input type="text" value={editedValues.softwareName } style={{width:"50px"}}  onChange={(e) => handleInputChange(e, "softwareName")} />
      ) : item.softwareName,
      alias: editingRowId === item._id ? (
        <input type="text" value={editedValues.alias} onChange={(e) => handleInputChange(e, "alias")} />
      ) : item.alias,
      version: editingRowId === item._id ? (
        <input type="text" value={editedValues.version} onChange={(e) => handleInputChange(e, "version")} />
      ) : item.version,
      serialNumber: editingRowId === item._id ? (
        <input type="text" value={editedValues.serialNumber} onChange={(e) => handleInputChange(e, "serialNumber")} />
      ) : item.serialNumber,
      purchaseDate: editingRowId === item._id ? (
        <input type="text" value={editedValues.purchaseDate} onChange={(e) => handleInputChange(e, "purchaseDate")} />
      ) : item.purchaseDate,
      expirationDate: editingRowId === item._id ? (
        <input type="text" value={editedValues.expirationDate} onChange={(e) => handleInputChange(e, "expirationDate")} />
      ) : item.expirationDate,
      licenseType: editingRowId === item._id ? (
        <input type="text" value={editedValues.licenseType} onChange={(e) => handleInputChange(e, "licenseType")} />
      ) : item.licenseType,
      description: editingRowId === item._id ? (
        <input type="text" value={editedValues.description} onChange={(e) => handleInputChange(e, "description")} />
      ) : item.description,
      // Inside the dataTable.rows mapping function
      actions: editingRowId === item._id ? (
        <div className="d-flex"> 
          
          <Button variant="outline-success" mb="2px" onClick={handleSave}>Save</Button>{' '}
          <Button variant="outline-warning" mb="2px" onClick={() => setEditingRowId(null)}>cancel</Button>{' '}
        </div>
      ) : (
        <div>
          
          <Button variant="outline-primary" onClick={() => handleEdit(item._id)}>Edit </Button>{' '}
        </div>
      ),           

      delete: (

        <Button variant="outline-danger" onClick={() => handleEdit(item._id)}>Delete </Button>

        
      ),
    })),
  };

  const handleAddComponent = () => {
    window.location.href = "/softwareadddata";
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="software Data" breadcrumbItem="Software Data" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
              <Button variant="outline-primary" onClick={handleAddComponent}>Add</Button>{' '}
                
                <Button variant="outline-success" mb="2px" onClick={handleDownloadExcel}>Download</Button>{' '}

                
                <MDBDataTable responsive bordered data={dataTable} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SoftwareData;
