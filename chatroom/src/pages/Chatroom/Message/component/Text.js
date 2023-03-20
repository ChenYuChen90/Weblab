import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FaceIcon from '@mui/icons-material/FaceOutlined';


import firebase from "../../../../utils/firebase"

const database = firebase.database()

const Text = ({ my, message, nickname, msgkey, nowRoom}) => {

    function deleteMsg(){
        //console.log(msgkey)
        //console.log(nowRoom.current)
        database.ref('/RoomList/' + nowRoom.current).child(msgkey).remove();
    }

    return <div>
            {my?<Grid container>
                    <Grid item xs={8}>
                        <Paper elevation={6}>
                            <Box>
                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={message}
                                multiline
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                            </Box>
                        </Paper>
                    </Grid><Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Chip size="small" color="primary" label={nickname} icon={<FaceIcon />} />
                            </Grid>
                            <Grid item xs={12}>
                                <Chip size="small" color="primary" variant="outlined" onClick={deleteMsg} icon={<DeleteRoundedIcon />}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>:<Grid container>
                    <Grid item xs={4}>
                        <Chip size="small" color="primary" label={nickname} icon={<FaceIcon />} />
                    </Grid>
                    <Grid item xs={8}>
                        <Paper elevation={6}>
                            <Box >
                                <TextField
                                    fullWidth
                                    size="small"
                                    defaultValue={message}
                                    multiline
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>}
    </div>
}

export default Text