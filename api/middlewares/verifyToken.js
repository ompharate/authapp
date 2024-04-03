import jwt from 'jsonwebtoken';
import  {errorHandler}  from '../../services/error.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));
    
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        
        if (err) return next(errorHandler(403,'you are not authenticated'))
        req.user = user.user;
      
        next();

    }); 
}

export {verifyToken};