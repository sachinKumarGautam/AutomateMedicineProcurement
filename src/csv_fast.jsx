import { createReadStream } from "fs";
import csv from "fast-csv";

class CsvParse extends React.Component {
createReadStream('./Invoice1.csv')
    .pipe(csv())
    .on('data',function(data){
        console.log(data);
    })
    .on('end', function(data){
        console.log('Read Finished');
    });
}
export default CsvParse;
