'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownRight, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { requestDeposit } from '@/lib/wallet-service';

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock payment link - in production, this would come from AINative API
  const paymentLink = `https://pay.ainative.studio/deposit/${Date.now()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      await requestDeposit({
        amount_usd: amountUsd,
        description,
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process deposit');
    } finally {
      setIsProcessing(false);
    }
  };

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
                <h2 className="text-2xl font-bold mb-2">Payment Link Generated!</h2>
                <p className="text-muted-foreground">
                  Share this link with your client to receive payment
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 flex items-center gap-2">
                <code className="flex-1 text-sm break-all">{paymentLink}</code>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/admin')}
                  className="flex-1"
                >
                  Back to Dashboard
                </Button>
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                >
                  Create Another
                </Button>
              </div>
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
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ArrowDownRight className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Receive Payment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (USD)
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                    required
                  />
                </div>
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
                  placeholder="e.g., Invoice #1234, Client name"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm">How it works:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Enter the amount you want to receive</li>
                  <li>Generate a secure payment link</li>
                  <li>Share the link with your client</li>
                  <li>Funds appear in your wallet once paid</li>
                </ol>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing ? 'Generating Link...' : 'Generate Payment Link'}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
