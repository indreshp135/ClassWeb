import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
export default function JoinRoom() {
    const auth = useSelector(state => state.studentauth)
    const onlineclass = auth.class.onlineclass;
    const user = useSelector(state => state.user)
    const room = onlineclass.roomno;
    const theme = user.theme
    let history = useHistory();
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
