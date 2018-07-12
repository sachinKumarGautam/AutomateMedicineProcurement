import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CSVFileUploader from './FileReader';
import ResponsiveDialog from './ResponsiveDialog';
import SearchBox from './SearchBox';
import SearchBar from 'material-ui-search-bar';
let counter = 0;

//***this will sort the column */
function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}
//***this const have column headers and id value must be same as column headers in invoice */
const columnData = [
  { id: 'ITEM NAME', numeric: false, disablePadding: true, label: 'Item Name' },
  { id: 'COMPANY', numeric: false, disablePadding: false, label: 'Company' },
  { id: 'PACK', numeric: false, disablePadding: false, label: 'Pack' },
  { id: 'BATCH', numeric: false, disablePadding: false, label: 'Batch' },
  { id: 'EXPIRY', numeric: false, disablePadding: false, label: 'Expiry' },
  { id: 'QTY', numeric: true, disablePadding: false, label: 'QTY' },
  { id: 'MRP', numeric: true, disablePadding: false, label: 'MRP' },
];

class EnhancedTableHead extends React.Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              > 
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
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
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
      <Typography variant="title" id="tableTitle">
            Invoice (Unverified Items)
          </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  rowColor: {
    backgroundColor: '#009999',
  },
  tablecell: {
    paddingRight: '10px',

  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'ITEM NAME',
      selected: [],
      obj: {},
      data: [],
      page: 0,               
      rowsPerPage: 5, 
      selectrows: [],       
      ans: [],
      modifyData: [],
    };                       
  
    
  }
  //***this function search the rows based on the input in searchbox */
  getRow(name) {
    console.log(name);
    var size = name.length;
    
    var searchedRow = this.state.data.filter((row) => row['ITEM NAME'].substring(0,size) === name.toUpperCase() || row.BATCH.substring(0,size) === name.toUpperCase());
    console.log(searchedRow.length);
    if (name === '')  {
        this.setState({
            ans: this.state.data,
        })
    
    console.log(this.state.data);
    }
    else {
        this.setState({
            ans: searchedRow,
        })
    }
   
  } 

  //***this function is invoked when someone deletes the row from verified items table and qty is added  */
  componentDidUpdate(prevProps){
    if(this.props.add!==prevProps.add){
      for(let i=0; i<this.state.ans.length; i++){
        if(this.state.ans[i].BATCH===this.props.add.BATCH){
          var rows = this.state.ans[i];
          rows.status = true;
          rows.QTY = Number(rows.QTY) + Number(this.props.add.QTY);
          var order = [...this.state.ans];
          order.splice(i,1,rows);
          this.setState({
            ans:order,
          })
        }
      }
    }
  }

  //***this function is passed as props to ResponsiveDialog and the modified value is passed to TableGrid from here */
  selection(n){ 
    this.setState({
      selectrows:n,
    })
    console.log(n);
    console.log(this.state.modifyData);
    //---done---write code to  modify ans or modifyData to include the verified status***
    for(let i=0; i<this.state.ans.length; i++){
      if(this.state.ans[i].BATCH===n.BATCH){
        var rows = this.state.ans[i];
        rows.status = false;
        rows.QTY = Number(rows.QTY) - Number(n.QTY);
        var order = [...this.state.ans];
        order.splice(i,1,rows);
        this.setState({
          ans:order,
        })
      }
    }
    this.props.modify(n);
  }
  
  //***this function changes the order of sorting and on which property sorting is to be applied */
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  //***this function is dummy not used anymore */
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  //***this function is used to open Responsive Dialog's method 'handleClickOpen' corresponding to each row */
  handleClick = (event, id, n) => { 
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    newSelected.push(id);
    this.setState({ selected: newSelected });
    console.log(this.state.modifyData);
    for(let i=0; i<this.state.modifyData.length; i++){
      if(n.BATCH===this.state.modifyData[i].BATCH)
      this.child.handleClickOpen(this.state.modifyData[i]);
    } 
  };
  


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, ans } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ans.length - page * rowsPerPage);
    console.log('check ans initial',this.state.ans);
    
    return (
      <div>
         <Paper className={classes.root}>
          <SearchBar
            onClick={() => console.log('entered')}
            onChange={this.getRow.bind(this)}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              // maxWidth: 800,
              width: '100%',
            }}
          />
           {/* this way of creating a ref to the child component Responsive Dialog  */}
          < ResponsiveDialog onRef={(ref)=>this.child=(ref)} update={this.selection.bind(this)} />

          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {ans
                  // .filter(row => row.status === true)
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.BATCH);
                    const focus = true;
                    return (


                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.BATCH, n)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected} 
                        className={n.QTY===0 ? classes.rowColor:""}
                      >
                      
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none" >
                          {n['ITEM NAME']}
                        </TableCell>

                        <TableCell >{n.COMPANY}</TableCell>
                        <TableCell >{n.PACK}</TableCell>
                        <TableCell >{n.BATCH}</TableCell>
                        <TableCell >{n.EXPIRY}</TableCell>
                        <TableCell numeric>{n.QTY}</TableCell>
                        <TableCell numeric>{n.MRP}</TableCell>

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
            // count={data.length}
            count={ans
              // .filter(row => row.status === true)
              .length}
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

        {/* this function is used to choose csv invoice  */}
        <CSVFileUploader
          onDataLoaded={(obj) => {
            this.setState({
              obj: obj,
              data: obj,
              ans: obj,
              modifyData: obj,
            }, () => {
              this.props.lefty(obj);
            }
          );
          }
          
             }
          
        />
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
