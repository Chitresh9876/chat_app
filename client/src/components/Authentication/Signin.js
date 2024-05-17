import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

const Signin = () => {
  
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  
  return (
    <Stack gap={2} sx={{ margin: "2rem" }}>
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
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Button variant="contained" color="error">
        Guest Login
      </Button>
    </Stack>
  );
}

export default Signin
