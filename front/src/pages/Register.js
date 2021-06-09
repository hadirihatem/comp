import {useEffect, useState} from 'react'
import{registerUser} from '../action/authaction'
import {useDispatch, useSelector} from 'react-redux'


const Register = ({history}) => {
    const [info, setInfo] = useState({
        firstname:"",
        lastname:"",
        phone :"",
        email:"",
        password:"",
        permissionLevel:1,
     });
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
useEffect(() => {
  if(auth.isAuth){
   history.push("/feed")
  }
 
}, [auth.isAuth,history])

     const handlechange=e=>{
         setInfo({...info,[e.target.name]:e.target.value})
     }
     const registerNow=e=>{
       e.preventDefault();
       dispatch(registerUser(info))
     };
  return (
    <form onSubmit={registerNow}>
      <div>
        <label>firstname</label>
        <input type="text" name="firstname" onChange={handlechange}/>
      </div>

      <div>
        <label>lastname</label>
        <input type="text" name="lastname" onChange={handlechange}/>
      </div>

      <div>
        <label>phone</label>
        <input type="text" name="phone"onChange={handlechange} />
      </div>
      <div>
        <label>email</label>
        <input type="email" name="email" onChange={handlechange}/>
      </div>

      <div>
        <label>password</label>
        <input type="password" name="password" onChange={handlechange}/>
      </div>
      <button type="submit" >Register</button>
    </form>
  );
};


export default Register
