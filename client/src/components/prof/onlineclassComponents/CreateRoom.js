import React,{useRef, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Input } from 'reactstrap'
import {socket} from "../../../socket";
import {room} from '../../../redux/userStates/userActions'
import { v4 as uuidv4 } from 'uuid';
export default function CreateRoom() {
    const auth = useSelector(state => state.profauth)
    const user = useSelector(state => state.user)
    const classroom = auth.user.classroom
    const profname = auth.user.name
    const elements = classroom.map((classa)=>(<option>{classa.classname}</option>))
    const [classname, setclassname] = useState('select')
    const theme = user.theme
    let history = useHistory();
    const socketRef=useRef()
    const changeSubject = (e)=>setclassname(e.target.value)
    const dispatch = useDispatch()
    const create = ()=>{
        const roomID  = uuidv4();
        socketRef.current = socket;
        dispatch(room({roomID:roomID,classname:classname}))
        socketRef.current.emit("roomcreated",{room:roomID,profname:profname,classname:classname})        
        history.push(`/show/${roomID}`)
    }
    const light = (
        <div>
            <br/>
            <h2>Online Class</h2>
            <br/>
            <h6>Make sure to turn on microphone and camera from settings</h6>
            <br/>
            <Input type="select" name="subject" placeholder="Select" onChange={changeSubject}>
                {classroom.length===0?<option>join a class</option>:<option>select class name</option>}
                {elements}
            </Input>
            <br/>
            <Button variant="primary" onClick={create}> Create Virtual Class Room </Button>
        </div>
    )
    const dark = (
        <div className="dark1">
            <br/>
            <h2 className="dark-color">Online Class</h2>
            <br/>
            <h6 className="dark-color">Make sure to turn on microphone and camera from settings</h6>
            <br/>
            <Input type="select" name="subject" placeholder="Select" className="dark2 text-white" onChange={changeSubject}>
                {classroom.length===0?<option>join a class</option>:<option>select class name</option>}
                {elements}
            </Input>
            <br/>
            <Button variant="primary" onClick={create}> Create Virtual Class Room </Button>
        </div>
    )
    return (
        theme?dark:light
    )
}
