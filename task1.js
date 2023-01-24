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
        fs.writeFileSync(fileName, data); 
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
// const maxRecords = 401;
// const fetchData = async() => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const responseJson = await response.json();
//     return responseJson;
//     // const file_name = './CSV_files/postdata.csv';
//     // const data = post_data;
//     // createCSVFile( file_name , data );
// }

// const convertToCSV = async () => {
//     const json = await fetchData();

//     let keys = Object.keys(flatten(json[0]));

//     let options = {
//         keys: keys
//     };

//     converter.json2csv(json, json2csvCallback, options);
// };

//     let json2csvCallback = function (err, csv) {

//     if (err) throw err;

//     const headers = csv.split('\n').slice(0,1);  
//     const records = csv.split('\n').slice(0,);
//     // console.log("record");
//     // console.log(records.slice(1, 1+3));

//     // csv = records.map(row => Object.values(row));
//     // csv.unshift(Object.keys(records[0]));
//     // const dataOut = csv.join('"\n"').replace(/,/g, '","')
//     // return csv.join('\n');
//     for(let i=1;i<records.length;i=i+maxRecords) {
//         let dataOut = headers.concat(records.slice(i, i+3)).join('\n');
//         console.log(dataOut);
//     //     let id = Math.floor(i/maxRecords)+1;
//         fs.writeFileSync('./CSV_files/postdata.csv', dataOut)
//     }
// };
  

// convertToCSV();
