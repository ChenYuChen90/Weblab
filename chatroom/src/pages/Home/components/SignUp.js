import { useState } from "react"

import firebase from "../../../utils/firebase"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';


const SignUp = () => {

    const [nickName, setNickName] = useState("")
    function nickNameChange(e){
        setNickName(e.target.value)
    }

    const [emailAddress, setEmailAddress] = useState("")
    function emailAddressChange(e){
        setEmailAddress(e.target.value)
    }

    const [password, setPassword] = useState("")
    function passwordChange(e){
        setPassword(e.target.value)
    }

    const [check, setCheck] = useState("")
    function checkChange(e){
        setCheck(e.target.value)
    }

    function notifySignSuccess(){
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            //new Notification("Hi there!");
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                new Notification("Signing success!");
              }
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                new Notification("Signing success!");
              }
            });
          }
    }

    const database = firebase.database()
    function signingup(){
        if(password === check){
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password)
                .then(()=>{
                    console.log("sign up success!")
                    database.ref('/userlist/UID' + firebase.auth().currentUser.uid).set({
                        username:nickName,
                        uid:firebase.auth().currentUser.uid,
                        email:emailAddress
                    }).then(()=>{
                        database.ref('/userlist/UID' + firebase.auth().currentUser.uid + '/roomlist')
                        .push({room:"Public"})
                        notifySignSuccess()
                    })
                })
                .catch((error)=>{
                    switch(error.code){
                        case "auth/email-already-in-use":
                            alert("這個信箱已經有人用過了喔")
                            setEmailAddress("")
                            break;
                        case "auth/invalid-email":
                            alert("信箱格式不正確na")
                            setEmailAddress("")
                            break;
                        case "auth/weak-password":
                            alert("密碼設太短拉")
                            setCheck("")
                            setPassword("")
                            break;
                        default:
                    }
                });
            
        } else {
            alert("兩次密碼打不一樣是什麼意思?")
            setPassword("")
            setCheck("")
        }
        
    }


    return <div>
        <Box >
            <List>
                <Box fontFamily="Century Gothic" textAlign="center">
                    <h2>Sign up for free</h2>
                </Box>
                <Divider></Divider>
                <ListItem>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Nick Name"
                        value={nickName}
                        onChange={nickNameChange}
                        />
                </ListItem>
                <ListItem>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Email Address"
                        value={emailAddress}
                        onChange={emailAddressChange}
                        />
                </ListItem>
                <ListItem>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        />
                </ListItem>
                <ListItem>
                    <TextField 
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Check"
                        type="password"
                        value={check}
                        onChange={checkChange}
                        />
                </ListItem>
                <Divider><Chip label="Welcome" /></Divider>
                <ListItem>
                    <Button 
                        margin="normal"
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={signingup}
                        >
                        Sign Up
                    </Button>
                </ListItem>
            </List>
        </Box>
    </div>
}
export default SignUp
/*
        <p>Nick Name*</p>
        <input type="text" value={nickName} onChange={nickNameChange}/>
        <p>Email Address*</p>
        <input type="text" value={emailAddress} onChange={emailAddressChange} />
        <p>Password*</p>
        <input type="password" value={password} onChange={passwordChange} />
        <p>Check*</p>
        <input type="password" value={check} onChange={checkChange} />
        <button onClick={signingup} className="signup">Sign Up</button>

*/