import { useEffect, useState } from "react";

// Fetches local JSON file asynchronously (no setTimeout).
export default function useFetchTransactions() {
  const [data, setData] = useState({ transactions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch("https://raw.githubusercontent.com/sagarva/rewards-app/refs/heads/main/public/data/transactions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
