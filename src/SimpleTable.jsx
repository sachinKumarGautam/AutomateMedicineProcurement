import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import IconButton from '@material-ui/core/IconButton';
import Delete  from '@material-ui/icons/Delete';
import EditIcon  from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import TablePagination from '@material-ui/core/TablePagination';
import SearchBar from 'material-ui-search-bar';
import {ResponsiveDialog} from './ResponsiveDialog';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:{
     backgroundColor: "light",
  },
   
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root,
        classes.highlight
      )}
    >
      <div className={classes.title}>
      <Typography variant="title" id="tableTitle">
             Verified Table
          </Typography>
      </div>
      <div className={classes.spacer} />

    </Toolbar>
  );
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)
// const TableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  // extendedIcon: {
  //   marginRight: theme.spacing.unit,
  // },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonalign: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignContent: 'space-between',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
      super(props);
  this.state={
      data1: [],
      rowsPerPage: 5, 
      page: 0, 
      ans1: [],
  };
  
}
reset(){
  window.location.reload();
}
saved(){
  //pass this.state.ans1 as props to database API***
  alert("Uploaded Successfully!");
}
getRow1(name) {
  //after entering search words when you add from the enhanced table, it shows all the data1***
  console.log(name);
  var size = name.length;
  var searchedRow = this.state.data1.filter((row) => row['ITEM NAME'].substring(0,size) === name.toUpperCase() || row.BATCH.substring(0,size) === name.toUpperCase());
  console.log(searchedRow.length);
  if (name === '')  {
      this.setState({
          ans1: this.state.data1,
      })
  
  console.log(this.state.data1);
  }
  else {
      this.setState({
          ans1: searchedRow,
      })
  }
} 

componentDidUpdate(prevProps) { 
  // Typical usage (don't forget to compare props):
  if (this.props.rows !== prevProps.rows) {
    var order = this.state.data1;
    var check = true;
    for(let i=0; i<this.state.ans1.length; i++){
        if(this.props.rows.BATCH===this.state.ans1[i].BATCH){
            var row = this.state.data1[i];
            row.QTY = Number(this.props.rows.QTY) + Number(row.QTY);
            order.splice(i,1);
            order.splice(0,0,row);
            check=false;
    }
  }
    // var order = this.state.data1;
    if(check) order.splice(0,0,this.props.rows);
    this.setState({
      data1:order,
      ans1:order, 
    }) 
  }
  this.props.righty(this.state.ans1);
  console.log(this.state.data1);
} 
removeRow=(event, id, n)=>{
  //how n.status is changed in the enhanced table***
  n.status = true; 
  var rows = [...this.state.data1];
  console.log(rows);
  for (let i=0; i<rows.length; i++){
    if(rows[i].BATCH===id){
      rows.splice(i,1);
    }
  }       
  
  this.setState({
    data1: rows,
    ans1: rows
  });
  this.props.delete(n);
}
randomFunction=(rows)=>{ 
  //---done---after editing, add the row at its own place***
  //how does changes made in data1 here is reflected in EnhancedTable***
  var order = [...this.state.data1];
   //this.props.rows in place of rows***
  for(let i=0; i<order.length; i++){
    if(rows.BATCH===order[i].BATCH){
      console.log(rows);
      console.log(order[i]);
      order.splice(i,1,rows);
    }
  } 
  // order.splice(0,0,rows);
  this.setState({
    data1:order,
    ans1:order,
  })
}; 
popUp=(event, n)=>{
  console.log("pop-up",n.status);
  this.refs.children.handleClickOpen(n);
  // this.removeRow(event, n.BATCH, n);
};  
handleChangePage = (event, page) => {
  this.setState({ page });
};
handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
};  

  render(){ 
    const { classes } = this.props;
    const { data1, order, orderBy, selected, rowsPerPage, page, ans1 } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ans1.length - page * rowsPerPage);
    
  return (
  
    <Paper className={classes.root}>
      <SearchBar
        onChange={this.getRow1.bind(this)}
        onRequestSearch={() => console.log('onRequestSearch')}
        style={{
          margin: '0 auto',
          maxWidth: 800
        }}
      />
      < ResponsiveDialog ref="children" edited = {this.randomFunction} />
      <EnhancedTableToolbar />
      <div className={classes.tableWrapper}>
      <Table className={classes.table}>
      
        <TableHead>
          <TableRow>
            <TableCell >Edit</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Batch No.</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          { this.state.ans1 && this.state.ans1
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => {
            return (
              <TableRow className={classes.row} key={n.BATCH} 
              >
                <TableCell >
                {/* <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}
                onClick={event => this.popUp(event, n)}> */}
                <IconButton Color='primary' onClick={event => this.popUp(event, n)}><EditIcon /></IconButton>
                {/* </Button> */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {n['ITEM NAME']}
                </TableCell>
                <TableCell >{n.BATCH}</TableCell>
                <TableCell >
                  <IconButton Color='primary' onClick={event => this.removeRow(event, n.BATCH, n)}> <Delete/></IconButton>
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
      </div>
      <TablePagination
          component="div"
          count={data1.length}
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
      <div className={classes.buttonalign}>  
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.reset.bind(this)}>
        Delete
        <DeleteIcon className={classes.rightIcon} />
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={this.saved}>
        Upload
        <FileUpload className={classes.rightIcon} />
      </Button>
      </div>
    </Paper> 
  );
}
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

