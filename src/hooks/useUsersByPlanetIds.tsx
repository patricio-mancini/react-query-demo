import { useCallback } from 'react';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { getUsersByHomeworld } from '../api';
import { Planet } from '../types/Planet';
import { User, Users } from '../types/User';

type QueryResult = UseQueryResult<Users, Error>;
type CombineResult = { data: Users };

export default function useUsersByPlanetIds(planetIds: Planet['id'][] | undefined): CombineResult {

  const combine = useCallback((results: QueryResult[]): CombineResult => {
    const isPending = results.some((result) => result.isPending);
    return {
      data: isPending ? [] : results.flatMap((result) => result.data)
    } as CombineResult;
  }, []);

  return useQueries({
    queries: planetIds
      ? planetIds.map((planetId: Planet['id']) => ({
          queryKey: ['users', 'planet', planetId],
          queryFn: () => getUsersByHomeworld(planetId),
          select: (data: { users: Users }): Users => (
            data.users.map((user: User) => ({
              id: user.id,
              name: user.name,
              homeworld: user.homeworld
            }))
          ),
          refetchOnMount: true
        }))
      : [],
    combine
  });
}
