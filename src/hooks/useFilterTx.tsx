import { useMemo } from 'react';
import { filterTransactions } from '../utils/transaction';
import { Currency, PureOrEnrichedTransactions, TransactionStatus } from '../types/Transaction';

interface FilterConfig {
  isoDateFrom?: string | null;
  currency?: Currency;
  status?: TransactionStatus;
}

export default function useFilterTx(transactions: PureOrEnrichedTransactions | undefined, config: FilterConfig = {}) {
  const { isoDateFrom, currency, status } = config;

  return useMemo(() => {
    if (transactions && Array.isArray(transactions) && transactions.length) {
      return filterTransactions(transactions, {
        currency,
        status,
        isoDateFrom
      });
    }
    return [];
  },[transactions, isoDateFrom, currency, status]);
}
