import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
        }
    }
    
    handleClickOpen=()=>{
        this.setState({
            open:true,
        })
        console.log(this.props.left);
        console.log(this.props.right);
    } 

    handleClose=(name)=>{
        this.setState({
            open:false,
        })
        if(name==='print'){
            window.print();
        }

    }

    render(){
        
        return(
            <div>
                <Dialog
                  fullScreen
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="responsive-dialog-title"
                  >
                  <DialogTitle id="responsive-dialog-title">{"Mis-match Report"}</DialogTitle>
                  <DialogContent>
                      <DialogContentText>

                  this is a new MisMatch Report Table 
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button name="print" onClick={this.handleClose.bind(this, 'print')} >Print</Button>
                      <Button name="close" onClick={this.handleClose.bind(this, 'close')} >Close</Button>
                      </DialogActions>
                </Dialog>
                </div>
        );
    }







}
Report.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  };