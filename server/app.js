//Packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const httpserver = require("http").createServer(app);
const io = require("socket.io")(httpserver);
require("dotenv").config();

//routes
const profroutes = require("./routes/prof");
const studentroutes = require("./routes/student");

//models
const Classroom = require("./models/Classroom");
const Prof = require("./models/Prof");

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGODB_URI;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }) // Adding new mongo url parser
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

const conn = mongoose.connection;

//Gridfs Storage Managers
let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
});

const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const originalname = file.originalname;
                const fileInfo = {
                    filename: filename,
                    originalname: originalname,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

//StudyMaterials
app.post(
    "/upload/:profname/:coursecode/:classname",
    upload.single("file"),
    async (req, res) => {
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const coursecode = req.params.coursecode;
        const profname = req.params.profname;
        const classname = req.params.classname;
        const studymaterial = {
            profname: profname,
            coursecode: coursecode,
            filename: filename,
            originalname: originalname,
        };
        await Classroom.findOneAndUpdate(
            { classname: classname },
            { $push: { studymaterial: studymaterial } }
        );
        res.send("done");
    }
);

//REQUEST TO CREATE ASSIGNMENT
app.post(
    "/assign/:profname/:coursecode/:classname",
    upload.single("file"),
    async (req, res) => {
        console.log(req.body.question);
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const question = req.body.question;
        const coursecode = req.params.coursecode;
        const profname = req.params.profname;
        const classname = req.params.classname;
        const assignment = {
            question: question,
            profname: profname,
            coursecode: coursecode,
            classname: classname,
            filename: filename,
            originalname: originalname,
        };
        console.log(assignment);
        await Classroom.findOneAndUpdate(
            { classname: classname },
            { $push: { assignment: assignment } }
        );
        await Prof.findOneAndUpdate(
            { name: profname },
            { $push: { assignment: assignment } }
        );

        res.send("done");
    }
);

app.put(
    "/assign/:profname/:coursecode/:classname/:id",
    upload.single("file"),
    async (req, res) => {
        // console.log(req.body.question);
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const question = req.body.question;
        const coursecode = req.params.coursecode;
        const profname = req.params.profname;
        const classname = req.params.classname;
        const id = req.params.id;
        const assignment = {
            question: question,
            profname: profname,
            coursecode: coursecode,
            classname: classname,
            filename: filename,
            originalname: originalname,
        };

        const prof = await Prof.findOne({ name: profname });
        let assignment1 = prof.assignment;
        await function () {
            
            for (i in assignment1) {
                if (assignment1[i]._id === id) {
                    assignment1[i] = assignment;
                }
            }
        };
        await console.log(assignment)
        await Classroom.findOneAndUpdate(
            { classname: classname },
            { $push: { assignment: assignment1 } }
        );
        await Prof.findOneAndUpdate(
            { name: profname },
            { $push: { assignment: assignment1 } }
        );
        res.send("done");
    }
);

app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/file/:filename", (req, res) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "no files exist",
            });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

const users = {};
const socketToRoom = {};

//sockets sender
io.on("connection", async socket => {
    //for Chat
    await socket.on("send", async data => {
        console.log(data);
        const messages = {
            sentby: data.sentby,
            message: data.message,
            photo: data.photo,
        };
        const he = await Classroom.findOneAndUpdate(
            { classname: data.room },
            { $push: { messages: messages } }
        );
        console.log(he);
        io.emit("recieve", data);
    });

    //For online Class
    await socket.on("roomcreated", async data => {
        console.log("roomcreated");
        const onlineclass = {
            happening: true,
            profname: data.profname,
            roomno: data.room,
        };
        io.emit("callroom", {
            room: data.room,
            profname: data.profname,
            classname: data.classname,
        });
        await Classroom.findOneAndUpdate(
            { classname: data.classname },
            { onlineclass: onlineclass }
        );
    });

    socket.on("reqClass", data => {
        io.emit("startClass", { room: data.roomID });
    });

    socket.on("classStarted", async data => {
        const onlineclass = { happening: false, profname: null, roomno: null };
        await Classroom.findOneAndUpdate(
            { classname: data.classname },
            { onlineclass: onlineclass }
        );
        io.emit("class", { roomID: data.roomID });
    });

    socket.on("classended", async data => {
        const onlineclass = { happening: false, profname: null, roomno: null };
        await Classroom.findOneAndUpdate(
            { classname: data.classname },
            { onlineclass: onlineclass }
        );
        io.emit("endclass", { roomID: data.roomID });
    });

    socket.on("joinroom", roomID => {
        if (users[roomID]) {
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit("user joined", {
            signal: payload.signal,
            callerID: payload.callerID,
        });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit("receiving returned signal", {
            signal: payload.signal,
            id: socket.id,
        });
    });

    socket.on("disconnect", () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
            const usersInThisRoom = users[roomID].filter(
                id => id !== socket.id
            );
            socket.emit("all users", usersInThisRoom);
        }
    });
});

//useRoutes
app.use("/prof", profroutes);
app.use("/student", studentroutes);

//Production Requirements
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../client/build"));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "..", "client", "build", "index.html")
        );
    });
}

module.exports = httpserver;
