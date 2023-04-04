import React from "react";
import "./home.css";
import { Topbar } from "../../components/Topbar/Topbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Feed } from "../../components/Feed/Feed";
import { Rightbar } from "../../components/Rightbar/Rightbar";
import { Box } from "@chakra-ui/react";

export const Home = () => {
  return (
    <div>
      <Topbar />
      <Box className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Box>
      <Box className="homeContainer2">
        <Feed />
      </Box>
    </div>
  );
};
