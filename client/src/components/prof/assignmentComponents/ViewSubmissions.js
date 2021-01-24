import React from "react";
import NavBar from "../mainComponents/NavBar";
import Sidebar from "../mainComponents/Sidebar";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Table } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
const ViewSubmissions = () => {
    const user = useSelector(state => state.user);
    const theme = user.theme;
    const auth = useSelector(state => state.profauth);
    console.log(auth);
    const assignments = auth.user.assignment;
    let submissions;
    let i, j;
    const {id} = useParams()
    for(i in assignments) {
        if(assignments[i]._id == id){
            submissions = assignments[i].submissions
            
            console.log(i, submissions);
            j = i
        }
    }
    console.log(assignments);
    const subjects = auth.user.classroom;
    const history = useHistory()

    

    const light = (
        <React.Fragment>
            <Table bordered striped>
                <thead className="light2">
                    <tr>
                        <th>
                            <h4>
                                <u>{assignments[j].coursecode}</u>
                            </h4>
                            {assignments[j].question}
                        </th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(submission => (
                            <tr>
                                <td>
                                    <span
                                        className="text-secondary"
                                        // to={`/prof/EditAssignment/${assignment._id}`}
                                    >
                                        {submission.regno}
                                    </span>

                                    <br />
                                </td>
                                {/* <td align = 'right'>
                                    <Button variant='light' id={assignment._id} onClick={handleEdit}>Edit</Button>
                                    <Button variant='light' id={assignment._id} onClick={handleSubmissions}>View Submissions</Button>
                                </td> */}
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
            <br />
            <br />
        </React.Fragment>
    );
    const dark = (
        <React.Fragment>
            <Table bordered dark striped>
                <thead className="dark2">
                    <tr>
                        <th>
                            <h4>
                                <u>{assignments[j].coursecode}</u>
                            </h4>
                            {assignments[j].question}
                        </th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(submission => (
                            <tr>
                                <td>
                                    <span
                                        className="text-white"
                                        // to={`/prof/EditAssignment/${assignment._id}`}
                                    >
                                        {submission.regno}
                                    </span>

                                    <br />
                                </td>
                                {/* <td align = 'right'>
                                    <Button variant='light' id={assignment._id} onClick={handleEdit}>Edit</Button>
                                    <Button variant='light' id={assignment._id} onClick={handleSubmissions}>View Submissions</Button>
                                </td> */}
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
            <br />
            <br />
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <NavBar />
            <Container fluid>
                <Row>
                    <Col sm={8} className=" justify-content-center">
                        {submissions.length !== 0 ? (
                            theme ? (
                                <div className="dark-color">
                                    <h2>Submissions</h2>
                                    <br />
                                    {dark}
                                </div>
                            ) : (
                                <React.Fragment>
                                    <h2>Submissions</h2>
                                    <br />
                                    {light}
                                </React.Fragment>
                            )
                        ) : theme ? (
                            <div className="dark-color">
                                <h2>Submissions</h2>
                                <br />
                                <span>No Submissions</span>
                            </div>
                        ) : (
                            <div>
                                <h2>Submissions</h2>
                                <br />
                                <span>No Submissions</span>
                            </div>
                        )}
                    </Col>
                    <Col sm={4} className="d-flex justify-content-center">
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ViewSubmissions;
