import {
  Currency,
  PureOrEnrichedTransactions,
  EnrichedTransaction,
  EnrichedTransactions,
  TransactionStatus,
  AggregatedICSTxByPlanet,
  AggregatedTxValuesByPlanet,
  TransactionsWithPlanet
} from '../types/Transaction';

interface Filters {
  status?: TransactionStatus;
  currency?: Currency;
  isoDateFrom?: string | null;
};

export type AggregatorFunction<T> = (transaction: EnrichedTransaction, aggregatedData: Record<string, T>, rate?: number) => void;

export function filterTransactions(transactions: PureOrEnrichedTransactions, filters: Filters): PureOrEnrichedTransactions {
  return transactions.filter((tx) => {
    if (filters.status && tx.status !== filters.status) {
      return false;
    }
    if (filters.currency && tx.currency !== filters.currency) {
      return false;
    }
    if (filters.isoDateFrom && tx.date < filters.isoDateFrom) {
      return false;
    }
    return true;
  });
}

export const aggregateICSTxTotalsByPlanet: AggregatorFunction<AggregatedICSTxByPlanet> = (transaction, aggregatedData) => {
  const planetId = transaction.planet.id;

  if (!aggregatedData[planetId]) {
    aggregatedData[planetId] = {
      planet: transaction.planet,
      totalICSTransactions: 0,
      totalICSAmount: 0,
    };
  }

  aggregatedData[planetId].totalICSTransactions++;
  aggregatedData[planetId].totalICSAmount += transaction.amount;
};

export const sortByTotalTxDesc = (a: AggregatedICSTxByPlanet, b: AggregatedICSTxByPlanet) => b.totalICSTransactions - a.totalICSTransactions;

export const aggregateTxValuesByPlanet: AggregatorFunction<AggregatedTxValuesByPlanet> = (transaction, aggregatedData, rate) => {
  if (!rate) throw new Error('Rate argument is missing when calling aggregateTxValuesByPlanet');
  const planetId = transaction.planet.id;

  if (!aggregatedData[planetId]) {
    aggregatedData[planetId] = {
      planet: transaction.planet,
      allTxTotalAmountInICS: 0,
      allTxTotalAmountInGCS: 0,
      rate
    };
  }

  aggregatedData[planetId].allTxTotalAmountInICS += transaction.currency === Currency.GCS
    ? transaction.amount / rate : transaction.amount;
  aggregatedData[planetId].allTxTotalAmountInGCS += transaction.currency === Currency.ICS
    ? transaction.amount * rate : transaction.amount;
};

export interface AggregatorConfig<T> {
  sort?: (a: T, b: T) => number;
  rate?: number;
}

export function aggregateTransactions<T>(
  transactions: EnrichedTransactions,
  aggregator: AggregatorFunction<T>,
  options?: {
    sort?: (a: T, b: T) => number;
    rate?: number;
  }
): T[] {
  const { sort, rate } = options ?? {};
  const aggregatedData: Record<string, T> = {};
  transactions.forEach((transaction) => aggregator(transaction, aggregatedData, rate));

  const aggregatedList = Object.values(aggregatedData);
  if (sort) {
    aggregatedList.sort(sort);
  }
  return aggregatedList;
}

export function joinTransactionsByPlanet(txListA: TransactionsWithPlanet, txListB: TransactionsWithPlanet) {
  const txMapB = new Map();
  for (const tx of txListB) {
    txMapB.set(tx.planet.id, tx);
  }

  return txListA.map(txA => {
    const matchingTxB = txMapB.get(txA.planet.id);
    if (matchingTxB) {
      const { planet, ...restTxB } = matchingTxB;
      return { ...txA, ...restTxB };
    }
    return txA;
  });
}
