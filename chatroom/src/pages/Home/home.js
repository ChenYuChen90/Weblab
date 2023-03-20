import { useState } from "react"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "./home.css"

const Home = () => {

    const [demo, setDemo] = useState(<SignUp/>)

    function changeSignUp(){
        setDemo(() => {
            return <SignUp />
        })
    }
    function changeLogIn(){
        setDemo(() => {
            return <LogIn />
        })
    }
    return <div className="area">
        <Box sx={{margin:2}}>
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button 
                            fullWidth
                            margin="normal"
                            variant="contained"
                            size="large"
                            onClick={changeSignUp}
                            >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs ={6}>
                        <Button
                            fullWidth
                            margin="normal"
                            variant="contained"
                            size="large"
                            onClick={changeLogIn}
                            >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{height:530}}>
                {demo}
            </Box>
        </Box>
    </div>
}
export default Home
/*
    <button onClick={changeSignUp}>Sign up</button>
    <button onClick={changeLogIn}>Log in</button>
*/