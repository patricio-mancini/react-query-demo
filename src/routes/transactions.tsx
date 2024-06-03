
import styled from 'styled-components';
import FiltersForm from '../components/FiltersForm';
import GridContainer from '../components/GridContainer';

const TransactionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  height: 100%;
`;

export default function Transactions() {
  return (
    <TransactionContainer>
      <FiltersForm />
      <GridContainer />
    </TransactionContainer>
  );
}