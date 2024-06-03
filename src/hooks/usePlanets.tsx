import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../api';
import { Planet } from '../types/Planet';

interface Select {
  planets: Planet[]
}

export default function usePlanets() {
  return useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
    select: (data: Select) => data.planets.map((planet: Planet) => ({ id: planet.id, name: planet.name })),
    refetchOnMount: true
  });
}