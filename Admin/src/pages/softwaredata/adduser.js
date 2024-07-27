import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MyForm from "./form";
import MYButton from "./Mybutton";
import Userdata from "./userdata";




const Adduser = () => {




  
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Admin Page" breadcrumbItem="Admin Page" />
        <Row>
          <Col className="col-12">

            <Card>

              <CardBody>
                <MyForm/>
                <center><p>Users and Password</p></center>
                <Userdata></Userdata>
                <center><p>Add your permissions to user</p></center>
                <MYButton></MYButton>
                

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Adduser;

