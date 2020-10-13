import React from 'react'
import { useSelector } from 'react-redux'
import {Table} from  'reactstrap'
export default function ResultedPoll() {
    const auth = useSelector(state => state.studentauth)
    const polls =auth.class.poll;
    var n=0;
    polls.map(poll=>poll.resulted?n++:null)
    var no = 0;
    const light =(
    <React.Fragment>
        <br/>
        <h4>Resulted Polls</h4>
        {n===0?<center><span>No Results Yet</span></center>:
        <Table striped >
            <thead className="light2">
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Won</th>
                </tr>
            </thead>
            <tbody>
                {polls.map(poll=>(poll.resulted?
                <tr>
                <td>{++no}</td>
                <td className="l-2x">{poll.question}</td>
                <td className="l-1x">{poll.result}</td>
                </tr>
                :null))}
            </tbody>
        </Table> 
        }
    </React.Fragment>
    )
    const dark = (
    <React.Fragment>
        <br/>
    <h4 className = "dark-color">Resulted Polls</h4>
    {no===0?<center><span className="dark-color">No Results Yet</span></center>:
    <Table dark striped >
        <thead className="dark2">
            <tr>
                <th>#</th>
                <th>Question</th>
                <th>Won</th>
            </tr>
        </thead>
        <tbody>
            {polls.map(poll=>(poll.resulted?
            <tr>
            <td>{++no}</td>
            <td className="l-2x">{poll.question}</td>
            <td className="l-1x">{poll.result}</td>
            </tr>
            :null))}
        </tbody>
    </Table> 
    }
    </React.Fragment>
    )
    const user= useSelector(state=>state.user)
    const theme = user.theme
    return (
        theme?dark:light
    )
}