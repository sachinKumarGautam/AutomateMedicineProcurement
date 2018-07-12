import React from 'react';
import Papa from 'papaparse';

class CsvParse extends React.Component {
    handleFile = event => {
        const file = event.target.files[0]
    
        Papa.parse(file, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
                console.log("Finished:", results.data[0]);
            }
        });
    
    }
    fileuploadhandler = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <div>
              <input type="file" onChange={this.handleFile}/>
              <button onClick={this.fileuploadhandler}>upload</button>
            </div>
        );
    }
}
export default CsvParse;

