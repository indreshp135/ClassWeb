import React, { useState,useEffect,useRef } from "react";
import {socket} from "../../../socket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import noprof from '../../../images/noprofilepic.png'
import {Image} from 'react-bootstrap'
import {recievemessage} from '../../../redux/student/auth/authActions'
import ScrollableFeed from 'react-scrollable-feed'
export default function ChatBox(props) {
    const dispatch = useDispatch()
    const [message, setmessage] = useState('')
    const auth = useSelector(state=>state.studentauth);
    const user = useSelector(state=>state.user);
    const room = auth.class.classname;
    const photo = auth.user.photo
    const name = auth.user.name;
    const messages = props.messages;
    const socketRef = useRef();
    socketRef.current = socket;
    const theme = user.theme;
    const change = (e)=>setmessage(e.target.value)
    const Submit = (e)=>{
        if(message!==''){
        socketRef.current.emit('send',{sentby:name,photo:photo,message:message,room:room})
        setmessage('')
      }
    }
    const handleKeyDown = (event) => {
      console.log(event)
    if (event.key === 'Enter') {
      Submit();
    }
  }
    const light = (
      <center className="chatfull">
        
      <div className="chatbox light2">
      <h4>Class Chat</h4>
        <ScrollableFeed>
          {
            messages.map(mes=>(
              mes.sentby===name?
              <div className="right-it">
                <div className="message-it">{mes.message}</div>
                {mes.photo?
                <Image src = {`/student/photos/${mes.photo}`}className="ph"/>
                :
                <Image src = {noprof} className="ph"/>
                }
              </div>
              :
              <div className="left-it">
                <div className="name-it">{mes.sentby}</div>
                <div className="message-it">{mes.message}</div>
                {mes.photo?
                <Image src = {`/student/photos/${mes.photo}`}className="ph"/>
                :
                <Image src = {noprof}className="ph"/>
                }
              </div>
            ))
          }
        </ScrollableFeed>
      </div>
      <div className="type_msg">
        <div className="input_msg_write">
          <input type="text" className="write_msg" value={message} placeholder="Type a message" onKeyDown={handleKeyDown} onChange={change}/>
          <button className="msg_send_btn" type="button"onClick={Submit}><FontAwesomeIcon icon={faPaperPlane}/> </button>
        </div>
      </div>
      </center>
    )
    const dark = (
      <center className="chatfull ">
      <div className="chatbox dark2">
      <h4 className="dark-color">Class Chat</h4>
        <ScrollableFeed>
          {
            messages.map(mes=>(
              mes.sentby===name?
              <div className="right-it">
                <div className="message-it">{mes.message}</div>
                {mes.photo?
                <Image src = {`/student/photos/${mes.photo}`}className="ph"/>
                :
                <Image src = {noprof} className="ph"/>
                }
              </div>
              :
              <div className="left-it">
                <div className="name-it">{mes.sentby}</div>
                <div className="message-it">{mes.message}</div>
                {mes.photo?
                <Image src = {`/student/photos/${mes.photo}`}className="ph"/>
                :
                <Image src = {noprof}className="ph"/>
                }
              </div>
            ))
          }
        </ScrollableFeed>
      </div>
      <div className="type_msg dark2">
        <div className="input_msg_write">
          <input type="text" className="write_msg dark2 text-white" value={message}  placeholder="Type a message"onKeyDown={handleKeyDown} onChange={change}/>
          <button className="msg_send_btn" type="button"onClick={Submit}><FontAwesomeIcon icon={faPaperPlane}/> </button>
        </div>
      </div>
      </center>
    )

    return(
        theme?dark:light
    )
}