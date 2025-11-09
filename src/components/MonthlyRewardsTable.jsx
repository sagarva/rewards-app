import React from "react";
import PropTypes from "prop-types";
import { monthlyRewardsArray } from "../utils/rewards";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

function MonthlyRewardsTable({ transactions }) {
  const rows = monthlyRewardsArray(transactions);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Monthly Rewards
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Reward Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={`${r.customerId}-${r.year}-${r.month}`} hover>
              <TableCell>{r.customerId}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{String(r.month).padStart(2, "0")}</TableCell>
              <TableCell>{r.year}</TableCell>
              <TableCell>{r.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MonthlyRewardsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MonthlyRewardsTable;
