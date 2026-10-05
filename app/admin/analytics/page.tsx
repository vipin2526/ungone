'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service_interested: string | null;
  lead_type: string;
  status: string;
  source_page: string | null;
  created_at: string;
}

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredLeads = () => {
    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return leads.filter(lead => new Date(lead.created_at) >= cutoffDate);
  };

  const filteredLeads = getFilteredLeads();

  // Calculate metrics
  const totalLeads = filteredLeads.length;
  const statusCounts = {
    new: filteredLeads.filter(l => l.status === 'new').length,
    contacted: filteredLeads.filter(l => l.status === 'contacted').length,
    qualified: filteredLeads.filter(l => l.status === 'qualified').length,
    proposal_sent: filteredLeads.filter(l => l.status === 'proposal_sent').length,
    closed_won: filteredLeads.filter(l => l.status === 'closed_won').length,
    closed_lost: filteredLeads.filter(l => l.status === 'closed_lost').length,
  };

  const leadTypeCounts = {
    contact: filteredLeads.filter(l => l.lead_type === 'contact').length,
    audit_request: filteredLeads.filter(l => l.lead_type === 'audit_request').length,
  };

  // Get leads by day for chart
  const getLeadsByDay = () => {
    const days = parseInt(timeRange);
    const data: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const count = filteredLeads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return (
          leadDate.getDate() === date.getDate() &&
          leadDate.getMonth() === date.getMonth() &&
          leadDate.getFullYear() === date.getFullYear()
        );
      }).length;

      data.push({ date: dateStr, count });
    }

    return data;
  };

  const leadsByDay = getLeadsByDay();
  const maxLeadsPerDay = Math.max(...leadsByDay.map(d => d.count), 1);

  // Get top source pages
  const getSourcePageCounts = () => {
    const counts: Record<string, number> = {};
    filteredLeads.forEach(lead => {
      const source = lead.source_page || 'Unknown';
      counts[source] = (counts[source] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topSources = getSourcePageCounts();

  // Calculate conversion rates
  const conversionRate = totalLeads > 0
    ? ((statusCounts.closed_won / totalLeads) * 100).toFixed(1)
    : '0';

  const qualifiedRate = totalLeads > 0
    ? ((statusCounts.qualified / totalLeads) * 100).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-zinc-400">Track your lead performance and metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-2">Total Leads</div>
          <div className="text-3xl font-bold text-white">{totalLeads}</div>
          <div className="text-sm text-zinc-500 mt-1">Last {timeRange} days</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-2">Conversion Rate</div>
          <div className="text-3xl font-bold text-green-500">{conversionRate}%</div>
          <div className="text-sm text-zinc-500 mt-1">
            {statusCounts.closed_won} closed won
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-2">Qualified Rate</div>
          <div className="text-3xl font-bold text-blue-500">{qualifiedRate}%</div>
          <div className="text-sm text-zinc-500 mt-1">
            {statusCounts.qualified} qualified
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-2">Avg per Day</div>
          <div className="text-3xl font-bold text-purple-500">
            {(totalLeads / parseInt(timeRange)).toFixed(1)}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Leads/day</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads Over Time Chart */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Leads Over Time</h2>
          <div className="space-y-2">
            {leadsByDay.map((day) => (
              <div key={day.date} className="flex items-center gap-3">
                <div className="w-20 text-sm text-zinc-400">{day.date}</div>
                <div className="flex-1 bg-zinc-800 rounded-full h-8">
                  <div
                    className="bg-green-600 h-8 rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(day.count / maxLeadsPerDay) * 100}%` }}
                  >
                    {day.count > 0 && (
                      <span className="text-xs font-medium">{day.count}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Type Distribution */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Lead Type Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'Contact', count: leadTypeCounts.contact, color: 'bg-blue-600' },
              { label: 'Audit Request', count: leadTypeCounts.audit_request, color: 'bg-purple-600' },
            ].map((type) => {
              const percentage = totalLeads > 0 ? (type.count / totalLeads) * 100 : 0;
              return (
                <div key={type.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">{type.label}</span>
                    <span className="text-white">{type.count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3">
                    <div
                      className={`${type.color} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Funnel */}
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-8">
        <h2 className="text-xl font-bold mb-4">Lead Status Funnel</h2>
        <div className="space-y-3">
          {[
            { label: 'New', count: statusCounts.new, color: 'bg-blue-600' },
            { label: 'Contacted', count: statusCounts.contacted, color: 'bg-yellow-600' },
            { label: 'Qualified', count: statusCounts.qualified, color: 'bg-purple-600' },
            { label: 'Proposal Sent', count: statusCounts.proposal_sent, color: 'bg-orange-600' },
            { label: 'Closed Won', count: statusCounts.closed_won, color: 'bg-green-600' },
            { label: 'Closed Lost', count: statusCounts.closed_lost, color: 'bg-red-600' },
          ].map((status, index) => {
            const previousCount = index === 0 ? statusCounts.new : 
              [
                statusCounts.new,
                statusCounts.contacted,
                statusCounts.qualified,
                statusCounts.proposal_sent,
                statusCounts.closed_won,
              ][index - 1];
            
            const dropRate = previousCount > 0 && status.count < previousCount
              ? ((1 - status.count / previousCount) * 100).toFixed(0)
              : null;

            return (
              <div key={status.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-400">{status.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{status.count}</span>
                    {dropRate && (
                      <span className="text-xs text-red-400">-{dropRate}%</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-4">
                  <div
                    className={`${status.color} h-4 rounded-full transition-all`}
                    style={{ width: `${totalLeads > 0 ? (status.count / totalLeads) * 100 : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Source Pages */}
      {topSources.length > 0 && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Top Source Pages</h2>
          <div className="space-y-3">
            {topSources.map(([source, count], index) => (
              <div
                key={source}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  <div className="text-sm truncate max-w-md">{source}</div>
                </div>
                <div className="text-sm font-medium">{count} leads</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
