'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { requestWithdraw, getWallet } from '@/lib/wallet-service';
import type { Wallet } from '@/types/wallet';

export default function WithdrawPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await getWallet();
      setWallet(data);
    } catch (err) {
      setError('Failed to load wallet information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const amountUsd = parseFloat(amount);

      if (isNaN(amountUsd) || amountUsd <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (wallet && amountUsd > wallet.balance_usd) {
        throw new Error('Insufficient balance');
      }

      if (wallet?.kyc_status !== 'APPROVED') {
        throw new Error('KYC verification required for withdrawals');
      }

      await requestWithdraw({
        amount_usd: amountUsd,
        description,
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process withdrawal');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-12 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Withdrawal Initiated!</h2>
                <p className="text-muted-foreground">
                  Your withdrawal request has been submitted. Funds will be transferred to your bank account within 2-3 business days.
                </p>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Amount:</strong> ${parseFloat(amount).toFixed(2)}
                </p>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
              </div>

              <Button
                onClick={() => router.push('/admin')}
                className="w-full"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Withdraw Funds (ACH)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {wallet?.kyc_status !== 'APPROVED' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">KYC Verification Required</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You must complete KYC verification before withdrawing funds.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Available Balance</p>
                <p className="text-3xl font-bold">
                  ${wallet?.balance_usd.toFixed(2) || '0.00'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Withdrawal Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      max={wallet?.balance_usd || 0}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-7"
                      required
                      disabled={wallet?.kyc_status !== 'APPROVED'}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum: ${wallet?.balance_usd.toFixed(2) || '0.00'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <Input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Monthly withdrawal"
                    disabled={wallet?.kyc_status !== 'APPROVED'}
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-sm">Processing Time:</h4>
                  <p className="text-sm text-muted-foreground">
                    ACH transfers typically take 2-3 business days to appear in your bank account.
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isProcessing || wallet?.kyc_status !== 'APPROVED'}
                    className="flex-1"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Withdraw to Bank Account'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
