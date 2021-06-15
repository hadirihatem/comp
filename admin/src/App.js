import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./pages/Users"
import Post from "./pages/Post"
import Groupe from "./pages/Groupe"
import Dashborad from './pages/Dashborad';

import React, { Component } from 'react';
import { useDispatch } from 'react-redux';


const App = () => {
  const [selection, setSelection] = React.useState("");
  const dispatch = useDispatch();


  return (

  <div>
  <Router>
  <NavBar />
  <SideBar selection={selection} setSelection={setSelection}  />
  
  <div style={{ flex: 4, margin: "1rem", maxHeight: "100vh" }}>
    {selection === "USERS" && <Users />}
    {selection === "POSTS" && <Post />}
    {selection === "GROUPES" && <Groupe />}
    {selection === "DASHBORAD" && <Dashborad />}

   
  </div>

  <switch>

<Route exact path="/" component={Dashborad} />
<Route exact path="/Users" component={Users}/>
<Route exact path="/Groupes" component={Groupe} />
<Route exact path="/Posts" component={Post} />
  </switch>
</Router>

  </div>
  )
}

export default App
