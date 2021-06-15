import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../actions/loginaction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "10vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: "1rem",
  },
}));


const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  return (
    <div>
     <AppBar position="static">
     <Toolbar>
     <IconButton
       edge="start"
     className={classes.menuButton}
     color="inherit"
     aria-label="menu">
     <MenuIcon/>
    
     </IconButton>
     <Typography variant="h6" className={classes.title}>
     CAMP
   </Typography>
   
   <div>
  
   <IconButton  
     aria-label="account of current user"
   aria-controls="menu-appbar"
   aria-haspopup="true"
   onClick={handleMenu}
   color="inherit">
   <AccountCircle />
   </IconButton>
   <Menu
   id="menu-appbar"
   anchorEl={anchorEl}
   anchorOrigin={{
     vertical: "top",
     horizontal: "right",
   }}
   keepMounted
   transformOrigin={{
     vertical: "top",
     horizontal: "right",
   }}
   open={open}
   onClose={handleClose}
 >
   <MenuItem onClick={handleClose}>ADMIN</MenuItem>
   <MenuItem onClick={handleClose}>Logout</MenuItem>
 </Menu>
 </div>
 

     </Toolbar>
     </AppBar>
    </div>
  )
}

export default NavBar
