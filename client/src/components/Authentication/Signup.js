import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
const Signup = () => {

  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  return (
    <Stack gap={2} sx={{ margin: "2rem" }}>
      <Typography variant="h6">Name</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Email"
        onChange={(e) => {
          console.log(e.target.value);
          setName(e.target.value);
        }}
      />
      <Typography variant="h6">Email Address</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Email"
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
        onChange={(e) => {
          console.log(e.target.value);
          setPassword(e.target.value);
        }}
      />
      <Typography variant="h6">Confirm Password</Typography>
      <TextField
        size="small"
        fullWidth
        type="password"
        label="Enter Password"
        onChange={(e) => {
          console.log(e.target.value);
          setConfirmPassword(e.target.value);
        }}
      />
      <Button variant="contained" color="primary">
        Create Account
      </Button>
    </Stack>
  );
}

export default Signup
