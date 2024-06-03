import { useQuery } from '@tanstack/react-query';
import usePlanets from './usePlanets';
import useUsersByPlanetIds from './useUsersByPlanetIds';
import useTxByUserIds from './useTxByUserIds';
import { Planet } from '../types/Planet';
import { User } from '../types/User';
import { EnrichedTransactions, Transaction } from '../types/Transaction';

export default function useTxWithUserAndPlanet() {
  const { data: planets } = usePlanets();
  const planetIds = planets?.map((planet: Planet) => planet.id);
  const { data: users } = useUsersByPlanetIds(planetIds);
  const allUserIds = users.map((user: User) => user.id);
  const { data: transactions } = useTxByUserIds(allUserIds);

  const enrichedTransactions: EnrichedTransactions = transactions?.map((tx: Transaction) => {
    const user = users?.find((user: User) => user.id === tx.user);
    if (!user) return tx;
    const planet = planets?.find((planet: Planet) => planet.id === user.homeworld);
    return {
      ...tx,
      userInfo: user,
      planet
    };
  });

  return useQuery({
    queryKey: ['transactions', 'enriched'],
    queryFn: () => Promise.resolve(enrichedTransactions),
    enabled: !!enrichedTransactions,
    refetchOnMount: true
  });
}
