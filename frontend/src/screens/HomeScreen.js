import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeScreen(props) {
    
    return (
        <div className="home">
            <div className="welcome">
                Welcome to my todo app. This is an application that allows to manage a list of tasks to do. It performs adding, updating, deleting and toggling state of each task. It has minimalistic design and basic functionality. Kindly click on the signin or register below button to proceed.
            </div>
            <div className="welcome">
                <span className="reg"><Link to="/registration" className="link">Register</Link></span>
                <span className="reg"><Link to="/signin" className="link"> Sign in</Link></span>
            </div>
        </div>
    );
}

