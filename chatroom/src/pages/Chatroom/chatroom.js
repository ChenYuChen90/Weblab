import RoomList from "./RoomList/RoomList"
import Message from "./Message/Message"
import { useState, useRef } from "react"


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Chatroom = () => {

    const [curRoom, setCurRoom] = useState("Public")
    //console.log(curRoom)
    const nowRoom = useRef(curRoom)
    //console.log(nowRoom.current)
    return <div>
        <Box border={1} borderColor="primary.main" boxShadow={10}>
            <Grid container>
                <Grid item xs={2.3}>
                    <Box height="99%">
                        <RoomList curRoom={curRoom} changeRoom={setCurRoom} nowRoom={nowRoom}/>
                    </Box>
                </Grid>
                <Grid item xs={9.7}>
                    <Box height="99%">
                        <Message curRoom={curRoom} nowRoom={nowRoom}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
}

export default Chatroom