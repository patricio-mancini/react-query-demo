import { useQuery } from '@tanstack/react-query';
import { getTxByUserIds } from '../api';
import { User } from '../types/User';
import { Transaction } from '../types/Transaction';

export default function useTxByUserIds(userIds: User['id'][]) {
  return useQuery({
    queryKey: ['transactions', 'users', userIds],
    queryFn: () => getTxByUserIds(userIds),
    select: (data) => data.transactions.map((transaction: Transaction) => ({
      id: transaction.id,
      user: transaction.user,
      amount: transaction.amount,
      currency: transaction.currency,
      date: transaction.date,
      status: transaction.status
    })),
    enabled: userIds && Array.isArray(userIds) && !!userIds.length,
    refetchOnMount: true
  });
}
