import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {Form,Button,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {register,resend} from '../../../redux/student/auth/authActions'
export default function LoginForm() {
    const [regno, setregno] = useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const handleChangeregno = (e) => setregno(e.target.value);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const [msg,setmsg]= useState(null);
    const [message,setMessage]=useState(null);
    const error = useSelector(state => state.error);
    const auth = useSelector(state => state.studentauth);
    const dispatch = useDispatch();
    useEffect(() => {
      // Check for register error
      if (error.id==='REGISTER_FAIL') {
        setmsg(error.msg.msg);
      } else {
        setmsg(null);
      }
      if(auth.registerMessage){
        setMessage(auth.registerMessage);
      }
    }, [error,auth]);
    const submitForm =async(e)=>
    {
      e.preventDefault();
      const user = { regno,name, password };
      // Attempt to login
      await dispatch(register(user));
    }
    const submitResend = async(e)=>{
      e.preventDefault();
      const user = { regno,name, password };
      // Attempt to login
      await dispatch(resend(user));
    }
    const ResendButton =(
      <React.Fragment>
      <br/>
      <Button variant="danger" type="submit" onClick={submitResend}>
          Resend
      </Button>
      </React.Fragment>
    )
    return (
        <div className="form-box vertical-center">
            <h1>Student Portal</h1>
            <hr/>
            <Form method="post">
                {msg
                ?
                <Alert variant="danger"> {msg}</Alert>
                :null}
                {message?
                <Alert variant="success"> {message}</Alert>
                :null}
                <Form.Group >
                    <Form.Control type="text" name="regno" onChange={handleChangeregno} placeholder="Enter NITT Register No" />
                </Form.Group>
                <Form.Group >
                    <Form.Control type="text" name="name" onChange={handleChangeName} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Register
                </Button>
                {auth&&auth.resend?ResendButton:null}
            </Form>
            <hr/>
            Already Registered? 
            <Link to='/student/Login'>Login</Link>
        </div>
    )
}
