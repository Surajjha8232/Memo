const router = require('express').Router(); 
const { resetWatchers } = require('nodemon/lib/monitor/watch');
let Ddl =require('../models/ddl.model');  

router.route('/').get((req,res) => {
    Ddl.find()
    .then(ddl => res.json(ddl)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 
router.route('/findCriticality').get((req,res) => {
    Ddl.find({"ddltype":"Criticality"})
    .then(ddl => res.json(ddl)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 

router.route('/findStatus').get((req,res) => {
    Ddl.find({"ddltype":"Status"})
    .then(ddl => res.json(ddl)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 
router.route('/findTom').get((req,res) => {
    Ddl.find({"ddltype":"TOM"})
    .then(ddl => res.json(ddl)) 
    .catch(err => res.status(400).json('Error: ' +err)); 
}); 
router.route('/add').post((req,res) => {
    const ddltype = req.body.ddltype; 
    const value = req.body.value;
    

    const newDdl= new Ddl({
        ddltype,
        value
    }); 
    newDdl.save()
    .then(() => res.json('Ddl Added!')) 
    .catch(err => res.status(400).json('Error: ' +err)); 

}); 


module.exports = router;
