import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import UnverifiedTable from './UnverifiedTable.jsx';
import VerifiedTable from './VerifiedTable.jsx';

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

class CSSGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Selectedrows: {},  
      rowtoadd: {},
      // data: [],
      // tabletodisplay: [],
    }
  }

  fetching_Selectedrows(n) {
    this.setState({
      Selectedrows: n
    })
    // this.setState((prevState)=>({
    //   Selectedrows: [...prevState.Selectedrows, n],
    // }))
  }
  fetching_rowtoadd(n) {
    this.setState({
      rowtoadd: n
    })
  }
  // reportingdata(n){
  //   this.setState({
  //     tabletodisplay: n
  //   });
  // }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper >
              {this.props.datatable &&
                <UnverifiedTable items={this.props.datatable} itemtopush={this.state.rowtoadd}
                  value={this.fetching_Selectedrows.bind(this)}
                />}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper >
              <VerifiedTable result={this.state.Selectedrows} displayingvalue={this.props.datatable}
                val={this.fetching_rowtoadd.bind(this)}
                // reportvalue={this.reportingdata.bind(this)}
              />
            </Paper>
          </Grid>
        </Grid>
        {/* <FullScreenDialog display={this.state.tabletodisplay}/> */}
      </div>
    );
  }
}
export default withStyles(styles)(CSSGrid);

 // componentDidMount() {
  //   this.setState({
  //     data:this.props.datatable
  //   })
  //   console.log('yahoo',this.state.data)
  // }
  // componentWillReceiveProps(nextProps){
  //     console.log(nextProps.datatable);
  //     this.setState((state)=>{
  //       data:nextProps.datatable
  //     })
  //     console.log('yahoo',this.state.data)
  // }