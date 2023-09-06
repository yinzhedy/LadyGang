import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import TestPage from "./testPage";
import RoomPage from "./RoomPage";



export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<HomePage/>}/>
                        <Route exact path='/join' element={<RoomJoinPage/>}/>
                        <Route exact path='/create' element={<CreateRoomPage/>}/>
                        <Route exact path='/testpage' element={<TestPage/>}/>
                        <Route path='/room/:roomCode' element={<RoomPage/>}/>
                    </Routes>
                </Router>
                </>
            </div>
        );
    }
}

//find the app div on the page
const appDiv = document.getElementById("app");
//render app component in app div
render(<App/>, appDiv)