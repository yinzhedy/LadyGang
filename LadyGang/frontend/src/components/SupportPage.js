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
                        </Grid>
                        <Grid item xs={12} align="center">
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