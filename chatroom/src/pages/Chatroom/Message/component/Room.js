import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Room = ({roomName}) => {
    return <div>
            <ListItem>
                <Grid container>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>
                        <Box fontStyle="oblique" fontFamily="Century Gothic" textAlign="right">
                            <h2>Now room is : {roomName}</h2>
                        </Box>
                    </Grid>
                </Grid>
                
            </ListItem>
    </div>
}

export default Room