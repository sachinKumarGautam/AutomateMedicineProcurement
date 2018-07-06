import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SimpleTable from './SimpleTable';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'      , 
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


export class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    data: [],
    changedData:{},
    batch_no: "",
    item_name: "",
    company: "",
    pack:"",
    expiry: "",
    qty: 0,
    mrp: 0,
    errorText: "",
    error: false,
  };
  
  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };
  validate(){ 
    var qty = this.state.changedData.QTY;
    console.log(this.state.errorText);
      if(qty.length>=1){
        this.setState({
          errorText: this.state.data.QTY
        })
      }
      else{
        this.setState({
          errorText: 'Invalid QTY.',
          error: true
        })
      }
  }
  verifyRow(){
    console.log("c'mon", this.state.changedData.status);
    if(this.props.update) {
      console.log("from EnhancedTable")
      this.props.update(this.state.changedData) 
    } 
    if(this.props.edited) {
      console.log("from SimpleTable")
      this.props.edited(this.state.changedData)
    }
  }
  handleClickOpen = (n) => {
    
    // console.log(item);
    // this.refs.nameInputField.autoFocus;
    // document.getElementById('company').focus();
    this.setState({ open: true });  
    this.setState({
      data: n,
      changedData: n,
      // batch_no: n.BATCH,
      // item_name: n['ITEM NAME'],
      // company: n.COMPANY,
      // pack: n.PACK,
      // expiry: n.EXPIRY,
      // qty: n.QTY,
      // mrp: n.MRP,
    });
    console.log(this.state.company); 
  };
  handleClose = (name) => {
    console.log(this.state.error); 
    console.log(this.state.data.status);
    if(name==='cancel'){
      this.setState({ open: false });
      this.setState({
        errorText: "",
        error: false
      })
       
    }
   
    if(name==="confirm" && this.state.error===false){ //here '''&& this.state.data.status===true''' was also there!!!
      console.log("confirmed");
      this.setState({ open: false });
      console.log(this.state.data);
      this.setState({
        errorText: "",
        error: false
      })
       
      // this.setState((prevState) => ({
      //   changedData:{
      //     ...this.state.changedData, 
      //     status: false
      //    }
      //  }))  
      
      this.setState({changedData:{
            ...this.state.changedData, 
            status: false
           }}, () => {
        this.verifyRow();
      });
          // BATCH: this.state.batch_no,
          // ['ITEM NAME']: this.state.item_name,
          // COMPANY: this.state.company,
          // PACK: this.state.pack,
          // EXPIRY: this.state.expiry,
          // QTY: this.state.qty,
          // MRP: this.state.mrp,
      
      // if(this.props.update) {
      //   console.log("from EnhancedTable")
      //   this.props.update(this.state.changedData) 
      // } 
      // if(this.props.edited) {
      //   console.log("from SimpleTable")
      //   this.props.edited(this.state.changedData)
      // }
    }
  
      // {this.props.add};   
      // this.refs.child.AddRow(this.state.data);
      // this.props.update(this.state.data)
   


    // if(name=="cancel"){
    //   this.setState((prevState) => 
    //   ({[prevState.id] : null}))
    //   console.log(this.state.id);
    // }

    
   
  };
  
  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const {changedData} = this.state;
    // const focusUsernameInputField = TextField => {
    //   TextField && TextField.focus();
    // };

    console.log('akakakakak', this.state.changedData)

    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open responsive dialog</Button> */}
        {/* <SimpleTable ref="child" /> */}
        <Dialog 
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Please check the details:"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {/* <form className={classes.container} noValidate autoComplete="off"> */}
            Batch No.:
        <TextField
          id="batch"
          disabled = "true"
          value={this.state.changedData.BATCH}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                BATCH: e.target.value
               }
             })                
        } 
        margin="normal"
        />
       
        {/* </form> */}
        <br/>
        COMPANY:
        <TextField
          id="company"
          // ref={focusUsernameInputField}
          autoFocus={true}
          value={this.state.changedData.COMPANY}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                COMPANY: e.target.value
               }
             })                
        } 
        margin="normal"
        />
        {/* <br/> */}
        PACK:
        <TextField
          id="pack"
          value={this.state.changedData.PACK}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                PACK: e.target.value
               }
             })                
        } 
        margin="normal"
        />
        <br/>
        ITEM_NAME:      
        <TextField
          id="name"
          // label={this.state.item_name}
          // className={classes.textField}
          value={this.state.changedData['ITEM NAME']}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                ['ITEM NAME']: e.target.value
               }
             })                
        } 
          margin="normal"
          width = 'auto'
        />
        {/* <br/> */}
        Expiry:
        <TextField
          id="expiry"
          value={this.state.changedData.EXPIRY}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                EXPIRY: e.target.value
               }
             })                
        } 
        margin="normal"
        />
        <br/>
        QTY:
        <TextField
          id="qty"
          value={this.state.changedData.QTY}
          helperText = {this.state.errorText}
          error = {this.state.error}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                QTY: e.target.value
               }
             }, () => { this.validate()})                
        } 
        margin="normal"
        />
        {/* <br/> */}
        MRP:
        <TextField
          id="mrp"
          value={this.state.changedData.MRP}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                MRP: e.target.value
               }
             })                
        } 
        margin="normal"
        />
              {/* Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          
            <Button name="cancel" onClick={this.handleClose.bind(this, 'cancel')} color="primary">
              Cancel
            </Button>
            <Button name="confirm" onClick={this.handleClose.bind(this, 'confirm')} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  // add: PropTypes.func
};

//export default withMobileDialog()(ResponsiveDialog);
