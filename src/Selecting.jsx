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
import SearchBar from 'material-ui-search-bar';
import FormDialog from './dialog.jsx';

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'ITEM NAME', numeric: false, disablePadding: true, label: 'ITEM NAME' },
  { id: 'COMPANY', numeric: false, disablePadding: true, label: 'COMPANY' },
  { id: 'PACK', numeric: false, disablePadding: true, label: 'PACK' },
  { id: 'BATCH', numeric: false, disablePadding: true, label: 'BATCH' },
  { id: 'EXPIRY', numeric: false, disablePadding: true, label: 'EXPIRY' },
  { id: 'QTY', numeric: false, disablePadding: true, label: 'QTY' },
  { id: 'MRP', numeric: false, disablePadding: true, label: 'MRP' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
     minWidth: 800,
     height: "100px"
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tablecell: {
    paddingRight: '10px',
  },
  rowcolor: {
    // '&:nth-child(1)' : {
    //   backgroundColor: "#707070"
    // },
    // '&:nth-of-type(this.state.final[nth].QTY===0)':{
    backgroundColor: "#0000FF",
  // },
  },
});

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render(){
  const { onSelectAllClick, order, classes, orderBy, numSelected, rowCount} = this.props;
  
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
              // classes = {{
              //   root: classes.tablecell,
              //   head: classes.tablecell
              // }}
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
  handleRequestSort: PropTypes.func.isRequired,
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
        {/* {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {"1"} selected
          </Typography>
        ) : ( */}
          <Typography variant="title" id="tableTitle">
            Invoice (Unverified Table)
          </Typography>
        {/* )} */}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : ( */}
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        {/* )} */}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class EnhancedTable extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      order: 'asc',
      orderBy: 'ITEM NAME',
      selected: "",
      ans: [],
      final: [],
      page: 0,
      rowsPerPage: 5,
      Selectrows: {},
      array: [],
      color: '',
    };

    this.selection = this.selection.bind(this);
  }

componentDidUpdate(prevProps) {
  console.log("bansal",prevProps);
  if (this.props.items !== prevProps.items ) {
    this.setState({
      final: this.props.items,
      res: this.props.items
    })
  }
  // console.log('kapil sharma',this.props.itemtopush)
  // console.log('kapil',prevProps.itemtopush)
  if (this.props.itemtopush !== prevProps.itemtopush ) {
    for (let i=0; i<this.state.final.length; i++)
    {
      if (this.state.final[i].BATCH===this.props.itemtopush.BATCH) {
        var rows=this.state.final[i];
        rows.verified=false;
        rows.QTY=Number(rows.QTY) + Number(this.props.itemtopush.QTY);
        var order =[...this.state.final];
        order.splice(i, 1, rows);
        console.log("see", rows);
        this.setState({
          final: order,
        })
        console.log("rahul",this.state.final)
      }  
  }
}
}
  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.items.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id, n) => {
    const { selected } = this.state;
     let newSelected = [];
     newSelected.push(id);
    this.setState({selected: newSelected})
    for (let i=0; i<this.state.final.length; i++)
    {
      if (this.state.final[i].BATCH===n.BATCH) {
        this.refs.child.handleopen(this.state.final[i])
      }
    }
  };   
  selection (n) 
  {
    this.setState({
      Selectrows: n
    });
    this.props.value(n)
    console.log(n)
    for (let i=0; i<this.state.final.length; i++)
    {
      if (this.state.final[i].BATCH===n.BATCH) {
        var rows=this.state.final[i];
        rows.verified=true;
        rows.QTY=Number(rows.QTY)-Number(n.QTY)
        var order =[...this.state.final];
        order.splice(i, 1, rows);
        this.setState({
          final: order,
        })
      }
      // var newColor = this.state.final[i].QTY == '0' ? '#707070' : '';
      // this.setState({ color : newColor})
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  getName(event) {
    console.log(event)
    if (event === '') {
      this.setState({
        final: this.state.res
      });
    }
    else {
      const x=event.length;
      var searchedrow = this.state.res.filter((row) => 
      row['ITEM NAME'].substring(0, x) === event.toUpperCase() ||
      row['BATCH'].substring(0, x) === event.toUpperCase());
      this.setState({
        final: searchedrow
      });
      // if (key.code==="enter"){
      //   autoSelect: this.state.final[0];
      // }
    }
  }
  
  render() {
    const { classes, items } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, final} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, final.length - page * rowsPerPage);
    // <CustomizedTable ref="child"/>
    return (
      <Paper className={classes.root} >
        <SearchBar
            onChange={this.getName.bind(this)}
            onRequestSearch={() => console.log('onRequestSearch')}
            // autoFocus={true}
            style={{
              margin: '0 auto',
              // maxWidth: 900
              width: '100%',
            }}
          />
        <FormDialog ref="child" update= {this.selection}/>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
        
          <Table className={classes.table} aria-labelledby="tableTitle" >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              classes={classes}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={final.length}
            />
            <TableBody >
              {final
              // .filter((row) => row.verified===false)
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  console.log(n)
                  const isSelected = this.isSelected(n.BATCH);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.BATCH, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className={n.QTY===0 ? classes.rowcolor : ''}
                      // autoFocus={n.BATCH===final[0].BATCH ? true : false}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell 
                       component="th" scope="row" padding="none">
                        {n['ITEM NAME']}
                      </TableCell>
                      <TableCell padding="none">{n.COMPANY}</TableCell>
                      <TableCell padding="none">{n.PACK}</TableCell>
                      <TableCell padding="none">{n.BATCH}</TableCell>
                      <TableCell padding="none">{n.EXPIRY}</TableCell>
                      <TableCell padding="none" >{n.QTY}</TableCell>
                      <TableCell padding="none">{n.MRP}</TableCell>
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
          count={final
            // .filter((row) =>row.verified===false)
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
      
    );
}
}
EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);


//   componentDidMount() {
//     const newItem = this.props.itemtopush
//     const arrayWithValue = this.props.items
//     const updatedItems = [...arrayWithValue, newItem]
//     this.setState({ans: arrayWithValue});

//     console.log(this.props.items)
// }
// componentDidMount() {
//   if (this.props.items.length!==0)
//   // console.log('kapil', this.props.items)
//   this.setState({
//     final: this.props.items,
//     ans: this.props.items, 
//     res: this.props.items,
//   })
// }
  
// componentWillReceiveProps(nextProps) {
    
  //   // const arrayWithValue = this.props.items ? this.props.items : nextProps.items
  //   //   console.log('final', arrayWithValue)
  //   //   var searchedrow=null
  //   //  if (nextProps.itemtopush!==null)
    
  //    var searchedrow = this.state.final.filter((row) =>row.verified === false)
  //   //   console.log(searchedrow)
  //   // }
  //   //   var contacts = this.state.final.filter((row) =>row['BATCH'] !== nextProps.itemtopush['BATCH'])
  //   //   this.setState({
  //   //     final: contacts
  //   //   })
  //   // }
  //   // const newArrayWithValue = nextProps.itemtopush ? [...arrayWithValue, nextProps.itemtopush] : nextProps.items
  //   //   console.log(newArrayWithValue)
    
  //   this.setState({
  //         ans: searchedrow
  //       })
  //       console.log(this.state.ans)
  //     // const newItem = this.props.itemtopush
  //     // const arrayWithValue = this.state.ans ? this.state.ans : this.props.items
  //     // const updatedItems = [...arrayWithValue, newItem]
  //     // this.setState({ans: updatedItems});
  //     // this.setState({final: nextProps.items});
  //   // if(nextProps.itemtopush !== this.props.itemtopush) {
  //   //   var searchedrow = this.state.final.filter((row) =>row['BATCH'] === nextProps.itemtopush['BATCH'])
  //   //   this.state.ans.push(searchedrow)
  //   // }
  
  // }
