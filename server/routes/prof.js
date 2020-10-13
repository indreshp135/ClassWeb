//Packages
const {Router} =require('express')
const router = Router();

//routes
const authRoutes = require('./profroutes/auth');
const classRoutes = require('./profroutes/class');
const photoRoutes = require('./profroutes/photo'); 
const timetableRoutes = require('./profroutes/timetable');

//useRoutes
router.use('/auth', authRoutes);
router.use('/class', classRoutes);
router.use('/photos',photoRoutes);
router.use('/timetable',timetableRoutes);

module.exports=router;