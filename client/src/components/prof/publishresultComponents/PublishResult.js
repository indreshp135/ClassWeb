import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import Sidebar from '../mainComponents/Sidebar'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col,Button,Alert} from 'react-bootstrap'
import {Form,FormGroup,Input} from 'reactstrap'
import axios from 'axios'
export default function PublishResult() {
    const [regno, setregno] = useState();
    const [msg,setmsg] = useState();
    const [coursecode,setcc] =useState('');
    const [testtype,settt] = useState('');
    const [marks,setm] = useState();
    const user = useSelector(state=>state.user)
    const theme = user.theme;
    const auth= useSelector(state=>state.profauth)
    const classroom = auth.user.classroom
    const elements = classroom.map((classes)=><option>{classes.coursecode}</option>)
    const tests = ["ASSIGNMENT 1","ASSIGNMENT 2","CT 1","CT 2","MID SEM","END SEM"];
    const types = tests.map((test)=><option>{test}</option>)
    const changeRegno  = (e) => setregno(e.target.value)
    const changeCC  = (e) => setcc(e.target.value)
    const changeTT  = (e) => settt(e.target.value)
    const changem = (e) => setm(e.target.value)
    const submitForm = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = {regno,marks,testtype,coursecode}
        console.log(body);
        const ma = await axios.post('/prof/class/publish',body,config)    
        setmsg(ma.data); 
    }
    const light = (
        <div>
        <br/>
        <br/>
        <h5>Publish Result</h5>
        <br/>
        <small>Make sure he has already registered</small>
        <br/>
        <Form>
            {msg
                ?
            <Alert variant="warning"> {msg}</Alert>
            :null}
            <FormGroup>
                <Input type="text" onChange={changeRegno} placeHolder="Enter Student Rollno"/>
            </FormGroup>
            <FormGroup>
                <Input type="select" onChange={changeCC} placeHolder="Enter Student Rollno">
                {classroom.length===0?<option>Join a Class</option>:<option>Select CourseCode</option>}
                {elements}
                </Input>
            </FormGroup>
            <FormGroup>
                <Input type="select" onChange={changeTT} placeHolder="Enter Student Rollno">
                <option>Select Test Type</option>
                {types}
                </Input>
            </FormGroup>
            <FormGroup>
                <Input type="text" onChange={changem} placeHolder="Enter Marks"/>
            </FormGroup>
            <br/>
            <Button variant="primary" type="submit" onClick={submitForm}>
                Send Results
            </Button>
        </Form>
        </div>
    )
    const dark = (
        <div className="dark-color">
        <br/>
        <br/>
        <h5>Publish Result</h5>
        <br/>
        <small>Make sure he has already registered</small>
        <br/>
        <Form>
            {msg
                ?
            <Alert variant="warning"> {msg}</Alert>
            :null}
            <FormGroup>
                <Input type="text" onChange={changeRegno} placeHolder="Enter Student Rollno" className="dark2 text-white"/>
            </FormGroup>
            <FormGroup>
                <Input type="select" onChange={changeCC} placeHolder="Enter Student Rollno" className="dark2 text-white">
                {classroom.length===0?<option>Join a Class</option>:<option>Select CourseCode</option>}
                {elements}
                </Input>
            </FormGroup>
            <FormGroup>
                <Input type="select" onChange={changeTT} placeHolder="Enter Student Rollno" className="dark2 text-white">
                <option>Select Test Type</option>
                {types}
                </Input>
            </FormGroup>
            <FormGroup>
                <Input type="text" onChange={changem} placeHolder="Enter Marks" className="dark2 text-white"/>
            </FormGroup>
            <br/>
            <Button variant="primary" type="submit" onClick={submitForm}>
                Send Results
            </Button>
        </Form>
        </div>
    )
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
                {theme?dark:light}
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
