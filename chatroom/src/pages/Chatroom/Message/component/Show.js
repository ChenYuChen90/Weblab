import Text from "./Text"
import firebase from "../../../../utils/firebase"
import { useEffect, useState } from "react"
import {v4} from 'uuid'


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import "./Show.css"

const database = firebase.database()

const Show = ({curUser, roomName, nowRoom}) => {
    const [data, setData] = useState([])
    function notifyGetMsg(name){
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            //new Notification("Hi there!");
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                new Notification("Recived message from :" + name + " !");
              }
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                new Notification("Recived message from : " + name + " !");
              }
            });
          }
    }

    useEffect(()=>{
        //setData([])
        var user
        database.ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
            //console.log("your nickname is " + e.val().username)
            user = e.val().username
            //console.log(user)
        })
        //console.log(roomName)
        var name
        database.ref('/RoomList/' + nowRoom.current)
            .on("value", (snapshot)=>{
                //console.log(nowRoom.current)
                //console.log(roomName)
                //console.log("hi")
                //console.log(snapshot.val())
                
                if(nowRoom.current === roomName){
                    if(snapshot.hasChildren()){
                        setData([])
                        //console.log("has child")
                        //console.log(snapshot.val())
                        snapshot.forEach((childsnapshot)=>{
                            //console.log(childsnapshot.val())
                            var msg = {
                                id:v4(),
                                message:childsnapshot.val().message,
                                nickname:childsnapshot.val().nickname,
                                msgkey:childsnapshot.val().msgkey
                            }
                            name = childsnapshot.val().nickname
                            //console.log(msg)
                            setData((prev)=>{
                                return [...prev,
                                    msg
                                ]
                            })
                        })
                        if(name !== user && user!==undefined){
                            //console.log(name)
                            //console.log("1")
                            notifyGetMsg(name)
                        }
                    } else {
                        //console.log("no child")
                        setData([])
                    }
                }
            })
    }, [roomName])
    //console.log(data)
    return <div>
        <Box >
            <Paper elevation={2}>
                <Box sx={{height:470}}>
                    <ul className="list">
                    <Grid container>
                        {
                            data.map((item) => {
                                const { id, message, nickname, msgkey} = item
                                return <Grid key={id} item xs={12}>
                                            <Box>
                                                {curUser===nickname?<Grid container>
                                                    <Grid item xs= {9}>
                                                    </Grid>
                                                    <Grid item xs= {3}>
                                                        <Box textAlign="center" fontStyle="oblique" fontFamily="Comic Sans MS" sx={{margin:1.5}}>
                                                            <Text key={id} my={curUser===nickname} message={message} nickname={nickname} msgkey={msgkey} nowRoom={nowRoom}/>
                                                        </Box>
                                                    </Grid>
                                                </Grid>:<Grid container>
                                                    <Grid item xs= {3}>
                                                        <Box textAlign="center" fontStyle="oblique" fontFamily="Comic Sans MS" sx={{margin:1.5}}>
                                                            <Text key={id} my={curUser===nickname} message={message} nickname={nickname} msgkey={msgkey} nowRoom={nowRoom}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs= {9}>
                                                    </Grid>
                                                </Grid>}
                                            </Box>
                                        </Grid>
                            })
                        }
                    </Grid>
                    </ul>
                </Box>
            </Paper>
        </Box>
        
    </div>
}

export default Show
/**<div key={id}> {curUser===nickname?
                                        <Grid item xs={12}>
                                            <ListItem>
                                                <Text key={id} message={message} nickname={nickname} />
                                            </ListItem>
                                        </Grid>:<Grid item xs={12}>
                                            <ListItem>
                                                <Text key={id} message={message} nickname={nickname} />
                                            </ListItem>
                                        </Grid>}
                                    </div> */