import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// import FullScreenDialog from './fullscreendialog';
import EnhancedTable from './Selecting.jsx';
import CustomizedTable from './verifiedtable.jsx';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});
class CSSGrid extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      Selectedrows: {},
      rowtoadd: {},
      data: [],
      tabletodisplay: [],
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     data:this.props.item
  //   })
  //   console.log('yahoo',this.state.data)
  // }
  // componentWillReceiveProps(nextProps){
  //     console.log(nextProps.item);
  //     this.setState((state)=>{
  //       data:nextProps.item
  //     })
  //     console.log('yahoo',this.state.data)
  // }
  select (n){
    this.setState({
      Selectedrows: n
    })
    // this.setState((prevState)=>({
    //   Selectedrows: [...prevState.Selectedrows, n],
    // }))
    console.log(this.state.Selectedrows);
  }
  selection (n){
    this.setState({
      rowtoadd: n
      
    })
    console.log(this.state.rowtoadd, this.props.item)
  }
  // reportingvalue(n){
  //   this.setState({
  //     tabletodisplay: n
  //   });
  //   console.log(n)
  // }
  render() {
  const { classes } = this.props;
  console.log('sachin',  this.props.item)
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <Paper >
            { this.props.item &&
            <EnhancedTable items={this.props.item} 
            itemtopush={this.state.rowtoadd} 
          value={this.select.bind(this)}
          />}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper ><CustomizedTable result={this.state.Selectedrows} 
          displayingvalue={this.props.item}
          val={this.selection.bind(this)} 
          // reportvalue={this.reportingvalue.bind(this)}
          /></Paper>
        </Grid>
      </Grid>
      {/* <FullScreenDialog display={this.state.tabletodisplay}/> */}
    </div>
  );
}
}

export default withStyles(styles)(CSSGrid);