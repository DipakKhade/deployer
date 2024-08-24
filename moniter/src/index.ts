import express from 'express' 
import {createClient} from 'redis'

const app=express();
const PORT = 3002 ;


const subscriber = createClient()
subscriber.connect()

app.get('/moniter',async(req,res)=>{
    const { id } = req.query.id 
    if(!id){
        return
    }
    const response = await subscriber.hGet('deployment-status',id as string)

    return res.json({
        success:true,
        response
    })
})

