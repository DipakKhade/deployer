import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()

aws.config.update({
    region: 'eu-north-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new aws.S3();
const bucketName = 'deployeruploads';

export const uploadFilesToS3 = async (filePaths: string[]) => {
    console.log('process.env.AWS_ACCESS_KEY_ID',process.env.AWS_ACCESS_KEY_ID,' process.env.AWS_SECRET_ACCESS_KEY', process.env.AWS_SECRET_ACCESS_KEY);
    
    const uploadPromises = filePaths
        .filter(filePath => {
            const isFile = fs.statSync(filePath).isFile();
            return isFile; 
        })
        .map(filePath => {
            const fileStream = fs.createReadStream(filePath);
            const fileName = path.relative(path.dirname(filePaths[0]), filePath); 
            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: fileStream,
            };

            return s3.upload(params).promise();
        });

    try {
        const results = await Promise.all(uploadPromises);
        console.log('Files uploaded successfully:', results);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};


