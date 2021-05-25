const { Router } = require("express");
const router = Router();

//Models
const Classroom = require("../../models/Classroom");
const Prof = require("../../models/Prof");
const Student = require("../../models/Student");

//REQUEST TO JOIN A CLASS
router.post("/join", async (req, res) => {
    const { id, coursecode, profname, classname } = req.body;
    try {
        const subj = { classname: classname, coursecode: coursecode };
        const subj1 = { profname: profname, coursecode: coursecode };
        await Prof.findByIdAndUpdate(id, { $push: { classroom: subj } });
        await Classroom.findOneAndUpdate(
            { classname: classname },
            { $push: { subjects: subj1 } }
        );
        const data = await Prof.findById(id);
        res.status(200).send(data.classroom);
    } catch (e) {
        res.status(404).json({ msg: e.message });
        console.log(e);
    }
});

//REQUEST TO APPOINT A CR
router.post("/appoint", async (req, res) => {
    const { regno } = req.body;
    try {
        const show = await Student.findOneAndUpdate(
            { regno: regno },
            { CR: true }
        );
        if (!show) res.send(regno + " not yet registered");
        else res.send("Appointed " + regno + " as CR");
    } catch {
        res.send(regno + " not yet registered as CR");
    }
});



//REQUEST TO PUBLISH STUDENTS MARKS
router.post("/publish", async (req, res) => {
    const { regno, coursecode, testtype, marks } = req.body;
    try {
        const result = {
            coursecode: coursecode,
            marks: marks,
            testtype: testtype,
        };
        const show = await Student.findOneAndUpdate(
            { regno: regno },
            { $push: { result: result } }
        );
        if (!show) res.send(regno + " not yet registered ");
        else res.send("Result Sent");
    } catch (e) {
        res.send(regno + " not yet registered");
    }
});

//EXPORT
module.exports = router;
