'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createWallet } from '@/lib/wallet-service';

export default function WalletSetupPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateWallet = async () => {
    setIsCreating(true);
    setError('');

    try {
      await createWallet();
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    } finally {
      setIsCreating(false);
    }
  };

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
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Set Up Payment Wallet</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Create a payment wallet to receive payments from your clients and manage your funds.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold">What you'll get:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Secure wallet to receive client payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">ACH withdrawal to your bank account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Transaction history and reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">KYC verification for compliance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> After creating your wallet, you'll need to complete KYC
                  verification to unlock withdrawal capabilities.
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleCreateWallet}
                disabled={isCreating}
                className="flex-1"
                size="lg"
              >
                {isCreating ? 'Creating Wallet...' : 'Create Wallet'}
              </Button>
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
