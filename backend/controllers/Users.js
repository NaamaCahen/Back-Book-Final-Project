
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import db from "../config/elephantsql.js";

export const register=async(req,res)=>{
    const {email,password,user_first_name,user_last_name,country,city,street,num_house,phone} =req.body;

    const salt=await bcrypt.genSalt();
    const hash=await bcrypt.hash(password,salt);

    db('users').insert({
        email:email.toLowerCase(),
        password:hash,
        user_first_name,
        user_last_name,
        country,
        city,
        street,
        num_house,
        phone
    }).returning('*')
    .then(rows=>{
        const user_id=rows[0].user_id;
        const email=rows[0].email;
        const token=jwt.sign({user_id,email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'30s'
        });

        res.cookie('accessToken',token,{
            httpOnly:true,
            maxAge:30*1000
        });

        res.json({token:token})
        
    })
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:'email already exists'})
    })
   
}

export const login=async(req,res)=>{
    try{
        const user=await db('users').select('*').where({email:req.body.email.toLowerCase()});

        const match=await bcrypt.compare(req.body.password,user[0].password);
        if(!match) return res.status(400).json({msg:'wrong password'});

        const user_id=user[0].user_id;
        const email=user[0].email;

        const token=jwt.sign({user_id,email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'30s'
        });

        res.cookie('accessToken',token,{
            httpOnly:true,
            maxAge:30*1000
        });
        console.log(res.cookie.accessToken);
        res.json({token:token})
    }catch(e){
        console.log(e);
        res.status(404).json({msg:'email not found'})
    }
}

export const logout=(req,res)=>{
    const accessToken=req.cookies.accessToken;
    if(!accessToken) return res.status(204).json({msg:'cleared'})
    res.clearCookie('accessToken');
    res.status(200).json()
}

export const token=(req,res)=>{
    const accessToken=req.cookies.accessToken || req.headers['x-access-token'];

    const decode=jwt_decode(accessToken);

    console.log(decode.user_id,decode.email);

    const token=jwt.sign({user_id:decode.user_id,email:decode.email},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'120s'
    });

    res.cookie('accessToken',token,{
        httpOnly:true,
        maxAge:120*1000
    });

    res.status(200).json({token:accessToken})
}
