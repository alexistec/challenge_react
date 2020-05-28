import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



interface Transaction {
  item:[],
  action: (id:string)=> void
};

const SimpleTable = ({ item,action}: Transaction) =>{
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>$ Amount</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {item.map((row) => (
              <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    {row.amount > 0 ? 
                      <strong style={{color:'green'}}>Credit</strong> 
                      : 
                      <strong style={{color:'red'}}>Debit</strong>}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.amount > 0 ? 
                      <strong style={{color:'green'}}>{row.amount}</strong> 
                      : 
                      <strong style={{color:'red'}}>{row.amount}</strong>}
                  </TableCell>
                  <TableCell><Button color="secondary" onClick={()=> action(row.id)}>X</Button></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;