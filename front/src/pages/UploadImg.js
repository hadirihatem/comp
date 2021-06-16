import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../action/useraction";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", auth.user.firstname);
    data.append("userId", auth.user._id);
    data.append("file", file);

    dispatch(uploadPicture(data, auth._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
