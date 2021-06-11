'use strict';
const multer = require('multer');

const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads')
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
  
//    func:(req,res,next)=>{
//         var x = 'uploads/'+req.file.originalname;
//         var post = new Post({
//           files:x
//         })
//         post.save((err,data)=>{
//             if(err){
//                 console.log(err)
//             }
//             res.redirect('/')
//         })
//         next()
//       }

const upload = multer({storage: storage,}).single('files');
module.exports = {upload}