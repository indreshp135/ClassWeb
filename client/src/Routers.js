import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {socket} from './socket'
import {useDispatch, useSelector} from 'react-redux'
import FirstPage from './components/FirstPage'
import ProfLogin from './components/prof/authComponents/Login'
import ProfRegister from './components/prof/authComponents/Register'
import ProfHomepage from './components/prof/homePage/Homepage'
import ProfTimeTable from './components/prof/timetableComponents/TimeTable'
import ProfJoinClass from './components/prof/joinclassComponents/JoinClass'
import ProfStudyMaterial from './components/prof/studymaterialComponents/StudyMaterial'
import ProfPublishResult from './components/prof/publishresultComponents/PublishResult'
import ProfAppointCR from './components/prof/appointcrComponents/AppointCR'
import Login from './components/student/authComponents/Login'
import Register from './components/student/authComponents/Register'
import Homepage from './components/student/homePage/Homepage'
import TimeTable from './components/student/timetableComponents/TimeTable'
import StudyMaterials from './components/student/studymaterialsComponents/StudyMaterials'
import Polls from './components/student/pollsComponents/Polls.js'
import Chat from './components/student/chatComponents/Chat.js'
import Results from './components/student/resultComponents/Results';
import {UploadPhotoForm} from './components/prof/mainComponents/UploadPhotoForm' 
import StudentUploadPhotoForm from './components/student/mainComponents/UploadPhotoForm' 
import OnlineClass from './components/student/onlineclassComponents/OnlineClass'
import WatchRoom from './components/student/onlineclassComponents/WatchRoom'
import ProfOnlineClass from './components/prof/onlineclassComponents/OnlineClass'
import BroadcasrRoom from './components/prof/onlineclassComponents/BroadcastRoom'
import {onlineclasson} from './redux/student/auth/authActions'
import {recievemessage} from './redux/student/auth/authActions'
export default function Routers (){
    const user = useSelector(state => state.user)
    const theme=user.theme;
    const th = theme?"dark1":"light1";
    const auth = useSelector(state => state.studentauth)
    const onlineclass = auth && auth.class && auth.class.onlineclass;
    const room = onlineclass && onlineclass.roomno;
    const classname = auth && auth.class && auth.class.classname
    const socketRef = React.useRef();
    const dispatch = useDispatch();
    React.useEffect(() => {
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

    const roomName = auth && auth.class && auth.class.classname;
    const mes = auth && auth.class && auth.class.messages;
    const [messages,setMessages] = React.useState([...mes]);
    React.useEffect(()=>{
        socketRef.current = socket;
        socketRef.current.on('recieve',data=>{
            if(data.room===roomName){
              dispatch(recievemessage({sentby:data.sentby,photo:data.photo,message:data.message}))
              setMessages(old=>[...old,{sentby:data.sentby,photo:data.photo,message:data.message}])
            }
        })
    },[roomName,dispatch])

    return(
        <div className={`whole ${th}`}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <FirstPage/>
                    </Route>
                    <Route path="/prof/login"exact>
                        <ProfLogin/>
                    </Route>
                    <Route path="/prof/register"exact>
                        <ProfRegister/>
                    </Route>
                    <Route path="/prof/home" exact>
                        <ProfHomepage/>
                    </Route>
                    <Route path="/prof/Time Table" exact>
                        <ProfTimeTable/>
                    </Route>
                    <Route path="/prof/Join Class" exact>
                        <ProfJoinClass/>
                    </Route>
                    <Route path="/prof/Appoint CR" exact>
                        <ProfAppointCR/>
                    </Route>
                    <Route path="/prof/Publish Results" exact>
                        <ProfPublishResult/>
                    </Route>
                    <Route path="/prof/Study Material" exact>
                        <ProfStudyMaterial/>
                    </Route>
                    <Route path="/prof/Online Class" exact>
                        <ProfOnlineClass/>
                    </Route>
                    <Route path="/show/:roomID" exact>
                        <BroadcasrRoom/>
                    </Route>
                    <Route path="/student/login"exact>
                        <Login/>
                    </Route>
                    <Route path="/student/register"exact>
                        <Register/>
                    </Route>
                    <Route path="/student/home" exact>
                        <Homepage/>
                    </Route>
                    <Route path="/student/Time Table" exact>
                        <TimeTable/>
                    </Route>
                    <Route path="/student/Study Material" exact>
                        <StudyMaterials/>
                    </Route>
                    <Route path="/student/Results" exact>
                        <Results/>
                    </Route>
                    <Route path="/student/Polls" exact>
                        <Polls/>
                    </Route>
                    <Route path="/student/Chat" exact>
                        <Chat messages = {messages}/>
                    </Route>
                    <Route path="/student/Online Class" exact>
                        <OnlineClass/>
                    </Route>
                    <Route path="/watch/:roomID" exact>
                        <WatchRoom/>
                    </Route>
                </Switch>
            </Router>
            <UploadPhotoForm/>
            <StudentUploadPhotoForm/>
        </div>
    )
}