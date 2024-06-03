import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBatchTransactions } from '../api';
import { User } from '../types/User';

export default function useBatchUpdateTransactions(userIds: User['id'][]) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBatchTransactions,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['transactions'] });
    }
  });
}
