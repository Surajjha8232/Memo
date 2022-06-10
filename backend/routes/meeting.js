const router = require('express').Router(); 
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const Meeting =require('../models/meeting.model');  
const { protect } =require('../middleware/authMiddleware'); 
const passport = require('passport'); 
const jwt = require('jsonwebtoken');
router.route('/').get(protect,async (req,res) => {
    await Meeting.find()
    .then(meeting => res.json(meeting)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 

router.route('/addmeeting').post(protect,async (req,res) => { 
    
    const NOM = req.body.NOM; 
    const TOM = req.body.TOM; 
    const date = Date.parse(req.body.date); 
    const duration = Number(req.body.duration); 
    const savedBy= req.user._id;  
    const newMeeting= new Meeting({
        NOM,
        TOM,
        date,
        duration,
        savedBy
    
    });  
    console.log(newMeeting.NOM);
    console.log(newMeeting);
    await newMeeting.save()
    .then(() => res.json('Meeting Added!')) 
    .catch(err => res.status(400).json('Error: ' +err));  
});

module.exports = router;