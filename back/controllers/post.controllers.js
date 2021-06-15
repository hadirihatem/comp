const PostModel= require("../models/Post");

const UserModel = require("../models/User");
const { validationResult } = require("express-validator");




//----------------------------------------------------------
exports.insert = async (req, res) => {
  PostModel.createPost(req,res).then((result) => {

  //  return result != undefined
  //     ? res.status(201).json({
  //         code: 201,
  //         status: "success",
  //         message: "post created successfuly",
  //         data: result,
  //       })
  //     : res.status(400).json({
  //         code: 400,
  //         status: "error",
  //         message: "Invalid post object",
  //       });
    
  });
};


//------------------getpost-------------



exports.getpost = (req, res) => {
  PostModel.findById(req.params.postId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() =>
      res.status(404).send("post not found, retry with a valid postId.")
    );
};

//------------------mypost-----------

exports.getmypost = (req, res) => {
  UserModel.find({ owner: req.userId })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
};

//-------------delete---------+

exports.removeById = (req, res) => {
  PostModel.removeById(req.params.postId)

    .then(() => {
      res.status(200).send([
        {
          msg: "post deleted",
        },
      ]);
    })
    .catch(() =>
      res.status(404).send("post not found, retry with a valid postId.")
    );
};

//---------update-----------------


exports.putpost = (req, res) => {
  PostModel.putPost(req.params.postId, req.body)
    .then((result) => {
      res.status(200).send({
        code: 200,
        status: "success",
        message: "post updated",
        data: result,
      });
    })
    .catch(() =>
      res.status(404).send("post not found, retry with a valid postId.")
    );
};

//--------like/dislike---------------

exports.putlikepost = (req, res) => {
  async () => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) return res.status(404).json("Post not found");
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { like: req.body.userId } });
        res.status(200).json("like post benn liked");
      } else {
        await post.updateOne({ $pull: { like: req.body.userId } });
        res.status(200).json("like post benn disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
};



//------mostlikedpost----------------------------

exports.mostliked = async (req, res) => {
  try {
    let posts = await PostModel.find().sort({ likes: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//----------------------getlist----------------
exports.list = (req, res) => {
  // let limit =
  //   req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  PostModel.list(page).then((result) => {
    res.status(200).json(result);
  });
};

//-----------------getpostbydate-------------
exports.getpostbydate = async (req, res) => {
  try {
    let posts = await Post.find().sort({ created_at: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//------------------------------comment------------------------------------------

//--------addcomment----------------

exports.aadComment = async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.post_id);
    let user = await UserModel.findById(req.user.id).select("-password");

    const { textOfTheComment } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (!user) return res.status(404).json("User not found");

    if (!post) return res.status(404).json("Post not found");

    let newComment = {
      textOfTheComment,
      name: user.firstname,
      avatar: user.avatar,
    };
    post.comments.unshift(newComment);

    await post.save();

    res.json("Comment is added");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//------getmostpostcommented-----------------------------

exports.mostcommented = async (req, res) => {
  try {
    let posts = await PostModel.find().sort({ comments: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//-----------removecomment--------------------------------

exports.removecomment = async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post not found");

    const removeCommentFromComments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );

    post.comments = removeCommentFromComments;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//-------------------------------------------------------------------
// exports.multipleFileUpload = async (req, res, next) => {
//   try{
//     let filesList = req.files.map((file) =>(path = `${req.protocol}://${req.hostname}:4000/uploads/${file.filename}`)   )
//       // let filesArray = [];
//       // req.files.forEach(element => {
//       //     const file = {
//       //         fileName: element.originalname,
//       //         filePath: element.path,
//       //         fileType: element.mimetype,
//       //         fileSize: fileSizeFormatter(element.size, 2)
//       //     }
//       //     filesArray.push(file);
      
//       const post = new Post({
//           title: req.body.title,
//           discription: req.body.discription,
//           files: filesList 
//       });
//       await post.save();
//       res.status(201).send('Files Uploaded Successfully');
//   }catch(error) {
//       res.status(400).send(error.message);
//   }
// }

// const fileSizeFormatter = (bytes, decimal) => {
//   if(bytes === 0){
//       return '0 Bytes';
//   }
//   const dm = decimal || 2;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));
//   return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

// }
// module.exports.insert = async (req, res) => {
//   let fileName;

//   if (req.file !== null) {
   
//     fileName = req.body.file + Date.now() + ".jpg";

//     await pipeline(
//       req.file.stream,
//       fs.createWriteStream(
//         `${__dirname}/./uploads/${fileName}`
//       )
//     );
//   }

//   const newPost = new Post({
//     title: req.body.title,
//     discription:req.body.discription,
//     picture: req.file !== null ? "./uploads" + fileName : "",
//     video: req.body.video,
//     likers: [],
//     comments: [],
//   });

//   try {
//     const post = await newPost.save();
//     return res.status(201).json(post);
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };
