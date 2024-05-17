import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import "../css/Authentication.css";
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";

const Authentication = () => {
  const [tabValue, setTabValue] = useState(1);
  useEffect(() => {
    console.log(window.location.href);
    const url = window.location.href.split("-")[1];
    if (url === "in") setTabValue(0);
    else setTabValue(1);
  }, []);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Stack className="contain" overflow={"hidden"} direction={"row"}>
      <div className="description section">Box 1</div>
      <div className="auth section" >
        <Container
          sx={{
            margin: tabValue ? "3rem 8rem" : "8rem",
            padding: "2rem",
            backgroundColor: "white",
            width: "auto",
            borderRadius: "1rem 1rem 1rem 1rem",
            verticalAlign: "middle",
            transition:""
          }}
        >
          <Box sx={{ borderBottom: 0, borderColor: "divider", alignItems:"center" }}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab sx={{ width: "50%" }} label="Sign-In" />
              <Tab sx={{ width: "50%" }} label="Sign-Up" />
            </Tabs>
          </Box>

          {tabValue ? <Signup/> : <Signin/>}
        </Container>
      </div>
    </Stack>
  );
};

export default Authentication;
