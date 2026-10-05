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

interface LeadHistory {
  id: string;
  lead_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  changed_at: string;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-600' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-600' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-600' },
  { value: 'proposal_sent', label: 'Proposal Sent', color: 'bg-orange-600' },
  { value: 'closed_won', label: 'Closed Won', color: 'bg-green-600' },
  { value: 'closed_lost', label: 'Closed Lost', color: 'bg-red-600' },
];

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [leadHistory, setLeadHistory] = useState<LeadHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [filterStatus, searchQuery]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads);
      } else {
        console.error('Failed to fetch leads:', data.error);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleNotesSave = async () => {
    if (!selectedLead) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        fetchLeads();
        alert('Notes saved successfully');
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setSaving(false);
    }
  };

  const fetchLeadHistory = async (leadId: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/history`);
      const data = await response.json();

      if (response.ok) {
        setLeadHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching lead history:', error);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLeads();
        alert('Lead deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(l => l.id)));
    }
  };

  const handleBulkStatusUpdate = async () => {
    if (!bulkStatus || selectedLeads.size === 0) return;
    setBulkActionLoading(true);

    try {
      const response = await fetch('/api/admin/leads/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds: Array.from(selectedLeads),
          status: bulkStatus,
        }),
      });

      if (response.ok) {
        fetchLeads();
        setSelectedLeads(new Set());
        setBulkStatus('');
        alert('Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating bulk status:', error);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedLeads.size} lead(s)?`)) return;
    setBulkActionLoading(true);

    try {
      const response = await fetch('/api/admin/leads/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds: Array.from(selectedLeads),
        }),
      });

      if (response.ok) {
        fetchLeads();
        setSelectedLeads(new Set());
        alert('Leads deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting bulk leads:', error);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Type', 'Status', 'Created'];
    const rows = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.service_interested || '',
      lead.lead_type,
      lead.status,
      new Date(lead.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.color || 'bg-gray-600';
  };

  const getStatusLabel = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.label || status;
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
        <h1 className="text-3xl font-bold mb-2">Leads Management</h1>
        <p className="text-zinc-400">View, manage, and update your leads</p>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2 text-zinc-400">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-2 text-zinc-400">Status Filter</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.size > 0 && (
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="text-zinc-400">
            {selectedLeads.size} lead{selectedLeads.size !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            >
              <option value="">Update Status...</option>
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleBulkStatusUpdate}
              disabled={!bulkStatus || bulkActionLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 rounded-lg transition-colors"
            >
              {bulkActionLoading ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={bulkActionLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 rounded-lg transition-colors"
            >
              {bulkActionLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400 w-10">
                  <input
                    type="checkbox"
                    checked={selectedLeads.size === leads.length && leads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Company</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLeads.has(lead.id)}
                        onChange={() => handleSelectLead(lead.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{lead.email}</td>
                    <td className="px-4 py-3 text-zinc-400">{lead.company || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-zinc-800">
                        {lead.lead_type === 'audit_request' ? 'Audit' : 'Contact'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(lead.status)} cursor-pointer`}
                      >
                        {STATUS_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setNotes(lead.notes || '');
                          setShowHistory(false);
                          fetchLeadHistory(lead.id);
                        }}
                        className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400">Name</label>
                    <div className="font-medium">{selectedLead.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Email</label>
                    <div className="font-medium">{selectedLead.email}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Phone</label>
                    <div>{selectedLead.phone || '-'}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Company</label>
                    <div>{selectedLead.company || '-'}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Service Interested</label>
                    <div>{selectedLead.service_interested || '-'}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Lead Type</label>
                    <div>{selectedLead.lead_type}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Status</label>
                    <div className="font-medium">{getStatusLabel(selectedLead.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Created</label>
                    <div>{new Date(selectedLead.created_at).toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Message</label>
                  <div className="bg-zinc-800 rounded p-3 mt-1">{selectedLead.message}</div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Source Page</label>
                  <div className="text-sm text-zinc-400">{selectedLead.source_page || '-'}</div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-zinc-400">Activity Timeline</label>
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-sm text-green-500 hover:text-green-400"
                    >
                      {showHistory ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showHistory && (
                    <div className="bg-zinc-800 rounded p-3 mt-1 space-y-3 max-h-48 overflow-y-auto">
                      {leadHistory.length === 0 ? (
                        <div className="text-sm text-zinc-500 text-center py-4">
                          No activity recorded
                        </div>
                      ) : (
                        leadHistory.map((history) => (
                          <div key={history.id} className="border-l-2 border-zinc-700 pl-3 relative">
                            <div className="absolute w-2 h-2 bg-green-500 rounded-full -left-[5px] top-1"></div>
                            <div className="text-sm">
                              <span className="text-zinc-400">
                                {new Date(history.changed_at).toLocaleString()}
                              </span>
                              <span className="ml-2">
                                {history.old_status ? (
                                  <span>
                                    <span className="text-yellow-500">{history.old_status}</span>
                                    {' → '}
                                    <span className="text-green-500">{history.new_status}</span>
                                  </span>
                                ) : (
                                  <span className="text-green-500">Set to {history.new_status}</span>
                                )}
                              </span>
                            </div>
                            {history.notes && (
                              <div className="text-xs text-zinc-500 mt-1">{history.notes}</div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    placeholder="Add notes about this lead..."
                  />
                  <button
                    onClick={handleNotesSave}
                    disabled={saving}
                    className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 rounded-lg transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
