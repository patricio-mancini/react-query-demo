import styled from 'styled-components';
import SidebarListItem from './SidebarListItem';
import Icon from './Icon';
import Text from './Text';
import { colorPalette } from '../utils/theme';
import { routeInfo, coruscantBankName } from '../utils/constants';

const Aside = styled.aside`
  height: 100%;
  width: 15rem;
  background: ${colorPalette.secondary};
  display: flex;
  flex-direction: column;
  padding: 4px 16px 0;
`;

const SidebarHeader = styled.div`
  height: 5rem;
  padding-top: 1.25rem;
`;

const SidebarList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: .5em;
`;

export default function Sidebar() {
  return (
    <Aside>
      <SidebarHeader>
        <h2>{coruscantBankName}</h2>
      </SidebarHeader>
      <SidebarList>
        <SidebarListItem to={routeInfo.transactions.path}>
          <Icon name={routeInfo.transactions.icon} />
          <Text>{routeInfo.transactions.linkText}</Text>
        </SidebarListItem>
        <SidebarListItem to={routeInfo.security.path}>
          <Icon name={routeInfo.security.icon} />
          <Text>{routeInfo.security.linkText}</Text>
        </SidebarListItem>
      </SidebarList>
    </Aside>
  );
}
