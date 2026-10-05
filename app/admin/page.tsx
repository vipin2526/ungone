'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interested: string | null;
  message: string;
  lead_type: string;
  status: string;
  notes: string | null;
  source_page: string | null;
  created_at: string;
  updated_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use a dedicated auth check endpoint that doesn't require database
        const response = await fetch('/api/admin/auth-check');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!response.ok) {
          console.error('Auth check failed:', response.status);
          router.push('/admin/login');
          return;
        }
        setAuthChecked(true);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
        return;
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (authChecked) {
      fetchDashboardData();
    }
  }, [authChecked]);

  const fetchDashboardData = async () => {
    try {
      const [leadsRes, subsRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/newsletter'),
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      } else {
        console.error('Failed to fetch leads:', leadsRes.status, await leadsRes.text());
        setError('Failed to load leads data');
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubscribers(subsData.subscribers || []);
      } else {
        console.error('Failed to fetch subscribers:', subsRes.status, await subsRes.text());
        setError('Failed to load subscriber data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchDashboardData();
            }}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const closedWon = leads.filter(l => l.status === 'closed_won').length;
  const closedLost = leads.filter(l => l.status === 'closed_lost').length;

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const leadsThisMonth = leads.filter(l => {
    const date = new Date(l.created_at);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  }).length;

  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
  const leadsLastMonth = leads.filter(l => {
    const date = new Date(l.created_at);
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
  }).length;

  const monthlyGrowth = leadsLastMonth > 0 
    ? ((leadsThisMonth - leadsLastMonth) / leadsLastMonth * 100).toFixed(1)
    : '0';

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-zinc-400">Welcome back! Here's what's happening with your leads.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">👥</div>
            <div className={`text-sm ${parseFloat(monthlyGrowth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {parseFloat(monthlyGrowth) >= 0 ? '+' : ''}{monthlyGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{leads.length}</div>
          <div className="text-zinc-400 text-sm">Total Leads</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">🆕</div>
            <div className="text-sm text-blue-500">This month</div>
          </div>
          <div className="text-3xl font-bold text-white">{leadsThisMonth}</div>
          <div className="text-zinc-400 text-sm">New Leads</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">📧</div>
            <div className="text-sm text-purple-500">Subscribers</div>
          </div>
          <div className="text-3xl font-bold text-white">{subscribers.length}</div>
          <div className="text-zinc-400 text-sm">Newsletter</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">✅</div>
            <div className="text-sm text-green-500">Win rate</div>
          </div>
          <div className="text-3xl font-bold text-white">
            {closedWon + closedLost > 0 
              ? ((closedWon / (closedWon + closedLost)) * 100).toFixed(0)
              : 0}%
          </div>
          <div className="text-zinc-400 text-sm">Conversion</div>
        </div>
      </div>

      {/* Lead Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Lead Status Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'New', count: newLeads, color: 'bg-blue-600' },
              { label: 'Contacted', count: contactedLeads, color: 'bg-yellow-600' },
              { label: 'Qualified', count: qualifiedLeads, color: 'bg-purple-600' },
              { label: 'Closed Won', count: closedWon, color: 'bg-green-600' },
              { label: 'Closed Lost', count: closedLost, color: 'bg-red-600' },
            ].map((status) => {
              const percentage = leads.length > 0 ? (status.count / leads.length) * 100 : 0;
              return (
                <div key={status.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">{status.label}</span>
                    <span className="text-white">{status.count}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className={`${status.color} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{lead.name}</div>
                  <div className="text-sm text-zinc-400 truncate">{lead.email}</div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-zinc-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {lead.lead_type === 'audit_request' ? 'Audit' : 'Contact'}
                  </div>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="text-center text-zinc-500 py-8">No leads yet</div>
            )}
          </div>
          {leads.length > 0 && (
            <button
              onClick={() => router.push('/admin/leads')}
              className="mt-4 w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
            >
              View All Leads →
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/leads')}
            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="font-medium">Manage Leads</div>
            <div className="text-sm text-zinc-400">View and update lead status</div>
          </button>
          <button
            onClick={() => router.push('/admin/analytics')}
            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-2">📈</div>
            <div className="font-medium">View Analytics</div>
            <div className="text-sm text-zinc-400">Detailed metrics and insights</div>
          </button>
          <button
            onClick={() => router.push('/admin/newsletter')}
            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-2">📧</div>
            <div className="font-medium">Newsletter</div>
            <div className="text-sm text-zinc-400">Manage subscribers</div>
          </button>
        </div>
      </div>
    </div>
  );
}
