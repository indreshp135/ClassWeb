import React, {  useState } from 'react';
import {useSelector} from 'react-redux'
import Progress from './Progress';
import axios from 'axios';
import { Input } from 'reactstrap';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const auth = useSelector(state => state.profauth)
  const profname = auth.user.name;
  const subjects = auth.user.classroom;
  const classnameoptions = subjects.map((op)=><option>{op.classname}</option>) 
  const coursecodeoptions = subjects.map((op)=><option>{op.coursecode}</option>) 
  const [cla,setCla] = useState('select');
  const [subject,setSubject] = useState('');
  const cc = (e)=>setCla(e.target.value)
  const ss = (e)=>setSubject(e.target.value)
  const user = useSelector(state=>state.user)
  const theme = user.theme
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`/upload/${profname}/${subject}/${cla}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const light =(
    <div>
        <br/>
        <h5>Study Material</h5>
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <Input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <Progress percentage={uploadPercentage} />
          <br/>
          <Input type="select" onChange={cc}>
            {subjects.length!==0?
            <option>Select Classname</option>
            :
            <option>Join a class </option>}
            {classnameoptions}
          </Input>
          <br/>
          <Input type="select" onChange={ss}>
            {subjects.length!==0?
            <option>Select Course code</option>
            :
            <option>Join a class </option>}
            {coursecodeoptions}
          </Input>
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
    </div>
  )
  const dark = (
      <div className = "dark-color">
      <br/>
      <h5>Study Material</h5>
    <form onSubmit={onSubmit}>
      <div className='custom-file mb-4'>
        <Input
          type='file'
          className='custom-file-input dark2 text-white'
          id='customFile'
          onChange={onChange}
        />
        <Progress percentage={uploadPercentage} className="dark2" />
        <br/>
        <Input type="select" onChange={cc}className="dark2 text-white">
          {subjects.length!==0?
            <option>Select Classname</option>
            :
            <option>Join a class </option>}
            {classnameoptions}
        </Input>
        <br/>
        <Input type="select" onChange={ss} className="dark2 text-white">
          {subjects.length!==0?<option>Select Course code</option>:<option>Join a class </option>}
          {coursecodeoptions}
        </Input>
        <label className='custom-file-label dark2 text-white' htmlFor='customFile'>
          {filename}
        </label>
      </div>
      <input
        type='submit'
        value='Upload'
        className='btn btn-primary btn-block mt-4'
      />
    </form>
  </div>
  )
  return(theme?dark:light)
}

export default FileUpload;