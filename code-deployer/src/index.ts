import { commandOptions, createClient } from "redis";
import { getFilesFromS3 } from "./s3";
import { generateBuild } from "./makeBuild";

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
    }
  }
}

main();
