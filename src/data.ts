import { parseFitFile } from "./Importer";
import { readdirSync } from "fs";
//import * as d3 from "d3";
//const d3 = require("d3");

export async function pathData() {
  const folderToStart = "./fit-files/HealthFit";
  // parse all the files
  const files = readdirSync(folderToStart)
    .filter((file) => {
      return file.endsWith(".fit");
    })
    .map((file) => `${folderToStart}/${file}`);

  for (const oneFile of files) {
    const result = (await parseFitFile(oneFile)) as any;

    const positions = result.activity.sessions[0].laps[0].records.filter(
      (x: any) => {
        return (
          typeof x.position_long === "number" &&
          typeof x.position_lat === "number"
        );
      }
    );

    //https://www.sohamkamani.com/blog/javascript/2019-02-18-d3-geo-projections-explained/
    var coordinates = positions.map((x: any) => {
      return [x.position_long, x.position_lat];
    });

    // const projection = d3.geoAlbers();
    // const path = d3.geoPath().projection(projection);
    // console.log(path);
    // console.log(path(coordinates));

    let geoJsonFeature = {
      type: "Feature",
      properties: {
        name: "RunningRoutes",
      },
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    };

    let geoJson = {
      type: "FeatureCollection",
      features: [geoJsonFeature],
    };

    return geoJson;

    //    console.log(result);
    //    break;
  }
}

// problems:
// './fit-files/movescount/Move_2015_11_24_07_48_20_Running.fit'

// this file do not have record
