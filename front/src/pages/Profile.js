import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import "../App.css";
import { loadUser } from "../action/authaction";


const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.user) dispatch(loadUser());
  }, [dispatch, auth.user]);



  return (
    <div className="">

    <h1>Profile de {auth.user.firstname}</h1>
<div>
  <h3>Photo de profil</h3>
  <img src={auth.user.avatar} alt="user-avatar"/>
<UploadImg/>  
</div>

    </div>

  );
};

export default Profile;

