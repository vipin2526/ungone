'use client';

import { useState, useEffect } from 'react';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      const data = await response.json();

      if (response.ok) {
        setSubscribers(data.subscribers || []);
      } else {
        console.error('Failed to fetch subscribers:', data.error);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubscriber = (id: string) => {
    const newSelected = new Set(selectedSubscribers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubscribers(newSelected);
  };

  const handleSelectAll = () => {
    const filtered = getFilteredSubscribers();
    if (selectedSubscribers.size === filtered.length) {
      setSelectedSubscribers(new Set());
    } else {
      setSelectedSubscribers(new Set(filtered.map(s => s.id)));
    }
  };

  const getFilteredSubscribers = () => {
    if (!searchQuery) return subscribers;
    return subscribers.filter(s =>
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredSubscribers = getFilteredSubscribers();

  const handleBulkDelete = async () => {
    if (selectedSubscribers.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedSubscribers.size} subscriber(s)?`)) return;
    setBulkActionLoading(true);

    try {
      const response = await fetch('/api/admin/newsletter/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriberIds: Array.from(selectedSubscribers),
        }),
      });

      if (response.ok) {
        fetchSubscribers();
        setSelectedSubscribers(new Set());
        alert('Subscribers deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting subscribers:', error);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Email', 'Subscribed At'];
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      new Date(sub.subscribed_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCopyEmails = () => {
    const emails = filteredSubscribers.map(s => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert('Emails copied to clipboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
        <p className="text-zinc-400">Manage your newsletter subscribers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-3xl mb-2">📧</div>
          <div className="text-3xl font-bold text-white">{subscribers.length}</div>
          <div className="text-zinc-400 text-sm">Total Subscribers</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-3xl font-bold text-white">
            {subscribers.filter(s => {
              const date = new Date(s.subscribed_at);
              const now = new Date();
              const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
              return daysAgo <= 30;
            }).length}
          </div>
          <div className="text-zinc-400 text-sm">Last 30 days</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-3xl font-bold text-white">
            {subscribers.length > 0
              ? ((subscribers.filter(s => {
                  const date = new Date(s.subscribed_at);
                  const now = new Date();
                  const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                  return daysAgo <= 30;
                }).length / subscribers.length) * 100).toFixed(0)
              : 0}%
          </div>
          <div className="text-zinc-400 text-sm">Recent growth</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2 text-zinc-400">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by email..."
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
        </div>
        <div className="flex gap-2 items-end">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={handleCopyEmails}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Copy Emails
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedSubscribers.size > 0 && (
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-6 flex items-center justify-between">
          <div className="text-zinc-400">
            {selectedSubscribers.size} subscriber{selectedSubscribers.size !== 1 ? 's' : ''} selected
          </div>
          <button
            onClick={handleBulkDelete}
            disabled={bulkActionLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 rounded-lg transition-colors"
          >
            {bulkActionLoading ? 'Deleting...' : 'Delete Selected'}
          </button>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400 w-10">
                  <input
                    type="checkbox"
                    checked={selectedSubscribers.size === filteredSubscribers.length && filteredSubscribers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Subscribed At</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.has(subscriber.id)}
                        onChange={() => handleSelectSubscriber(subscriber.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{subscriber.email}</td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">
                      {new Date(subscriber.subscribed_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${subscriber.email}?`)) {
                            handleDeleteSubscriber(subscriber.id);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  async function handleDeleteSubscriber(id: string) {
    try {
      const response = await fetch('/api/admin/newsletter/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriberIds: [id] }),
      });

      if (response.ok) {
        fetchSubscribers();
        alert('Subscriber deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  }
}
