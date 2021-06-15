import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DashboardIcon from "@material-ui/icons/Dashboard";





const useStyles = makeStyles((theme) => ({
  root: {
    //width: "100%",
    maxWidth: 260,
    maxHeight: "100vh",
    //  backgroundColor: "red",

    //boxShadow: "5px 5px 5px rgba(0,0,0,0.7)",
    //backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));





const SideBar = ({ selection, setSelection }) => {

  const classes = useStyles();

  const [users, setUsers] = useState(false);
  const [groupes, setGroupes] = useState(false);
  const [posts, setPosts] = useState(false);

  const handlUsersClick=()=>{
    setUsers(!users)
  }
  const handlGroupesClick=()=>{
    setGroupes(!groupes)
  }
  const handlPostsClick=()=>{
    setPosts(!posts)
  }


  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "90vh",
      //   backgroundColor: "green",
    }}>
    <List component="nav" className={classes.root}>
    <ListItem button>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>

  <ListItem button onClick={()=>setSelection('Users')} >
  <ListItemIcon>
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText primary="USERS" />
</ListItem>

<ListItem button onClick={()=>setSelection('GROUPES')}>
<ListItemIcon>
  <DashboardIcon />
</ListItemIcon>
<ListItemText primary="GROUPES" />
</ListItem>

<ListItem button onClick={()=>setSelection('POSTS')}>
<ListItemIcon>
  <DashboardIcon />
</ListItemIcon>
<ListItemText primary="POSTS" />
</ListItem>
  
    </List>

      
    </div>
  )
}

export default SideBar
