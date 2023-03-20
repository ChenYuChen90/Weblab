import Show from "./component/Show"
import Sent from "./component/Sent"
import Room from "./component/Room"
import { useEffect, useState } from "react"

import firebase from "../../../utils/firebase"

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const database = firebase.database()

const Message = ({curRoom, nowRoom}) => {

    const [user, setUser] = useState()
    useEffect(()=>{
        database.ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
            //console.log("your nickname is " + e.val().username)
            setUser(e.val().username)
        })
        //console.log(user)
    }, [user])

    return <div>
        <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <Room roomName={curRoom}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Show curUser={user} roomName={curRoom} nowRoom={nowRoom}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Sent roomName={curRoom}/>
                    </Grid>
                </Grid>
        </Box>
            
            
            
    </div>
}

export default Message