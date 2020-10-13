"use strict";

var _require = require('express'),
    Router = _require.Router;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var nodemailer = require('nodemailer');

require('dotenv').config(); //  Model


var Prof = require('../../models/Prof');

var Token = require('../../models/Token');

var Timetable = require('../../models/Timetable'); //jwt secret


var JWT_SECRET = process.env.JWT_SECRET;
var router = Router(); //POST REQUEST FOR LOGIN

router.post('/login', function _callee(req, res) {
  var _req$body, email, password, user, isMatch, token, tt;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // Simple validation

          if (!(!email || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Prof.findOne({
            email: email
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
          return regeneratorRuntime.awrap(Timetable.findById(user.timetable));

        case 21:
          tt = _context.sent;
          console.log(tt);
          res.status(200).json({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              photo: user.profphoto,
              dept: user.dept,
              classroom: user.classroom,
              timetable: tt
            }
          });
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](3);
          res.status(400).json({
            msg: _context.t0.message
          });

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 26]]);
}); //PROF REGISTRATION

router.post('/register', function _callee2(req, res) {
  var _req$body2, email, name, dept, password, user, salt, hash, newtimetable, savedtimetable, newUser, savedUser, token, savedToken, transporter, mailOptions;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, name = _req$body2.name, dept = _req$body2.dept, password = _req$body2.password;

          if (!(!name || !email || !dept || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Prof.findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;

          if (!user) {
            _context2.next = 13;
            break;
          }

          if (!user.isVerified) {
            _context2.next = 12;
            break;
          }

          throw Error('User already exists ');

        case 12:
          res.status(500).json({
            resend: true,
            msg: 'Resend Verification mail?'
          });

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 15:
          salt = _context2.sent;

          if (salt) {
            _context2.next = 18;
            break;
          }

          throw Error('Something went wrong with bcrypt');

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 20:
          hash = _context2.sent;

          if (hash) {
            _context2.next = 23;
            break;
          }

          throw Error('Something went wrong hashing the password');

        case 23:
          newtimetable = new Timetable({
            classroomname: null,
            subject1: "free",
            subject2: "free",
            subject3: "free",
            subject4: "free",
            subject5: "free",
            subject6: "free",
            subject7: "free",
            subject8: "free",
            subject9: "free",
            subject10: "free",
            subject11: "free",
            subject12: "free",
            subject13: "free",
            subject14: "free",
            subject15: "free",
            subject16: "free",
            subject17: "free",
            subject18: "free",
            subject19: "free",
            subject20: "free",
            subject21: "free",
            subject22: "free",
            subject23: "free",
            subject24: "free",
            subject25: "free",
            type1: 1,
            type2: 1,
            type3: 1,
            type4: 1,
            type5: 1,
            type6: 1,
            type7: 1,
            type8: 1,
            type9: 1,
            type10: 1,
            type11: 1,
            type12: 1,
            type13: 1,
            type14: 1,
            type15: 1,
            type16: 1,
            type17: 1,
            type18: 1,
            type19: 1,
            type20: 1,
            type21: 1,
            type22: 1,
            type23: 1,
            type24: 1,
            type25: 1
          });
          _context2.next = 26;
          return regeneratorRuntime.awrap(newtimetable.save());

        case 26:
          savedtimetable = _context2.sent;
          newUser = new Prof({
            name: name,
            email: email,
            password: hash,
            dept: dept,
            timetable: savedtimetable._id
          });
          _context2.next = 30;
          return regeneratorRuntime.awrap(newUser.save());

        case 30:
          savedUser = _context2.sent;

          if (savedUser) {
            _context2.next = 33;
            break;
          }

          throw Error('Something went wrong saving the user');

        case 33:
          token = new Token({
            userid: savedUser._id,
            token: crypto.randomBytes(16).toString('hex')
          }); // Save the verification token

          savedToken = token.save();

          if (savedToken) {
            _context2.next = 37;
            break;
          }

          throw Error('Something went wrong saving the Token');

        case 37:
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
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/prof\/auth\/confirmation\/' + token.token + '.\n'
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
          _context2.next = 46;
          break;

        case 42:
          _context2.prev = 42;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
          res.status(400).json({
            msg: _context2.t0.message,
            resend: false
          });

        case 46:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 42]]);
}); //PROF EMAIL VERIFICATION

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
          return regeneratorRuntime.awrap(Prof.findByIdAndUpdate(userid, {
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
}); //PROF VERIFICATION EMAIL RESEND

router.post('/resend', function _callee4(req, res) {
  var _req$body3, email, name, dept, password, user, token, savedToken, transporter, mailOptions;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, name = _req$body3.name, dept = _req$body3.dept, password = _req$body3.password;

          if (!(!name || !email || !dept || !password)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: 'Please enter all fields'
          }));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Prof.findOne({
            email: email
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
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/prof\/auth\/confirmation\/' + token.token + '.\n'
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
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);
          res.status(400).json({
            msg: _context4.t0.message,
            resend: false
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 16]]);
}); //EXPORT

module.exports = router;