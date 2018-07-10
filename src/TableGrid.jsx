import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from './EnhancedTable';
import SimpleTable from './SimpleTable';
import Report from './Report';
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
  buttonAlign: {
    float: 'right',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class TableGrid extends React.Component {
  constructor(props) {
    super(props);

    // binding methods to the class so they don't lose 'this'
    // when invoked from another environment.
    // this.parentMethod = this.parentMethod.bind(this);
    // this.setChildRef = this.setChildRef.bind(this);

  this.state = {
    spacing: '16',
    addrows: [],
    unverify: {},
    obj: [],
    left: [],
    right: [],
    // isPoppedOut: false,
  };
}
 
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

  report=()=>{
    console.log("hello");
    this.reportRef.handleClickOpen();
  }

  // parentMethod() {
  //   this.childNode.handleClickOpen();
  // }

  // // intentionally avoided using an arrow fuction inside JSX
  // // for we don't want a new anonymous fn created on every render.
  // setChildRef(node) { // receives reference to component as argument
  //   this.childNode = node;
  // }

  rightvalue(ans){
    this.setState({
      right: ans,
    }, ()=>{
      console.log(this.state.right);
    });
    
  }
  leftvalue(ans){
    this.setState({
      left: ans,
    }, ()=>{
      console.log(this.state.left);
    });
    
  }
 
    
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

    
    return (
     <div>
        <div className={classes.buttonAlign} >
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.report} > Generate Mis-Match Report </Button>
        </div>
        <Grid container spacing={24}>
        < Report onRef={(ref)=>this.reportRef=(ref)} left={this.state.left} right={this.state.right} /> 
                                                                              
       <Grid item xs={8}>
         <Paper> <EnhancedTable modify={this.addition.bind(this)} add={this.state.unverify} obj={this.state.obj} 
         lefty={this.leftvalue.bind(this)}
          /> </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper> <SimpleTable rows={this.state.addrows} delete={this.unverified.bind(this)} 
          righty={this.rightvalue.bind(this)} 
          /> </Paper>
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