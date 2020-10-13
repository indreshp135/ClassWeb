import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {Form,Button,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {register,resend} from '../../../redux/prof/auth/authActions'
export default function LoginForm() {
    const [email, setemail] = useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [dept,setDept]=useState('');
    const handleChangeemail = (e) => setemail(e.target.value);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangeDept = (e)=>setDept(e.target.value)
    const [msg,setmsg]= useState(null);
    const [message,setMessage]=useState(null);
    const error = useSelector(state => state.error);
    const auth = useSelector(state => state.profauth);
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
      const user = { email,name,dept, password };
      // Attempt to login
      await dispatch(register(user));
    }
    const submitResend = async(e)=>{
      e.preventDefault();
      const user = { email,name,dept, password };
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
            <h1>Professor Portal</h1>
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
                  <Form.Control type="email" name="email" onChange={handleChangeemail} placeholder="Enter Email Address" />
                </Form.Group>
                <Form.Group >
                  <Form.Control type="text" name="name" onChange={handleChangeName} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group>
                  <Form.Control name="dept"  as="select" onChange={handleChangeDept} placeholder="Select Department">
                    <option>Select Department</option>
                    <option>Architecture</option>
                    <option>CECASE</option>
                    <option>Chemical Engineering</option>
                    <option>Chemistry</option>
                    <option>Civil Engineering</option>
                    <option>Computer Application</option>
                    <option>CEESAT</option>
                    <option>Computer Science and Engineering</option>
                    <option>Electrical and Electronics Engineering</option>
                    <option>Electronics and Communication Engineering</option>
                    <option>Humainities and Social Science</option>
                    <option>Instrumentation and Control Engineering</option>
                    <option>Management Studies</option>
                    <option>Mathematics</option>
                    <option>Mechanical Engineering</option>
                    <option>Metallurgical and Materials Engineering</option>
                    <option>Physics</option>
                    <option>Production Engineering</option>
                  </Form.Control>  
                </Form.Group>
                <Form.Group>
                  <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Register
                </Button>
                {auth&&auth.resend ?ResendButton:null}
            </Form>
            <hr/>
            Already Registered? 
            <Link to='/prof/Login'>Login</Link>
        </div>
    )
}
