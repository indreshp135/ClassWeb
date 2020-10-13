//PACKAGES
const { Router } = require( 'express');
const router = Router();

//  Model
const Classroom = require( '../../models/Classroom');
const Timetable = require('../../models/Timetable');

//ROUTES
router.post('/update/:classname',async(req,res)=>{
    const {subject,typen,index} = req.body;
    const classname = req.params.classname;
    const classroom = await Classroom.findOne({classname:`${classname}`});
    const timetableid= classroom.timetable;
    str1 = "subject"+index
    str2 = "type" + index;;
    obj = `{${str1}:'${subject}',${str2}:'${typen}'}`
    eval("var ob ="+ obj)
    await Timetable.findByIdAndUpdate(timetableid,ob)
    tt = await Timetable.findById(timetableid);
    try{
        res.send(tt);
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

//EXPORT
module.exports = router;