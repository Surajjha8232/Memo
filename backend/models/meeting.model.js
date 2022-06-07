const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const meetingSchema = new Schema({
        NOM:{ type:String,required:true},
        TOM:{type:String,required:true}, 
        Status:{type:String,required:true}, 
        Criticality:{type:String,required:true}, 
        date:{type:Date,required:true}, 
        duration:{type:Number,required:true},   
        attendees: {
            _id:{type: mongoose.Schema.Types.ObjectId,  ref: 'Userdetail'},
            attendance:{type:String}
          } ,
        discussionpoints:{type:Array}, 
        agendapoints:{type:Array} ,
        savedBy:{type:mongoose.Schema.Types.ObjectId,ref:'Userdetail'}

},{
    timestamps: true ,
}); 

const Meeting = mongoose.model('Meeting',meetingSchema); 
module.exports= Meeting;