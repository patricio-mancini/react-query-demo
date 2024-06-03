
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';
import { colorPalette } from '../utils/theme';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 2rem;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  padding: 2rem 4rem;
  background: ${colorPalette.primary};
  overflow: hidden;
`;

export default function Layout() {
  return (
    <Container>
      <Sidebar />
      <ContentWrapper>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </ContentWrapper>
    </Container>
  )
}