//PACKAGES
const { Router } = require( 'express');
const router = Router();

//  Model
const Timetable = require( '../../models/Timetable');

//REQUEST TO UPDATE TIMETABLE
router.post('/update/:timeid',async(req,res)=>{
    const {subject,typen,index} = req.body;
    
    const timetableid= req.params.timeid;
    str1 = "subject"+index
    str2 = "type" + index;
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