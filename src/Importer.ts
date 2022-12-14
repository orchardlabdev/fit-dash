// fit-file-parser is a commonjs module
// so import it in this way is required
//import FitParserCommonLib from "fit-file-parser";
//const FitParser = FitParserCommonLib.default;

const FitParser: any = require("fit-file-parser").default;
import { readFile } from "fs";

export async function parseFitFile(file: string) {
  return new Promise((resolve, reject) => {
    readFile(file, function (err, content) {
      // Create a FitParser instance (options argument is optional)
      var fitParser = new FitParser({
        force: true,
        speedUnit: "mph",
        lengthUnit: "mi",
        temperatureUnit: "kelvin",
        elapsedRecordField: true,
        mode: "cascade",
      });

      // Parse your file
      fitParser.parse(content, function (error: any, data: any) {
        // Handle result of parse method
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
}
