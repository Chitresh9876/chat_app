import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";


const Signin = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      setToast(true);
      setMessage("Please enter all the detals.");
      setLoading(false);
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          const data = res?.data?.data;
          setToast(true);
          setMessage("Login successful");
          localStorage.setItem("userInfo", JSON.stringify(data));

          // history.push("/chats");
        } else {
          setToast(true);
          setMessage(res?.data?.message);
        }
      })
      .catch((err) => {
        setToast(true);
        setMessage(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <Stack gap={2} sx={{ margin: "2rem" }}>
      <Typography variant="h6">Email Address</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Email"
        value={email}
        onChange={(e) => {
          console.log(e.target.value);
          setEmail(e.target.value);
        }}
      />
      <Typography variant="h6">Password</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Password"
        value={password}
        onChange={(e) => {
          console.log(e.target.value);
          setPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        style={{background: "-webkit-linear-gradient(left,#003366,#004080,#0059b3, #0073e6)"}}
        onClick={() => handleSubmit()}
      >
        Login
      </Button>
      <Button variant="contained" color="error" onClick={() => {
        setEmail("GuestUser@gamil.com");
        setPassword("123456");
        handleSubmit();
      }}>
        Guest Login
      </Button>
    </Stack>
  );
}

export default Signin
