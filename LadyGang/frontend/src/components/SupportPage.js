import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    FormControl,
    TextField,
    CardActions,
    Button,
    FormHelperText,
} from '@mui/material'
import { useTheme } from '@mui/material'

const SupportPage = () => {
    const theme = useTheme()
    const [formMessage, setFormMessage] = useState('');
    
    const handleFormMessageChange = (e) => {
        setFormMessage(e.target.value)
    }

    const handleSendButtonClicked = () => {
        console.log(formMessage)
    }


    return(
        <React.Fragment>
            <Grid container spacing={1}
            component="span"
            sx={{ 
                display: 'inline-block',
                mx: '2px',
                transform: 'scale(1.5)'}}
            >
                <Card
                    variant="outlined"
                    align='center'
                    sx={{
                        backgroundColor: theme.palette.fairy_pink.light
                    }}>
                    <CardContent >
                        <Grid 
                            item xs={12} 
                            align="center"
                            sx={{
                                color: theme.palette.grey.very_dark
                            }}>
                            <Typography variant='h6' component='h6'>
                            Send a Message
                            </Typography>
                        </Grid>
                        <FormControl>
                        <Grid item xs={12} align="center">
                            <FormHelperText>
                                Let the site developer know what's going on:
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField
                                required
                                type="string"
                                placeholder="Please describe the error in as much detail as possible"
                                onChange={handleFormMessageChange}
                                value={formMessage}
                                multiline={true}
                                sx={{
                                    textAlign: 'center',
                                    background: 'white',
                                    }}/>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button 
                                variant='contained'
                                color='inherit'
                                sx={{
                                    textAlign: 'center',
                                    marginTop: '10px',
                                    color: theme.palette.rose.light,
                                    border: ['solid', 'double' ],
                                    borderWidth: '1px',
                                    borderRadius: '6px',
                                    backgroundColor: theme.palette.fairy_pink.main
                                        }}
                                onClick={handleSendButtonClicked}>
                                Send
                            </Button>
                        </Grid>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}
export default SupportPage