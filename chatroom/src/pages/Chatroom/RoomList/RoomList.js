import { useState, useEffect, useRef } from "react"
import RoomItem from "./component/RoomItem"
import firebase from "../../../utils/firebase"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import "./Roomlist.css"
import {v4} from 'uuid'

const database = firebase.database()

const RoomList = ({changeRoom, curRoom, nowRoom}) => {

    const [room, setRoom] = useState([])
    const get_once = 1
    var Name = useRef("")

    useEffect(()=>{
        
        database.ref('/userlist/UID' + firebase.auth().currentUser.uid + '/roomlist')
        .on("child_added", (snapshot)=>{
            //console.log(snapshot.val().room)
            var roomMsg = {
                id:v4(),
                roomName:snapshot.val().room
            }
            Name.current = snapshot.val().room
            setRoom((prev)=>{
                return [...prev,
                    roomMsg
                ]
            })
        })
    }, [get_once])

    var input
    function addRoom(){
        database.ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', (snapshot)=>{
            input = prompt("input text", snapshot.val().username + " 's room")
            database.ref('/userlist/UID' + firebase.auth().currentUser.uid + '/roomlist')
                        .push({room:input})
        })
    }

    function addUserInRoom(){
        var addUser = prompt("key User's email", "")
        database.ref('/userlist').once('child_added', (snapshot)=>{
            snapshot.forEach((child)=>{
                if(child.val() === addUser){
                    database.ref('/userlist/UID' + snapshot.val().uid + '/roomlist').push(
                        {room:curRoom}
                        
                    )
                }
            })
        })
        
    }

    
    return <div>
        <Box sx={{height:580}}>
        <List>
            <ListItem>
                <Box fontFamily="Century Gothic">
                <h3>room list</h3>
                </Box>
            </ListItem>
            <Divider></Divider>
            <Box sx={{height:470}}>
            <ul className="list">
                <Grid container>
                    {room.map((item)=>{
                        const {id, roomName} = item
                            return <ListItem key={id}>
                                        <Grid item xs={12}>
                                                <RoomItem key={id} roomName={roomName} chooseRoom={changeRoom} nowRoom={nowRoom}/>
                                        </Grid>
                                    </ListItem>
                        })
                    }
                </Grid>
            </ul></Box>
            <Divider></Divider>
            <ListItem>
                <Grid container>
                    <Grid item xs={4}>
                        <Button onClick={addRoom} fullWidth variant="contained" size="small">新增</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={addUserInRoom} fullWidth variant="contained" size="small">加入</Button>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
        </Box>
    </div>
}

export default RoomList