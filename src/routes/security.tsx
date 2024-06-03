import styled from 'styled-components';
import BlockPlanetTxForm from '../components/BlockPlanetTxForm';
import Text from '../components/Text';

const SecurityContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  gap: 2rem;
`;

const title = 'Block Planetary Transactions';
const message = `If you proceed, all transactions associated with the selected planet that are currently in the 'In Progress' state will be updated to 'Blocked'.`;

export default function Security() {
  return (
    <SecurityContainer>
      <h2>{title}</h2>
      <p>
        <Text>{message}</Text>
      </p>
      <BlockPlanetTxForm />
    </SecurityContainer>
  );
}