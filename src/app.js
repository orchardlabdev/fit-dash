import { parseFitFile } from "./Importer.js";
import { readdirSync } from "fs";

(async () => {
  const folderToStart = "./fit-files/HealthFit";
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

// problems:
// './fit-files/movescount/Move_2015_11_24_07_48_20_Running.fit'

// this file do not have record
