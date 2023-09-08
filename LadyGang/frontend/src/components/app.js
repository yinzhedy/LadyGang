import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TestPage from "./testPage";
import RoomPage from "./RoomPage";

const App = () => {
    return (
        <div className="center">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/testpage" element={<TestPage />} />
                    <Route
                        path="/room/:roomCode"
                        element={<RoomPage />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
};

// Find the app div on the page
const appDiv = document.getElementById("app");
// Render the App component in the app div
render(<App />, appDiv);
