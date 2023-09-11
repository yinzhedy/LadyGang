import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material'

const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme= useTheme();

    const handleMenuIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (e) => {
        setAnchorEl(null);
        const url = e.currentTarget.getAttribute('data-value');
        window.location.href = url;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" 
                sx={{
                backgroundColor: 'white',
                fontFamily: theme.typography.font_style.poppins,
                color: 'black',
                mr: 2,
                }}>
                <Toolbar >
                    <IconButton
                        id='nav-menu-icon-button'
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color="inherit"
                        sx={{
                            mr: 2,
                        }}
                        aria-controls={open ? 'nav-menu-icon-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenuIconClick}>
                            <MenuOutlinedIcon/>
                    </IconButton>
                    <Menu
                        id="nav-menu-icon-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuItemClick}
                        MenuListProps={{
                            'aria-labelledby': 'nav-menu-icon-button',
                        }}>
                        <MenuItem data-value='/' onClick={handleMenuItemClick} 
                            sx={{fontFamily: theme.typography.font_style.poppins,
                                fontWeight: theme.typography.font_weight.light}}>
                            Home</MenuItem>
                        <MenuItem data-value='/music' onClick={handleMenuItemClick }
                            sx={{fontFamily: theme.typography.font_style.poppins,
                                fontWeight: theme.typography.font_weight.light}}>
                            Music</MenuItem>
                        <MenuItem data-value='/support' onClick={handleMenuItemClick}
                            sx={{fontFamily: theme.typography.font_style.poppins,
                                fontWeight: theme.typography.font_weight.light}}>
                            Support</MenuItem>
                    </Menu>
                    <Button  sx={{
                            flexGrow: 0, // Don't take up all available space
                            '& .MuiTypography-root': {
                                fontSize: '1rem', // Customize the font size
                            },
                        }}
                        color='inherit'
                        onClick={() => { window.location.href = '/' }}>
                        <Typography variant="h6"
                            component="div"
                            sx={{
                                fontWeight: theme.typography.font_weight.light
                            }}
                            >
                        LadyGang
                        </Typography>
                    </Button>
                    <Button color="inherit"
                        sx={{
                            marginLeft: 'auto', // Pushes "Support" to the right
                            fontWeight: theme.typography.font_weight.light
                        }}
                        onClick={() => { window.location.href = '/support' }}
                        >
                        Support
                    </Button >
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
