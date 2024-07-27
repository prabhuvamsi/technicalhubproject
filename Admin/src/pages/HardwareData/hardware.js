import React, { useState } from "react";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Firstfloor from "./firstfloor1.1";
import Firstfloor12 from "./firstfloor1.2";
import Secondfloor11 from "./secondfloor2.1";
import Secondfloor22 from "./secondfloor2.2";
import Thirdfloor31 from "./thirdfloor3.1";
import Thirdfloor32 from "./thirdfloor3.2";
import Fourthfloor41 from "./fourthfloor4.1";
import Fourthfloor42 from "./fourthfloor4.2";
import Fulldata from "./fulldata11";
// import Addtodata from "./addtodata";
import First from "./fulldata22";
import FirstFloo from "./fulldate33";
import FirstFlo from "./fulldata44";

const Hardware = () => {
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [selectedSubfloor, setSelectedSubfloor] = useState('');

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setSelectedSubfloor('');
  };

  const handleSubfloorSelect = (subfloor) => {
    setSelectedSubfloor(subfloor);
  };



  return (
    <React.Fragment>
      <div className="page-content" >
        <Breadcrumbs title="Hardware date" breadcrumbItem="Harware data" />
        <Row>
          <Col md="6">
            <Row style={{marginTop:"30px",marginRight:"20px"}}>
              <Col md="6">
                <DropdownButton id="dropdown-basic-button" title={`Selected Floor: ${selectedFloor}`} >
                  <Dropdown.Item onClick={() => handleFloorSelect("1")}>1st floor</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFloorSelect("2")}>2nd floor</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFloorSelect("3")}>3rd floor</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFloorSelect("4")}>4th floor</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col md="6">
                {selectedFloor && (
                  <DropdownButton id="dropdown-basic-button" title={`Selected Hall: ${selectedSubfloor}`}>
                    {selectedFloor === '1' && (
                      <>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("1.1")}>1.1</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("1.2")}>1.2</Dropdown.Item>
                      </>
                    )}
                    {selectedFloor === '2' && (
                      <>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("2.1")}>2.1</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("2.2")}>2.2</Dropdown.Item>
                      </>
                    )}
                    {selectedFloor === '3' && (
                      <>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("3.1")}>3.1</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("3.2")}>3.2</Dropdown.Item>
                      </>
                    )}
                    {selectedFloor === '4' && (
                      <>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("4.1")}>4.1</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSubfloorSelect("4.2")}>4.2</Dropdown.Item>
                      </>
                    )}
                  </DropdownButton>
                )}
              </Col>
            </Row>
          </Col>
          <Col md="3">
            {/* Uncomment the button below if needed */}
            {/* <Button color="primary" onClick={handleAddButtonClick}>Add</Button> */}
          </Col>
        </Row>

        {/* Render respective components based on selected floor and subfloor */}
        {(selectedFloor === '1' && selectedSubfloor === '') && <Fulldata />}

        {(selectedFloor === '1' && selectedSubfloor === '1.1') && <Firstfloor />}
        {(selectedFloor === '1' && selectedSubfloor === '1.2') && <Firstfloor12 />}
        {(selectedFloor === '2' && selectedSubfloor === '') && <First/>}

        {(selectedFloor === '2' && selectedSubfloor === '2.1') && <Secondfloor11 />}
        {(selectedFloor === '2' && selectedSubfloor === '2.2') && <Secondfloor22 />}
        {(selectedFloor === '3' && selectedSubfloor === '') && <FirstFloo  />}
        {(selectedFloor === '4' && selectedSubfloor === '') && <FirstFlo />}  

        
        {(selectedFloor === '3' && selectedSubfloor === '3.1') && <Thirdfloor31 />}
        {(selectedFloor === '3' && selectedSubfloor === '3.2') && <Thirdfloor32 />}
        {(selectedFloor === '4' && selectedSubfloor === '4.1') && <Fourthfloor41 />}
        {(selectedFloor === '4' && selectedSubfloor === '4.2') && <Fourthfloor42 />}
      </div>
    </React.Fragment>
  );
};

export default Hardware;
