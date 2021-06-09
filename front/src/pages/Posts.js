import {  useSelector } from "react-redux";
import "./Feed.css";
import "../App.css";
import Moment from "react-moment";
import { Spinner } from "react-bootstrap";


const Posts = ({ post }) => {
  const auth = useSelector((state) => state.auth);

  // const updateComment = (newComment) => {
  //   setCommentList(commentList.concat(newComment));
  // };

  // const [commentList, setCommentList] = useState([]);

  return post === null || !post ? (
    <div className="all-page-wrapper flex__center">
      <Spinner />
    </div>
  ) : (
    <div className="user-post">
      <div className="user-post-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.created_at}</Moment>
      </div>
      <div className="user-post-topic">
      <p className="font__p font__bold">{post.poster}</p>
    </div>
      <div className="user-post-topic">
        <p className="font__p font__bold">{post.title}</p>
      </div>
      <div className="user-post-topic">
        <p className="font__p font__bold">{post.discription}</p>
      </div>
     
      <div className="post__likes__comments__deleteBtn-wrapper">
        <div className="post__likes__comments__deleteBtn">
          <div className="user-post-likes">
            <i className="far fa-thumbs-up"></i> {post.likes.length}
          </div>
          <div className="user-post-comments">
            <i className="far fa-comment"></i>
            {post.comments.length}
          </div>

          <div
            style={{
              display: post.user === auth.user._id ? "block" : "none",
            }}
          >
            <div className="removePostBtn app_color_background">
              <i className="fas fa-times"></i>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};




export default Posts;

// <div className="bg-gray-100 m-auto w-96 h-64 mt-5" style="background-image:url('https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&h=350'); background-position: center; background-repeat: no-repeat; background-size: cover;">
//   <div className="flex flex-row items-end h-full w-full">
//     <div className="flex flex-col w-full pb-3 pt-10 px-3 bg-gradient-to-t from-black text-gray-200">
//       <h3 className="text-base font-bold leading-5 uppercase">Lorem, ipsum dolor sit amet elit foure consectetur adipisicing.</h3>
//       <div className="inline-flex items-center">
//         <span className="capitalize font-base text-xs my-1 mr-1">Agnezmo Tuginem</span>
//         <svg className="stroke-current stroke-1 text-blue-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//           <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
//         </svg>
//       </div>
//       <div className="flex flex-row justify-between">
//         <div className="flex flex-row">
//           <div className="w-max inline-flex items-center">
//             <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//             </svg>
//             <span className="text-xs ml-1 antialiased">0</span>
//           </div>
//           <div className="w-max inline-flex ml-4 items-center">
//             <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span className="text-xs ml-1 antialiased">1</span>
//           </div>
//           <div className="w-max inline-flex ml-4 items-center">
//             <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-xs ml-1 antialiased">1 Hours ago</span>
//           </div>
//         </div>
//         <div className="w-max">
//           <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

