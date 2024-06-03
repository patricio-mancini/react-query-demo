import { Planet } from './Planet';
import { User } from './User';

export enum Currency {
  ICS = 'ICS',
  GCS = 'GCS'
};

export enum TransactionStatus {
  inProgress = 'inProgress',
  completed = 'completed',
  blocked = 'blocked'
};

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  currency: Currency;
  date: string;
  status: TransactionStatus;
}

export type Transactions = Transaction[];

export interface EnrichedTransaction extends Transaction {
  userInfo: User;
  planet: Planet
}

export type EnrichedTransactions = EnrichedTransaction[];

export type PureOrEnrichedTransaction = Transaction | EnrichedTransaction;

export type PureOrEnrichedTransactions = PureOrEnrichedTransaction[];

export interface AggregatedICSTxByPlanet {
  planet: Planet;
  totalICSTransactions: number;
  totalICSAmount: number;
}

export interface AggregatedTxValuesByPlanet {
  planet: Planet;
  allTxTotalAmountInICS: number;
  allTxTotalAmountInGCS: number;
  rate: number;
}

export type TransactionsWithPlanet = EnrichedTransactions | AggregatedICSTxByPlanet[] | AggregatedTxValuesByPlanet[];