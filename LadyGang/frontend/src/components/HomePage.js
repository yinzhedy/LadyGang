import React, { useState, useEffect } from 'react';
import { useTheme, Box, Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
    console.log('hi im homepage')
    const navigate = useNavigate();
    const theme = useTheme()


    useEffect(() => {
        console.log('this is the homepage')
    }, []);

    const testFontSizes = () => {
        return(
            <div>
                <Typography sx={{ fontSize: theme.typography.font_size.xs }}>
                    Extra Small
                </Typography>
                <Typography sx={{ fontSize: theme.typography.font_size.s }}>
                    Small
                </Typography>
                <Typography sx={{ fontSize: theme.typography.font_size.m }}>
                    Medium
                </Typography>
                <Typography sx={{ fontSize: theme.typography.font_size.l}}>
                    Large
                </Typography>
                <Typography sx={{ fontSize: theme.typography.font_size.xl }}>
                    Extra Large
                </Typography>
                <Typography sx={{ fontSize: theme.typography.font_size.title }}>
                    Title
                </Typography>
            </div>
        )
    }

    const testFontStyles = () => {
        return(
            <div>
                <Typography sx={{ fontFamily: theme.typography.font_style.chloe }}>
                    This is Chloe font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.poppins }}>
                    This is Poppins font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.raleway }}>
                    This is Raleway font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.sacramento}}>
                    This is Sacramento font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.elsie_swash }}>
                    This is Eslie Swash font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.elsie }}>
                    This is Eslie font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.cormorant_sc }}>
                    This is Cormorant SC font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.cormorant_infant}}>
                    This is Cormorant Infant font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.cormorant_garamond }}>
                    This is Cormorant Garamond font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.antic }}>
                    This is Antic font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.josefin }}>
                    This is Josefin font .
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.julius }}>
                    This is Julius font .
                </Typography>
            </div>
        )
    }

    return (
        <Box id='landing_page_hero' sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            wrap: 'wrap',
            marginTop: '0',
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.chloe_beige.main }}>
        <Grid container spacing={3}>
            
            <Grid item xs={12} align='center'>
                <Typography
                    id='hero'
                    className=''
                    variant='h1'
                    component='h1'
                    sx={{
                        fontFamily: theme.typography.font_style.chloe,
                        fontWeight: theme.typography.font_weight.bold,
                        fontSize: theme.typography.font_size.hero,
                        color: 'white',
                        paddingTop: '8%'
                    }}>
                    Lady Gang.
                </Typography>
                <Typography sx={{ fontFamily: theme.typography.font_style.sacramento,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.thin,
                                color: 'black' }}>
                    welcome
                </Typography>
                
            </Grid>
            <Grid item xs={12} align='center' >
            <ButtonGroup disableElevation variant='contained'
                sx={{
                    backgroundColor: 'white',
                    paddingTop: '10%',
                    borderRadius: '2px',
                    padding: '2%',
                }}>
                <Button
                    onClick={() => { navigate('/music')}}
                    sx={{
                        backgroundColor: theme.palette.chloe_beige.main,
                        ':hover': {
                            color: 'white',
                            bgcolor: theme.palette.chloe_beige.main
                        },
                        color: 'inherit',
                        fontFamily: theme.typography.font_style.poppins,
                        fontSize: theme.typography.font_size.m,
                        fontWeight: theme.typography.font_weight.extra_light,
                    }}>
                    Music
                </Button>
            </ButtonGroup>
            </Grid>
        </Grid>
        </Box>
    )
};

export default HomePage;