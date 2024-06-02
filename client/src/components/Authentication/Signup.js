import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from 'react-router-dom'; 


const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  // const history = useHistory();

  const handleSubmit = async() => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setToast(true);
      setMessage("Please enter all the detals.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setToast(true);
      setMessage("Confirm Password does not match!");
      setLoading(false);
      return;
    }

    axios.post("http://localhost:5000/api/user/register", { name, email, password, confirmPassword },
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
          setMessage("Registration is successful");
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
      <Typography variant="h6">Name</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Email"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Typography variant="h6">Email Address</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Typography variant="h6">Password</Typography>
      <TextField
        size="small"
        fullWidth
        label="Enter Password"
        onChange={(e) => {
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
          setConfirmPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        style={{
          background:
            "-webkit-linear-gradient(left,#0073e6,#0059b3,#004080, #003366)",
        }}
        onClick={() => handleSubmit()}
      >
        Create Account
      </Button>
    </Stack>
  );
};

export default Signup;
