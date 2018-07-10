import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Popout from 'react-popout'

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.popout = this.popout.bind(this);
        this.popoutClosed = this.popoutClosed.bind(this);
        this.state = { isPoppedOut: false };
      }
     
      popout() {
        this.setState({isPoppedOut: true});
      }
     
      popoutClosed() {
        this.setState({isPoppedOut: false});
      }
     
      render() {
        if (this.state.isPoppedOut) {
          return (
            <Popout title='Window title' onClosing={this.popoutClosed}>
              <div>Popped out content!</div>
            </Popout>
          );
        } else {
          var popout = <span onClick={this.popout} className="buttonGlyphicon glyphicon glyphicon-export"></span>
          return (
            <div>
              <strong>Section {popout}</strong>
              <div>Inline content</div>
            </div>
          );
        }
      }

}

