import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Modal from "react-modal";
import { Button } from "./Button";
import "../App.css";
import { loadUser } from "../action/authaction";
import {addPost} from "../action/postaction"
import {getpost} from "../action/postaction"
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Profile = () => {



  const [file, setFile] = useState();








  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.user) dispatch(loadUser());
  }, [dispatch, auth.user]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [NewPost, setNewPost] = useState({
    title: "",
    discription: "",
   
  });

  const handleChange = (e) => {
    setNewPost({
      ...NewPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(addPost({...NewPost,owner:auth.user._id},file));


    closeModal();
  };
  const handlefile=(e)=>{
    setFile(e.target.files[0])
  }
  useEffect(() => {
    if (auth.user)
    dispatch(getpost())
  }, [])
  return (
    <div>
      <Button variant="outline-info" onClick={openModal}>
        ADD
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Form>
          <label style={{ marginRight: 10 }}>Title</label>

          <input type="text" name="title" onChange={handleChange} />

          <br />

          <label style={{ marginRight: 10 }}>Discription</label>

          <input type="text" name="discription" onChange={handleChange} />
          <br />

          <label style={{ marginRight: 10 }}>picture</label>

          <input type="file" name="picture" onChange={handlefile} />
        </Form>

        <Button variant="outline-info" onClick={handleClose}>
          submision
        </Button>
      </Modal>
     
    </div>

  );
};

export default Profile;


  /*<div>
hello from profile
 <button onClick={handleShow}></button> 
<Button onClick={handleShow}>POST</Button>
<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Post</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div>
      <div>
        <label className="input" style={{ marginRight: 10 }}>
          Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="input" style={{ marginRight: 10 }}>
          Description
        </label>
        <input
          type="text"
          name="description"
          value={discription}
          onChange={handleChange}
        />
      </div>
      <div>
          <label className="input" style={{marginRight: 10}}>Poster :</label>
          <input type="text" name="posterUrl"  onChange={handleChange} />
        </div> 
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={(handleClose)}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
      </div> */

