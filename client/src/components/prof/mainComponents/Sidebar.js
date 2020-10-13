import React from 'react'
import noprof from '../../../images/noprofilepic.png'
import {Image} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {showPage} from '../../../redux/prof/photo/photoActions'
export default function Sidebar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.profauth);
    const user = useSelector(state => state.user)
    var username  = null;
    var email=null;
    var dept=null;
    if(auth.user&&auth.user)
    {
        username=auth.user.name;
        email=auth.user.email;
        dept=auth.user.dept;
    }
    
    const theme=user.theme;
    const pht = ()=>{
        dispatch(showPage())
    };
    const dark=(
        <div className="text-center dark-color">
            <br/>
            <h1>Profile</h1>
            {auth&&auth.user&&auth.user.photo?
            <Image src={`/prof/photos/${auth.user.photo}`} roundedCircle className="profilePic"/>
            :<Image src={`${noprof}`} roundedCircle  className="profilePic light2"/>
            }
            <br/>
            <span className="text-primary cursor-pointer" onClick={pht}>Change Profile Picture</span>
            <hr className="hr-dark"/>
            <h4>{username}</h4>
            <h6>{email}</h6>
            <h6>{dept}</h6>
        </div>
    )

    const light= (
        <div className="text-center">
            <br/>
            <h1>Profile</h1>
            {auth&&auth.user&&auth.user.photo?
            <Image src={`/prof/photos/${auth.user.photo}`} roundedCircle className="profilePic"/>
            :<Image src={`${noprof}`} roundedCircle  className="profilePic light2"/>
            }
            <br/>
            <span className="text-primary cursor-pointer" onClick={pht}>Change Profile Picture</span>
            <hr/>
            <h4>{username}</h4>
            <h6>{email}</h6>
            <h6>{dept}</h6>
        </div>
    )
    return(theme?dark:light)
}
