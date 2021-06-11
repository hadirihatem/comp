const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");



const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);



exports.insert = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.files + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../uploads${fileName}`
      )
    );
  }

  const newPost = new Post({
    title: req.body.title,
    discription: req.body.discription,
    files: req.file !== null ? "./uploads" + fileName : "",
    
    likes: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//----------------------------------------------------------
// exports.insert = (req, res) => {
//   Post.createPost(req.body).then((result) => {
//     result != undefined
//       ? res.status(201).send({
//           code: 201,
//           status: "success",
//           message: "post created successfuly",
//           data: result,
//         })
//       : res.status(400).send({
//           code: 400,
//           status: "error",
//           message: "Invalid post object",
//         });
    
//   });
// };


//------------------getpost-------------



exports.getpost = (req, res) => {
  Post.findById(req.params.postId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() =>
      res.status(404).send("post not found, retry with a valid postId.")
    );
};

//------------------mypost-----------

exports.getmypost = (req, res) => {
  User.find({ owner: req.userId })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
};

//-------------delete---------+

exports.removeById = (req, res) => {
  Post.removeById(req.params.postId)

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
  Post.putPost(req.params.postId, req.body)
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
      const post = await Post.findById(req.params.id);
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
    let posts = await Post.find().sort({ likes: -1 });
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
  Post.list(page).then((result) => {
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
    let post = await Post.findById(req.params.post_id);
    let user = await User.findById(req.user.id).select("-password");

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
    let posts = await Post.find().sort({ comments: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};

//-----------removecomment--------------------------------

exports.removecomment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

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
