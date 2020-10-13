import React,{useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Form,Input,FormGroup,Table} from 'reactstrap'
import {Button} from 'react-bootstrap'
import {joinclass} from '../../../redux/prof/auth/authActions'
export default function Join() {
    const [cla,setCla] = useState('select');
    const dispatch = useDispatch()
    const [yea,setYea] = useState('select');
    const [subject,setSubject] = useState('');
    const years = ["select year","First Year","Second Year","Third Year","Fourth Year"]
    const classes = ["select class","CSE","ECE","EEE","ARCH","MECH","PROD","CIV","CHEM","MME","ICE"]
    const classs = classes.map((clas)=><option key={clas}>{clas}</option>)
    const yearr = years.map(year=><option>{year}</option>)
    const user = useSelector(state => state.user)
    const theme = user.theme;
    const auth = useSelector(state => state.profauth)
    const array = auth.user.classroom
    const elements = array.map(arr=>(<tr><td>{arr.classname}</td><td>{arr.coursecode}</td></tr>))
    const id = auth.user.id;
    const profname = auth.user.name;
    const changeClass = (e)=>{
        setCla(e.target.value);
    }
    const changeSubject = (e)=>{
        setSubject(e.target.value);
    }
    const changeYear  = e=>{
        setYea(e.target.value)
    }
    const submitForm = e => {
        e.preventDefault();
        var y =0;
        if(yea==="First Year")
            y=1;
        else if(yea==="Second Year")
            y=2;
        else if(yea==="Third Year")
            y=3;
        else if(yea==="Fourth Year")
            y=4;
        var classname =cla+y;
        var coursecode = subject
        dispatch(joinclass(id,coursecode,classname,profname));
    }
    const light = (
        <div>
            <br/>
            <h5>Join Class</h5>
            <Form>
                <FormGroup>
                    <Input type="select" onChange={changeClass}>
                        {classs}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" onChange={changeYear}>
                        {yearr}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" onChange={changeSubject} placeholder="Course Code"/>
                </FormGroup>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    JOIN CLASS
                </Button>
            </Form> 
            <br/>
            <br/>
            <h5>Classes Joined</h5>
            <Table striped bordered>
                <thead>
                    <th>Class Name</th>
                    <th>Course Code</th>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </Table>
        </div>
    )
    const dark = (
        <div className = "dark-color">
            <br/>
            <h5>Join Class</h5>
            <Form>
                <FormGroup>
                    <Input type="select" onChange={changeClass} className="dark2 text-white">
                        {classs}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" onChange={changeYear} className="dark2 text-white">
                        {yearr}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" onChange={changeSubject} className="dark2 text-white" placeholder="Course Code"/>
                </FormGroup>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    JOIN CLASS
                </Button>
            </Form> 
            <br/>
            <br/>
            <h5 className="dark-color">Classes Joined</h5>
            <Table striped dark bordered>
                <thead>
                    <th>Class Name</th>
                    <th>Course Code</th>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </Table>
        </div>
    )
    return (theme?dark:light)
}
