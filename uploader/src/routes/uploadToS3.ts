import { Router } from "express";
import { Clone } from "../lib/clone";
import { create_id } from "../lib/clone";
export const uploadToS3Router = Router()

uploadToS3Router.post('/gitrepo',async(req,res)=>{
    const {gitrepourl} = req.body
    const id =create_id()
    const c=await Clone(gitrepourl,id)
    res.json({
        id
    })
})