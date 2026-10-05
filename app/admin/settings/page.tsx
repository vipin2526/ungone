'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();

      if (response.ok) {
        setSettings(data.settings || {});
        setNotificationEmail(data.settings?.notification_email || 'ungoneofficial@gmail.com');
        setNotificationsEnabled(data.settings?.notifications_enabled === 'true');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const [emailRes, enabledRes] = await Promise.all([
        fetch('/api/admin/settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'notification_email', value: notificationEmail }),
        }),
        fetch('/api/admin/settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'notifications_enabled', value: notificationsEnabled.toString() }),
        }),
      ]);

      if (emailRes.ok && enabledRes.ok) {
        alert('Settings saved successfully');
        fetchSettings();
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      const response = await fetch('/api/admin/settings/test-email', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Test email sent successfully! Check your inbox.');
      } else {
        alert('Failed to send test email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Failed to send test email');
    }
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
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-zinc-400">Manage your admin panel preferences</p>
      </div>

      <div className="max-w-2xl">
        {/* Notification Settings */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
          <h2 className="text-xl font-bold mb-4">Email Notifications</h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-5 h-5 rounded bg-zinc-800 border-zinc-700 text-green-500 focus:ring-green-500"
                />
                <div>
                  <div className="font-medium">Enable Email Notifications</div>
                  <div className="text-sm text-zinc-400">Receive email alerts when new leads are submitted</div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-400">
                Notification Email
              </label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
              <p className="text-sm text-zinc-500 mt-1">
                This email will receive notifications for new leads
              </p>
            </div>

            <button
              onClick={handleTestEmail}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
            >
              Send Test Email
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 rounded-lg transition-colors font-medium"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
