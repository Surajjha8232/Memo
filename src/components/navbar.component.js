import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Main/styles.module.css";

export default class Navbar extends Component {
    render(){
        const handleLogout = () => {
            localStorage.removeItem("token");
            window.location.reload();
        };
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerTracker</Link> 
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Excercises</Link> 
                        </li>
                        <li className="navbar-item">
                            <Link to="/createmeeting" className="nav-link">Create Meeting</Link> 
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link> 
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className={styles.white_btn} onClick={handleLogout}>Logout</Link> 
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}