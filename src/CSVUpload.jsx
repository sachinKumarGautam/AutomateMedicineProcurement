import React from 'react';
import CSVReader from "react-csv-reader";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class CSVFileUploader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            output: []
        }
    }
    handleFiles = (files) => {
        console.log(files)
        var arr=[];
        var keys=[];
        var obj=[];
        //var output=[];
        for (let i=1; i<files.length-1; i++)
        {
            arr.push(files[i][6])
        } 
        this.setState({
            result: arr
        })
        console.log(arr) 
        keys.push(files[0][6])
        keys.push(files[0][3])
        keys.push(files[0][7])
        keys.push(files[0][8])
        keys.push(files[0][9])
        keys.push(files[0][10])
        keys.push(files[0][15])
        console.log(keys)  
    
        for (let i = 1; i < files.length - 1; i++){
           // var obj= {};
           var res = {};
    
           
            res[keys[0]]=files[i][6];
            res[keys[1]]=files[i][3];
            res[keys[2]]=files[i][7];
            res[keys[3]]=files[i][8];
            res[keys[4]]=files[i][9];
            res[keys[5]]=files[i][10];
            res[keys[6]]=files[i][15];
               
           
            obj.push(res);
            this.setState({
                output: obj 
            });
            
            
        }
        console.log(obj)
        this.props.onDataLoaded(obj);
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
                  {this.state.result.map((item) => {
                      return <option  value={item} />
                  })}
                </datalist> 
                <input type="text" list="languages" placeholder="  medicine name..."/>
                <input type="submit" value="submit" onClick={this.state.output} />
               
            </div>
        );
    }
}
