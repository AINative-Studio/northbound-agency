'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Download,
} from 'lucide-react';
import { getTransactions } from '@/lib/wallet-service';
import type { Transaction } from '@/types/wallet';

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await getTransactions(page, pageSize);
      setTransactions(data.transactions);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === 'ISSUE' ? ArrowDownRight : ArrowUpRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'ISSUE' ? 'text-green-500' : 'text-blue-500';
  };

  const getTransactionBgColor = (type: string) => {
    return type === 'ISSUE' ? 'bg-green-500/10' : 'bg-blue-500/10';
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'ISSUE':
        return 'Received';
      case 'REDEEM':
        return 'Withdrawn';
      case 'TRANSFER':
        return 'Transfer';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      SUCCESS: 'secondary',
      PENDING: 'outline',
      FAILED: 'destructive',
    };

    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const totalPages = Math.ceil(total / pageSize);

  if (isLoading && transactions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {total} total transactions
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {transactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No transactions yet</p>
                <p className="text-sm mt-1">Your payment history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => {
                  const Icon = getTransactionIcon(tx.transaction_type);

                  return (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border/50"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${getTransactionBgColor(
                            tx.transaction_type
                          )}`}
                        >
                          <Icon
                            className={`h-5 w-5 ${getTransactionColor(tx.transaction_type)}`}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {getTransactionLabel(tx.transaction_type)}
                            </p>
                            {getStatusBadge(tx.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          {tx.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {tx.description}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-lg font-semibold ${getTransactionColor(
                              tx.transaction_type
                            )}`}
                          >
                            {tx.transaction_type === 'ISSUE' ? '+' : '-'}$
                            {tx.amount_usd.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
