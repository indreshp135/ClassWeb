import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import Sidebar from '../mainComponents/Sidebar'
import Watch from './Watch'
export default function OnlineClass() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
                <Watch/>    
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
