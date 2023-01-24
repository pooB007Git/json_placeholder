import fetch from 'node-fetch';
import fs from "fs";

const CreateCSVClass = class {
    constructor( api_path , file_path ) {
        this.file_path = file_path;
        this.api_path = api_path;
    }

    fetchData = async() => {
        const response = await fetch(this.api_path);
        const data = await response.json();
        return data;
    }
    arrayToCSV = async(data) => {
        console.log(data)
        const csv = data.map(row => Object.values(row));
        csv.unshift(Object.keys(data[0]));
        return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
    }

    writeCSV = async( fileName, data ) => {
        try {
            fs.appendFileSync(fileName, data); 
        } catch (err) {
        console.log(err);
        process.exit(1);
        }
    }
}
const class_csv = new CreateCSVClass( "https://jsonplaceholder.typicode.com/posts" , "./CSV_files/postdata.csv" )
const data = await class_csv.fetchData();
const CSV = await class_csv.arrayToCSV(data);
class_csv.writeCSV(class_csv.file_path, CSV);
console.log(`Successfully converted ${class_csv.file_path}!`);

