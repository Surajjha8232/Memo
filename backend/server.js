const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose') ;

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000; 

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
const userRouter = require('./routes/userdetail'); 
const authRouter = require('./routes/auth'); 
const ddlRouter = require('./routes/ddl'); 
const meetingRouter = require('./routes/meeting'); 




app.use('/viewdata',viewData);
app.use('/excercises',excercisesRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/ddl',ddlRouter);
app.use('/meeting',meetingRouter);






app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
