const {Router} = require('express');
const router = Router();

//  Model
const Timetable = require( '../models/Timetable');
const Classroom = require( '../models/Classroom');

const classes =  ["ARCH","CHEM","CIV","CSE","EEE","ECE","ICE","MECH","MME","PROD"];
const years = [1,2,3,4,5];

router.get('/',async(req,res)=>{
    await classes.map(async(cla)=>{
        await years.map(async(year)=>{
            const newtimetable = new Timetable({
                classroomname:cla+year,  
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
            const newclassroom = new Classroom({
                classname:cla+year,
                timetable:savedtimetable._id
            })
            const savedclassroom= await newclassroom.save();
            if(!savedclassroom) 
                console.log("error");
        })
    })
    await res.send("done");
})

module.exports = router;
