import React, { useEffect, useRef, useState } from "react";
import {socket} from "../../../socket";
import {useSelector,useDispatch} from 'react-redux'
import Peer from "simple-peer";
import Tooltip from '@material-ui/core/Tooltip';
import {Button,Row,Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {classs} from '../../../redux/userStates/userActions'
const Audio = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            if(ref.current)
            ref.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <audio playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height:'400px',
    width: '300px'
};


export default function Broadcast (){
    let history = useHistory()
    const [peers, setPeers] = useState([]);
    const [startClass,set] = useState(false);
    const dispatch = useDispatch();
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const user = useSelector(state => state.user)
    const roomID = user.roomID;
    const classname = user.classname;
    const started = user.started;
    const [stream,setStream] =useState()
    useEffect(() => {
        socketRef.current = socket;
        socketRef.current.on('startClass',data=>{
            if(data.room===roomID){
                set(true);
            }
        })
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            setStream(stream)
            socketRef.current.emit("joinroom", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                    peer._debug = console.log
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

    },[roomID] );

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
    const start = ()=>{
        dispatch(classs())
        socketRef.current.emit('classStarted',{classname:classname,roomID:roomID})
        window.location.reload(false);
    }
    const end = async()=>{
        await dispatch(classs())
        await stream.getTracks().forEach(function(track) {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
        await socketRef.current.emit('classended',{roomID:roomID,classname:classname})
        await history.push('/prof/home');
        window.location.reload(false);
    }
    return (
        <React.Fragment>
            <video muted ref={userVideo} autoPlay playsInline className="videobox" />
            {peers.map((peer, index) => {
                return (
                    <Audio key={index} peer={peer} />
                );
            })}
            <Row>
            {started?null:
            startClass?
            <Col>
            <Button variant="primary" type="submit" className="posbutton" onClick={start}>
                Start
            </Button>
            </Col>
            :
            <Col>
            <Tooltip title="Waiting for CR's request">
                    <Button variant="primary" type="submit"  className="posbutton cursor-disabled" disabled>
                        Start
                    </Button>
            </Tooltip>
            </Col>
            }
            <Col>
            <br/>
            <Button variant="danger" type="submit" onClick={end} className="posbutton">
                end
            </Button>
            </Col>
            </Row>
        </React.Fragment>
    );
};
