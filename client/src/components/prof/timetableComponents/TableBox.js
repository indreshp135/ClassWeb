import React,{ useState } from "react"
import {useDispatch,useSelector} from 'react-redux' 
import { changeTable } from "../../../redux/prof/auth/authActions";
import {Table,Form,FormGroup,Input} from 'reactstrap'
import {Container,Row,Col,Button} from 'react-bootstrap'
export default function TableBox() {
    const auth = useSelector(state => state.profauth)
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [row,changeRow] = useState(1)
    const [col,changeCol] = useState(1)
    const [show,setShow] = useState(false)
    const [subject,setSubject] = useState('')
    const [typen,setTypen] = useState('Free')
    const [index,setIndex] = useState(1)
    const theme = user.theme;
    const table = auth.user.timetable
    const timeid = auth.user.timetable._id
    const changeItem = (e)=>{
        var l = parseInt((e.target.id).slice(1)); 
        setIndex(l);
        changeRow(Math.floor((l-1)/5)+1);
        l=l%5;
        if(l===0)
            changeCol(5);
        else
            changeCol(l);
    }
    const changeSubject = (e)=>{
        setSubject(e.target.value);
    }
    const changeTypen = (e)=>{
        setTypen(e.target.value);
    }
    const showNext = ()=> setShow(true)
    const submitForm = (e)=>{
        e.preventDefault();
        var k = 1;
        if(typen==="Free")
            k=1;
        else if(typen==="Regular")
            k=2;
        else if(typen==="Special")
            k=3;
        else
            k=4; 
        dispatch(changeTable(timeid,index,subject,k))
        setShow(false)
    }
    const classroom = auth.user.classroom
    const elements = classroom.map((classa)=>(<option>{classa.coursecode}</option>))
    
    const dark=  (
        <Container fluid className="display-5">
        <Row>
        <div className="justify-content-center">
            <br/>
            <h2 className="dark-color">Class TimeTable</h2>
            <Table bordered dark striped className="timetable">
                <thead>
                    <tr>
                    <th className="l-1.5x">#</th>
                    <th className="l-1x">Hour 1</th>
                    <th className="l-1x">Hour 2</th>
                    <th className="l-1x">Hour 3</th>
                    <th className="l-1x">Hour 4</th>
                    <th className="l-2x">Lab Hour</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" className="l-1.5x">Monday</th>
                    <td className={`tabletp${table.type1} l-1x`} onClick={changeItem}id="t1">{table.subject1}</td>
                    <td className={`tabletp${table.type2} l-1x`} onClick={changeItem}id="t2">{table.subject2}</td>
                    <td className={`tabletp${table.type3} l-1x`} onClick={changeItem}id="t3">{table.subject3}</td>
                    <td className={`tabletp${table.type4} l-1x`} onClick={changeItem}id="t4">{table.subject4}</td>
                    <td className={`tabletp${table.type5} l-2x`} onClick={changeItem}id="t5">{table.subject5}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Tuesday</th>
                    <td className={`tabletp${table.type6} l-1x`} onClick={changeItem}id="t6">{table.subject6}</td>
                    <td className={`tabletp${table.type7} l-1x`} onClick={changeItem}id="t7">{table.subject7}</td>
                    <td className={`tabletp${table.type8} l-1x`} onClick={changeItem}id="t8">{table.subject8}</td>
                    <td className={`tabletp${table.type9} l-1x`} onClick={changeItem}id="t9">{table.subject9}</td>
                    <td className={`tabletp${table.type10} l-2x`} onClick={changeItem}id="t10">{table.subject10}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Wednesday</th>
                    <td className={`tabletp${table.type11} l-1x`} onClick={changeItem}id="t11">{table.subject11}</td>
                    <td className={`tabletp${table.type12} l-1x`} onClick={changeItem}id="t12">{table.subject12}</td>
                    <td className={`tabletp${table.type13} l-1x`} onClick={changeItem}id="t13">{table.subject13}</td>
                    <td className={`tabletp${table.type14} l-1x`} onClick={changeItem}id="t14">{table.subject14}</td>
                    <td className={`tabletp${table.type15} l-2x`} onClick={changeItem}id="t15">{table.subject15}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Thursday</th>
                    <td className={`tabletp${table.type16} l-1x`} onClick={changeItem}id="t16">{table.subject16}</td>
                    <td className={`tabletp${table.type17} l-1x`} onClick={changeItem}id="t17">{table.subject17}</td>
                    <td className={`tabletp${table.type18} l-1x`} onClick={changeItem}id="t18">{table.subject18}</td>
                    <td className={`tabletp${table.type19} l-1x`} onClick={changeItem}id="t19">{table.subject19}</td>
                    <td className={`tabletp${table.type20} l-2x`} onClick={changeItem}id="t20">{table.subject20}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Friday</th>
                    <td className={`tabletp${table.type21} l-1x`} onClick={changeItem}id="t21">{table.subject21}</td>
                    <td className={`tabletp${table.type22} l-1x`} onClick={changeItem}id="t22">{table.subject22}</td>
                    <td className={`tabletp${table.type23} l-1x`} onClick={changeItem}id="t23">{table.subject23}</td>
                    <td className={`tabletp${table.type24} l-1x`} onClick={changeItem}id="t24">{table.subject24}</td>
                    <td className={`tabletp${table.type25} l-2x`} onClick={changeItem}id="t25">{table.subject25}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        </Row>
        <Row>
            {show?null:
            <Col>
            <Button variant="danger" type="submit" onClick={showNext}>
                Edit Table
            </Button>
            </Col>
            }
            {show?
            <Col>
                <Form method="post">
                    <Input  value = {`Row No. ${row}`}className="dark2 text-white"/>
                    <br/>
                    <Input  value = {`Col No. ${col}`}className="dark2 text-white"/>
                    <br/>
                    <FormGroup>
                        <Input type="select" name="subject" placeholder="Select" className="dark2 text-white" onChange={changeSubject}>
                            {classroom.length===0?<option>join a class</option>:<option>select coursecode</option>}
                            {elements}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" name="typen" placeholder="Select" className="dark2 text-white" onChange={changeTypen}>
                            <option>Free</option>
                            <option>Regular</option>
                            <option>Special</option>
                            <option>Cancelled</option>
                        </Input>
                    </FormGroup>
                    <Button variant="primary" type="submit" onClick={submitForm}>
                        Change
                    </Button>
                </Form>
            </Col>:null
            }
            <Col className="justify-content-end">
                <div class="text-left">
                    <div><div className="foo dark2"></div><span className="dark-color">Free Hour</span></div><br/>
                    <div><div className="foo yellow"></div><span className="dark-color">Regular</span></div><br/>
                    <div><div className="foo green"></div><span className="dark-color">Class Cancelled</span></div><br/>
                    <div><div className="foo red"></div><span className="dark-color">Special Class</span></div><br/>
                </div>
            </Col>
        </Row>
        </Container>
    )
    const light = (
        <Container fluid>
        <Row>
        <div className="justify-content-center">
            <br/>
            <h2>Class TimeTable</h2>
            <Table bordered striped className="timetable light2">
                <thead>
                    <tr>
                    <th className="l-1.5x">#</th>
                    <th className="l-1x">Hour 1</th>
                    <th className="l-1x">Hour 2</th>
                    <th className="l-1x">Hour 3</th>
                    <th className="l-1x">Hour 4</th>
                    <th className="l-2x">Lab Hour</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" className="l-1.5x">Monday</th>
                    <td className={`tabletp${table.type1} l-1x`} onClick={changeItem}id="t1">{table.subject1}</td>
                    <td className={`tabletp${table.type2} l-1x`} onClick={changeItem}id="t2">{table.subject2}</td>
                    <td className={`tabletp${table.type3} l-1x`} onClick={changeItem}id="t3">{table.subject3}</td>
                    <td className={`tabletp${table.type4} l-1x`} onClick={changeItem}id="t4">{table.subject4}</td>
                    <td className={`tabletp${table.type5} l-2x`} onClick={changeItem}id="t5">{table.subject5}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Tuesday</th>
                    <td className={`tabletp${table.type6} l-1x`} onClick={changeItem}id="t6">{table.subject6}</td>
                    <td className={`tabletp${table.type7} l-1x`} onClick={changeItem}id="t7">{table.subject7}</td>
                    <td className={`tabletp${table.type8} l-1x`} onClick={changeItem}id="t8">{table.subject8}</td>
                    <td className={`tabletp${table.type9} l-1x`} onClick={changeItem}id="t9">{table.subject9}</td>
                    <td className={`tabletp${table.type10} l-2x`} onClick={changeItem}id="t10">{table.subject10}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Wednesday</th>
                    <td className={`tabletp${table.type11} l-1x`} onClick={changeItem}id="t11">{table.subject11}</td>
                    <td className={`tabletp${table.type12} l-1x`} onClick={changeItem}id="t12">{table.subject12}</td>
                    <td className={`tabletp${table.type13} l-1x`} onClick={changeItem}id="t13">{table.subject13}</td>
                    <td className={`tabletp${table.type14} l-1x`} onClick={changeItem}id="t14">{table.subject14}</td>
                    <td className={`tabletp${table.type15} l-2x`} onClick={changeItem}id="t15">{table.subject15}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Thursday</th>
                    <td className={`tabletp${table.type16} l-1x`} onClick={changeItem}id="t16">{table.subject16}</td>
                    <td className={`tabletp${table.type17} l-1x`} onClick={changeItem}id="t17">{table.subject17}</td>
                    <td className={`tabletp${table.type18} l-1x`} onClick={changeItem}id="t18">{table.subject18}</td>
                    <td className={`tabletp${table.type19} l-1x`} onClick={changeItem}id="t19">{table.subject19}</td>
                    <td className={`tabletp${table.type20} l-2x`} onClick={changeItem}id="t20">{table.subject20}</td>
                    </tr>
                    <tr>
                    <th scope="row" className="l-1.5x">Friday</th>
                    <td className={`tabletp${table.type21} l-1x`} onClick={changeItem}id="t21">{table.subject21}</td>
                    <td className={`tabletp${table.type22} l-1x`} onClick={changeItem}id="t22">{table.subject22}</td>
                    <td className={`tabletp${table.type23} l-1x`} onClick={changeItem}id="t23">{table.subject23}</td>
                    <td className={`tabletp${table.type24} l-1x`} onClick={changeItem}id="t24">{table.subject24}</td>
                    <td className={`tabletp${table.type25} l-2x`} onClick={changeItem}id="t25">{table.subject25}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        </Row>
        <Row>
            {show?null:
            <Col>
            <Button variant="danger" type="submit" onClick={showNext}>
                Edit Table
            </Button>
            </Col>
            }
            {show?
            <Col>
                <Form method="post">
                    <Input  value = {`Row No. ${row}`}/>
                    <br/>
                    <Input  value = {`Col No. ${col}`}/>
                    <br/>
                    <FormGroup>
                        <Input type="select" name="subject" placeholder="Select" onChange={changeSubject}>
                        {classroom.length===0?<option>join a class</option>:<option>select coursecode</option>}
                            {elements}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" name="typen" placeholder="Select" onChange={changeTypen}>
                            <option>Free</option>
                            <option>Regular</option>
                            <option>Special</option>
                            <option>Cancelled</option>
                        </Input>
                    </FormGroup>
                    <Button variant="primary" type="submit" onClick={submitForm} onChange={changeTypen}>
                        Change
                    </Button>
                </Form>
            </Col>:null
            }
            <Col className="justify-content-end">
                <div className="text-left">
                    <div><div className="foo light2"></div><span >Free Hour</span></div><br/>
                    <div><div className="foo yellow"></div><span >Regular</span></div><br/>
                    <div><div className="foo green"></div><span >Class Cancelled</span></div><br/>
                    <div><div className="foo red"></div><span>Special Class</span></div><br/>
                </div>
            </Col>
        </Row>
        </Container>
    )
    return(theme?dark:light)
}