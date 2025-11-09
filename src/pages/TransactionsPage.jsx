import React, { useState, useMemo } from "react";
import useFetchTransactions from "../services/useFetchTransactions";
import TransactionsTable from "../components/TransactionsTable";
import MonthlyRewardsTable from "../components/MonthlyRewardsTable";
import TotalRewardsTable from "../components/TotalRewardsTable";
import Loader from "../components/Loader";
import { TextField, Grid, Typography } from "@mui/material";

function TransactionsPage() {
  const { data, loading, error } = useFetchTransactions();
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!data.transactions) return [];
    return data.transactions.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.transactions, search]);

  if (loading) return <Loader />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Search by Customer Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TransactionsTable transactions={filteredTransactions} />
      </Grid>

      <Grid item xs={12} md={6}>
        <MonthlyRewardsTable transactions={filteredTransactions} />
      </Grid>

      <Grid item xs={12} md={6}>
        <TotalRewardsTable transactions={filteredTransactions} />
      </Grid>
    </Grid>
  );
}

export default TransactionsPage;
