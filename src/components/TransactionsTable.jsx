import React, { useState } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewards";
import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function TransactionsTable({ transactions }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortedRows = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={<ShoppingCartIcon color="primary" />}
        title={<Typography variant="h6">Transactions</Typography>}
      />
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Reward Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tx) => (
                <TableRow key={tx.id} hover>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.name}</TableCell>
                  <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                  <TableCell>{tx.product}</TableCell>
                  <TableCell align="right">{tx.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={`${calculatePoints(tx.price)} points`}>
                      <span>{calculatePoints(tx.price)}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionsTable;
