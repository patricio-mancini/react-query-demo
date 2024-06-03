import { useMemo } from 'react';
import { aggregateTransactions, aggregateICSTxTotalsByPlanet, sortByTotalTxDesc } from '../utils/transaction';
import { EnrichedTransactions } from '../types/Transaction';

export default function useAggregateICSTxByPlanet(transactions: EnrichedTransactions | undefined) {
  return useMemo(() => {
    if (transactions && Array.isArray(transactions) && transactions.length) {
      return aggregateTransactions(transactions, aggregateICSTxTotalsByPlanet, { sort: sortByTotalTxDesc });
    }
    return [];
  },[transactions]);
}