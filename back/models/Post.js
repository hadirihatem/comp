const mongoose=require('mongoose');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


const Postschema= new mongoose.Schema({
    owner:{
     type:mongoose.Types.ObjectId,
     ref:"User"
    },
    title:String,
    discription:String,
    files: String,
    created_at:{
        type:Date,
        default:Date.now
    },


    likes: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    comments: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
       
        textOfTheComment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        likes: [
          {
            number:{
              type:Number,
              default:0
    
            },
            owner: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],
      },
    ],
    
});
const Post=mongoose.model("Post",Postschema);
 module.export=Post

//-----------------------------------

// exports.createPost =async (req,res) => {
  
  
  //   const post = new Post({
  //     title: req.title,
  //     discription: req.discription,
  //     files:`${req.protocol}://${req.hostname}:4000/uploads/${file.filename}`,
  //     likes: [],
  //     comments: [],
  //   });
  //   return post.save().catch((e) => console.log(e.message));
  // };

  //--------------------------------------------------


  exports.findById = (id) => {
    return Post.findById(id).then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
  };
  

//-----------------------------------

exports.findByTitle = (title) => {
    return new Promise((resolve, reject) => {
      Post.find({ title: title }).exec( (err, post)=> {
        if (err) {
          reject(err);
        } else {
          resolve(post);
        }
      });
    });
  };
//------updatepost--------------

exports.putPost=(id,postData)=>{
  return new Promise((resolve,reject)=>{
    Post.findById(id,(err,post)=>{
      if (err) reject(err);
      else{
        for (let i in postData){
          post[i]=postData[i];
        }
        post.save((err,updatePost)=>{
          if (err) return reject (err);
          resolve(updatePost)
        })
      }
    })
  })
}


//----------------remove----------------------------
exports.removeById = (postId) => {
    return new Promise((resolve, reject) => {
      Post.deleteOne({ _id: postId }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(err);
        }
      });
    });
  };
  

// get all posts

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Post.find().populate('owner')
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, posts) {
        if (err) {
          reject(err);
        } else {
          resolve(posts);
        }
      });
  });
};

//-------------------


// exports.multipleFileUpload = async (req, res, next) => {
//   try{
//     let filesList = req.files((file) =>(path = `${req.protocol}://${req.hostname}:4000/uploads/${file.filename}`)   )
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
//   }catch(err) {
//       throw err
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