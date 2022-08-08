import { parseFitFile } from "./Importer.js";
import { readdirSync } from "fs";

(async () => {
  const folderToStart = "./fit-files/strava";
  // parse all the files
  const files = readdirSync(folderToStart)
    .filter((file) => {
      return file.endsWith(".fit");
    })
    .map((file) => `${folderToStart}/${file}`);

  for (const oneFile of files) {
    const result = await parseFitFile(oneFile);
    console.log(result);
  }
})();
