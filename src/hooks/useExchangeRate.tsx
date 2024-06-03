import { useQuery } from '@tanstack/react-query';
import { getExchangeRate } from '../api';

interface Select {
  rate: string;
}

export default function useExchangeRate() {
  return useQuery({
    queryKey: ['exchangeRate'],
    queryFn: getExchangeRate,
    select: (data: Select) => parseFloat(data.rate),
    refetchInterval: 1000
  });
}