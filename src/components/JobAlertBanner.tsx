import React, { useState, useEffect } from 'react';
import { JobAlertSubscription, SubscriptionSimulation } from '../types';
import {
  getSubscriptions,
  createSubscription,
  deleteSubscription,
  simulateSubscriptionNotification,
} from '../services/api';
import {
  BellRing,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Trash2,
  X,
  Clock,
  Filter,
  Eye,
  Zap,
  Check,
} from 'lucide-react';

interface JobAlertBannerProps {
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const JobAlertBanner: React.FC<JobAlertBannerProps> = ({ onToast }) => {
  const [email, setEmail] = useState('');
  const [keywords, setKeywords] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'instant'>('daily');
  const [submitting, setSubmitting] = useState(false);
  const [subscriptions, setSubscriptions] = useState<JobAlertSubscription[]>([]);
  const [showManageModal, setShowManageModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SubscriptionSimulation | null>(null);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      // silent fallback
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onToast('error', 'Please enter a valid email address.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await createSubscription({
        email,
        keywords: keywords || 'All Roles',
        frequency,
      });

      onToast('success', res.message || `Subscribed ${email} to job alerts!`);
      setEmail('');
      setKeywords('');
      await fetchSubscriptions();
    } catch (err: any) {
      onToast('error', err.message || 'Failed to subscribe.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnsubscribe = async (id: string, subEmail: string) => {
    try {
      await deleteSubscription(id);
      onToast('info', `Unsubscribed ${subEmail} from job alerts.`);
      setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      onToast('error', err.message || 'Failed to unsubscribe.');
    }
  };

  const handleSimulateAlert = async (id: string) => {
    try {
      setSimulatingId(id);
      const sim = await simulateSubscriptionNotification(id);
      setSimulationResult(sim);
      onToast('success', `Simulated alert sent to ${sim.recipient}!`);
    } catch (err: any) {
      onToast('error', err.message || 'Simulation failed.');
    } finally {
      setSimulatingId(null);
    }
  };

  return (
    <div className="theme-card rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[var(--primary)]/20 my-6">
      {/* Background Accent Mesh */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Banner Copy */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold">
            <BellRing className="w-3.5 h-3.5" />
            <span>Job Alert Notifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black theme-text-heading">
            Subscribe to Custom Job Alerts
          </h2>
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
            Never miss an opportunity. Get real-time job notifications matched to your email preferences and keywords delivered to your inbox.
          </p>
        </div>

        {/* Action / Quick Form */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full lg:w-auto"
          >
            <div className="relative flex-grow sm:w-64">
              <Mail className="w-4 h-4 text-[var(--primary)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl theme-input border font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>

            <div className="relative sm:w-40">
              <Filter className="w-3.5 h-3.5 text-[var(--primary)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Keywords (e.g. React)"
                className="w-full pl-8 pr-3 py-2.5 text-xs rounded-xl theme-input border font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              className="py-2.5 px-3 text-xs rounded-xl theme-input border font-medium appearance-none cursor-pointer"
            >
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
              <option value="instant">Instant Alerts</option>
            </select>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 theme-primary-btn text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>

          {/* Manage Button */}
          <button
            onClick={() => {
              fetchSubscriptions();
              setShowManageModal(true);
            }}
            className="px-4 py-2.5 theme-secondary-btn text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Subscriptions ({subscriptions.length})</span>
          </button>
        </div>
      </div>

      {/* Subscriptions Management Modal */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="theme-card rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-bold theme-text-heading">Active Job Alert Preferences</h3>
              </div>
              <button
                onClick={() => setShowManageModal(false)}
                className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-xs theme-text-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {subscriptions.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Mail className="w-10 h-10 theme-text-muted mx-auto" />
                <p className="text-sm font-semibold theme-text-heading">No Active Subscriptions</p>
                <p className="text-xs theme-text-muted">
                  Use the subscription bar above to receive job alerts.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold theme-text-heading text-sm">{sub.email}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--primary-light)] text-[var(--primary)] capitalize">
                          {sub.frequency}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs theme-text-muted">
                        <span>Keywords: <strong className="theme-text-heading">{sub.keywords || 'All Roles'}</strong></span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Subscribed: {sub.subscribedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-main)]">
                      <button
                        onClick={() => handleSimulateAlert(sub.id)}
                        disabled={simulatingId === sub.id}
                        className="px-3 py-1.5 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Simulate dispatching a job alert email"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {simulatingId === sub.id ? 'Sending...' : 'Test Simulation'}
                      </button>

                      <button
                        onClick={() => handleUnsubscribe(sub.id, sub.email)}
                        className="p-1.5 rounded-lg hover:bg-[#EF4444]/20 text-[#EF4444] transition-colors cursor-pointer"
                        title="Unsubscribe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-[var(--border-main)] flex justify-end">
              <button
                onClick={() => setShowManageModal(false)}
                className="px-4 py-2 theme-secondary-btn rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Email Notification Preview Popup */}
      {simulationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="theme-card rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border-2 border-[var(--primary)] relative">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold theme-text-heading">Job Alert Email Dispatch Simulated</h3>
                  <p className="text-[11px] theme-text-muted">Triggered via POST /api/subscriptions/:id/notify</p>
                </div>
              </div>
              <button
                onClick={() => setSimulationResult(null)}
                className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-xs theme-text-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Header Mock */}
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="theme-text-muted">To:</span>
                <span className="font-bold theme-text-heading">{simulationResult.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="theme-text-muted">Subject:</span>
                <span className="font-semibold text-[var(--primary)]">
                  🔔 CareerPilot {simulationResult.frequency} Job Digest ({simulationResult.matchingCount} matches)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="theme-text-muted">Filter criteria:</span>
                <span className="font-mono">{simulationResult.keywords}</span>
              </div>
            </div>

            {/* Simulated Email Body preview */}
            <div className="space-y-2">
              <p className="text-xs font-bold theme-text-heading">Matched Opportunities Preview:</p>
              <div className="space-y-2">
                {simulationResult.sampleJobs.map((job) => (
                  <div key={job.id} className="p-3 rounded-lg border border-[var(--border-main)] text-xs space-y-1">
                    <div className="flex justify-between font-bold theme-text-heading">
                      <span>{job.title}</span>
                      <span className="text-[var(--primary)]">{job.salary}</span>
                    </div>
                    <p className="theme-text-muted text-[11px]">{job.company} &bull; {job.location}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-main)] flex justify-end">
              <button
                onClick={() => setSimulationResult(null)}
                className="px-4 py-2 theme-primary-btn text-xs font-semibold rounded-xl cursor-pointer"
              >
                Done Previewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
