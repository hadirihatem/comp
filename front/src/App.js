import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrivetRoute from "./PrivetRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Groupe from './pages/Group'
import Postnew from "./pages/Postnew";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <switch>
      
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivetRoute exact path="/Profile" component={Profile}/>
          <PrivetRoute exact path="/feed" component={Feed} />
          <PrivetRoute exact path="/Groupe" component={Groupe}/>
           <PrivetRoute exact path="/Post" component={Postnew}/>

        </switch>
      </Router>
    </div>
  );
}

export default App



