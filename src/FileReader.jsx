import React from 'react';
import CSVReader from "react-csv-reader";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class CSVFileUploader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            output: [],
            ans2: [],
        }
    }
    componentDidMount(){
        var input = document.getElementById('nacho');
        input.focus();
    }
    
    getName(event) {
        console.log(event.target.value);
        if (event.target.value === '') {
            this.props.onDataLoaded(this.state.output);
            this.setState({
                ans2: this.state.output,
            })
        }
        else {
            var searchedRow = this.state.output.filter((row) => row['ITEM NAME'] === event.target.value || row.BATCH === event.target.value);
            this.props.onDataLoaded(searchedRow);
            this.setState((state) => ({
                ans2: searchedRow,
            }))
        }

    }
    handleFiles = (files) => {
        document.getElementById('nacho').blur();
        console.log(files)
        var arr = [];
        var keys = [];
        var obj = [];
        var status;
        //var output=[];
        for (let i = 1; i < files.length - 1; i++) {
            arr.push(files[i][6])
            arr.push(files[i][8])
        }
        this.setState({
            result: arr
        })
        console.log(this.state.result)
        keys.push(files[0][6])
        keys.push(files[0][3])
        keys.push(files[0][7])
        keys.push(files[0][8])
        keys.push(files[0][9])
        keys.push(files[0][10])
        keys.push(files[0][15])
        console.log(keys)
    
        for (let i = 1; i < files.length - 1; i++) {
            // var obj= {};
            var res = {};


            res[keys[0]] = files[i][6];
            res[keys[1]] = files[i][3];
            res[keys[2]] = files[i][7];
            res[keys[3]] = files[i][8];
            res[keys[4]] = files[i][9];
            res[keys[5]] = files[i][10];
            res[keys[6]] = files[i][15];
            res['status'] = true;
            

            obj.push(res);
            //*** here new lines are added ***//
            var hash = [];
            var orders = obj;
            for(let i=0; i<obj.length; i++){
                var index = obj[i].BATCH;
                if(!hash[index]){
                    hash[index] = i;
                }
                else{
                    var rows = orders[i];
                    rows.QTY = Number(rows.QTY) + Number(orders[hash[index]].QTY);
                    orders.splice(hash[index], 1, rows);
                    orders.splice(i, 1);
                    hash[index] = i;
                }
            }


            this.setState({
                output: obj,
                ans2: orders, //here changed from obj to orders;
            });
          

        }
        console.log(orders)
        this.props.onDataLoaded(this.state.ans2);
    }

    getAllRows = () => {
        return this.state.result.map((item) => {
            return (<li>{JSON.stringify(item)}</li>);
        });
    }
    render() {
        return (
            <div className="container">
                
                <datalist id="languages">
                    {this.state.result.map((item) => {
                        return <option value={item} />
                    })}
                </datalist>
                <br />
                {/* <input type="text" style = {{width: '100%', boxSizing: 'border-box', borderRadius: '0.5em', border: '0.15em solid #808080', height: 30,  margin: '0 auto', textAlign: 'center'}}  onChange={this.getName.bind(this)} list="languages" placeholder="  medicine name and batch no..." /> */}
                
               
                <CSVReader 
                    inputId = 'nacho'
                    cssClass="react-csv-input"
                    onFileLoaded={this.handleFiles} 
                />
            </div>
        );
    }
}

export default CSVFileUploader;