import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Button,Alert} from 'react-bootstrap'
import {Input} from 'reactstrap'
import {createpoll} from '../../../redux/student/auth/authActions'
export default function CreatePoll() {
    const [q,setQ] = useState('');
    const [o1,setO1] =useState('');
    const [o2,setO2] = useState('');
    const [msg,setmsg] = useState('');
    const user = useSelector(state=>state.user)
    const theme = user.theme;
    const auth = useSelector(state=>state.studentauth)
    const classname = auth.class.classname
    const [show,setShow] = useState(true)
    const dispatch = useDispatch();
    const Show = ()=> setShow(false)
    const cQ = (e)=> setQ(e.target.value)
    const cO1 = (e)=> setO1(e.target.value)
    const cO2 = (e)=> setO2(e.target.value)
    const Submit = (e)=> {
        e.preventDefault()
        if(q===''||o1===''||o2==='')
            setmsg('Please Enter All The Fields')
        else{
            dispatch(createpoll(q,o1,o2,classname))
            setShow(true)
        }
    }
    const light=(
        <React.Fragment>
        <h4>Create Poll</h4>
        {msg?
            <Alert variant="danger"> {msg}</Alert>
        :null}
        {show?
            <Button onClick={Show} variant="primary">
                Create a new Poll
            </Button>
        :   
            <React.Fragment>
                <br/>
                <Input type="text" placeholder="Question" onChange={cQ}/>
                <br/>
                <Input type="text" placeholder="Option 1" onChange={cO1}/>
                <br/>
                <Input type="text" placeholder="Option 2" onChange={cO2}/>
                <br/>
                <Button onClick={Submit} variant="warning">
                    Create a new Poll
                </Button>
            </React.Fragment>
        }
        </React.Fragment>
    )
    const dark = (
        <React.Fragment>
        <h4 className="dark-color">Create Poll</h4>
        {msg?
            <Alert variant="danger"> {msg}</Alert>
        :null}
        {show?
            <Button onClick={Show} variant="primary">
                Create a new Poll
            </Button>
        :   
            <React.Fragment>
                <br/>
                <Input className="dark2 text-white" type="text" placeholder="Question" onChange={cQ}/>
                <br/>
                <Input className="dark2 text-white" type="text" placeholder="Option 1" onChange={cO1}/>
                <br/>
                <Input className="dark2 text-white" type="text" placeholder="Option 2" onChange={cO2}/>
                <br/>
                <Button onClick={Submit} variant="warning">
                    Create a new Poll
                </Button>
            </React.Fragment>
        }
        </React.Fragment>
    ) 
    return (theme?dark:light)
}
