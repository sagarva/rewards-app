import React from "react";
import PropTypes from "prop-types";
import { totalRewardsArray } from "../utils/rewards";
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

function TotalRewardsTable({ transactions }) {
  const rows = totalRewardsArray(transactions);

  return (
    <TableContainer component={Paper} sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Total Rewards
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Reward Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.customerId} hover>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TotalRewardsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TotalRewardsTable;
