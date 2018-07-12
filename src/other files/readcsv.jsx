import React from 'react';
import ReactFileReader from 'react-file-reader';
class CSVFileUploader extends React.Component {
    handleFiles = (files) => {
        console.log(files)
        // Check for the various File API support.
    if (window.FileReader) {
            // FileReader are supported.
            this.getAsText(files[0]);
        }
    }

    getAsText(fileToRead) {
        console.log(fileToRead)
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.window.FileReader(fileToRead);
        // Handle errors load
        reader.onload = this.fileReadingFinished;
        reader.onerror = this.errorHandler;
    }

    processdata(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = allTextLines.map(data => data.split(';'))

        console.log(lines)
    }

    fileReadingFinished(event) {
        var csv = event.target.result;
        console.log(csv)
        this.processdata(csv);
    }

    errorHandler(event) {
        if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file!");
        }
    }

    render() {
        return(
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
    <button className='btn'>Upload</button>
</ReactFileReader>
        );
    }
}
export default CSVFileUploader;