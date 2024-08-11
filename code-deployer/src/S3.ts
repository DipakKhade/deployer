import { S3 } from "aws-sdk";
import { BUCKET_NAME } from "./exports";
import path from 'path'
import fs from 'fs'


const s3 = new S3({
    region:'eu-north-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

export const getFilesFromS3 = async (id:string)=>{
    const allFiles = s3.listObjectsV2({
        Bucket:BUCKET_NAME,
        Prefix:id
    }).promise();

    const promises = (await allFiles).Contents?.map(async ({f}:{f:any})=>{
        return new Promise(async(resolve , reject )=>{

            const local_path_to_store = path.join(__dirname , id)
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "vercel",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            })

        }) || [] ;
    })

    await Promise.all(promises?.filter(x => x !== undefined));

}
