import React, {useState} from 'react';
import {
    Box,
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
import emailjs from '@emailjs/browser'

const SupportPage = () => {
    const theme = useTheme()
    const [formMessage, setFormMessage] = useState('');
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('')
    const emailJSApiKey = process.env.EMAIL_JS_PUBLIC_KEY;
    const emailJSServiceID = process.env.EMAIL_JS_SERVICE_ID;
    const emailJSTemplateID = process.env.EMAIL_JS_TEMPLATE_ID;
    

    let templateParams = {
        to_name: 'Lady Gang Site Developer',
        user_name: formName,
        message: formMessage,
        user_email: formEmail
    }
    
    const handleFormMessageChange = (e) => {
        setFormMessage(e.target.value)
        console.log(formMessage)
    }

    const handleFormNameChange = (e) => {
        setFormName(e.target.value)
        console.log(formEmail)
    }

    const handleFormEmailChange = (e) => {
        setFormEmail(e.target.value)
        console.log(formName)
    }

    const handleSendButtonClicked = () => {
        console.log(formMessage)
        console.log(formName)
        console.log(formEmail)
        console.log(templateParams)
        let name = ''
        let email = ''

        if (formName === '') {
            name = "Anonymous"
        }
        else {
            name = formName
        }
        if (formEmail === '') {
            email = 'No Return Email Provided'
        }
        else {
            email = formEmail
        }

        let updatedTemplateParams = {
            to_name: 'Lady Gang Site Developer',
            user_name: name,
            message: formMessage,
            user_email: email
        }
        
        console.log(updatedTemplateParams)
        sendEmail(updatedTemplateParams)
    }

    function sendEmail(recieved_params) {
        console.log(templateParams)
        emailjs.send(emailJSServiceID, emailJSTemplateID, recieved_params, emailJSApiKey)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    }


    return(
        <Box
            id='landing_page_hero' sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            wrap: 'wrap',
            marginTop: '0',
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.chloe_beige.main }}
        >
            <Grid container xs={12} spacing={1} align='center'>
                <Grid item xs={12} align='center'>
                    <Typography
                        variant='h4'
                        component='h4'
                        sx={{
                            fontFamily: theme.typography.font_style.chloe,
                            fontWeight: theme.typography.font_weight.bold,
                            fontSize: theme.typography.font_size.title,
                            color: 'white',
                            paddingTop: '8%',
                            paddingBottom: '5%'
                        }}
                    >
                    Support
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Card
                    variant="outlined"
                    align='center'
                    sx={{
                        backgroundColor: 'white',
                        fontFamily: theme.typography.font_style.poppins,
                        width: '40%'
                    }}>
                    <CardContent>
                        <Typography
                            variant='h6' 
                            component='h6'
                            sx={{
                                fontFamily: 'inherit'
                            }}
                        >
                        Send a Message
                        </Typography>
                        <FormControl>
                            <FormHelperText>
                                Let the site developer know what's going on:
                            </FormHelperText>
                            <TextField
                                align='center'
                                required
                                type="string"
                                placeholder="Please describe the error in as much detail as possible (required*)"
                                onChange={handleFormMessageChange}
                                value={formMessage}
                                multiline={true}
                                sx={{
                                    textAlign: 'center',
                                    background: 'white',
                                    fontFamily: 'inherit'
                                    }}/>
                            <TextField
                                type="string"
                                placeholder="Enter Your name (optional*)"
                                onChange={handleFormNameChange}
                                value={formName}
                                multiline={true}
                                sx={{
                                    textAlign: 'center',
                                    background: 'white',
                                    marginTop: '10px',
                                    }}/>
                            <TextField
                                type="string"
                                placeholder="Enter Your Email (optional*)"
                                onChange={handleFormEmailChange}
                                value={formEmail}
                                multiline={true}
                                sx={{
                                    textAlign: 'center',
                                    background: 'white',
                                    marginTop: '10px',
                                    }}/>
                        <Grid 
                            item xs={12} 
                            align="center"
                            sx={{
                                paddingTop: '5%'
                            }}
                        >
                            <Button 
                                variant='contained'
                                color='inherit'
                                sx={{
                                    backgroundColor: theme.palette.chloe_beige.main,
                                    ':hover': {
                                        color: 'white',
                                        bgcolor: theme.palette.chloe_beige.main
                                    },
                                    color: 'inherit',
                                    fontFamily: 'inherit',
                                    fontSize: theme.typography.font_size.s,
                                    fontWeight: theme.typography.font_weight.extra_light,
                                    borderRadius: '.15rem',
                                }}
                                onClick={handleSendButtonClicked}>
                                Send
                            </Button>
                        </Grid>
                        </FormControl>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
export default SupportPage