import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    batch_no: "",
  };

  handleClickOpen = (n) => {
    this.setState({ open: true });
    this.setState({batch_no: n.BATCH});
    console.log(n);
  };

  handleClose = (name) => {
    this.setState({ open: false });
    if(name=="confirm"){
      console.log("confirmed");

    }
    // if(name=="cancel"){
    //   this.setState((prevState) => 
    //   ({[prevState.id] : null}))
    //   console.log(this.state.id);
    // }
     
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open responsive dialog</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Please confirm the Batch No.:?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Batch No.: {this.state.batch_no}
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
};

//export default withMobileDialog()(ResponsiveDialog);
