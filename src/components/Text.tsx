import styled from 'styled-components';
import { colorPalette } from '../utils/theme';

interface TextProps {
  children: string;
  color?: string;
}

const StyledText = styled.span`
  color: ${({ color }) => color ?? colorPalette.grey};
`;

export default function Text({ children, color }: TextProps) {
  return (
    <StyledText color={color}>{children}</ StyledText>
  );
}