import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {Form,Button,Alert} from 'react-bootstrap';
import {useHistory,Link} from 'react-router-dom'
import {login} from '../../../redux/student/auth/authActions'
export default function LoginForm() {
    let history = useHistory();
    const [regno, setregno] = useState('');
    const [password,setPassword]=useState('');
    const handleChangeregno = (e) => setregno(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const [msg,setmsg]= useState(null);
    const error = useSelector(state => state.error);
    const auth = useSelector(state => state.studentauth);
    const dispatch = useDispatch();
    useEffect(() => {
      // Check for register error
      if (error.id==='LOGIN_FAIL') {
        setmsg(error.msg.msg);
      } else {
        setmsg(null);
      }
      if(auth.isAuthenticated)
        history.push('/student/home');
    }, [error,auth,history]);
    const submitForm =async(e)=>
    {
      e.preventDefault();
      const user = { regno, password };
      // Attempt to login
      await dispatch(login(user));
    }
    return (
      
        <div className="form-box vertical-center">
            <h1>Student Portal</h1>
            <hr/>
            <Form method="post">
                {msg
                ?
                <Alert variant="danger"> {msg}</Alert>
                :null}
                <Form.Group >
                    <Form.Control type="text" name="regno" onChange={handleChangeregno} placeholder="Enter NITT Register No" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Login
                </Button>
            </Form>
            <hr/>
            <Link to='/student/register'>Register Here</Link>
        </div>
    )
}