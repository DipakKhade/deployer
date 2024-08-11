import { commandOptions, createClient } from "redis";
import { getFilesFromS3 } from "./S3";

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
    await getFilesFromS3(msg.element)
  }
}

main();
