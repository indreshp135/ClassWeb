import React from 'react'
import Sidebar from '../mainComponents/Sidebar'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import Join from './Join'
export default function JoinClass() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
                <Join/>
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
