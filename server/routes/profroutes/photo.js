//PACKAGES
const express = require('express');
const multer = require('multer');

//MODELS
const Photo = require('../../models/Photo');
const Prof = require('../../models/Prof');
const Router = express.Router();

//MIDDLEWARE
const upload = multer({
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error('only upload files with jpg or jpeg format.'));
    }
    cb(undefined, true); // continue with upload
  }
});

//UPLOAD PHOTO REQUEST
Router.post('/upload/:id',upload.single('photo'),
  async (req, res) => {
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;
      const id = req.params.id;
      await photo.save();
      Prof.findByIdAndUpdate(id,{profphoto:photo._id},function(err,res){if(err)console.log(err)});
      res.status(201).json({ _id: photo._id });
    } catch (error) {
      res.status(500).json({
        msg: 'Error while uploading file...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

//TO GET PHOTO
Router.get('/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});

//EXPORT
module.exports = Router;