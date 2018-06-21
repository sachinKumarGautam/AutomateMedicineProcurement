import React from 'react';
import CSVReader from "react-csv-reader";
import FormDialog from './dialog.jsx';
import EnhancedTable from './component/Selecting.jsx';

class CSVFileUploader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            res: []
        }
    }
    handleFiles = (files) => {
        console.log(files)
        var arr = [];
        var keys = [];
        var output = [];
        for (let i = 1; i < files.length - 1; i++) {
            arr.push(files[i][6])
        }
        this.setState({
            result: arr
        })
        // console.log(arr)
        keys.push(files[0][6])
        keys.push(files[0][3])
        keys.push(files[0][7])
        keys.push(files[0][8])
        keys.push(files[0][9])
        keys.push(files[0][10])
        keys.push(files[0][15])
        // console.log(keys)
        for (let i = 1; i < files.length - 1; i++) {
            var obj = {};
            obj[keys[0]] = files[i][6];
            obj[keys[1]] = files[i][3];
            obj[keys[2]] = files[i][7];
            obj[keys[3]] = files[i][8];
            obj[keys[4]] = files[i][9];
            obj[keys[5]] = files[i][10];
            obj[keys[6]] = files[i][15];
            output.push(obj);
        }
        // console.log(output)
        this.setState({
            res: output
        })
    }

    getAllRows = () => {
        return this.state.result.map((item) => {
            return (<li>{JSON.stringify(item)}</li>);
        });
    }
    render() {
        return (
            <div className="container">
                <CSVReader
                    cssClass="react-csv-input"
                    onFileLoaded={this.handleFiles}
                />
                <datalist id="languages">
                    {this.state.res.map((item) => {
                        return <option key={item.id} value={item['ITEM NAME']} />
                    })}
                </datalist>
                <br/>
                <input type="text" list="languages" placeholder="  medicine name..." />
                <div>
                    <FormDialog />
                {this.state.res && <EnhancedTable items = {this.state.res} /> }
                {console.log(this.state.res)}
                </div>
            </div>

        );
    }
}

export default CSVFileUploader;