import { Planet } from '../types/Planet';
import { Transactions } from '../types/Transaction';
import { User } from '../types/User';

export async function getUsersByHomeworld(planetId: Planet['id']) {
  const response = await fetch(`/api/users/planet/${planetId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users by homeworld');
  }
  return response.json();
}

export async function getExchangeRate() {
  const response = await fetch('/api/exchange-rate');
  if (!response.ok) {
    throw new Error('Failed to fetch the exchange rate');
  }
  return response.json();
}

export async function getPlanets() {
  const response = await fetch('/api/planets');
  if (!response.ok) {
    throw new Error('Failed to fetch planets');
  }
  return response.json();
}

export async function getTxByUserIds(userIds: User['id'][]) {
  const jsonIds = JSON.stringify(userIds.map(id => id.toString()));
  const response = await fetch(`/api/transactions/users/${jsonIds}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions by multiple user ids');
  }
  return response.json();
}

export interface UpdateBatchTransactions {
  transactions: Transactions
}

export function updateBatchTransactions(txUpdate: UpdateBatchTransactions) {
  return fetch('/api/transactions/update-batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(txUpdate)
  });
}
