import fetch from 'node-fetch';
import fs from "fs";

function arrayToCSV (data) {
    const csv = data.map(row => Object.values(row));
    console.log("CSV");
    console.log(csv);
    csv.unshift(Object.keys(data[0]));
    return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
}

async function writeCSV (fileName, data) {
    try {
        fs.appendFileSync(fileName, data); 
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
}

(async () => {
    const outputFileName = './CSV_files/postdata.csv';

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

  	// const data = await parseJSONFile(inputFileName);
  	const CSV = arrayToCSV(data);
  	await writeCSV(outputFileName, CSV);
	console.log(`Successfully converted ${outputFileName}!`);
})();
