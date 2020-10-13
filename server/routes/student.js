//Packages
const {Router} =require('express')
const router = Router();

//routes
const authRoutes = require('./studentroutes/auth');
const photoRoutes = require('./studentroutes/photo'); 
const timetableRoutes = require ('./studentroutes/timetable');
const voteRoutes = require('./studentroutes/vote'); 

//useRoutes
router.use('/auth', authRoutes);
router.use('/photos',photoRoutes);
router.use('/timetable',timetableRoutes);
router.use('/vote',voteRoutes);

module.exports=router;