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
    const id = path.basename(path.dirname(filePaths[0]));
    const uploadPromises = filePaths
        .filter(filePath => fs.statSync(filePath).isFile()) 
        .map(filePath => {
            const fileStream = fs.createReadStream(filePath);
            const relativePath = path.relative(path.dirname(filePaths[0]), filePath);
            const s3Key = path.join(id, relativePath); 

            return s3.upload({
                Bucket: bucketName,
                Key: s3Key.replace(/\\/g, '/'),
                Body: fileStream,
            }).promise();
        });

    try {
        const results = await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};


