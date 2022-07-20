import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import nikelogo from "../assets/nikelogo.png";

const Footer = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", mt: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={nikelogo}
            alt="nikelogo"
            style={{ width: "30px", height: "30px" }}
          />{" "}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Nike
          </Typography>
          <Typography
            variant="p"
            component="div"
            sx={{
              m: "auto",
              color: "black",
              fontSize: "0.8em",
            }}
          >
            © 2022 Copyright: Sagiv Hazut{" "}
          </Typography>
          <Box sx={{ flexGrow: 0, ml: "auto" }}>
            <Tooltip title="Facebook">
              <a href="https://www.facebook.com" target="_blank">
                <FacebookIcon sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </FacebookIcon>
              </a>
            </Tooltip>
            <Tooltip title="Instagram">
              <a href="https://www.instagram.com" target="_blank">
                <InstagramIcon sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </InstagramIcon>
              </a>
            </Tooltip>
            <Tooltip title="Twitter">
              <a href="https://twitter.com" target="_blank">
                <TwitterIcon sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp"></Avatar>
                </TwitterIcon>
              </a>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
