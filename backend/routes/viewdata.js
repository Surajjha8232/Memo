const router = require('express').Router(); 
let Userdetail =require('../models/viewdata.model'); 

router.route('/').get((req,res) => {
        Userdetail.find()
        .then(userdetail => res.json(userdetail)) 
        .catch(err => res.status(400).json('Error: ' +err)); 
}); 

router.route('/add').post((req,res) => {
    const username = req.body.username; 

    const newUser = new Userdetail({username}); 
    newUser.save()
    .then(users => res.json('User Added!')) 
    .catch(err => res.status(400).json('Error: ' +err)); 

}); 

module.exports = router;