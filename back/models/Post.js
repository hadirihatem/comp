const mongoose=require('mongoose')

const Postschema= new mongoose.Schema({
    owner:{
     type:mongoose.Types.ObjectId,
     ref:"User"
    },
    title:String,
    discription:String,
    poster:String,
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
        name: {
          type: String,
          required: true,
        },
        avatar:{
          type:String,
          required:true
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
// module.exports=Post

//-----------------------------------

exports.createPost = (postData) => {
    const post = new Post(postData);
    return post.save().catch((e) => console.log(e.message));
  };

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
      User.find({ title: title }).exec( (err, post)=> {
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