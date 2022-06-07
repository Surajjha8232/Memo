const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  

const ddlSchema = new Schema({
    ddltype:{ type:String},
    value:{type:String}, 
    
       

},{
timestamps: true ,
}); 





const Ddl = mongoose.model('Ddl',ddlSchema); 
module.exports= Ddl;