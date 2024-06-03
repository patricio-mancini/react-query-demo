import styled from 'styled-components';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routeInfo } from '../utils/constants';

const Heading = styled.h1`
  text-align: center;
`;

const StyledHeader = styled.header`
  margin-top: 3rem;
`;

export default function Header() {
  const location = useLocation();

  const title = useMemo(() => {
    const route = Object.values(routeInfo).find(( item) => `/${item.path}` === location.pathname);
    return route?.title;
  }, [location.pathname]);

  return (
    <StyledHeader>
      <Heading>{title}</Heading>
    </StyledHeader>
  );
}
