import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchBar from 'material-ui-search-bar';
import FormDialog from './FormDialog.jsx';
import FullScreenDialog from './FullScreenDialog.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    // minWidth: 350,
    height: "100px",
    padding: "none",
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class VerifiedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ans: [],
      finalrows: [],
      page: 0,
      editedrow: {},
      rowsPerPage: 5,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidUpdate(prevProps) {
    console.log(this.props.result)
    if (this.props.result !== prevProps.result ) {
      var arr = [...this.state.finalrows];
      var check=true;
      for (let i=0; i<this.state.finalrows.length; i++) {
          if (this.props.result.BATCH===this.state.finalrows[i].BATCH) {
            var row=this.state.finalrows[i];
            row.QTY=Number(this.props.result.QTY)+Number(row.QTY)
            arr.splice(i, 1)
            arr.splice(0, 0, row)
            this.setState({
              finalrows: arr,
              ans: arr, 
            });
            check=false;
          }
      }
      if (check){
      arr.splice(0, 0, this.props.result)
      this.setState({
        finalrows: arr,
        ans: arr, 
      });
    }
    }
    // this.props.reportvalue(this.state.finalrows)
    // this.state.finalrows.splice(0,0,this.props.result)
  }
  removerow = (event, id, n) => {
    n.verified = false;
    this.props.val(n)
    const contacts = this.state.finalrows.filter((row) => row.verified === true);
    this.setState({
      finalrows: contacts,
      ans: contacts
    }); 
  }
  selection(n)
  {
    this.setState({
      editedrow: n
    })
    var contacts = this.state.finalrows.filter((row) => row.BATCH !==n.BATCH);
    const arrays=[...contacts, n]
    this.setState({
      finalrows: arrays,
      ans: arrays
    });
  }
  editrow = (event, id, n) => {
    this.refs.child.handleopen(n)
  }
  getName(event) {
    console.log(event)
    if (event === '') {
      this.setState({
        ans: this.state.finalrows
      })
    }
    else {
      const x=event.length;
      var searchedrow = this.state.finalrows.filter((row) => 
      row['ITEM NAME'].substring(0, x) === event.toUpperCase() ||
      row['BATCH'].substring(0, x) === event.toUpperCase());
      this.setState({
        ans: searchedrow
      })
    }
  }
  // fullscreendialog (n) {
  //   this.refs.children.handleClickOpen(n);
  // }
  render() {
    const { classes } = this.props;
    const { finalrows, ans} = this.state;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ans.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
      <FormDialog ref="child" editnow={this.selection.bind(this)}/>
        <div className={classes.tableWrapper}>
          <SearchBar
            onChange={this.getName.bind(this)}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              // maxWidth: 800
              width: '100%',
            }}
          />
          <FullScreenDialog invoicedata= {this.props.displayingvalue} display={this.state.finalrows}/>
          {/* <EnhancedToolbar/> */}
          <Table className={classes.table} aria-labelledby="tableTitle" >
            <TableHead>
              <TableRow>
              {/* <TableCell>EDIT</TableCell> */}
                <TableCell component="th" scope="row"
                  // onClick={() => this.sortBy('ITEM NAME')}
                  >ITEM NAME</TableCell>
                <TableCell >BATCH</TableCell>
                <TableCell >DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.ans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow className={classes.row} key={n.id}>
                    {/* <TableCell
                        hover
                        onClick={event => this.editrow(event, n.BATCH, n)}>
                        <Tooltip title="Edit">
                          <IconButton aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell> */}
                      <TableCell component="th" scope="row" >
                        {n['ITEM NAME']}
                      </TableCell>
                      <TableCell>{n.BATCH}</TableCell>
                      <TableCell
                        hover
                        onClick={event => this.removerow(event, n.BATCH, n)}>
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* <Button 
          onClick={this.fullscreendialog.bind(this, this.state.finalrows)}
          > Report </Button> */}
        </div>
        <TablePagination
          component="div"
          count={finalrows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

VerifiedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifiedTable);

  // compareBy = (key) => {
  //   return function (a, b) {
  //     if (a[key] < b[key]) return -1;
  //     if (a[key] > b[key]) return 1;
  //     return 0;
  //   };
  // };

  // sortBy = (key) => {
  //   let arrayCopy = [...this.state.finalrows];
  //   arrayCopy.sort(this.compareBy(key));
  //   this.setState({ finalrows: arrayCopy });
  // };