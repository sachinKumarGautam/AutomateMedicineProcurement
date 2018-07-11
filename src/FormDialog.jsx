import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

class FormDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      verify: false,
      originalrow: {},
      y: {},
      Error_obj: {},
      error: {},
    };
  }

  verifyRow() {
    if (this.props.update) {
      this.props.update(this.state.y)
    }
    if (this.props.editnow) {
      this.props.editnow(this.state.y)
    }
  }
  handleopen = (n) => {
    this.setState({ 
      open: true,
      y: n,
      originalrow: n,
    })
  }

  validate = (name) => {
  if (this.state.y[name]==='') {
    this.setState(
      // (state)=>
      {
      // let row=state.Error_obj
      // row[name]="Requires valid entry"
      // QTYError: "Requires valid entry",
      Error_obj: { ...this.state.Error_obj, [name]: "Requires valid entry"},
      error: { ...this.state.error, [name]: true},
      // error: true
      // return {Error_obj:row, error: true}
    });
  }
  else {
    this.setState({
      // QTYError: this.state.originalrow[name],
      Error_obj: { ...this.state.Error_obj, [name]: this.state.originalrow[name]},
      error: { ...this.state.error, [name]: false},
      // error: false,
    });
  }
  };

  handleClose = (name) => {
    if (name === 'cancel') {
      this.setState({
        open: false,
        Error_obj: "",
        error: "",
      });
    }
    if (!this.state.error['ITEM NAME'] && !this.state.error['COMPANY'] && 
    !this.state.error['PACK'] && !this.state.error['EXPIRY'] &&
    !this.state.error['QTY'] && !this.state.error['MRP'] && name === 'confirm') {
        this.setState({
          open: false,
          Error_obj: "",
          error: "",
        });
        this.setState({
          y: { ...this.state.y, verified: true }
        }, () => {
          this.verifyRow();
        });
    }
  };

  change = (e, name) => {
      this.setState({
        y: {
          ...this.state.y,
          [e.target.name]: e.target.value.toUpperCase()
        }
      }, () => {this.validate(name)})
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Medicine Details</DialogTitle>
          <DialogContent>
            <DialogContentText color="#ff0000">
              BATCH:
            <TextField
                name="BATCH"
                label="Batch"
                floatingLabelText="BATCH"
                // onChange={e => this.change(e)}
                value={this.state.y['BATCH']}
                floatingLabelFixed
                margin="normal"
              />
              <br />
              ITEM NAME:
            <TextField
                name="ITEM NAME"
                hintText="ITEM NAME"
                floatingLabelText="ITEM NAME"
                helperText={this.state.Error_obj['ITEM NAME']}
                error={this.state.error['ITEM NAME']}
                onChange={e => this.change(e, "ITEM NAME")}
                placeholder={this.state.originalrow['ITEM NAME']}
                value={this.state.y['ITEM NAME']}
                floatingLabelFixed
              />
              {/* <br /> */}
              COMPANY:
            <TextField
                name="COMPANY"
                hintText="COMPANY"
                floatingLabelText="COMPANY"
                helperText={this.state.Error_obj['COMPANY']}
                error={this.state.error.COMPANY}
                placeholder={this.state.originalrow.COMPANY}
                onChange={e => this.change(e, "COMPANY")}
                value={this.state.y['COMPANY']}
                floatingLabelFixed
              />
              <br />
              PACK:
            <TextField
                name="PACK"
                hintText="PACK"
                floatingLabelText="PACK"
                helperText={this.state.Error_obj['PACK']}
                error={this.state.error.PACK}
                placeholder={this.state.originalrow.PACK}
                onChange={e => this.change(e, "PACK")}
                value={this.state.y['PACK']}
                floatingLabelFixed
              />
              {/* <br /> */}
              EXPIRY:
            <TextField
                name="EXPIRY"
                hintText="EXPIRY"
                floatingLabelText="EXPIRY"
                helperText={this.state.Error_obj['EXPIRY']}
                error={this.state.error.EXPIRY}
                placeholder={this.state.originalrow.EXPIRY}
                onChange={e => this.change(e, "EXPIRY")}
                value={this.state.y['EXPIRY']}
                floatingLabelFixed
              />
              <br />
              QTY:
            <TextField
                name="QTY"
                hintText="QTY"
                floatingLabelText="QTY"
                helperText={this.state.Error_obj['QTY']}
                error={this.state.error.QTY}
                onChange={e => this.change(e, "QTY")}
                placeholder={this.state.originalrow.QTY}
                value={this.state.y['QTY']}
                floatingLabelFixed
              />
              {/* <br /> */}
              MRP:
            <TextField
                name="MRP"
                hintText="MRP"
                floatingLabelText="MRP"
                helperText={this.state.Error_obj['MRP']}
                error={this.state.error.MRP}
                placeholder={this.state.originalrow.MRP}
                onChange={e => this.change(e, "MRP")}
                value={this.state.y['MRP']}
                floatingLabelFixed
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this, 'cancel')} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.handleClose.bind(this, 'confirm')} color="primary">
              CONFIRM
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default FormDialog;

// {if (name==='COMPANY')
//     this.setState({
//       y: Object.assign(
//         {}, 
//       this.state.y,
//       {[e.target.name]: e.target.value}
//     )
//     })}
//     if (name==='PACK'){
//     this.setState({
//       y: Object.assign(
//         {}, 
//       this.state.y,
//       {[e.target.name]: e.target.value}
//     )
//     })}
//     if (name==='EXPIRY'){
//     this.setState({
//       y: Object.assign(
//         {}, 
//       this.state.y,
//       {[e.target.name]: e.target.value}
//     )
//     })}
//     if (name==='QTY'){
//     this.setState({
//       y: Object.assign(
//         {}, 
//       this.state.y,
//       {[e.target.name]: e.target.value}
//     )
//     })}
//     if (name==='MRP'){
//     this.setState({
//       y: Object.assign(
//         {}, 
//       this.state.y,
//       {[e.target.name]: e.target.value}
//     )
//     })
//   }