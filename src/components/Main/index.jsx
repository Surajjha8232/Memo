import styles from "./styles.module.css";
import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Link,Routes,Navigate } from 'react-router-dom';
import ExcercisesList from '../excercises-list.component' ;
import Navbar from '../navbar.component';
import EditExcercises from '../edit-excercises.component' ;
import CreateExcercises from '../create-excercise.component';
import CreateUsers from '../create-user.component';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		window.location.reload();
	};

	return (
		


<div >
	<Navbar />
	<br />
	<Routes>
	<Route path='/' exact element={<ExcercisesList />} />
	<Route path='/create' exact element={<CreateExcercises />} />
	<Route path='/user' exact element={<CreateUsers />} />
	
	</Routes>  
	

</div>

	);
};

export default Main;