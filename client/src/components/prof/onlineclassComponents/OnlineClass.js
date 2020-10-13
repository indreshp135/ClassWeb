import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import CreateRoom from './CreateRoom'
import Sidebar from '../mainComponents/Sidebar'
export default function OnlineClass() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
                <CreateRoom/>    
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
