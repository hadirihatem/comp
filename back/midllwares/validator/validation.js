const { validationResult } = require('express-validator');

exports.validation=(req,res,next) =>{
    errors = validationResult(req);
    console.log('errors')
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
   
   } next()}

