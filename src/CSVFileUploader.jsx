import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CSVReader from "react-csv-reader";
import SearchBar from 'material-ui-search-bar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import CSSGrid from './CSSGrid.jsx';

const styles = theme => ({
    buttonalign: {
        // margin: theme.spacing.unit *3,
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class CSVFileUploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wholetable: [],
            dropdownlist: [],
        }
    }
    componentDidMount() {
        document.getElementById("input").focus()
    }
    handleFiles = (files) => {
        document.getElementById("input").blur()
        var keys = [];
        var output = [];
        var dropdowncontent = [];

        keys.push(files[0][6])
        keys.push(files[0][3])
        keys.push(files[0][7])
        keys.push(files[0][8])
        keys.push(files[0][9])
        keys.push(files[0][10])
        keys.push(files[0][15])
        keys.push('verified')
        for (let i = 1; i < files.length - 1; i++) {
            var obj = {};
            obj[keys[0]] = files[i][6];
            obj[keys[1]] = files[i][3];
            obj[keys[2]] = files[i][7];
            obj[keys[3]] = files[i][8];
            obj[keys[4]] = files[i][9];
            obj[keys[5]] = Number(files[i][10]);
            obj[keys[6]] = files[i][15];
            obj[keys[7]] = false;
            if (i === 1 || obj.BATCH !== output[output.length - 1].BATCH) {
                output.push(obj);
                dropdowncontent.push(files[i][6]);
                dropdowncontent.push(files[i][8]);
            }
            else if (obj.BATCH === output[output.length - 1].BATCH) {
                output[output.length - 1].QTY += obj.QTY;
            }
        }
        this.setState({
            wholetable: output,
            dropdownlist: dropdowncontent,
        })
    }
    refreshPage() {
        window.location.reload();
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                <CSVReader
                    cssClass="react-csv-input"
                    onFileLoaded={this.handleFiles}
                    // autofocus={true}
                    inputId="input"
                />
                {/* <datalist id="languages">
                    {this.state.dropdownlist.map((item) => {
                        return <option key={item.BATCH} value={item}/>
                    })}
                </datalist>
                <br />
                <input onChange={this.updateName.bind(this)} 
                height='28px' padding-left= '100px'
                list="languages" placeholder="  medicine name..." /> */}
                <div>
                    {this.state.wholetable && <CSSGrid datatable={this.state.wholetable} />}
                </div>
                <div className={classes.buttonalign}>
                    <Button variant="contained" color="default" className={classes.button}
                        onClick={this.refreshPage.bind(this)}>
                        Reset
                        <DeleteIcon />
                    </Button>
                    <Button variant="contained" color="default" className={classes.button}>
                        Upload
                        <FileUploadIcon />
                    </Button>
                </div>
            </div>
        );
    }
}
CSVFileUploader.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CSVFileUploader);

// getAllRows = () => {
//     return this.state.result.map((item) => {
//         return (<li>{JSON.stringify(item)}</li>);
//     });
// }
// showPopup: false

// togglePopup() {
//     this.setState({
//         showPopup: !this.state.showPopup
//     });
// }
// handleKeyPress=(event)=> {
//     if (event.keyCode === 13) {
//         this.refs.email.focus();
//     }
// }

// onKeyPress={this.handleKeyPress}
// ref='name'

{/* <div className={classes.pop}>
                    <button onClick={this.togglePopup.bind(this)}>show popup</button>
                   {this.state.showPopup ?
                        <Popup
                            text='Close Me'
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div> */}
{/* <Popup trigger={<button> Trigger</button>} position="right center">
                    <div>Popup content here !!</div>
                </Popup> */}