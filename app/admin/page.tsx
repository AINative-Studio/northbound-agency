'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  LogOut,
  Users,
  TrendingUp,
  Zap,
  Database,
  MessageSquare,
  BarChart3,
  Settings,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign
} from 'lucide-react';

export default function ResellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(false);

  useEffect(() => {
    // Check authentication
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // For now, we'll get user from cookie/session
      // In production, verify against AINative API
      const response = await fetch('/api/auth/verify', {
        credentials: 'include',
      });

      if (!response.ok) {
        router.push('/login?redirect=/admin');
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login?redirect=/admin');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchWalletData = async () => {
    setLoadingWallet(true);
    try {
      // Fetch wallet balance
      const walletRes = await fetch(`${process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio'}/v1/payments/wallets/me`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('ainative_token=')[1]?.split(';')[0]}`
        }
      });

      if (walletRes.ok) {
        const walletData = await walletRes.json();
        setWallet(walletData);
      }

      // Fetch recent transactions
      const txRes = await fetch(`${process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio'}/v1/payments/transactions?page=1&page_size=5`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('ainative_token=')[1]?.split(';')[0]}`
        }
      });

      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoadingWallet(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Active Clients',
      value: '12',
      change: '+3 this month',
      color: 'text-blue-500',
    },
    {
      icon: MessageSquare,
      label: 'AI Conversations',
      value: '1,247',
      change: '+18% from last month',
      color: 'text-green-500',
    },
    {
      icon: Database,
      label: 'ZeroDB Queries',
      value: '8,432',
      change: 'Across all clients',
      color: 'text-purple-500',
    },
    {
      icon: Zap,
      label: 'API Credits Used',
      value: '24.5K',
      change: '75.5K remaining',
      color: 'text-yellow-500',
    },
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'Test RAG Chatbot',
      description: 'Demo our AI chatbot capabilities',
      href: '/demos',
    },
    {
      icon: BarChart3,
      title: 'View Analytics',
      description: 'See usage and performance metrics',
      href: '/admin/analytics',
    },
    {
      icon: Database,
      title: 'ZeroDB Console',
      description: 'Manage your vector database',
      href: '/admin/zerodb',
    },
    {
      icon: Settings,
      title: 'Site Settings',
      description: 'Configure your reseller site',
      href: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Reseller Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  AINative Partner Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.username || 'Reseller'}</p>
                <Badge variant="secondary" className="text-xs">
                  AINative Partner
                </Badge>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  Welcome back, {user?.username || 'Partner'}!
                </h2>
                <p className="text-muted-foreground">
                  Manage your AINative-powered services for the entertainment industry
                </p>
              </div>
              <TrendingUp className="h-16 w-16 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => router.push(action.href)}
              >
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wallet Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payment Wallet</h3>
            <Button
              onClick={fetchWalletData}
              variant="outline"
              size="sm"
              disabled={loadingWallet}
            >
              {loadingWallet ? 'Loading...' : 'Refresh Wallet'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wallet Balance Card */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <CardTitle>Wallet Balance</CardTitle>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                    <p className="text-4xl font-bold">
                      ${wallet ? wallet.balance_usd.toFixed(2) : '0.00'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {wallet?.kyc_status === 'APPROVED' ? '✓ Verified Account' : '⏳ Pending Verification'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => router.push('/admin/wallet/deposit')}
                      className="flex-1 gap-2"
                      variant="default"
                    >
                      <ArrowDownRight className="h-4 w-4" />
                      Receive Payment
                    </Button>
                    <Button
                      onClick={() => router.push('/admin/wallet/withdraw')}
                      className="flex-1 gap-2"
                      variant="outline"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Withdraw (ACH)
                    </Button>
                  </div>

                  {!wallet && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">
                        No wallet found. Create one to receive payments.
                      </p>
                      <Button
                        onClick={() => router.push('/admin/wallet/setup')}
                        size="sm"
                        variant="secondary"
                        className="w-full"
                      >
                        Set Up Wallet
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions Card */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle>Recent Transactions</CardTitle>
                  </div>
                  <Button
                    onClick={() => router.push('/admin/wallet/transactions')}
                    variant="ghost"
                    size="sm"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No transactions yet</p>
                      <p className="text-xs mt-1">Your payment history will appear here</p>
                    </div>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            tx.transaction_type === 'ISSUE' ? 'bg-green-500/10' : 'bg-blue-500/10'
                          }`}>
                            {tx.transaction_type === 'ISSUE' ? (
                              <ArrowDownRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {tx.transaction_type === 'ISSUE' ? 'Received' : tx.transaction_type === 'REDEEM' ? 'Withdrawn' : 'Transfer'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(tx.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            tx.transaction_type === 'ISSUE' ? 'text-green-500' : 'text-blue-500'
                          }`}>
                            {tx.transaction_type === 'ISSUE' ? '+' : '-'}${tx.amount_usd.toFixed(2)}
                          </p>
                          <Badge variant={tx.status === 'SUCCESS' ? 'secondary' : 'outline'} className="text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Overview */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Your AINative Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">RAG Chatbots</p>
                    <p className="text-sm text-muted-foreground">
                      AI chatbots trained on your clients' data
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">ZeroDB Vector Search</p>
                    <p className="text-sm text-muted-foreground">
                      Semantic search across all content
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Multimodal AI APIs</p>
                    <p className="text-sm text-muted-foreground">
                      Text-to-Speech, Image Gen, Video AI
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Analytics & Reporting</p>
                    <p className="text-sm text-muted-foreground">
                      Usage tracking and insights
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            🤖 Built by AINative Studio | ⚡ All Data Services Built on ZeroDB
          </p>
          <p className="mt-2">
            Reselling AI services to the entertainment industry
          </p>
        </div>
      </main>
    </div>
  );
}
