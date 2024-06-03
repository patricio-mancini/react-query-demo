import styled from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
import { colorPalette } from '../utils/theme';

const StyledLink = styled(Link)`
  display: flex;
  text-align: center;
  line-height: 1.35em;
  width: 100%;
  gap: .35em;
`;

const StyledListItem = styled.li`
  padding: .5em .75em;
  display: flex;
  border-radius: 8px;
  transition: background-color .2s;
  &.active,
  &:hover,
  &:focus {
    background-color: ${colorPalette.primary};
  }
`;

interface SidebarListItemProps {
  to: string;
  children: React.ReactNode;
}

export default function SidebarListItem({ to, children }: SidebarListItemProps): JSX.Element {
  const match = useMatch(to);
  
  return (
    <StyledListItem className={match ? 'active' : ''}>
      <StyledLink to={to}>
        {children}
      </StyledLink>
    </StyledListItem>
  );
}
