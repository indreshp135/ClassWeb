import React, { useState } from "react";
import { useSelector } from "react-redux";
// import Progress from "./Progress";
import axios from "axios";
import { Input } from "reactstrap";
import NavBar from "../mainComponents/NavBar";
import Sidebar from "../mainComponents/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import {useParams} from 'react-router-dom'

export default function SubmitWork() {
    const [comment, setComment] = useState("");
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose file");
    const {id} = useParams()
    const auth = useSelector(state => state.studentauth);
    const studentname = auth.user.name;
    const subjects = auth.class.subjects;
    const assignments = auth.class.assignment
    const user = useSelector(state => state.user);
    const theme = user.theme;

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    const qq = e => setComment(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file)
        formData.append('comment', comment)
        const ans = formData.getAll("comment");
        console.log(ans);

        try {
            await axios.post(
                `/submit/${auth.user.regno}/${id}`,
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

    

    // const classnameoptions = subjects.map(op => (
    //     <option>{op.classname}</option>
    // ));
    // const coursecodeoptions = subjects.map(op => (
    //     <option>{op.coursecode}</option>
    // ));

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
              
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
                <input
                    type="text"
                    onChange={qq}
                    className="form-control mt-4"
                    placeholder="EnterComment"
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
                    placeholder="EnterComment"
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
