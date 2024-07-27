import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import * as XLSX from 'xlsx';
import Breadcrumbs from "../../components/Common/Breadcrumb";
const axiosAPI = axios.create();

const CombinedTable = () => {
  const [nameCounts, setNameCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAPI.get("http://localhost:5000/api/getalldata");
        setNameCounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Object.keys(nameCounts).map(name => ({ name, count: nameCounts[name] })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Name Counts');
    XLSX.writeFile(workbook, 'name_counts.xlsx');
  };

  const tableColumns = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150
    },
    {
      label: "Count",
      field: "count",
      sort: "asc",
      width: 150
    }
  ];

  const tableRows = Object.keys(nameCounts).map(name => ({
    name,
    count: nameCounts[name]
  }));

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Combined Table" />

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="h4">Name Counts</CardTitle>
                <div className="table-responsive">
                  <MDBDataTable
                    responsive
                    bordered
                    striped
                    hover
                    data={{ columns: tableColumns, rows: tableRows }}
                  />
                </div>
                <button className="btn btn-primary mr-2" onClick={handleDownloadExcel}>Download</button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        
      </div>
    </React.Fragment>
  );  
};

export default CombinedTable;
