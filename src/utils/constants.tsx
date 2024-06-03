import Transactions from '../routes/transactions';
import Security from '../routes/security';

interface RouteInfoItem {
  path: string;
  title: string;
  linkText: string;
  icon: string;
  element: JSX.Element;
}

interface RouteInfo {
  transactions: RouteInfoItem;
  security: RouteInfoItem;
}

export const routeInfo: RouteInfo = {
  transactions: {
    path: 'transactions',
    title: 'Transactions',
    linkText: 'Transactions',
    icon: 'sync_alt',
    element: <Transactions />
  },
  security: {
    path: 'security',
    title: 'Security Panel',
    linkText: 'Security Panel',
    icon: 'shield_person',
    element:  <Security />
  }
};

export const coruscantBankName = 'Coruscant Bank';
