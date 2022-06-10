import React, { Component } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link,Routes,Navigate } from 'react-router-dom';
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login"; 
import FrontPage from "./components/FrontPage";
import ExcercisesList from './components/excercises-list.component' ;
import Navbar from './components/navbar.component';
import EditExcercises from './components/edit-excercises.component' ;
import CreateExcercises from './components/create-excercise.component';
import CreateUsers from './components/create-user.component';
import CreateMeeting from './components/create-meeting.component';



function App() {
	const user = localStorage.getItem("token"); 
	
	

	

	return (
    <Router>
		<Routes> 
			<Route path="/frontpage"  exact element = {<FrontPage />} />
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/create" exact element={<CreateExcercises />} />
			{user && <Route path="/createmeeting" exact element={<CreateMeeting />} />}
			{user && <Route path="/user" exact element={<CreateUsers />} />}

			<Route path='/edit/:id' element={<EditExcercises />} /> 
			<Route path="/" element={<Navigate replace to="/frontpage" />} /> 
			
		</Routes>
    </Router>
	);
}
// frontpage changed  to login 

export default App;