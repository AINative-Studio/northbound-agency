import type { Wallet, Transaction, WithdrawRequest, DepositRequest } from '@/types/wallet';

const API_URL = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';

/**
 * Securely get auth token from cookie
 */
function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/ainative_token=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Base fetch wrapper with auth
 */
async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

/**
 * Get wallet balance and details
 */
export async function getWallet(): Promise<Wallet> {
  const response = await authenticatedFetch('/v1/payments/wallets/me');

  if (!response.ok) {
    throw new Error('Failed to fetch wallet data');
  }

  return response.json();
}

/**
 * Get transaction history with pagination
 */
export async function getTransactions(
  page: number = 1,
  pageSize: number = 10
): Promise<{ transactions: Transaction[]; total: number }> {
  const response = await authenticatedFetch(
    `/v1/payments/transactions?page=${page}&page_size=${pageSize}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}

/**
 * Request a withdrawal
 */
export async function requestWithdraw(data: WithdrawRequest): Promise<Transaction> {
  const response = await authenticatedFetch('/v1/payments/withdraw', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to process withdrawal');
  }

  return response.json();
}

/**
 * Request a deposit/receive payment
 */
export async function requestDeposit(data: DepositRequest): Promise<Transaction> {
  const response = await authenticatedFetch('/v1/payments/deposit', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to process deposit');
  }

  return response.json();
}

/**
 * Create a new wallet
 */
export async function createWallet(): Promise<Wallet> {
  const response = await authenticatedFetch('/v1/payments/wallets', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to create wallet');
  }

  return response.json();
}
