import React, { useEffect } from "react";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {loadUser, loginUser} from '../action/authaction'

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
    <form onSubmit={loginNow}>
      <div>
        <label>email</label>
        <input type="email" name="email" onChange={handlechange} />
      </div>

      <div>
        <label>password</label>
        <input type="password" name="password" onChange={handlechange} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
