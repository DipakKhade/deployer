import { S3 } from "aws-sdk";
import { AWS_REGION, BUCKET_NAME } from "./exports";
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config()

const s3 = new S3({
    region : AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

export const getFilesFromS3 = async (id:string)=>{
    const allFiles = await s3.listObjectsV2({
        Bucket:BUCKET_NAME,
        Prefix:id
    }).promise();

    const promises : Promise<any>[] | any = allFiles.Contents?.map(async({Key}:any)=>{
            return new Promise(async(resolve , reject )=>{
                const local_path_to_store = path.join(__dirname , `/FileToMakeDist/${Key}`)
                const outputFile = fs.createWriteStream(local_path_to_store);
                const dir_name = path.dirname(local_path_to_store);
                if (!fs.existsSync(dir_name)){
                    fs.mkdirSync(dir_name, { recursive: true });
                }

                     s3.getObject({
                        Bucket: BUCKET_NAME,
                        Key:`${Key}`
                    }).createReadStream().pipe(outputFile).on("finish", () => {
                        resolve("");
                    })
              
               
    
            }) || [] ;
    })
    

    await Promise.all(promises);

}
