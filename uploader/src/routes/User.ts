import { Router } from "express";
import {db} from '../db'
import { sendTokenViaEmail } from "../lib/mail";
import crypto from 'crypto';
import { FRONTEND_URL } from "../lib/exports";


export const userRouter =  Router();

userRouter.post('/signup',async(req,res)=>{
    const {email} = req.body;
    console.log(email)
    if(!email){
        res.status(400).json({
            message:"enter valid email"
        })
    }

    try{
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token)
        const user_to_add = await db.user.create({
            data:{
                email,
                isVerified:false,
                token:{
                    create:{
                        token
                    }
                }
            }
        })


        const message = `${FRONTEND_URL}/verify/${user_to_add.id}/${token}`;
        await sendTokenViaEmail(email,message)
        res.status(200).json({
            message:`open your Gmail to verify ${email}`
        })

    }catch(e){
        console.log(e)
    }
    
})


userRouter.get('/verify/:id/:token',async(req,res)=>{
    const {id , token } = req.params

    try{
        const user = await db.user.findFirst({
            where:{
                id:Number(id)
            },
            include:{
                token:{
                   select:{
                    token:true
                   }
                }
            }
        })

        if(!user){
            res.status(400).json({
                message:"invalid url"
            })
        }

      if(user?.token?.token==token){
        await db.user.update({
            where:{
                id:Number(id)
            },
            data:{
                isVerified:true
            }
        })

        res.status(200).json({
            message:"verification successful"
        })
      }else{
        res.json({
            message:"invalid url"
          })
            
      }

      
    }catch(e){
        console.log(e)
        res.json({
            message:"something went wrong"
        })
    }
})