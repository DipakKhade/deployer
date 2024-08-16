
import { Request , Response , NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req:Request,res:Response,next:NextFunction) =>{
    const { Authoriation } = req.headers
    const token = (Authoriation as string)?.split(' ')[1]

    const is_verified  = jwt.verify(token,process.env.JWT_SEC as string)

    if(is_verified){
        next()
    }else{
        return res.json({
            success:false,
            message:"invalid authorization headers"
        })
    }
}