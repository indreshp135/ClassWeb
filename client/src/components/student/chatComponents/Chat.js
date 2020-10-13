import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import ChatBox from './ChatBox'
import Sidebar from '../mainComponents/Sidebar'
export default function Chat() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8}className="d-flex mh100 justify-content-center" > 
                <ChatBox/>     
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
