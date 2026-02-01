export type KYCStatus = 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export type TransactionType = 'ISSUE' | 'REDEEM' | 'TRANSFER';

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Wallet {
  id: string;
  user_id: string;
  balance_usd: number;
  kyc_status: KYCStatus;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  transaction_type: TransactionType;
  amount_usd: number;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface WithdrawRequest {
  amount_usd: number;
  bank_account_id?: string;
  description?: string;
}

export interface DepositRequest {
  amount_usd: number;
  payment_method_id?: string;
  description?: string;
}
