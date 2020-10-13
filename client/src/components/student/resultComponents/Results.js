import React from 'react'
import NavBar from '../mainComponents/NavBar'
import Sidebar from '../mainComponents/Sidebar'
import {useSelector} from 'react-redux'
import {Table} from 'reactstrap'
import {Container,Row,Col} from 'react-bootstrap'
const Results = () => {
    const user = useSelector(state => state.user)
    const theme = user.theme
    const auth = useSelector(state => state.studentauth)
    const result = auth.user.result
    const elements = result.map((results)=>(<tr><td>{results.coursecode}</td><td>{results.testtype}</td><td>{results.marks}</td></tr>))
    const light = (
        <div>
            <br/>
            <h5>Results</h5>
            <Table striped bordered>
                <thead>
                    <th>Test Type</th>
                    <th>Course Code</th>
                    <th>Marks</th>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </Table>
        </div>
    )
    const dark = (
        <div className="dark-color">
            <br/>
            <h5 className="dark-color">Results</h5>
            <Table striped dark bordered>
                <thead>
                    <th>Test Type</th>
                    <th>Course Code</th>
                    <th>Marks</th>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </Table>
        </div>
    )
    return (
        <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className="cent justify-content-center"> 
            {result.length!==0?
                (theme?dark:light):
                (theme?
                    <div className="dark-color">
                        <h2>Results</h2>
                        <br/>
                        <span>No Results Till Date</span>
                    </div>:
                    <div >
                        <h2 >Results</h2>
                        <br/>
                        <span>No Results Till Date</span>
                    </div>
                    )
                }
            </Col>
            <Col sm={4}className="d-flex justify-content-center" >
                <Sidebar/>
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    );
}

export default Results;
