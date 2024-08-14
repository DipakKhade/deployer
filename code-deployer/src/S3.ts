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



export const upload_dist=async(filePaths:string[],prefix:string)=>{
    const id = path.basename(path.dirname(filePaths[0]));
const uploadPromises = filePaths
    .filter(filePath => fs.statSync(filePath).isFile()) 
    .map(filePath => {
        const fileStream = fs.createReadStream(filePath);
        const relativePath = path.relative(path.dirname(filePaths[0]), filePath);
        const s3Key = path.join(id, relativePath); 

        return s3.upload({
            Bucket: BUCKET_NAME,
            Key: prefix+s3Key.replace(/\\/g, '/'),
            Body: fileStream,
        }).promise();
    });

try {
    const results = await Promise.all(uploadPromises);
} catch (error) {
    console.error('Error uploading files:', error);
}
}



export function getAllFilesAndDirectories(dirPath: string, arrayOfFilesAndDirs: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFilesAndDirs.push(fullPath);
            getAllFilesAndDirectories(fullPath, arrayOfFilesAndDirs);
        } else {
            arrayOfFilesAndDirs.push(fullPath);
        }
    });

    return arrayOfFilesAndDirs;
}