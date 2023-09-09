import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import MusicHomePage from "./MusicHomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SupportPage from "./SupportPage";
import RoomPage from "./RoomPage";
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';

const theme = createTheme({
    palette: {
        rose: {
          main: '#BD4F6C',
        },
        vanilla: {
          main: '#FFF9A5',
        },
        fairy_pink: {
            main: '#FFCBDD',
          },
        pale_azure: {
          main: '#89DAFF',
        },
        cadet_grey: {
            main: '#9DB4C0',
        }
      },
});

createTheme();

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <NavBar/>
        <div className="center">
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path='/music' element={<MusicHomePage/>}/>
                    <Route path="/music/join" element={<RoomJoinPage />} />
                    <Route path="/music/create" element={<CreateRoomPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route
                        path="/music/room/:roomCode"
                        element={<RoomPage />}
                    />
                </Routes>
            </Router>
        </div>
    </ThemeProvider>
    );
};

// Find the app div on the page
const appDiv = document.getElementById("app");
// Render the App component in the app div
render(<App />, appDiv);
