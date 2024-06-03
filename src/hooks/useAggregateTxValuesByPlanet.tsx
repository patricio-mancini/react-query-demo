import { useMemo } from 'react';
import { aggregateTransactions, aggregateTxValuesByPlanet } from '../utils/transaction';
import { EnrichedTransactions } from '../types/Transaction';

export default function useAggregateTxValuesByPlanet(transactions: EnrichedTransactions | undefined, rate: number | undefined) {
  return useMemo(() => {
    if (transactions && Array.isArray(transactions) && transactions.length && rate) {
      return aggregateTransactions(transactions, aggregateTxValuesByPlanet, { rate });
    }
    return [];
  },[transactions, rate]);
}