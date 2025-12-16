import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const LayoutPage = ({ mode, setMode }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbar mode={mode} setMode={setMode} />
      <Outlet />
    </Box>
  );
};

export default LayoutPage;
