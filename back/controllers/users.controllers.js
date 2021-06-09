require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/User")


//-------------register---------------

exports.insert = (req, res, next) => {
  User.find({ email: req.body.email })
  .then((users) => {
    if (users.length) {
      return res
        .status(400)
        .send({ errors: [{ msg: "User already exists!" }] });
    }

    let newUser = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err;
      }

      bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
        if (err) {
          throw err;
        }
        newUser.password = hashedPwd;
        newUser.save();

        let payload = {
          userId: newUser._id,
        };
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        });
      });
    });
  });
};



// exports.insert = (req, res) => {
//   let salt = crypto.randomBytes(16).toString("base64");
//   let hash = crypto
//     .createHmac("sha512", salt)
//     .update(req.body.password)
//     .digest("base64");
//   req.body.password = salt + "$" + hash;
//   // req.body.permissionLevel = 1;
//   User.createUser(req.body).then((result) => {
//     result != undefined
//       ? res.status(201).send({
//           code: 201,
//           status: "success",
//           message: "user created",
//           data: result,
//         })
//       : res.status(400).send({
//           code: 400,
//           status: "error",
//           message: "Invalid user object",
//         });
//     //{ id: result._id }
//   });
// };

//load connected User
exports.getbyId = (req, res) => {
  User.findById(req.userId)
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
};

//-----get user post-----------

exports.getuserpost = (req, res) => {
  User.find({ owner: req.userId })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
};

//--------------login---

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: "please register before" }] });
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "PSW wrong" }] });
      } else {
        let payload = {
          userId: user._id,
        };
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        });
      }
    });
  });
};

//----------------update----------------

exports.update = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.userId }, req.body).then(() => {
    User.findOne({ _id: req.params.userId }).then((user) => {
      res.send({ user });
    });
  });
//   User.putUser(req.params.userId, req.body)
//     .then((result) => {
//       res.status(200).send({
//         code: 200,
//         status: "success",
//         message: "user updated",
//         data: result,
//       });
//     })
//     .catch(() =>
//       res.status(404).send("User not found, retry with a valid userId.")
//     );
};

//--------------------fetching-------------


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
  User.list(page).then((result) => {
    res.status(200).send({
      code: 200,
      status: "success",
      message: "users fetched",
      data: result,
    });
  });
};

