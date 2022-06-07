const router = require('express').Router(); 
const { resetWatchers } = require('nodemon/lib/monitor/watch');
let Meeting =require('../models/meeting.model');  

router.route('/').get((req,res) => {
    Meeting.find()
    .then(meeting => res.json(meeting)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 


module.exports = router;