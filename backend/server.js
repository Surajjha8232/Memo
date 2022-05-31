const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose') ;

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(cors()); 
app.use(express.json());  

const uri = 'mongodb+srv://memo:memo123@cluster0.cikoc.mongodb.net/?retryWrites=true' 
mongoose.connect(uri); 

const connection = mongoose.connection; 
connection.once('open',() => {
	console.log("MongoDB database connection established succesfully");
})


const viewData = require('./routes/viewdata');
const excercisesRouter = require('./routes/excercises'); 

app.use('/viewdata',viewData);
app.use('/excercises',excercisesRouter);


app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
