import React, { useState } from 'react'
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import { CgLogIn } from "react-icons/cg"
// import logo from "../assets/login_logo.png";
import GoogleBtn from "./GoogleBtn";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/Firebase'
import { useNavigate } from 'react-router-dom';


function LoginContainer() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate("")

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setEmail("Email and Password Can't be Empty!")
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch(error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <Container style={{ padding: "1em" }}>
      
      <Typography variant="h3" color={"#000"} gutterBottom>
        💫 Login
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "15vw" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChane={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type={"password"}
          value={password}
          nChane={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleLogin}
          style={{
            backgroundColor: "#FD3101",
            width: "25vw",
            marginTop: "1em",
          }}
          variant="contained"
        >
          Log In
        </Button>
        <GoogleBtn/>
      </Box>
      {errorMsg && (
        <span style={{ color: "red", margin: "1em" }}>
          <p>{errorMsg}</p>
        </span>
      )}
    </Container>
  );
}


export default LoginContainer
