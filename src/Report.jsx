import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
    tablecell: {
        textDecorationLine: 'line-through',
        margin: "15px",
    },
    table: {
        fontsize: 14,
    }
}
function getSorting(order, orderBy){
    return order === 'desc'
       ?(a,b) => (b[orderBy] < a[orderBy] ? -1 : 1)
       :(a,b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            // data: [],
            // data1: [],
            order: 'asc',
            orderBy: 'ITEM NAME',
        }
    }
    
    // componentDidUpdate(prevProps){
    //     if(this.props.right!==prevProps.right)
    //     {
    //         var order = [];
    //         var order1 = [];
    //         for(let i=0; i<this.props.left.length; i++){
    //             var rows= this.props.left[i];
    //             order.push(rows);
    //             var temp = rows.BATCH;
    //             for(let j=0; j<this.props.right.length; j++){
    //                 if(this.props.right[j].BATCH===temp){
    //                     var rows1 = this.props.right[j];
    //                     order1.push(rows1);
    //                 }
    //                 else{
                    
    //                     var rows1 = {};
    //                     order1.push(rows1);
    //                 }
    //             }
    //                 var res = [...this.state.data];
    //                 var res1 = [...this.state.data1];
    //                 res.splice(i,0,order);
    //                 res1.splice(i,0,order1);
    //                 this.setState({
    //                     data: res,
    //                     data1: res1,
    //                 }, ()=>{
    //                     console.log(this.state.data);
    //                     console.log(this.state.data1)
    //                 });
                
                
    //         }
    //     }
    // }
    componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(undefined)
      }
      
    handleClickOpen=()=>{
        this.setState({
            open:true,
        })
        console.log(this.props.left);
        console.log(this.props.right);
    } 

    handleClose=(name)=>{
        this.setState({
            open:false,
        })
        if(name==='print'){
            window.print();
        }

    }

    render(){
        const { classes } = this.props;
        const { order, orderBy } = this.state;
        
        return(
            <div>
                <Dialog
                  fullScreen
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="responsive-dialog-title"
                  >
                  <DialogTitle id="responsive-dialog-title">{"Mis-match Report"}</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ITEM NAME</TableCell>
            <TableCell >COMPANY</TableCell>
            <TableCell >PACK</TableCell>
            <TableCell >BATCH</TableCell>
            <TableCell >EXPIRY</TableCell>
            <TableCell >QTY
                 <body>
                     Verified
                     <root className={classes.tableshow}>
                          original
                          </root>
                          </body>
            </TableCell>
            <TableCell >MRP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.right
          .sort(getSorting(order, orderBy))
          .map(n => {
              var searchedrow;
              searchedrow = this.props.left.filter((row) => row.BATCH === n.BATCH)
              console.log(searchedrow)
            return (
              <TableRow key={n.id} className={classes.row}>
                <TableCell component="th" scope="row">
                  {n['ITEM NAME']}
                </TableCell>
                <TableCell >{n.COMPANY}</TableCell>
                <TableCell >{n.PACK}</TableCell>
                <TableCell >{n.BATCH}</TableCell>
                <TableCell >{n.EXPIRY}</TableCell>
                <TableCell >{n.QTY}
                     <root className={Number(searchedrow[0].QTY)!==0? classes.tablecell : classes.tableshow}>
                     {Number(searchedrow[0].QTY) + Number(n.QTY)}
                     </root>
                </TableCell>
                <TableCell> {n.MRP} </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
                
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button name="print" onClick={this.handleClose.bind(this, 'print')} >Print</Button>
                      <Button name="close" onClick={this.handleClose.bind(this, 'close')} >Close</Button>
                      </DialogActions>
                </Dialog>
                </div>
        );
    }







}
Report.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Report); 