import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import TableBox from './TableBox'
import Sidebar from '../mainComponents/Sidebar'
export default function TimeTable() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
                <TableBox/>     
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}
