const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    phone:Number,
    email:{type:String,
      required:true},
    password:String,
    status: {
        type: Boolean,
        default: false,
      },
      permissionLevel: {
        type: Number,
        default: 1,
      },
      created_at: {
        type: Date,
        default: Date.now,
    },
    blocking: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  }
);
const User=mongoose.model('User',UserSchema);
module.exports=User
//--------------------------------------------------------

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save().catch((e) => console.log(e.message));
};


//--------------------------------------------------


exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

//---------------------------------------

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.find({ email: email }).exec( (err, user) =>{
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};


//--------------------findByStatus(online of offline)-----------------------------------
exports.findByStatus = (status) => {
  return new Promise((resolve, reject) => {
    User.find({ status: status }).exec( (err, user)=> {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};


//-------------findbyname-----------------


exports.findByname = (firstname) => {
  return new Promise((resolve, reject) => {
    User.find({ firstname: firstname }).exec( (err, user) =>{
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

//-----------update-----------

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id,  (err, user)=> {
      if (err) reject(err);
      else {
        for (let i in userData) {
          user[i] = userData[i];
        }
        user.save( (err, updatedUser)=> {
          if (err) return reject(err);
          resolve(updatedUser);
        });
      }
    });
  });
};



//-----------------remove------------------------------
exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

//---------------



exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};