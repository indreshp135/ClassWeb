//PACKAGES
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

//  Model
const Student = require("../../models/Student");
const Token = require("../../models/Token");
const Classroom = require("../../models/Classroom");
const Timetable = require("../../models/Timetable");
const Poll = require("../../models/Poll");

//jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

//ROUTER
router.post("/login", async (req, res) => {
    const { regno, password } = req.body;

    // Simple validation
    if (!regno || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        // Check for existing user
        const user = await Student.findOne({ regno });
        if (!user) throw Error("User Does not exist");
        if (!user.verified) throw Error("Confirm your Webmail to login");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error("Invalid credentials");

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        if (!token) throw Error("Couldnt sign the token");

        //Check for class
        const classs = await Classroom.findOne({ classname: user.classname });
        const tt = await Timetable.findById(classs.timetable);
        let pl = [];
        for (var i = 0; i < classs.poll.length; i++) {
            p = await Poll.findById(classs.poll[i]);
            pl.push(p);
        }
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                regno: user.regno,
                photo: user.studentphoto,
                dept: user.dept,
                year: user.year,
                classname: user.classname,
                CR: user.CR,
                result: user.result,
            },
            class: {
                messages: classs.messages,
                classname: classs.classname,
                subjects: classs.subjects,
                poll: pl,
                timetable: tt,
                studymaterial: classs.studymaterial,
                onlineclass: classs.onlineclass,
                assignment: classs.assignment,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

router.post("/register", async (req, res) => {
    const { regno, name, password } = req.body;

    if (!name || !regno || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    var n = regno.length;
    var k = regno.slice(0, 1);
    if (n !== 9 || k != "1") {
        return res
            .status(400)
            .json({ msg: "Enter Proper NITT Register Number" });
    }
    var cl = regno.slice(1, 3);
    var classCode = parseInt(cl);
    var dept = "";
    var classroomname = "";
    switch (classCode) {
        case 1:
            dept = "Architecture";
            classroomname = "ARCH";
            break;
        case 2:
            dept = "Chemical Engineering";
            classroomname = "CHEM";
            break;
        case 3:
            dept = "Civil Engineering";
            classroomname = "CIV";
            break;
        case 6:
            dept = "Computer Science and Engineering";
            classroomname = "CSE";
            break;
        case 7:
            dept = "Electrical and Electronics Engineering";
            classroomname = "EEE";
            break;
        case 8:
            dept = "Electronics and Communication Engineering";
            classroomname = "ECE";
            break;
        case 10:
            dept = "Instrumentation and Control Engineering";
            classroomname = "ICE";
            break;
        case 11:
            dept = "Mechanical Engineering";
            classroomname = "MECH";
            break;
        case 12:
            dept = "Metallurgical and Materials Engineering";
            classroomname = "MME";
            break;
        case 14:
            dept = "Production Engineering";
            classroomname = "PROD";
            break;
        default:
            return res
                .status(400)
                .json({ msg: "Enter Proper NITT Register Number" });
    }
    var yr = parseInt(regno.slice(4, 6));
    var year = "";
    switch (yr) {
        case 20:
            year = "First Year";
            classroomname += "1";
            break;
        case 19:
            year = "Second Year";
            classroomname += "2";
            break;
        case 18:
            year = "Third Year";
            classroomname += "3";
            break;
        case 17:
            year = "Final Year";
            classroomname += "4";
            break;
        case 16:
            year = "Passed Out";
            classroomname += "5";
            break;
        default:
            return res
                .status(400)
                .json({ msg: "Enter Proper NITT Register Number" });
    }
    try {
        const user = await Student.findOne({ regno });
        if (user) {
            if (user.verified) throw Error("User already exists ");
            else
                res.status(500).json({
                    resend: true,
                    msg: "Resend Verification mail?",
                });
        }

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Something went wrong with bcrypt");

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error("Something went wrong hashing the password");

        const newUser = new Student({
            name: name,
            regno: regno,
            password: hash,
            year: year,
            dept: dept,
            classname: classroomname,
        });
        email = regno + "@nitt.edu";
        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Something went wrong saving the user");
        var token = new Token({
            userid: savedUser._id,
            token: crypto.randomBytes(16).toString("hex"),
        });

        // Save the verification token
        var savedToken = token.save();
        if (!savedToken) throw Error("Something went wrong saving the Token");

        //Verification mail
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GPD,
            },
        });
        var mailOptions = {
            to: email,
            subject: "Account Verification Token",
            text:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                req.headers.host +
                "/student/auth/confirmation/" +
                token.token +
                ".\n",
        };
        transporter.sendMail(mailOptions, function (err) {
            console.log(err);
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            res.status(200).json({
                msg: "A verification email has been sent to " + email + ".",
            });
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message, resend: false });
    }
});

router.get("/confirmation/:id", async (req, res) => {
    const id = req.params.id;
    var token = await Token.findOne({ token: id });
    var userid = token.userid;
    await Student.findByIdAndUpdate(
        userid,
        { verified: true },
        (err, result) => {
            if (err) {
                console.log(err);
            }
        }
    );
    res.send("email verified");
});

router.post("/resend", async (req, res) => {
    const { regno, name, password } = req.body;

    if (!name || !regno || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    try {
        const user = await Student.findOne({ regno });
        var token = new Token({
            userid: user._id,
            token: crypto.randomBytes(16).toString("hex"),
        });

        // Save the verification token
        var savedToken = token.save();
        if (!savedToken) throw Error("Something went wrong saving the Token");

        email = regno + "@nitt.edu";

        //Verification mail
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GPD,
            },
        });
        var mailOptions = {
            to: email,
            subject: "Account Verification Token",
            text:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                req.headers.host +
                "/student/auth/confirmation/" +
                token.token +
                ".\n",
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            res.status(200).json({
                msg: "A verification email has been sent to " + email + ".",
            });
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message, resend: false });
    }
});

module.exports = router;
