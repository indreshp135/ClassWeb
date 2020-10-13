import React,{useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {socket} from "../../../socket";
import {onlineclasson} from '../../../redux/student/auth/authActions'
export default function JoinRoom() {
    const auth = useSelector(state => state.studentauth)
    const onlineclass = auth.class.onlineclass;
    const user = useSelector(state => state.user)
    const room = onlineclass.roomno;
    const classname = auth.class.classname
    const theme = user.theme
    let history = useHistory();
    const socketRef=useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        socketRef.current = socket;
        socketRef.current.on('endclass',async (data)=>{
            if(data.roomID===room){
                const obj = {roomno:null,profname:null,happening:false}
                dispatch(onlineclasson(obj))
            }
        })
        socketRef.current.on('callroom',data=>{
            if(data.classname===classname){
                const obj = {roomno:data.room,profname:data.profname,happening:true}
                dispatch(onlineclasson(obj))
            }
        })
    }, [classname,room,dispatch])
    const connect = ()=>{
        history.push(`/watch/${room}`)
    }
    const light = (
        <div>
            <br/>
            <h2>Online Class</h2>
            <br/>
            <h6>Make sure to turn on microphone from settings</h6>
            <br/>
            {onlineclass&&onlineclass.happening?<Button variant="primary" onClick={connect}> Join Virtual Class Room </Button> :<span>No Classes now</span>}
        </div>
    )
    const dark = (
        <div className="dark1">
            <br/>
            <h2 className="dark-color">Online Class</h2>
            <br/>
            <h6 className="dark-color">Make sure to turn on microphone from settings</h6>
            <br/>
            {onlineclass.happening?<Button variant="primary" onClick={connect}> Join Virtual Class Room </Button> :<span className="dark-color">No Classes now</span>}
        </div>
    )
    return (
        theme?dark:light
    )
}
