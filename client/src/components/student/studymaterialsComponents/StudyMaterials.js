import React from 'react'
import NavBar from '../mainComponents/NavBar'
import Sidebar from '../mainComponents/Sidebar'
import {useSelector} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
import {Table} from 'reactstrap'
const StudyMaterials = () => {
    const user = useSelector(state => state.user)
    const theme = user.theme
    const auth = useSelector(state => state.studentauth)
    const studymaterials = auth.class.studymaterial
    const subjects = auth.class.subjects
    const light=  subjects.map((subject)=>
        (<React.Fragment>
       
        <Table bordered striped>
            <thead className="light2"><tr><th><h4><u>{subject.coursecode}</u></h4>{subject.profname}</th></tr></thead><tbody>
            {studymaterials.map((studymaterial)=>subject.coursecode===studymaterial.coursecode?
            <tr><td><a className = "text-secondary" rel="noopener noreferrer" href ={`/file/${studymaterial.filename}`} target="_blank" >{studymaterial.originalname}</a></td></tr>
        :null)}
        </tbody>
        </Table>
        <br/>
        <br/>
        </React.Fragment>)
    )
    const dark = subjects.map((subject)=>
        (
        <React.Fragment>
        <Table bordered dark striped>
            <thead className="dark2"><tr><th><h4><u>{subject.coursecode}</u></h4>{subject.profname}</th></tr></thead><tbody>
            {studymaterials.map((studymaterial)=>subject.coursecode===studymaterial.coursecode?
            <tr><td><a rel="noopener noreferrer" href ={`/file/${studymaterial.filename}` }className="text-white" target="_blank" >{studymaterial.originalname}</a></td></tr>
        :null)}
        </tbody>
        </Table>
        <br/>
        <br/>
        </React.Fragment>
    	)
    )
    return (
        <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
            <Col sm={8} className=" justify-content-center"> 
                {subjects.length!==0?
                (theme?<div className="dark-color">
            <h2>Study Material</h2>
            <br/>{dark}</div>:<React.Fragment><h2>Study Material</h2>
            <br/>{light}</React.Fragment>):
                (theme?
                    <div className="dark-color">
                        <h2>Study Material</h2>
                        <br/>
                        <span>No Study Materials Sent</span>
                    </div>:
                    <div >
                        <h2 >Study Material</h2>
                        <br/>
                        <span>No Study Materials Sent</span>
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

export default StudyMaterials;
