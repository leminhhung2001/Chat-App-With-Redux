import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  title: string;
}

function Header({
  title,
}: HeaderProps): React.FunctionComponentElement<HeaderProps> {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
