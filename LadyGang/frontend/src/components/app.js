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
import RoomSettingsPage from "./RoomSettingsPage";


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
        chloe_beige:{
          main: '#FEE2C6'
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
      typography: {
        font_style: {
          poppins: {
            fontFamily: 'Poppins, sans-serif'
          },
          chloe: {
            fontFamily: 'Playfair Display, serif'
          },
          raleway: {
            fontFamily: 'Raleway, sans-serif'
          },
          sacramento: {
            fontFamily: 'Sacramento, cursive'
          },
          julius: {
            fontFamily: 'Julius Sans One, sans-serif'
          },
          josefin: {
            fontFamily: 'Josefin Sans, sans-serif'
          },
          elsie_swash: {
            fontFamily: 'Elsie Swash Caps, cursive'
          },
          elsie: {
            fontFamily: 'Elsie, cursive'
          },
          cormorant_sc: {
            fontFamily: 'Cormorant SC, serif'
          },
          cormorant_infant: {
            fontFamily: 'Cormorant Infant, serif'
          },
          cormorant_garamond: {
            fontFamily: 'Cormorant Garamond, serif'
          },
          antic: {
            fontFamily: 'Antic Didone, serif'
          },
        },
        font_weight: {
          thin: {
            fontWeight: '100'
          },
          extra_light: {
            fontWeight: '200'
          },
          light: {
            fontWeight: '300'
          },
          regular: {
            fontWeight: '400'
          },
          medium: {
            fontWeight: '500'
          },
          semi_bold: {
            fontWeight: '600'
          },
          bold: {
            fontWeight: '700'
          },
          extra_bold: {
            fontWeight: '800'
          },
          black: {
            fontWeight: '900'
          }
        },
        font_size: {
          xs: {
            fontSize: '1vmin'
          },
          s: {
            fontSize: '1.5vmin'
          },
          m: {
            fontSize: '3vmin'
          },
          l: {
            fontSize: '4vmin'
          },
          xl: {
            fontSize: '5vmin'
          },
          title: {
            fontSize: '6vmin'
          },
          hero: {
            fontSize: '11vmin'
          }
        }
        
      },
});

createTheme();

const App = () => {

    return (
    <ThemeProvider theme={theme}>
        <NavBar/>
        <div className="full_width full_height">
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path='/music' element={<MusicHomePage/>}/>
                    <Route path="/music/join" element={<RoomJoinPage />} />
                    <Route path="/music/create" element={<CreateRoomPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route
                        path="/music/room/:roomCode"
                        element={<RoomPage />}/>
                    <Route 
                        path="/music/room/:roomCode/settings"
                        element={<RoomSettingsPage/>}/>
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
