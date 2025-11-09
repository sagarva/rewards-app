// Calculate reward points for a single transaction price (number)
export function calculatePoints(price) {
  // Convert to cents to handle fractional rounding issues precisely
  const cents = Math.floor(price * 100); // e.g., 100.49 -> 10049
  const dollars = Math.floor(cents / 100); // floor to whole dollars

  let points = 0;
  if (dollars > 100) {
    points += (dollars - 100) * 2;
    points += 50; // for the $50–$100 range
  } else if (dollars > 50) {
    points += dollars - 50;
  }

  return points;
}

// Aggregate monthly rewards (pure function)
export function aggregateMonthlyRewards(transactions) {
  return transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const key = `${tx.customerId}::${year}-${String(month).padStart(2, "0")}`;

    const points = calculatePoints(tx.price);

    if (!acc[key]) {
      acc[key] = {
        customerId: tx.customerId,
        name: tx.name,
        month,
        year,
        points: 0,
      };
    }

    acc[key].points += points;
    return acc;
  }, {});
}

export function monthlyRewardsArray(transactions) {
  const map = aggregateMonthlyRewards(transactions);
  return Object.values(map).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });
}

// Total rewards aggregation
export function totalRewards(transactions) {
  return transactions.reduce((acc, tx) => {
    const id = tx.customerId;
    const points = calculatePoints(tx.price);
    if (!acc[id]) acc[id] = { customerId: id, name: tx.name, points: 0 };
    acc[id].points += points;
    return acc;
  }, {});
}

export function totalRewardsArray(transactions) {
  return Object.values(totalRewards(transactions)).sort(
    (a, b) => b.points - a.points
  );
}
