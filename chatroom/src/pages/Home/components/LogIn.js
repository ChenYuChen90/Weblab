import { useState } from "react";

import firebase from "../../../utils/firebase"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const LogIn = () => {

    const [emailAddress, setEmailAddress] = useState("")
    function emailAddressChange(e){
        setEmailAddress(e.target.value)
    }

    const [password, setPassword] = useState("")
    function passwordChange(e){
        setPassword(e.target.value)
    }

    const database = firebase.database()
    function logInWithEmail(){
        firebase
            .auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(()=>{
                console.log("log in success!")
                database.ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
                    console.log("your nickname is " + e.val().username)
                })
            })
            .catch((error)=>{
                switch(error.code){
                    case "auth/user-not-found":
                        alert("信箱不存在no")
                        setEmailAddress("")
                        break;
                    case "auth/invalid-email":
                        alert("信箱格式不正確na")
                        setEmailAddress("")
                        break;
                    case "auth/wrong-password":
                        alert("密碼打錯拉")
                        setPassword("")
                        break;
                    default:
                }
            })
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    function logInWithGoogle(){
        firebase.auth().signInWithPopup(provider).then((result)=>{
            var user = result.user
            var first_time = false
            database.ref('/userlist').once('value', (snapshot)=>{
                snapshot.forEach((child)=>{
                    if(child.val().email === user.email){
                        first_time = true
                        console.log(first_time)
                    }
                })
            }).then(()=>{
                // for the first time
                if(!first_time){
                    //console.log("this is first time")
                    database.ref('/userlist/UID' + user.uid).set({
                        username:user.displayName,
                        uid:user.uid,
                        email:user.email
                    }).then(()=>{
                        database.ref('/userlist/UID' + user.uid + '/roomlist')
                        .push({room:"Public"})
                    })
                }
            })
        }).catch((error)=>{
            console.log('error: ' + error.message);
        })
    }

    return <div>
        <Box>
            <List>
                <Box fontFamily="Century Gothic" textAlign="center">
                    <h2>Welcome back</h2>
                </Box>
                <Divider></Divider>
                <ListItem>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="EmailAddress"
                        value={emailAddress}
                        onChange={emailAddressChange}
                        />
                </ListItem>
                <ListItem>
                    <TextField
                        type="password"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Password"
                        value={password}
                        onChange={passwordChange}
                        />
                </ListItem>
                <Divider></Divider>
                <ListItem>
                    <Button 
                        margin="normal"
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={logInWithEmail}
                        >
                        Log in
                    </Button>
                </ListItem>
                <Divider><Chip label="Or" /></Divider>
                <ListItem>
                    <Button 
                        margin="normal"
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={logInWithGoogle}
                        >
                        Log in with Google
                    </Button>
                </ListItem>
            </List>
        </Box>
    </div>
}
export default LogIn
/** <p>Email Address*</p>
        <input type="text" value={emailAddress} onChange={emailAddressChange}/>
        <p>Passward*</p>
        <input type="password" value={password} onChange={passwordChange} />
        <button onClick={logInWithEmail} className="signup">Log in</button>
        <h3>or</h3>
        <button onClick={logInWithGoogle} className="signup">Log in with Google</button>*/