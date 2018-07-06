import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from './EnhancedTable';
import SimpleTable from './SimpleTable';
import {Report} from './Report';
// import {CSVFileUploader} from './FileReader';
// import Popout from 'react-popout'; 

// import {Popout} from 'react-popout-component';
// import PopoutWindow from 'react-popout';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class TableGrid extends React.Component {
  state = {
    spacing: '16',
    addrows: [],
    unverify: {},
    obj: [],
    left: [],
    right: [],
    // isPoppedOut: false,
  };
 
  addition(n){
    this.setState({
    //   addrows:[...prevState.addrows, n],
    addrows:n,
    })
    
    console.log(n);
  }
  // randonFunc(values) {
  //   ewp
  // }
  unverified(n){
    this.setState({
      unverify: n,
    })
    console.log("unverify");
  }

  report(){
    this.refs.son.handleClickOpen();
  }

  rightvalue(ans){
    this.setState({
      right: ans,
    })
    console.log(this.state.right);
  }
  leftvalue(ans){
    this.setState({
      left: ans,
    })
    console.log(this.state.left);
  }
  // popout() {
  //   this.setState({isPoppedOut: true});
  // }

  // popoutClosed() {
  //   this.setState({isPoppedOut: false});
  // }
  // reset(){
  //   alert(
    
  //   <CSVFileUploader
  //    onDataLoaded = {(obj) => {
  //      this.setState({
  //        obj: obj,
  //      });
  //    }}
  //    />
  //   );
  // }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    // if (this.state.isPoppedOut) {
    //   return (
    //     <Popout url='popout.html' title='Window title' onClosing={this.popoutClosed}>
    //       {/* <div>Popped out content!</div> */}
    //       <CSVFileUploader
    //         onDataLoaded={(obj) => {
    //           this.setState({
    //             obj: obj,
    //           });
    //         }}
    //       />
    //     </Popout>
    //   );
    // }
    // else{
    return (
     <div>
        
       <button onClick={this.report.bind(this)}> Generate Mis-Match Report </button>
        <Grid container spacing={24}>
        < Report ref="son" left={this.state.left} right={this.state.right} />

       <Grid item xs={8}>
         <Paper> <EnhancedTable modify={this.addition.bind(this)} add={this.state.unverify} obj={this.state.obj} lefty={this.leftvalue.bind(this)} /> </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper> <SimpleTable rows={this.state.addrows} delete={this.unverified.bind(this)} righty={this.rightvalue.bind(this)} /> </Paper>
        </Grid>
        

        </Grid>
        
       </div>
    );
  }
}
// }

TableGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableGrid);