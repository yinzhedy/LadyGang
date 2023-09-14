import React, {useState} from 'react'
import {
    useTheme,
    Grid,
    Typography,
    IconButton,
    Card,
    LinearProgress
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MusicPlayer({title , artist, duration, time, image_url}) {
    // console.log(title + 'musicplayer title')
    // console.log(artist + 'musicplayer artist')
    // console.log(duration + 'musicplayer duration')
    // console.log(time + 'musicplayertime')
    // console.log(image_url + 'musicplayer image_url')
    const [playingMusic, setPlayingMusic] = useState(false);
    const songProgress = (time / duration) * 100;
    const theme = useTheme();

    return (
        <div>
            <Grid container
                columns 
                alignItems='center'
                sx={{
                    fontFamily: 'inherit',
                    fontWeight: theme.typography.font_weight.extra_light,
                    fontSize: theme.typography.font_size.m,
                    color: 'black',
                    width: '40%',
                    paddingTop: '3%',
                    backgroundColor: 'white'
                    }}
            >
                <Grid item align='center' xs={4}>
                    <img src={image_url} height='40%' width='40%'/>
                </Grid>
                <Grid item align='center' xs={8}>
                    <Typography>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1'>
                        {artist}
                    </Typography>
                    <div>
                        <IconButton>
                            {playingMusic ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton>
                            {<SkipNextIcon/>}
                        </IconButton>
                    </div>
                </Grid>
                <Grid item align='center' xs={4}>
                    <LinearProgress variant='determinate' value={songProgress}/>
                </Grid>
            </Grid>
            
        </div>
    )
}