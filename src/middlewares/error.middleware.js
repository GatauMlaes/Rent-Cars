const { ValidationError } = require("sequelize");
const multer = require('multer')
const Response_Error = require("../errors/error.handler");
const jwt = require('jsonwebtoken');

let messages = {}
const error_middleware = async (err, req, res, next) => {


  if(!err){
    next()
    return ;
}

if(err instanceof Response_Error){
    //Req.flash()
    messages.code = err.status
    messages.msg = err.message
    req.flash("error",messages)
    // res.status(err.status).json({errors : err.message}).end();
} else if(err instanceof ValidationError){
    const validationErrors = err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      res.status(400).json({ errors: validationErrors }).end();
} else if (err instanceof multer.MulterError ){
    res.status(400).json({errors : err.message}).end();
} else if (err instanceof jwt.TokenExpiredError) {
    messages.code = 401
    messages.msg = err.message
    req.flash("error",messages)
  }  else if(err instanceof jwt.JsonWebTokenError){
    messages.code = 401
    messages.msg = err.message
    req.flash("error",messages)
} else {
    res.status(500).json({errors : err.message}).end();
}
};

module.exports = error_middleware
