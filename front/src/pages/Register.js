import {useEffect, useState} from 'react'
import{registerUser} from '../action/authaction'
import {useDispatch, useSelector} from 'react-redux'
import './Register.css'

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
    <div className='form-container'>
        
    <div className='form-content-left'>
      <img className='form-img' src='images/success.png' alt='spaceship' />
    </div>

<div className="form-content-right">
<form onSubmit={registerNow}  className='form'>
<h1>Get started with us today! Create your acoount
    by filling out the information below.
   </h1>
   <div className='form-inputs'>
     <label className='form-label'>First name</label>
     <input type="text" name="firstname" onChange={handlechange} className='form-input'/>
     {/* {errors.firstname && <p>{errors.firstname}</p>} */}
   </div>

   <div className='form-inputs'>
     <label className='form-label'>Last name</label>
     <input type="text" name="lastname" onChange={handlechange} className='form-input'/>
     {/* {errors.lastname && <p>{errors.lastname}</p>} */}
   </div>

   <div className='form-inputs'>
     <label className='form-label'>Phone</label>
     <input type="text" name="phone"onChange={handlechange} className='form-input'/>
     </div>
   <div className='form-inputs'>
     <label className='form-label'>Email</label>
     <input type="email" name="email" onChange={handlechange} className='form-input'/>
     {/* {errors.email && <p>{errors.email}</p>} */}
   </div>

   <div className='form-inputs'>
     <label className='form-label'>Password</label>
     <input type="password" name="password" onChange={handlechange} className='form-input'/>
     {/* {errors.password && <p>{errors.password}</p>} */}
   </div>
   <button className='form-input-btn' type='submit'>
      Sign up
    </button>
    <span className='form-input-login'>
      Already have an account? Login <a href='/Login'>here</a>
    </span>
 </form>
 </div>

 </div>
  );
};


export default Register
