import { Router } from "express";
import { Clone } from "../lib/clone";
import { create_id } from "../lib/clone";
import { getAllFilesAndDirectories } from "../lib/files";
import { uploadFilesToS3 } from "../lib/s3";
import { createClient , RedisClientType} from 'redis'
import { deleteUploadedFiles } from "../lib/deleteFiles";


export const uploadToS3Router = Router();

let Publisher : RedisClientType;
(async()=>{
   Publisher = createClient({
     url: 'redis://localhost:6379'
  }) 
  await Publisher.connect()
})();

uploadToS3Router.post("/gitrepo", async (req, res) => {
  const { gitrepourl } = req.body;

  const id = create_id();

  try {
    const c = await Clone(gitrepourl, id);

    const files_to_upload = getAllFilesAndDirectories(`D:\\Dipak\\uploader\\uploads\\${id}`);
      
    await uploadFilesToS3(files_to_upload);

    await Publisher.lPush('repo-queue', id);

    deleteUploadedFiles(id)

  } catch (e) {

    console.log(e)

  }

  res.json({
    id,
  });
});
