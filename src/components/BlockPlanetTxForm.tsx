import { useState, useCallback } from 'react';
import styled from 'styled-components';
import usePlanets from '../hooks/usePlanets';
import useUsersByPlanetIds from '../hooks/useUsersByPlanetIds';
import useTxByUserIds from '../hooks/useTxByUserIds';
import useFilterTx from '../hooks/useFilterTx';
import useBatchUpdateTransactions from '../hooks/useBatchUpdateTransactions';
import { UpdateBatchTransactions } from '../api';
import Text from './Text';
import { colorPalette } from '../utils/theme';
import { Planet } from '../types/Planet';
import { User } from '../types/User';
import { Transaction, TransactionStatus, Transactions } from '../types/Transaction';
import ConfirmationContainer from './ConfirmationContainer';

const Form = styled.form`
  background: ${colorPalette.secondary};
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${colorPalette.grey};
  border-radius: 4px;
  width: 10em;
  color: ${colorPalette.grey};
  cursor: pointer;
  margin-right: 1.5em;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${colorPalette.black};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default function BlockPlanetTxForm() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<Planet['id']>('');
  const [lastPlanetIdUpdated, setLastPlanetIdUpdated] = useState<Planet['id']>();

  const { data: planets } = usePlanets();
  const { data: users } = useUsersByPlanetIds(!selectedPlanetId ? undefined : [selectedPlanetId]);
  const allUserIds = users && users.map((user: User) => user.id);
  const { data: transactions } = useTxByUserIds(allUserIds);
  const planetTxInProgress = useFilterTx(transactions, { status: TransactionStatus.inProgress });
  const mutation = useBatchUpdateTransactions(allUserIds);

  const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlanetId(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const update: UpdateBatchTransactions = {
      transactions: planetTxInProgress.map((tx: Transaction) => ({ id: tx.id, status: TransactionStatus.blocked })) as Transactions
    };
    await mutation.mutateAsync(update);
    setLastPlanetIdUpdated(selectedPlanetId);
  }, [selectedPlanetId, planetTxInProgress, mutation]);

  const isButtonDisabled = !selectedPlanetId.length || !planetTxInProgress.length;
  const updatedPlanet = lastPlanetIdUpdated && planets && planets.find((planet: Planet) => planet.id === lastPlanetIdUpdated);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Select id='planetSelect' value={selectedPlanetId} onChange={handleSelectChange}>
          <option value=''>Select Planet</option>
          {planets && planets.map((planet: Planet) => (
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          ))}
        </Select>
        <Button type='submit' disabled={isButtonDisabled}>
          <Text color={colorPalette.white}>Block Transactions</Text>
        </Button>
      </Form>
      <ConfirmationContainer isDisplayed={!!lastPlanetIdUpdated} planet={updatedPlanet as Planet} />
    </div>
  );
}
