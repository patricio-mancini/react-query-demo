import styled from 'styled-components';
import Text from './Text';
import { colorPalette } from '../utils/theme';
import { Planet } from '../types/Planet';

const Confirmation = styled.div`
  background: ${colorPalette.secondary};
  align-self: center;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 4rem;
`;

const StyledParagraph = styled.p`
  margin-top: .5em;
`;

interface ConfirmationContainerProps {
  planet: Planet;
  isDisplayed: boolean;
}

const title = 'Operation Successful';

export default function ConfirmationContainer({ planet, isDisplayed }: ConfirmationContainerProps) {
  if (!isDisplayed) {
    return null;
  }

  const message = `All the transactions that were In Progress for the planet ${planet.name} have been updated to a Blocked status.`;

  return (
    <Confirmation>
      <h2>{title}</h2>
      <StyledParagraph>
        <Text>{message}</Text>
      </StyledParagraph>
    </Confirmation>
  )
}
