import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import "../css/Authentication.css";
import Signin from "../components/Authentication/Signin";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [tabValue, setTabValue] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) navigate('/chats');

  }, [navigate]);

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
      <div className="auth section">
        <Container
          sx={{
            margin: tabValue ? "3rem 8rem" : "8rem",
            padding: "2rem",
            backgroundColor: "white",
            width: "auto",
            borderRadius: "0.5rem",
            verticalAlign: "middle",
            transition: "",
          }}
        >
          <Box
            sx={{
              borderBottom: 0,
              borderColor: "divider",
              alignItems: "center",
            }}
          >
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab
                sx={{ width: "50%" }}
                style={{ color: "", fontWeight: "550", fontSize: "1.2rem" }}
                label="Login"
              />
              <Tab
                sx={{ width: "50%" }}
                style={{ color: "", fontWeight: "550", fontSize: "1.2rem" }}
                label="Register"
              />
            </Tabs>
          </Box>

          {tabValue ? <Signup /> : <Signin />}
        </Container>
      </div>
    </Stack>
  );
};

export default Authentication;
