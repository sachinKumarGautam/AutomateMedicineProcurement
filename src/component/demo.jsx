import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

class Users extends React.Component {
    render() {
        return (
            <Paper>
              <Table >
                <TableHead>
                  <TableRow>
                    <CustomTableCell>ITEM NAME</CustomTableCell>
                    <CustomTableCell>COMPANY</CustomTableCell>
                    <CustomTableCell>PACK</CustomTableCell>
                    <CustomTableCell>BATCH</CustomTableCell>
                    <CustomTableCell>EXPIRY</CustomTableCell>
                    <CustomTableCell numeric>QTY</CustomTableCell>
                    <CustomTableCell numeric>MRP</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.items.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <CustomTableCell component="th" scope="row">
                          {n['ITEM NAME']}
                        </CustomTableCell>
                        <CustomTableCell>{n.COMPANY}</CustomTableCell>
                        <CustomTableCell>{n.PACK}</CustomTableCell>
                        <CustomTableCell>{n.BATCH}</CustomTableCell>
                        <CustomTableCell>{n.EXPIRY}</CustomTableCell>
                        <CustomTableCell numeric>{n.QTY}</CustomTableCell>
                        <CustomTableCell numeric>{n.MRP}</CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          );
    }
}
    

export default withStyles(styles)(Users);
  