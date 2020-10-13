import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {Form,Button,Alert} from 'react-bootstrap';
import {useHistory,Link} from 'react-router-dom'
import {login} from '../../../redux/prof/auth/authActions'
export default function LoginForm() {
    let history = useHistory();
    const [email, setemail] = useState('');
    const [password,setPassword]=useState('');
    const handleChangeemail = (e) => setemail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const [msg,setmsg]= useState(null);
    const error = useSelector(state => state.error);
    const auth = useSelector(state => state.profauth);
    const dispatch = useDispatch();
    useEffect(() => {
      // Check for register error
      if (error.id==='LOGIN_FAIL') {
        setmsg(error.msg.msg);
      } else {
        setmsg(null);
      }
      if(auth.isAuthenticated)
        history.push('/prof/home');
    }, [error,auth,history]);
    const submitForm =async(e)=>
    {
      e.preventDefault();
      const user = { email, password };
      // Attempt to login
      await dispatch(login(user));
    }
    return (
      
        <div className="form-box vertical-center">
            <h1>Professor Portal</h1>
            <hr/>
            <Form method="post">
                {msg
                ?
                <Alert variant="danger"> {msg}</Alert>
                :null}
                <Form.Group >
                  <Form.Control type="email" name="email" onChange={handleChangeemail} placeholder="Enter Your Email Address" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Your Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Login
                </Button>
            </Form>
            <hr/>
            <Link to='/prof/register'>Register Here</Link>
        </div>
    )
}