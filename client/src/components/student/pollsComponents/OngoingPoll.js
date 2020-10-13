import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Button,Alert,Form} from 'react-bootstrap'
import {vote,end} from '../../../redux/student/auth/authActions'

export default function OngoingPoll() {
    const user = useSelector(state=>state.user)
    const theme = user.theme;
    const auth = useSelector(state=>state.studentauth)
    const classname = auth.class.classname
    const [msg,setmsg] = useState('')
    const CR = auth.user.CR;
    const dispatch = useDispatch()
    const regno = auth.user.regno
    const polls =auth.class.poll;
    const [o1,setO1] = useState(false);
    const [o2,setO2] = useState(false);
    const no1 = (e)=>{
        console.log({"o1":o1,"o2":o2})
        setO1(e.target.checked)
    }
    const no2 = (e)=>{
        console.log({"o1":o1,"o2":o2})
        setO2(e.target.checked);
    }
    var no = 0;
    function checkpresent(name){
        return name===regno
    }
    let showing;
    for(var i=0;i<polls.length;i++){
        if(!polls[i].resulted&&!polls[i].voted.find(checkpresent)){
            ++no
            if(no===1){
                showing=polls[i]
            }
        }
    }
    const End = (e)=>{
        const id = e.target.id;
        console.log(id);
        dispatch(end(id,classname))
    }
    const Vote = (e)=>{
        e.preventDefault();
        if(o1^o2){
            console.log({"o1":o1,"o2":o2})
            if(o1)
            dispatch(vote(regno,showing._id,1,classname))
            else
            dispatch(vote(regno,showing._id,2,classname))
            setmsg('');
        }
        else{
            console.log({"o1":o1,"o2":o2})
            setmsg('select one option')
        }
    }
    const lightnc = (
        <React.Fragment>
            <br/>
            <br/>
            <h4>Ongoing Polls</h4>
            {no===0?<center><span>No Polls Now</span></center>:
            <React.Fragment>
            <center><span>You have {no} ongoing polls</span></center>
            <div className="ongp light2">
            <Form >
                {msg?
                    <Alert variant="danger"> {msg}</Alert>
                :null}
                <h6><strong>Question </strong>:{showing.question}</h6>
                <strong>Options</strong>
                <Form.Check type='checkbox' label={showing.option1} onChange={no1}/>
                <Form.Check type='checkbox' label={showing.option2} onChange={no2}/>
                <Button type="submit" onClick={Vote} className="Vote" variant="success">Vote</Button>
            </Form>
            </div>
            </React.Fragment>
            }
        </React.Fragment>
    )
    const darknc = (
        <React.Fragment>
            <br/>
            <br/>
            <h4 className="dark-color">Ongoing Polls</h4>
            {no===0?<center><span className="dark-color">No Polls Now</span></center>:
            <React.Fragment>
            <center><span className="dark-color">You have {no} ongoing polls</span></center>
            <div className="ongp dark2">
            <Form >
                {msg?
                    <Alert variant="danger"> {msg}</Alert>
                :null}
                <h6><strong>Question </strong>:{showing.question}</h6>
                <strong>Options</strong>
                <Form.Check type='checkbox' className="dark-color" label={showing.option1} onChange={no1}/>
                <Form.Check type='checkbox' className="dark-color" label={showing.option2} onChange={no2}/>
                <Button type="submit" onClick={Vote} className="Vote" variant="success">Vote</Button>
            </Form>
            </div>
            </React.Fragment>
            }
        </React.Fragment>
    )
    const lightc = (
        <React.Fragment>
            <br/>
            <br/>
            <h4 >Ongoing Polls</h4>
            {no===0?<center><span >No Polls Now</span></center>:
            <React.Fragment>
            <center><span >You have {no} ongoing polls</span></center>
            {polls.map((poll)=>(poll.resulted?null:
            <div className="ongp light2">
                <h6><strong>Question </strong>:{poll.question}</h6>
                <strong>Options</strong>
                <br/>
                <span>{poll.option1 + '-' + poll.votes1}</span>
                <br/>
                <span>{poll.option2 + '-' + poll.votes2}</span>
                <br/>
                <Button type="submit" onClick={End} id={poll._id} className="Vote" variant="warning">End</Button>
            </div>))}
            </React.Fragment>
            }
        </React.Fragment>
    )
    const darkc = (
        <React.Fragment>
            <br/>
            <br/>
            <h4 className="dark-color">Ongoing Polls</h4>
            {no===0?<center><span className="dark-color">No Polls Now</span></center>:
            <React.Fragment>
            <center><span className="dark-color">You have {no} ongoing polls</span></center>
            {polls.map((poll)=>(poll.resulted?null:
            <div className="ongp dark2">
                <h6><strong className="dark-color">Question </strong>:{poll.question}</h6>
                <strong className="dark-color">Options</strong><br/>
                <span className="dark-color">{poll.option1 + '-' + poll.votes1}</span><br/>
                <span className="dark-color">{poll.option2 + '-' + poll.votes2}</span><br/>
                <Button type="submit" onClick={End} id={poll._id} className="Vote" variant="warning">End</Button>
            </div>))}
            </React.Fragment>
            }
        </React.Fragment>
    )
    return (
        CR?theme?darkc:lightc:theme?darknc:lightnc
    )
}
