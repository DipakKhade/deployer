import path from 'path';
import simpleGit from 'simple-git';
import { v4 as uuidv4 } from 'uuid';



export async function Clone(url:string,id:string){
    await simpleGit().clone(url,path.join(__dirname,`../../uploads/${id}`))
    return
}


export function create_id(){
   let random_id=uuidv4().slice(0,6);
   return random_id
}