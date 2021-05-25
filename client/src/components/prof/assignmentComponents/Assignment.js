import React from "react";
import NavBar from "../mainComponents/NavBar";
import Sidebar from "../mainComponents/Sidebar";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
const Assignment = () => {
    const user = useSelector(state => state.user);
    const theme = user.theme;
    const auth = useSelector(state => state.profauth);

    return (
        <React.Fragment>
            <NavBar />
            <Container fluid>
                <Row>
                    <Col sm={8} className="justify-content-center">
                        <span className='w-100 vertical-center ta-center'>
                            <Link to='/prof/NewAssignment'>Create new Assignment</Link>
                            <br/>
                            <br/>
                            <br/>
                            <Link to='/prof/ManageAssignments'>Manage Assignment</Link>
                        </span>
                    </Col>
                    <Col sm={4} className="d-flex justify-content-center">
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Assignment;
