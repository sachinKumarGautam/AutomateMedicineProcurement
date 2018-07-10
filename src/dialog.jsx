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
import RaisedButton from "material-ui/RaisedButton";

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
      x: {},
      y: {},
      QTYError: "",
      error: false,
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
      x: n,
    })
  }

  validate = () => {
  let isError = false;
  if (this.state.y.QTY==='') {
    isError = true;
    this.setState({
      QTYError: "Requires valid entry",
      error: true,
    });
  }
  else {
    isError = false;
    this.setState({
      QTYError: this.state.x.QTY,
      error: false,
    });
  }
  return isError;
  };

  handleClose = (name) => {
    if (name === 'cancel') {
      this.setState({
        open: false,
        QTYError: "",
        error: false,
      });
    }
    if (!this.state.error && name === 'confirm') {
        this.setState({
          open: false,
          QTYError: "",
          error: false,
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
      }, () => {this.validate()})
  };
  render() {
    const { classes } = this.props;
    console.log(this.state.QTYError)
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
                onChange={e => this.change(e, "ITEM NAME")}
                value={this.state.y['ITEM NAME']}
                floatingLabelFixed
              />
              {/* <br /> */}
              COMPANY:
            <TextField
                name="COMPANY"
                hintText="COMPANY"
                floatingLabelText="COMPANY"
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
                helperText={this.state.QTYError}
                error={this.state.error}
                onChange={e => this.change(e, "QTY")}
                placeholder={this.state.x.QTY}
                value={this.state.y['QTY']}
                floatingLabelFixed
              />
              {/* <br /> */}
              MRP:
            <TextField
                name="MRP"
                hintText="MRP"
                floatingLabelText="MRP"
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