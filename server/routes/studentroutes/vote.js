//PACKAGES
const { Router } = require( 'express');
const router = Router();

//  Model
const Classroom = require( '../../models/Classroom');
const Poll = require('../../models/Poll')

//POST REQUEST TO CREATE POLL
router.post('/create/:classname',async(req,res)=>{
    const {question,option1,option2} = req.body;
    const classname = req.params.classname;
    const newpoll = new Poll( {question:question,option1:option1,votes1:0,option2:option2,votes2:0,resulted:false})
    const pl = await newpoll.save()
    const classs = await Classroom.findOneAndUpdate({classname:classname},{$push:{poll:pl._id}})
    pll=[]
    for (var i=0;i<classs.poll.length;i++){
        p = await Poll.findById(classs.poll[i])
        pll.push(p);
    }
    pll.push(newpoll);
    res.send(pll);
})

//POST REQUEST TO VOTE
router.post('/vt/:classname',async(req,res)=>{
    const {regno,id,optionno} = req.body;
    const classname = req.params.classname;
    if(optionno===1){
        const pl =await Poll.findById(id)
        opt = pl.votes1 + 1;
        await Poll.findByIdAndUpdate(id,{votes1:opt,$push:{voted:regno}})
    }
    else if(optionno===2){
        const pl =await Poll.findById(id)
        opt = pl.votes2 + 1;
        await Poll.findByIdAndUpdate(id,{votes2:opt,$push:{voted:regno}})
    }
    const classs = await Classroom.findOne({classname:classname})
    pll=[]
    for (var i=0;i<classs.poll.length;i++){
        p = await Poll.findById(classs.poll[i])
        pll.push(p);
    }
    res.send(pll);
})

//REQUEST TO END POLL
router.post('/end',async(req,res)=>{
    const {id,classname} = req.body;
    const poll = await Poll.findById(id)
    let result;
    if(poll.votes1>poll.votes2){
        result=poll.option1;
    }else if(poll.votes1<poll.votes2){
        result=poll.option2;
    }else{
        result='tie'
    }
    await Poll.findByIdAndUpdate(id,{resulted:true,result:result});
    const classs = await Classroom.findOne({classname:classname})
    pll=[]
    for (var i=0;i<classs.poll.length;i++){
        p = await Poll.findById(classs.poll[i])
        pll.push(p);
    }
    res.send(pll);    
})

module.exports=router;