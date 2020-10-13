import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import Sidebar from '../mainComponents/Sidebar'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col,Button,Alert} from 'react-bootstrap'
import {Form,FormGroup,Input} from 'reactstrap'
import axios from 'axios'
export default function AppointCR() {
    const [regno, setregno] = useState();
    const [msg,setmsg] = useState();
    const user = useSelector(state=>state.user)
    const theme = user.theme;
    const changeRegno  = (e) => {
        setregno(e.target.value)
    }
    const submitForm = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = {regno}
        console.log(body);
        const ma =await axios.post('/prof/class/appoint',body,config)  
        setmsg(ma.data)   
    }
    const light = (
        <div>
        <br/>
        <br/>
        <h5>Appoint CR</h5>
        <br/>
        <small>Make sure he has already registered</small>
        <br/>
        <Form>
        {msg
                ?
            <Alert variant="warning"> {msg}</Alert>
            :null}
            <FormGroup>
                <Input type="text" onChange={changeRegno} placeholder="Enter Student Rollno"/>
            </FormGroup>
            <br/>
            <Button variant="primary" type="submit" onClick={submitForm}>
                Appoint CR
            </Button>
        </Form>
        </div>
    )
    const dark = (
        <div className="dark-color">
        <br/>
        <br/>
        <h5>Appoint CR</h5>
        <br/>
        <small>Make sure he has already registered</small>
        <br/>
        <Form >
            {msg
                ?
            <Alert variant="warning"> {msg}</Alert>
            :null}
            <FormGroup>
                <Input type="text" onChange={changeRegno} className="dark2 text-white" placeholder="Enter Student Rollno"/>
            </FormGroup>
            <br/>
            <Button variant="primary" type="submit" onClick={submitForm}>
                Appoint CR
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
