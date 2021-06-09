const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema({
  groupeAdmin: {
    
    type:mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
  users:[String],
  Name: String,
  avatar: String,
  theme: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Groupe = mongoose.model("Groupe", GroupeSchema);

//----------------------------------------------

exports.createGroupe = (groupetData) => {
  const groupe = new Groupe(groupetData);
  return groupe.save().catch((e) => console.log(e.message));
};

//--------------------------------------------

exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

//--------------------------------------

exports.findByName = (name) => {
  return new Promise((resolve, reject) => {
    Groupe.find({ name: name }).exec((err, groupe) => {
      if (err) {
        reject(err);
      } else {
        resolve(groupe);
      }
    });
  });
};
//--------findbyadmin


exports.findBygroupeAdmin = (groupeAdmin) => {
  return new Promise((resolve, reject) => {
    Groupe.find({ groupeAdmin: groupeAdmin }).exec(function (err, groupe) {
      if (err) {
        reject(err);
      } else {
        resolve(groupe);
      }
    });
  });
};

//----------findbyuserid-------------------

exports.findByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    Groupe.find({ userId: userId }).exec((err, groupe) => {
      if (err) {
        reject(err);
      } else {
        resolve(groupe);
      }
    });
  });
};

//-----------------remove--------------------------
exports.removeById = (groupeId) => {
  return new Promise((resolve, reject) => {
    Groupe.deleteOne({ _id: groupeId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

//------------------update----

exports.putgroupe = (groupetData, id) => {
  return new Promise((resolve, reject) => {
    Groupe.findByIdAndUpdate((err, groupetData) => {
      if (err) {
        reject(err);
      } else {
        console.log(groupetData);
        resolve(groupetData);
      }
    });
  });
};


//-----------fetching---------------------

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Groupe.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, groupe) {
        if (err) {
          reject(err);
        } else {
          resolve(groupe);
        }
      });
  });
};