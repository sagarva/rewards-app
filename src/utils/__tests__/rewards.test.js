import { calculatePoints, monthlyRewardsArray, totalRewardsArray } from '../rewards';

describe('calculatePoints', () => {
  test('gives 0 for price under 50', () => {
    expect(calculatePoints(30)).toBe(0);
  });

  test('gives 1 point per dollar between 50 and 100', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(51)).toBe(1);
    expect(calculatePoints(99.99)).toBe(49);
  });

  test('gives correct points over 100', () => {
    // $120 -> 2*(20) + 50 = 90
    expect(calculatePoints(120)).toBe(90);
  });

  test('handles fractional prices by flooring dollars', () => {
    // 100.4 should be treated as 100 -> 50 points
    expect(calculatePoints(100.4)).toBe(50);
    expect(calculatePoints(100.9)).toBe(50);
    // 100.999 -> 50
    expect(calculatePoints(100.999)).toBe(50);
    // 100.0 -> 50
    expect(calculatePoints(100.0)).toBe(50);
  });
});

describe('aggregate and totals', () => {
  const sample = [
    { id: 'a', customerId: 'c1', name: 'A', date: '2023-12-01T00:00:00Z', price: 120 },
    { id: 'b', customerId: 'c1', name: 'A', date: '2024-01-02T00:00:00Z', price: 60 },
    { id: 'c', customerId: 'c2', name: 'B', date: '2024-01-03T00:00:00Z', price: 200 }
  ];

  test('monthlyRewardsArray length and sorting', () => {
    const arr = monthlyRewardsArray(sample);
    expect(arr.length).toBe(3);
    // check sorting by year then month
    expect(arr[0].year).toBe(2023);
  });

  test('totalRewardsArray orders by points desc', () => {
    const totals = totalRewardsArray(sample);
    expect(totals[0].customerId).toBe('c2');
  });
});