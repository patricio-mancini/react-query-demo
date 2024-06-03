import { useMemo } from 'react';
import { joinTransactionsByPlanet } from '../utils/transaction';
import { TransactionsWithPlanet } from '../types/Transaction';

export default function useJoinTxValuesByPlanet(txListA: TransactionsWithPlanet | undefined, txListB: TransactionsWithPlanet | undefined) {
  return useMemo(() => {
    if (
      txListA &&
      Array.isArray(txListA) &&
      txListB &&
      Array.isArray(txListB)
    ) {
      return joinTransactionsByPlanet(txListA, txListB);
    }
    return [];
  },[txListA, txListB]);
}