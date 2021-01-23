import React, { useState } from "react";
import { useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
// import Progress from "./Progress";
import axios from "axios";
import { Input } from "reactstrap";
import NavBar from "../mainComponents/NavBar";
import Sidebar from "../mainComponents/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

export default function EditAssignment() {
    const auth = useSelector(state => state.profauth);
    const profname = auth.user.name;
    const subjects = auth.user.classroom;
    const user = useSelector(state => state.user);
    const theme = user.theme;

    const assignments = auth.user.assignment;

    const {id} = useParams();

    let assignment;
    let i
    for(i in assignments) {
        if(assignments[i]._id === id)
            assignment = assignments[i]
    }
    
    
    const history = useHistory();
    const [question, setQuestion] = useState(assignment.question);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState(assignment.originalname);
    const [cla, setCla] = useState(assignment.classname);
    const [subject, setSubject] = useState(assignment.coursecode);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    const cc = e => setCla(e.target.value);
    const ss = e => setSubject(e.target.value);
    const qq = e => setQuestion(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file)
        formData.append('question', question)
        const ans = formData.getAll("question");
        console.log(ans);

        try {
            await axios.put(
                `/assign/${profname}/${subject}/${cla}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    

    const classnameoptions = subjects.map(op => (
        <option>{op.classname}</option>
    ));
    const coursecodeoptions = subjects.map(op => (
        <option>{op.coursecode}</option>
    ));

    const light = (
        <div>
            <br />
            <h5>Assignment</h5>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <Input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />
                    <br />
                    <Input type="text" onChange={cc} value = {cla}>
                        {/* {subjects.length !== 0 ? (
                            <option>{cla}</option>
                        ) : (
                            <option>Join a class </option>
                        )} */}
                        {/* {classnameoptions} */}
                        
                    </Input>
                    <br />
                    <Input type="text" onChange={ss} value = {subject}>
                        {/* {subjects.length !== 0 ? (
                            <option>{subject}</option>
                        ) : (
                            <option>Join a class </option>
                        )} */}
                        {/* {coursecodeoptions} */}
                        
                    </Input>
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
                <input
                    type="text"
                    onChange={qq}
                    value = {question}
                    className="form-control mt-4"
                    placeholder="EnterQuestion"
                />
                <br />
                <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />
            </form>
        </div>
    );
    const dark = (
        <div className="dark-color">
            <br />
            <h5>Assignment</h5>
            <form onSubmit={onSubmit}>
                <div className=" custom-file mb-4">
                    <Input
                        type="file"
                        className="custom-file-input dark2 text-white"
                        id="customFile"
                        onChange={onChange}
                    />

                    <br />
                    <Input
                        type="select"
                        onChange={cc}
                        className="dark2 text-white"
                    >
                        {subjects.length !== 0 ? (
                            <option>Select Classname</option>
                        ) : (
                            <option>Join a class </option>
                        )}
                        {classnameoptions}
                    </Input>
                    <br />
                    <Input
                        type="select"
                        onChange={ss}
                        className="dark2 text-white"
                    >
                        {subjects.length !== 0 ? (
                            <option>Select Course code</option>
                        ) : (
                            <option>Join a class </option>
                        )}
                        {coursecodeoptions}
                    </Input>
                    <label
                        className="custom-file-label dark2 text-white"
                        htmlFor="customFile"
                    >
                        {filename}
                    </label>
                </div>
                <input
                    type="text"
                    onChange={qq}
                    className="form-control dark2 text-white mt-4"
                    placeholder="EnterQuestion"
                />
                <br />
                <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />
            </form>
        </div>
    );
    return (
        <React.Fragment>
            <NavBar />
            <Container fluid>
                <Row>
                    <Col sm={8} className="justify-content-center">
                        {/* <span className="w-100 vertical-center ta-center">
                            <Link to="/prof/NewAssignment">
                                Create new Assignment
                            </Link>
                            <br />
                            <br />
                            <br />
                            <Link to="/prof/ManageAssignments">
                                Manage Assignment
                            </Link>
                        </span> */}
                        {theme ? dark : light}
                    </Col>
                    <Col sm={4} className="d-flex justify-content-center">
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
