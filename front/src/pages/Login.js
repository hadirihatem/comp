import React, { useEffect } from "react";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {loadUser, loginUser} from '../action/authaction'
import './Login.css'

const Login = ({history}) => {
 
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if(auth.isAuth){
     history.push("/feed")
    }
    else if(!auth.user){
    dispatch(loadUser())}
   
  }, [auth.isAuth,history])
  
  const loginNow=(e)=>{
   e.preventDefault()
    dispatch(loginUser(info))
  }
  return (

    <div className='Login-container'>
    
    <div className='Login-content-left'>
    <img className='Login-img' src='images/success.png' alt='spaceship' />
    </div>

    <form onSubmit={loginNow} className='Login'>
      <h1>sign in</h1>
      <div className='Login-inputs'>
        <label  className='Login-label'>EMAIL</label>
        <input type="email" name="email" onChange={handlechange} className='Login-input' />
      </div>

      <div className='Login-inputs'>
        <label className='Login-label'>PASSWORD</label>
        <input type="password" name="password" onChange={handlechange} className='Login-input'/>
      </div>
      <button type="submit" className='Login-input-btn'>login</button>
    </form>
    </div>
  );
};

export default Login;
