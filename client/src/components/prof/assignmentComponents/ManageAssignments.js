import React from "react";
import NavBar from "../mainComponents/NavBar";
import Sidebar from "../mainComponents/Sidebar";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
const ManageAssignments = () => {
  const user = useSelector(state => state.user);
  const theme = user.theme;
  const auth = useSelector(state => state.profauth);
  console.log(auth);
  const assignments = auth.user.assignment;
  console.log(assignments);
  const subjects = auth.user.classroom;
  const history = useHistory();

  const handleEdit = e => {
    history.push(`/prof/EditAssignment/${e.target.id}`);
  };

  const handleSubmissions = e => {
    history.push(`/prof/ViewSubmissions/${e.target.id}`);
  };

  const light = subjects.map(subject => (
    <React.Fragment>
      <Table bordered striped>
        <thead className="light2">
          <tr>
            <th>
              <h4>
                <u>{subject.classname}</u>
              </h4>
              {subject.coursecode}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment =>
            subject.coursecode === assignment.coursecode ? (
              <tr>
                <td style={{ verticalAlign: "middle" }}>
                  <span className="text-secondary">{assignment.question}</span>

                  <br />
                </td>
                <td align="right">
                  <Button
                    variant="light"
                    id={assignment._id}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
                    id={assignment._id}
                    onClick={handleSubmissions}
                  >
                    View Submissions
                  </Button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
      <br />
      <br />
    </React.Fragment>
  ));
  const dark = subjects.map(subject => (
    <React.Fragment>
      <Table bordered dark striped>
        <thead className="dark2">
          <tr>
            <th>
              <h4>
                <u>{subject.classname}</u>
              </h4>
              {subject.coursecode}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment =>
            subject.coursecode === assignment.coursecode ? (
              <tr>
                <td style={{ verticalAlign: "middle" }}>
                  <span
                    className="text-white"
                  >
                    {assignment.question}
                  </span>
                </td>
                <td align="right">
                  <Button
                    variant="dark"
                    id={assignment._id}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="dark"
                    id={assignment._id}
                    onClick={handleSubmissions}
                  >
                    View Submissions
                  </Button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
      <br />
      <br />
    </React.Fragment>
  ));
  return (
    <React.Fragment>
      <NavBar />
      <Container fluid>
        <Row>
          <Col sm={8} className=" justify-content-center">
            {subjects.length !== 0 ? (
              theme ? (
                <div className="dark-color">
                  <h2>Assignments</h2>
                  <br />
                  {dark}
                </div>
              ) : (
                <React.Fragment>
                  <h2>Assignments</h2>
                  <br />
                  {light}
                </React.Fragment>
              )
            ) : theme ? (
              <div className="dark-color">
                <h2>Assignments</h2>
                <br />
                <span>No Assignments Sent</span>
              </div>
            ) : (
              <div>
                <h2>Assignments</h2>
                <br />
                <span>No Assignments Sent</span>
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

export default ManageAssignments;
