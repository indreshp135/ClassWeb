"use strict";

//PACKAGES
var _require = require('express'),
    Router = _require.Router;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var nodemailer = require('nodemailer');

require('dotenv').config(); //  Model


var Student = require('../../models/Student');

var Token = require('../../models/Token');

var Classroom = require('../../models/Classroom');

var Timetable = require('../../models/Timetable');

var Poll = require('../../models/Poll'); //jwt secret


var JWT_SECRET = process.env.JWT_SECRET;
var router = Router(); //ROUTER

router.post('/login', function _callee(req, res) {
  var _req$body, regno, password, user, isMatch, token, classs, tt, pl, i;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, regno = _req$body.regno, password = _req$body.password; // Simple validation

          if (!(!regno || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Student.findOne({
            regno: regno
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          throw Error('User Does not exist');

        case 9:
          if (user.verified) {
            _context.next = 11;
            break;
          }

          throw Error('Confirm your Webmail to login');

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 13:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 16;
            break;
          }

          throw Error('Invalid credentials');

        case 16:
          token = jwt.sign({
            id: user._id
          }, JWT_SECRET);

          if (token) {
            _context.next = 19;
            break;
          }

          throw Error('Couldnt sign the token');

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(Classroom.findOne({
            classname: user.classname
          }));

        case 21:
          classs = _context.sent;
          _context.next = 24;
          return regeneratorRuntime.awrap(Timetable.findById(classs.timetable));

        case 24:
          tt = _context.sent;
          pl = [];
          i = 0;

        case 27:
          if (!(i < classs.poll.length)) {
            _context.next = 35;
            break;
          }

          _context.next = 30;
          return regeneratorRuntime.awrap(Poll.findById(classs.poll[i]));

        case 30:
          p = _context.sent;
          pl.push(p);

        case 32:
          i++;
          _context.next = 27;
          break;

        case 35:
          res.status(200).json({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              regno: user.regno,
              photo: user.studentphoto,
              dept: user.dept,
              year: user.year,
              classname: user.classname,
              CR: user.CR,
              result: user.result
            },
            "class": {
              messages: classs.messages,
              classname: classs.classname,
              subjects: classs.subjects,
              poll: pl,
              timetable: tt,
              studymaterial: classs.studymaterial,
              onlineclass: classs.onlineclass
            }
          });
          _context.next = 42;
          break;

        case 38:
          _context.prev = 38;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.status(400).json({
            msg: _context.t0.message
          });

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 38]]);
});
router.post('/register', function _callee2(req, res) {
  var _req$body2, regno, name, password, n, k, cl, classCode, dept, classroomname, yr, year, user, salt, hash, newUser, savedUser, token, savedToken, transporter, mailOptions;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, regno = _req$body2.regno, name = _req$body2.name, password = _req$body2.password;

          if (!(!name || !regno || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          n = regno.length;
          k = regno.slice(0, 1);

          if (!(n !== 9 || k != "1")) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Enter Proper NITT Register Number'
          }));

        case 7:
          cl = regno.slice(1, 3);
          classCode = parseInt(cl);
          dept = "";
          classroomname = "";
          _context2.t0 = classCode;
          _context2.next = _context2.t0 === 1 ? 14 : _context2.t0 === 2 ? 17 : _context2.t0 === 3 ? 20 : _context2.t0 === 6 ? 23 : _context2.t0 === 7 ? 26 : _context2.t0 === 8 ? 29 : _context2.t0 === 10 ? 32 : _context2.t0 === 11 ? 35 : _context2.t0 === 12 ? 38 : _context2.t0 === 14 ? 41 : 44;
          break;

        case 14:
          dept = "Architecture";
          classroomname = "ARCH";
          return _context2.abrupt("break", 45);

        case 17:
          dept = "Chemical Engineering";
          classroomname = "CHEM";
          return _context2.abrupt("break", 45);

        case 20:
          dept = "Civil Engineering";
          classroomname = "CIV";
          return _context2.abrupt("break", 45);

        case 23:
          dept = "Computer Science and Engineering";
          classroomname = "CSE";
          return _context2.abrupt("break", 45);

        case 26:
          dept = "Electrical and Electronics Engineering";
          classroomname = "EEE";
          return _context2.abrupt("break", 45);

        case 29:
          dept = "Electronics and Communication Engineering";
          classroomname = "ECE";
          return _context2.abrupt("break", 45);

        case 32:
          dept = "Instrumentation and Control Engineering";
          classroomname = "ICE";
          return _context2.abrupt("break", 45);

        case 35:
          dept = "Mechanical Engineering";
          classroomname = "MECH";
          return _context2.abrupt("break", 45);

        case 38:
          dept = "Metallurgical and Materials Engineering";
          classroomname = "MME";
          return _context2.abrupt("break", 45);

        case 41:
          dept = "Production Engineering";
          classroomname = "PROD";
          return _context2.abrupt("break", 45);

        case 44:
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Enter Proper NITT Register Number'
          }));

        case 45:
          yr = parseInt(regno.slice(4, 6));
          year = "";
          _context2.t1 = yr;
          _context2.next = _context2.t1 === 20 ? 50 : _context2.t1 === 19 ? 53 : _context2.t1 === 18 ? 56 : _context2.t1 === 17 ? 59 : _context2.t1 === 16 ? 62 : 65;
          break;

        case 50:
          year = "First Year";
          classroomname += "1";
          return _context2.abrupt("break", 66);

        case 53:
          year = "Second Year";
          classroomname += "2";
          return _context2.abrupt("break", 66);

        case 56:
          year = "Third Year";
          classroomname += "3";
          return _context2.abrupt("break", 66);

        case 59:
          year = "Final Year";
          classroomname += "4";
          return _context2.abrupt("break", 66);

        case 62:
          year = "Passed Out";
          classroomname += "5";
          return _context2.abrupt("break", 66);

        case 65:
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Enter Proper NITT Register Number'
          }));

        case 66:
          _context2.prev = 66;
          _context2.next = 69;
          return regeneratorRuntime.awrap(Student.findOne({
            regno: regno
          }));

        case 69:
          user = _context2.sent;

          if (!user) {
            _context2.next = 76;
            break;
          }

          if (!user.verified) {
            _context2.next = 75;
            break;
          }

          throw Error('User already exists ');

        case 75:
          res.status(500).json({
            resend: true,
            msg: 'Resend Verification mail?'
          });

        case 76:
          _context2.next = 78;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 78:
          salt = _context2.sent;

          if (salt) {
            _context2.next = 81;
            break;
          }

          throw Error('Something went wrong with bcrypt');

        case 81:
          _context2.next = 83;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 83:
          hash = _context2.sent;

          if (hash) {
            _context2.next = 86;
            break;
          }

          throw Error('Something went wrong hashing the password');

        case 86:
          newUser = new Student({
            name: name,
            regno: regno,
            password: hash,
            year: year,
            dept: dept,
            classname: classroomname
          });
          email = regno + "@nitt.edu";
          _context2.next = 90;
          return regeneratorRuntime.awrap(newUser.save());

        case 90:
          savedUser = _context2.sent;

          if (savedUser) {
            _context2.next = 93;
            break;
          }

          throw Error('Something went wrong saving the user');

        case 93:
          token = new Token({
            userid: savedUser._id,
            token: crypto.randomBytes(16).toString('hex')
          }); // Save the verification token

          savedToken = token.save();

          if (savedToken) {
            _context2.next = 97;
            break;
          }

          throw Error('Something went wrong saving the Token');

        case 97:
          //Verification mail
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL,
              pass: process.env.GPD
            }
          });
          mailOptions = {
            to: email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/student\/auth\/confirmation\/' + token.token + '.\n'
          };
          transporter.sendMail(mailOptions, function (err) {
            console.log(err);

            if (err) {
              return res.status(500).send({
                msg: err.message
              });
            }

            res.status(200).json({
              msg: 'A verification email has been sent to ' + email + '.'
            });
          });
          _context2.next = 106;
          break;

        case 102:
          _context2.prev = 102;
          _context2.t2 = _context2["catch"](66);
          console.log(_context2.t2);
          res.status(400).json({
            msg: _context2.t2.message,
            resend: false
          });

        case 106:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[66, 102]]);
});
router.get('/confirmation/:id', function _callee3(req, res) {
  var id, token, userid;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Token.findOne({
            token: id
          }));

        case 3:
          token = _context3.sent;
          userid = token.userid;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Student.findByIdAndUpdate(userid, {
            verified: true
          }, function (err, result) {
            if (err) {
              console.log(err);
            }
          }));

        case 7:
          res.send("email verified");

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/resend', function _callee4(req, res) {
  var _req$body3, regno, name, password, user, token, savedToken, transporter, mailOptions;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, regno = _req$body3.regno, name = _req$body3.name, password = _req$body3.password;

          if (!(!name || !regno || !password)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Student.findOne({
            regno: regno
          }));

        case 6:
          user = _context4.sent;
          token = new Token({
            userid: user._id,
            token: crypto.randomBytes(16).toString('hex')
          }); // Save the verification token

          savedToken = token.save();

          if (savedToken) {
            _context4.next = 11;
            break;
          }

          throw Error('Something went wrong saving the Token');

        case 11:
          email = regno + "@nitt.edu"; //Verification mail

          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL,
              pass: process.env.GPD
            }
          });
          mailOptions = {
            to: email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/student\/auth\/confirmation\/' + token.token + '.\n'
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({
                msg: err.message
              });
            }

            res.status(200).json({
              msg: 'A verification email has been sent to ' + email + '.'
            });
          });
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);
          res.status(400).json({
            msg: _context4.t0.message,
            resend: false
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 17]]);
});
module.exports = router;