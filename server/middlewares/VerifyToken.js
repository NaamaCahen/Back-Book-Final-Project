import jwt from 'jsonwebtoken';
import db from '../config/elephantsql.js';

export const VerifyToken=(req,res,next)=>{
    const accessToken=req.cookies.accessToken|| req.headers['x-access-token'];

    if(!accessToken) return res.status(401).json({msg:'permission denied!'})

    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,decode)=>{
        if(err) return res.status(403).json({msg:'verify token failed!'});

        try {
            const user=await db('users').select('*').where({email:decode.email});
            next();
        } catch (e) {
            res.status(403).json({msg:'verify user failed!'})

        }
    })
}