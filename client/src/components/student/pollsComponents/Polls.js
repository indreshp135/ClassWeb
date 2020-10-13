import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import Sidebar from '../mainComponents/Sidebar'
import CreatePoll from './CreatePoll'
import OngoingPoll from './OngoingPoll'
import ResultedPoll from './ResultedPoll'
export default function TimeTable() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="justify-content-center"> 
            <center>
                <CreatePoll/>
                <OngoingPoll/>
                <ResultedPoll/>
            </center>
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}

