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
    width: 250,
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
    errorText2: "",
    error: false,
    changed: false,
    changed2: false,
  };
  
  componentDidMount() {
    this.props.onRef(this)
}
componentWillUnmount() {
    this.props.onRef(undefined)
}
  
  validate(id){ 
    if(id==="qty"){
      if(this.state.changedData.QTY.length<1){
        this.setState({
          changed:true,
          errorText: this.state.data.QTY,
        })
      }
      else{
        this.setState({
          changed:false,
          errorText: "",
        })
      }
    }
    if(id==="pack"){
      if(this.state.changedData.PACK.length<1){
        this.setState({
          changed2:true,
          errorText2: this.state.data.PACK,
        })
      }
      else{
        this.setState({
          changed2:false,
          errorText2: "",
        })
      }
    }
      if(this.state.changedData.QTY.length>=1 && this.state.changedData.MRP.length>=1 && this.state.changedData.EXPIRY.length>=1 && this.state.changedData['ITEM NAME'].length>=1 && this.state.changedData.PACK.length>=1 && this.state.changedData.COMPANY.length>=1 ){
        this.setState({
          // errorText: '',
          error: false
        })
      }
      else{
        this.setState({
          // errorText: 'Invalid value',
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
    
  
    this.setState({ open: true });  
    this.setState({
      data: n,
      changedData: n,
    
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
        errorText2: "",
        error: false,
        changed: false,
        changed2: false,
      })
       
    }
   
    if(name==="confirm" && this.state.error===false){ //here '''&& this.state.data.status===true''' was also there!!!
      console.log("confirmed");
      this.setState({ open: false });
      console.log(this.state.data);
      this.setState({
        errorText: "",
        errorText2: "",
        error: false,
        changed: false,
        changed2: false,
      })
       
      
      
      this.setState({changedData:{
            ...this.state.changedData, 
            status: false
           }}, () => {
        this.verifyRow();
      });

    }

   
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
            {/* <TextField
          id="title"
          value={"Please check the details:"}
          helperText = {this.state.errorText}
          error = {this.state.error}
          disabled = "true"
        margin="normal"
        />
        <br/> */}
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
       
    
        <br/>
        COMPANY:
        <TextField
          id="company"
        
          autoFocus={true}
          value={this.state.changedData.COMPANY}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                COMPANY: e.target.value
               }
             }, () => { this.validate("company")})                
        } 
        margin="normal"
        />
       
        PACK:
        <TextField
          id="pack"
          value={this.state.changedData.PACK}
          error={this.state.changed2}
          helperText = {this.state.errorText2}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                PACK: e.target.value
               }
             }, () => { this.validate("pack")})                 
        } 
        margin="normal"
        />
        <br/>
        ITEM_NAME:      
        <TextField
          id="name"
          value={this.state.changedData['ITEM NAME']}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                ['ITEM NAME']: e.target.value
               }
             }, () => { this.validate("name")})                 
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
             }, () => { this.validate("expiry")})                 
        } 
        margin="normal"
        />
        <br/>
        QTY:
        <TextField
          id="qty"
          value={this.state.changedData.QTY}
          helperText = {this.state.errorText}
          error = {this.state.changed}
          onChange={e=>
            this.setState({
              changedData:{
                ...this.state.changedData, 
                QTY: e.target.value
               }
             }, () => { this.validate("qty")})                
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
             }, () => { this.validate("mrp")})                  
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

export default withStyles(styles)(ResponsiveDialog);
