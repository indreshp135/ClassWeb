import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPhoto, showPage } from '../../../redux/student/photo/photoActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

export default function UploadPhotoForm() {
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const toggle = () => {
        dispatch(showPage());
    }
    const handleOnChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };
    const auth = useSelector(state => state.studentauth)
    const photostate = useSelector(state => state.studentphoto);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (photo) {
            console.log(photo);
            console.log(auth.user.id);
            dispatch(addPhoto(photo, auth.user.id));
        }
    };

    return (photostate.page ?
        <div className="h-100 placer">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="card card-block ">
            <h4 className="card-header">Change profile pic<div  id="close-sidebar" onClick={toggle}>
                <FontAwesomeIcon icon={faWindowClose}/>
            </div></h4>
              <div className="card-body">
              <p>Upload any JPG/JPEG files less than 2MB</p>
              <form onSubmit={handleFormSubmit} method="post"encType="multipart/form-data"className="upload-form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Choose Photo to upload</label>
                      <div className="input-group">
                        <input type="file" className="form-control" onChange={handleOnChange} required />
                      </div>
                      <div className="help-block with-errors text-danger" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <input type="submit" className={`${!photo ? 'disabled submit-btn' : 'submit-btn'}`} disabled={photo ? false : true} />
                  </div>
                </div>
              </form>
              <div className="clear" />
            </div>
          </div>
        </div>
      </div> : null
    );
};