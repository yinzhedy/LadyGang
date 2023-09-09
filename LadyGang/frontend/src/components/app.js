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
import dotenv from 'dotenv';


const theme = createTheme({
    palette: {
        rose: {
          main: '#BD4F6C',
          dark: "#853249",
          light: '#D2899C'
          
        },
        vanilla: {
          main: '#FFF9A5',
          light: '#FFFDD6',
          very_light: '#FFFEEB'
        },
        fairy_pink: {
            main: '#FFCBDD',
            light: '#FFEBF2',
            dark: '#FF70A2',
            very_dark: '#F50056'
          },
        azure: {
          main: '#89DAFF',
          dark: '#47C5FF',
          very_dark: '#47C5FF',
          light: '#C2ECFF'
        },
        grey: {
            main: '#9DB4C0',
            dark: '#6A8DA0',
            very_dark: '#405764',
            light: '#CDD9DF'
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
