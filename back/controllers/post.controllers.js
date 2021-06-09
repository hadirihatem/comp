const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// exports.insert = (req, res) => {
//   Post.createPost(req.body).then((posts) => {
//     posts != undefined
//       ? res.statut(201).send([{ msg: "post created" }])
//       : res.status(400).send({ errors: [{ msg: "post not created" }] });
//   });
// };
// exports.insert = (req, res) => {
//     Post.createPost(req.body).then((posts) => {
//       posts != undefined
//         ? res.status(201).send([{
//            msg : "post created"
//           }])
//         : res.status(400).send([{

//             mesg: "error to create post",
//           }]);

//     });
//   };

//-----------------createpost---------------
// exports.insert = (req, res) => {
//   let newPost = new Post({ ...req.body, owner: req.userId });

//   newPost
//     .save()
//     .then((post) => res.status(201).send(post))
//     .catch((err) => {
//       console.log(err.message);
//       res.status(500).json({ msg: "Server Error" });
//     });
// };

exports.insert = (req, res) => {
  Post.createPost(req.body).then((result) => {
    result != undefined
      ? res.status(201).send({
          code: 201,
          status: "success",
          message: "post created successfuly",
          data: result,
        })
      : res.status(400).send({
          code: 400,
          status: "error",
          message: "Invalid post object",
        });
    //{ id: result._id }
  });
};
//--------------multer-----------------
// exports.storage = multer.diskStorage ({
//   destination: function (req, file ,cb){
//     cb (null, 'upload/')
//     },
//     filefilter: (req,res,cb) => {
//       const ext =path.extname(file.originalname)
//       if (ext!== '.jpg' ){
//         return cb (res.status(400).end('only jpg file is allowed'),false)
//       }
//       cb (null,true)
//     }
// })
// var upload = multer({ storage: storage })



//------------------getpost-------------

// exports.getpost = (req, res) => {
//   Post.findById()
//     .then((posts) => res.send(posts))
//     .catch((err) => {
//       console.log(err.message);
//       res.status(500).json({ msg: "Server Error" });
//     });
// };

exports.getpost = (req, res) => {
  Post.findById(req.params.postId)
    .then((result) => {
      res.status(200).json(
       result
      );
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

// exports.putpost = (req, res) => {
//   Post.putPost(req.params.postId, req.body)
//   .then(() => {
//     res.status(200).send({msg:"post updated"

//     });
//   })
//   .catch(() =>
//     res.status(404).send("post not found, retry with a valid postId.")
//   );
// };

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

// exports.likepost = async (req, res) => {
//   try {
//     let post = await Post.findById(req.params.post_id);

//     if (!post) return res.status(404).json("Post not found");

//     if (post.likes.find((like) => like.user.toString() === req.user.id))
//       return res.status(401).json("Post is already liked by you!");

//     let newLike = {
//       user: req.user.id,
//     };

//     post.likes.unshift(newLike);

//     await post.save();

//     res.json(post);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json("Server Error...");
//   }
// };



//------mostlikedpost----------------------------


exports.mostliked=async (req, res) => {
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

exports.mostcommented=async (req, res) => {
  try {
    let posts = await Post.find().sort({ comments: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};




//-----------removecomment--------------------------------



exports.removecomment=async (req, res) => {
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

