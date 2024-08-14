import { commandOptions, createClient } from "redis";
import { getFilesFromS3, upload_dist } from "./s3";
import { generateBuild } from "./makeBuild";
import { getAllFilesAndDirectories } from "./s3";
import path from "path";

const Subscribe = createClient();
Subscribe.connect();

async function main() {
  while (1) {
    const msg = await Subscribe.brPop(
      commandOptions({ isolated: true }),
      "repo-queue",
      0
    );

    console.log(msg);
    if(msg?.element){
        await getFilesFromS3(msg.element)
        await generateBuild(msg.element)
        setTimeout(async()=>{
          const dist_path = path.join(__dirname,`/FileToMakeDist/${msg.element}/dist`)
          console.log(dist_path)
          const dist_files=getAllFilesAndDirectories(dist_path)
          await upload_dist(dist_files,msg?.element)
        },30000)
       
      
    }
  }
}

main();
