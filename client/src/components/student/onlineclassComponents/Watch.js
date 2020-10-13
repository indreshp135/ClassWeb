import React, { useEffect, useRef, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {socket} from "../../../socket";
import Peer from "simple-peer";
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap';
import {onlineclasson} from '../../../redux/student/auth/authActions'
const Stream = (props) => {
    const ref = useRef();
    const [state,setstate] = useState('')
    useEffect(() => {
        props.peer.on("stream", stream => {
            console.log(stream.getTracks()[0]&&stream.getTracks()[0].kind)
            stream.getVideoTracks()[0]&&stream.getVideoTracks()[0].kind==="video"?setstate('video'):(stream.getTracks()[0]&&stream.getTracks()[0].kind?setstate('audio'):setstate(''))
            ref.current.srcObject = stream;
        })
    }, [props.peer]);
    return (state==='video'?
        <video playsInline autoPlay ref={ref}className="videobox"/>:state==='audio'?<audio ref={ref}/>:null
    );
}


export default function WatchRoom() {
    let history = useHistory()
    const dispatch = useDispatch()
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const peersRef = useRef([]);
    const auth = useSelector(state => state.studentauth)
    const CR = auth.user.CR;
    const user = useSelector(state => state.user)
    const theme = user.theme;
    const roomID = auth.class.onlineclass.roomno;
    const [requestclass,req] = useState(true) 
    const [classs,setclasss] = useState(false)
    useEffect(() => {
        socketRef.current = socket;
        socketRef.current.on('endclass',async (data)=>{
            if(data.roomID===roomID){
                const obj = {roomno:null,profname:null,happening:false}
                await dispatch(onlineclasson(obj))
                history.push('/student/home')
                window.location.reload(false);
            }
        })
        socketRef.current.on('class',data=>{
            if(data.roomID===roomID)
                setclasss(true);
        })
        navigator.mediaDevices.getUserMedia({ video:false, audio: true }).then(stream => {
            socketRef.current.emit("joinroom", roomID);
            socketRef.current.on("all users", users => {
                console.log(users)
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
              const item = peersRef.current.find(p => p.peerID === payload.callerID);
              if(!item){
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                setPeers(users => [...users, peer]);
              }
                
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    },[roomID,history,dispatch]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })
        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })
        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })
        peer.signal(incomingSignal);
        return peer;
    }
    const requestClass = ()=>{
        socketRef.current.emit('reqClass',{roomID:roomID})
        req(false)
    }
    return (
        <React.Fragment>
            <br/>
    
            {peers.map((peer, index) => {
                return (
                    <Stream key={index} peer={peer} />
                );
            })}
            
            <br/>
            {classs?null:
                requestclass&&CR?    
                <Button variant="danger" type="submit" className="pos" onClick={requestClass}>
                    Send Request to Start Class
                </Button>
                :theme?<h5 className="dark-color">Waiting for Professor to Start Class</h5>:<h5>Waiting for Professor to Start Class</h5>
            }
        </React.Fragment>
    )
}