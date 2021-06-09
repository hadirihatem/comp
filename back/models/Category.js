const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Category = mongoose.model("Category", GroupeSchema);

//----------------------------------------------

exports.createCategory = (CategorytData) => {
  const category = new Category(CategorytData);
  return category.save().catch((e) => console.log(e.message));
};

//--------------------------------------------

exports.findById = (id) => {
  return Category.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

//--------------------------------------

exports.findByTitle = (title) => {
  return new Promise((resolve, reject) => {
    Category.find({ title: title }).exec((err, category) => {
      if (err) {
        reject(err);
      } else {
        resolve(category);
      }
    });
  });
};




//------------------update----

exports.patchcategory = (categoryData, id) => {
  return new Promise((resolve, reject) => {
    Category.findByIdAndUpdate((err, categoryData) => {
      if (err) {
        reject(err);
      } else {
        console.log(categoryData);
        resolve(categoryData);
      }
    });
  });
};


