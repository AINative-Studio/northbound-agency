import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WalletSetupPage from '../setup/page';
import { createWallet } from '@/lib/wallet-service';

// Mock the wallet service
jest.mock('@/lib/wallet-service');

// Mock next/navigation
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe('WalletSetupPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render setup page with all required elements', () => {
    render(<WalletSetupPage />);

    expect(screen.getByText('Set Up Payment Wallet')).toBeInTheDocument();
    expect(screen.getByText('Create Wallet')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText(/What you'll get:/)).toBeInTheDocument();
  });

  it('should display all wallet features', () => {
    render(<WalletSetupPage />);

    expect(screen.getByText(/Secure wallet to receive client payments/)).toBeInTheDocument();
    expect(screen.getByText(/ACH withdrawal to your bank account/)).toBeInTheDocument();
    expect(screen.getByText(/Transaction history and reporting/)).toBeInTheDocument();
    expect(screen.getByText(/KYC verification for compliance/)).toBeInTheDocument();
  });

  it('should create wallet and redirect on success', async () => {
    (createWallet as jest.Mock).mockResolvedValueOnce({
      id: 'wallet-1',
      balance_usd: 0,
      kyc_status: 'NOT_STARTED',
    });

    render(<WalletSetupPage />);

    const createButton = screen.getByRole('button', { name: /Create Wallet/ });
    fireEvent.click(createButton);

    expect(screen.getByText('Creating Wallet...')).toBeInTheDocument();

    await waitFor(() => {
      expect(createWallet).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/admin');
    });
  });

  it('should display error message on failure', async () => {
    const errorMessage = 'Failed to create wallet';
    (createWallet as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<WalletSetupPage />);

    const createButton = screen.getByRole('button', { name: /Create Wallet/ });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Button should be re-enabled
    expect(createButton).not.toBeDisabled();
  });

  it('should navigate back when cancel is clicked', () => {
    render(<WalletSetupPage />);

    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    fireEvent.click(cancelButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('should disable button while creating wallet', async () => {
    (createWallet as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<WalletSetupPage />);

    const createButton = screen.getByRole('button', { name: /Create Wallet/ });
    fireEvent.click(createButton);

    expect(createButton).toBeDisabled();
    expect(screen.getByText('Creating Wallet...')).toBeInTheDocument();
  });
});
