import React from 'react'
import noprof from '../../../images/noprofilepic.png'
import {Image} from 'react-bootstrap'
import {Badge} from 'reactstrap'
import { useSelector,useDispatch } from 'react-redux'
import {showPage} from '../../../redux/student/photo/photoActions'
export default function Sidebar() {
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.studentauth);
    const user = useSelector(state => state.user)
    const username=auth.user.name;
    const CR = auth.user.CR;
    const regno=auth.user.regno;
    const year=auth.user.year;
    const dept=auth.user.dept;
    const webmail=regno+"@nitt.edu";
    const theme=user.theme;
    const pht = ()=>{
        dispatch(showPage())
    };
    const dark=(
        <div className="text-center dark-color">
            <br/>
            <h1>Profile</h1>
            {auth&&auth.user&&auth.user.photo?
            <Image src={`/student/photos/${auth.user.photo}`} roundedCircle className="profilePic"/>
            :<Image src={`${noprof}`} roundedCircle  className="profilePic light2"/>
            }
            <br/>
            <span className="text-primary cursor-pointer" onClick={pht}>Change Profile Pic</span>
            <hr className="hr-dark"/>
            <h4>{username + '  '}{CR?<Badge color="success">CR</Badge>:null}</h4>
            <h6>{regno}</h6>
            <h6>{webmail}</h6>
            <h6>{year}</h6>
            <h6>B.Tech</h6>
            <h6>{dept}</h6>
        </div>
    )

    const light= (
        <div className="text-center">
            <br/>
            <h1>Profile</h1>
            {auth&&auth.user&&auth.user.photo?
            <Image src={`/student/photos/${auth.user.photo}`} roundedCircle className="profilePic"/>
            :<Image src={`${noprof}`} roundedCircle  className="profilePic light2"/>
            }
            <br/>
            <span className="text-primary cursor-pointer" onClick={pht}>Change Profile Pic</span>
            <hr/>
            <h4>{username + '  ' }{CR?<Badge color="success">CR</Badge>:null}</h4>
            <h6>{regno}</h6>
            <h6>{webmail}</h6>
            <h6>{year}</h6>
            <h6>B.Tech</h6>
            <h6>{dept}</h6>
        </div>
    )
    return(theme?dark:light)
}
