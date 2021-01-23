const { Router } = require( 'express');
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
require('dotenv').config();

//  Model
const Prof = require( '../../models/Prof');
const Token = require( '../../models/Token');
const Timetable = require( '../../models/Timetable');
const Classroom = require('../../models/Classroom');

//jwt secret
const  JWT_SECRET  = process.env.JWT_SECRET;

const router = Router();

//POST REQUEST FOR LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
    try {
      // Check for existing user
      const user = await Prof.findOne({ email });
      if (!user) throw Error('User Does not exist');
      if(!user.verified)
        throw Error('Confirm your Webmail to login');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      if (!token) throw Error('Couldnt sign the token');
      
      const tt = await Timetable.findById(user.timetable)

      console.log(user.assignment)
      
      // console.log(tt);
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo:user.profphoto,
          dept:user.dept,
          classroom:user.classroom,
          timetable:tt,
          assignment:user.assignment,
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});


//PROF REGISTRATION
router.post('/register',async(req,res)=>{
  const { email,name,dept, password } = req.body;

  if (!name || !email ||!dept || !password )  {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try{
    const user = await Prof.findOne({ email });
    if(user){
      if (user.isVerified) throw Error('User already exists ');
      else res.status(500).json({resend:true,msg:'Resend Verification mail?'})
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');
    const newtimetable = new Timetable({  
        classroomname:null,
        subject1:"free",
        subject2:"free",
        subject3:"free",
        subject4:"free",
        subject5:"free",
        subject6:"free",
        subject7:"free",
        subject8:"free",
        subject9:"free",
        subject10:"free",
        subject11:"free",
        subject12:"free",
        subject13:"free",
        subject14:"free",
        subject15:"free",
        subject16:"free",
        subject17:"free",
        subject18:"free",
        subject19:"free",
        subject20:"free",
        subject21:"free",
        subject22:"free",
        subject23:"free",
        subject24:"free",
        subject25:"free",
        type1:1,
        type2:1,
        type3:1,
        type4:1,
        type5:1,
        type6:1,
        type7:1,
        type8:1,
        type9:1,
        type10:1,
        type11:1,
        type12:1,
        type13:1,
        type14:1,
        type15:1,
        type16:1,
        type17:1,
        type18:1,
        type19:1,
        type20:1,
        type21:1,
        type22:1,
        type23:1,
        type24:1,
        type25:1,
    })
    const savedtimetable = await newtimetable.save();
    const newUser = new Prof({
      name:name,
      email:email,
      password: hash,
      dept:dept,
      timetable:savedtimetable._id,
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');
    var token = new Token({userid: savedUser._id, token: crypto.randomBytes(16).toString('hex') });
 
    // Save the verification token
    var savedToken=token.save();
    if (!savedToken) throw Error('Something went wrong saving the Token');

    //Verification mail
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.GMAIL,
          pass: process.env.GPD
      }
    });
    var mailOptions = { to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/prof\/auth\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
      console.log(err);
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).json({msg :'A verification email has been sent to ' + email + '.'});
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({ msg: e.message ,resend:false});
  }
})

//PROF EMAIL VERIFICATION
router.get('/confirmation/:id',async(req,res)=>{
  const id=req.params.id;
  var token = await Token.findOne({token:id})
  var userid=token.userid;
  await Prof.findByIdAndUpdate(userid,{verified:true},(err,result)=>{
    if(err)
    {
      console.log(err);
    }
  })
  res.send("email verified");
})


//PROF VERIFICATION EMAIL RESEND
router.post('/resend',async(req,res)=>{
  const { email,name,dept, password } = req.body;

  if (!name || !email || !dept || !password )  {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try{
    const user = await Prof.findOne({ email });
    var token = new Token({userid: user._id, token: crypto.randomBytes(16).toString('hex') });
 
    // Save the verification token
    var savedToken=token.save();
    if (!savedToken) throw Error('Something went wrong saving the Token');

    //Verification mail
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.GMAIL,
          pass: process.env.GPD
      }
    });
    var mailOptions = { to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/prof\/auth\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).json({msg :'A verification email has been sent to ' + email + '.'});
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({ msg: e.message ,resend:false});
  }
})

//EXPORT
module.exports = router;
