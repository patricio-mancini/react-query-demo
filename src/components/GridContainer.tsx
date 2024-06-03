import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useTxWithUserAndPlanet from '../hooks/useTxWithUserAndPlanet';
import useFilterTx from '../hooks/useFilterTx';
import useAggregateICSTxByPlanet from '../hooks/useAggregateICSTxByPlanet';
import useAggregateTxValuesByPlanet from '../hooks/useAggregateTxValuesByPlanet';
import useJoinTxValuesByPlanet from '../hooks/useJoinTxValuesByPlanet';
import useExchangeRate from '../hooks/useExchangeRate';
import DataGrid from './DataGrid';
import { EnrichedTransactions, TransactionStatus } from '../types/Transaction';

const Container = styled.div`
  overflow-y: auto;
  height: calc(100% - 16rem);
`;

export default function GridContainer() {
  const [searchParams] = useSearchParams();

  const { data: rate } = useExchangeRate();
  const { data: allTransactions, isPending } = useTxWithUserAndPlanet();

  const filters = { isoDateFrom: searchParams.get('dateFrom'), status: TransactionStatus.inProgress };
  const filteredTransactions = useFilterTx(allTransactions, filters) as EnrichedTransactions;
  const aggregatedFilteredTx = useAggregateICSTxByPlanet(filteredTransactions);
  const aggregatedAllTx = useAggregateTxValuesByPlanet(allTransactions, rate);
  const joinedTransactions = useJoinTxValuesByPlanet(aggregatedFilteredTx, aggregatedAllTx);

  if (isPending) {
    return null;
  }

  return (
    <Container>
      <DataGrid data={joinedTransactions} />
    </Container>
  )
}
