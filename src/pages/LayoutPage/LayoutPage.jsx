import { useState } from "react";
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Dashboard from '../DashboardPage/Dashboard.jsx'
import LoginPage from "../LoginPage/LoginPage.jsx";
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const LayoutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    
    <Box sx={{display: "flex",flexDirection:"column"}}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} />
        <Outlet context={{ darkMode, setDarkMode,searchQuery,setSearchQuery }}/>
    </Box>
  )
}

export default LayoutPage