import { useState } from "react"
import firebase from "../../../../utils/firebase"


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const database = firebase.database()

const Sent = ({roomName}) => {

    var currentUser = ""
    database.ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
        //console.log("your nickname is " + e.val().username)
        currentUser = e.val().username
    })
    
    const [sent, setSent] = useState("")
      
    function sentChange(e){
        //console.log(e.target.value)
        setSent(e.target.value)
    }
    function sentMessage(){
        
        var key = database.ref('/RoomList/' + roomName + '/').push({
            message:sent,
            nickname:currentUser
        }).getKey()
        //console.log(key)
        database.ref('/RoomList/' + roomName).child(key).set({
            message:sent,
            nickname:currentUser,
            msgkey:key
        })
        setSent("")
    }
    return <div>
        <Box>
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        variant="filled"
                        fullWidth
                        size="small"
                        label="key message"
                        multiline
                        value={sent}
                        onChange={sentChange}
                        />
                </Grid>
                <Grid item xs={1}>
                    <Button 
                        margin="normal"
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={sentMessage}
                        >
                        sent
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </div>
}

export default Sent