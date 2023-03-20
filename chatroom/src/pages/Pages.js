import { useEffect, useState } from "react"
import Home from "./Home/home"
import Chatroom from "./Chatroom/chatroom"
import Area from "./component/Area"

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import firebase from "../utils/firebase"

const Pages = () => {

    const [user, setUser] = useState(null)
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((currentUser)=>{
            setUser(currentUser)
        });
        //console.log(user)
    }, []);
    

    return <div>
        {user ? (
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Chatroom
                            </Typography>
                            <Button color="inherit" size="medium" variant="outlined" onClick={() => firebase.auth().signOut()}>
                                logout
                            </Button>
                        </Toolbar>
                    </AppBar>
        ):(
            <Box>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Chatroom
                            </Typography>
                            <Button color="inherit" size="medium" variant="outlined">
                                log in
                            </Button>
                        </Toolbar>
                    </AppBar>
            </Box>
        )}
        {user ? <Grid container>
                <Grid item xs ={12}>
                    <Chatroom />
                </Grid>
            </Grid>:<Box >
                    <Area />
                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Grid item xs ={3} >
                        </Grid>
                        <Grid item xs ={6}>
                            <Home />
                        </Grid>
                        <Grid item xs ={3}>
                        </Grid>
                    </Grid>
            </Box>
        }
    </div>
}
export default Pages
