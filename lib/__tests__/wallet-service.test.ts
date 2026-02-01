import {
  getWallet,
  getTransactions,
  requestWithdraw,
  requestDeposit,
  createWallet,
} from '../wallet-service';
import type { Wallet, Transaction } from '@/types/wallet';

// Mock fetch globally
global.fetch = jest.fn();

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: 'ainative_token=test_token_123',
});

describe('Wallet Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getWallet', () => {
    it('should fetch wallet data successfully', async () => {
      const mockWallet: Wallet = {
        id: 'wallet-1',
        user_id: 'user-1',
        balance_usd: 100.50,
        kyc_status: 'APPROVED',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWallet,
      });

      const wallet = await getWallet();

      expect(wallet).toEqual(mockWallet);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/payments/wallets/me'),
        expect.objectContaining({
          credentials: 'include',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test_token_123',
          }),
        })
      );
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getWallet()).rejects.toThrow('Failed to fetch wallet data');
    });

    it('should throw error when no auth token', async () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
      });

      await expect(getWallet()).rejects.toThrow('No authentication token found');

      // Restore
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ainative_token=test_token_123',
      });
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions with pagination', async () => {
      const mockTransactions: Transaction[] = [
        {
          id: 'tx-1',
          wallet_id: 'wallet-1',
          transaction_type: 'ISSUE',
          amount_usd: 50.00,
          status: 'SUCCESS',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ transactions: mockTransactions, total: 1 }),
      });

      const result = await getTransactions(1, 10);

      expect(result.transactions).toEqual(mockTransactions);
      expect(result.total).toBe(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/payments/transactions?page=1&page_size=10'),
        expect.any(Object)
      );
    });

    it('should use default pagination values', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ transactions: [], total: 0 }),
      });

      await getTransactions();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1&page_size=10'),
        expect.any(Object)
      );
    });
  });

  describe('requestWithdraw', () => {
    it('should process withdrawal request', async () => {
      const withdrawRequest = {
        amount_usd: 25.00,
        description: 'Test withdrawal',
      };

      const mockTransaction: Transaction = {
        id: 'tx-2',
        wallet_id: 'wallet-1',
        transaction_type: 'REDEEM',
        amount_usd: 25.00,
        status: 'PENDING',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransaction,
      });

      const transaction = await requestWithdraw(withdrawRequest);

      expect(transaction).toEqual(mockTransaction);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/payments/withdraw'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(withdrawRequest),
        })
      );
    });
  });

  describe('requestDeposit', () => {
    it('should process deposit request', async () => {
      const depositRequest = {
        amount_usd: 100.00,
        description: 'Test deposit',
      };

      const mockTransaction: Transaction = {
        id: 'tx-3',
        wallet_id: 'wallet-1',
        transaction_type: 'ISSUE',
        amount_usd: 100.00,
        status: 'SUCCESS',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransaction,
      });

      const transaction = await requestDeposit(depositRequest);

      expect(transaction).toEqual(mockTransaction);
    });
  });

  describe('createWallet', () => {
    it('should create a new wallet', async () => {
      const mockWallet: Wallet = {
        id: 'wallet-new',
        user_id: 'user-1',
        balance_usd: 0,
        kyc_status: 'NOT_STARTED',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWallet,
      });

      const wallet = await createWallet();

      expect(wallet).toEqual(mockWallet);
      expect(wallet.balance_usd).toBe(0);
      expect(wallet.kyc_status).toBe('NOT_STARTED');
    });
  });
});
