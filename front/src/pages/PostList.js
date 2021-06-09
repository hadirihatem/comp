import React, { useEffect } from "react";
import Posts from "./Posts";
import {getPosts} from '../action/postaction'
import { useDispatch, useSelector } from "react-redux";


const PostList = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  useEffect(() => {
    if (auth.user)
    dispatch(getPosts())
    
  }, [])
 return(
   <>
   {posts && posts.posts.map(elm=><Posts post={elm}></Posts>)}
   </>
   
 )
};

export default PostList;
