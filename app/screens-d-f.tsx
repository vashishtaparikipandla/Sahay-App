'use client';
import React, { useState } from 'react';
import {
  Bell, Search, Calendar, Users, Landmark, ArrowRight,
  Briefcase, MapPin, IndianRupee, ShieldCheck, Building2,
  ArrowUpDown, Accessibility, X, Check, Star, AlertTriangle,
  CheckCircle2, ListChecks, Video, Phone, Trash2, ChevronRight, Clock
} from 'lucide-react';
import { useRouter, useApp } from './context';
import {
  BottomNav, TopBar, Btn, Badge, JobCard, EmptyState,
  SkeletonCard, InfoCard, SectionHeader, BottomSheet,
  SettingRow, Toast
} from './components';
import { JOBS, APPLICATIONS } from './data';

// =============================================
//  D1 — HOME DASHBOARD
// =============================================
export function HomeScreen() {
  const { navigate } = useRouter();
  const { state } = useApp();
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [loading] = useState(false);

  const toggleSave = (id: string) =>
    setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const featuredJobs = JOBS.slice(0, 3);

  return (
    <div className="screen screen-with-nav">
      {/* Topbar */}
      <header className="topbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="text-caption text-medium">{greeting}</p>
          <h1 className="text-h3">{state.userName} 👋</h1>
        </div>
        <button
          className="topbar-action"
          onClick={() => navigate('H1_NOTIFICATIONS')}
          aria-label="Notifications"
        >
          <Bell size={22} strokeWidth={2} />
          {state.notifications > 0 && <span className="notification-dot" aria-label={`${state.notifications} unread`} />}
        </button>
      </header>

      {/* Verification banner (if not verified) */}
      {state.verificationStatus !== 'verified' && (
        <button
          className="info-banner"
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
          onClick={() => navigate('B1_VERIFY_INTRO')}
        >
          <AlertTriangle size={14} strokeWidth={2} />
          <span style={{ flex: 1 }}>Complete verification to apply to jobs</span>
          <span style={{ fontWeight: 700 }}>Finish →</span>
        </button>
      )}

      <div className="screen-content" style={{ paddingTop: 20 }}>
        {/* Search */}
        <button
          className="search-input-wrapper"
          style={{ marginBottom: 24, width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'block' }}
          onClick={() => navigate('E1_JOBS')}
          aria-label="Search jobs"
        >
          <div className="search-input-wrapper">
            <Search size={18} strokeWidth={2} className="search-icon" aria-hidden="true" />
            <div className="search-input" style={{ pointerEvents: 'none', color: 'var(--text-disabled)' }}>
              Search jobs, companies…
            </div>
          </div>
        </button>

        {/* Care shortcuts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: <Calendar size={22} strokeWidth={2} />, label: 'Book a session', screen: 'G2_THERAPY_LIST' as const, color: 'var(--surface)' },
            { icon: <Users size={22} strokeWidth={2} />, label: 'Community', screen: 'G6_COMMUNITY' as const, color: 'var(--surface)' },
            { icon: <Landmark size={22} strokeWidth={2} />, label: 'My benefits', screen: 'G9_BENEFITS' as const, color: 'var(--surface)' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.screen)}
              style={{
                background: item.color,
                borderRadius: 'var(--radius-card)',
                padding: '14px 8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                transition: 'transform 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseLeave={e => (e.currentTarget.style.transform = '')}
            >
              <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
              <span className="text-caption" style={{ fontWeight: 700, color: 'var(--text-high)', textAlign: 'center', lineHeight: 1.2 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Continue application card */}
        <div className="card" style={{ marginBottom: 28, borderLeft: '4px solid var(--primary)', cursor: 'pointer' }} onClick={() => navigate('F2_APP_DETAIL')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
              <ListChecks size={20} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="text-body" style={{ fontWeight: 700 }}>TechCorp India — shortlisted!</p>
              <p className="text-caption text-medium">Interview invite expected soon</p>
            </div>
            <ChevronRight size={18} strokeWidth={2} color="var(--text-disabled)" />
          </div>
        </div>

        {/* Recommended jobs */}
        <SectionHeader
          title="Recommended for you"
          action={{ label: 'View all', onClick: () => navigate('E1_JOBS') }}
        />

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {[1, 2].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {featuredJobs.map(job => (
              <JobCard
                key={job.id}
                {...job}
                saved={savedJobs.includes(job.id)}
                onSave={() => toggleSave(job.id)}
                onClick={() => navigate('E3_JOB_DETAIL')}
              />
            ))}
          </div>
        )}

        {/* Recently viewed */}
        <SectionHeader title="Recently viewed" />
        <div className="h-scroll" style={{ marginBottom: 16 }}>
          {JOBS.slice(2, 5).map(job => (
            <div
              key={job.id}
              className="card"
              style={{ minWidth: 200, cursor: 'pointer' }}
              onClick={() => navigate('E3_JOB_DETAIL')}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <div className="job-card-logo" style={{ width: 36, height: 36 }}>
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-body" style={{ fontWeight: 700, fontSize: 13 }}>{job.role}</p>
                  <p className="text-caption text-medium">{job.company}</p>
                </div>
              </div>
              <span className="badge badge-primary">{job.mode}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

// =============================================
//  E1 — JOB SEARCH / LIST
// =============================================
export function JobListScreen() {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [sort, setSort] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading] = useState(false);
  const [viewState] = useState<'default' | 'empty' | 'error'>('default');

  const filters = ['Location', 'Job type', 'Remote', 'Accommodations', 'Salary'];
  const toggleFilter = (f: string) => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleSave = (id: string) => setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const displayed = JOBS.filter(j =>
    !query ||
    j.role.toLowerCase().includes(query.toLowerCase()) ||
    j.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="screen screen-with-nav">
      {/* Search header */}
      <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid var(--surface)', background: 'var(--base)' }}>
        <div className="search-input-wrapper">
          <Search size={18} strokeWidth={2} className="search-icon" aria-hidden="true" />
          <input
            className="search-input"
            placeholder="Search jobs, companies, skills…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search jobs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ position: 'absolute', right: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-disabled)' }}
              aria-label="Clear search"
            >
              <X size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '10px 0', borderBottom: '1px solid var(--surface)' }}>
        <div className="h-scroll" style={{ paddingInline: 16 }}>
          <button
            className={`chip ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(true)}
            aria-label="Open filters"
            style={{ gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          {filters.map(f => (
            <button key={f} className={`chip ${activeFilters.includes(f) ? 'active' : ''}`} onClick={() => toggleFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
        <p className="text-caption text-medium">{displayed.length} jobs found</p>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: 'var(--caption)' }}
          onClick={() => setSort(s => s === 'relevance' ? 'newest' : 'relevance')}
        >
          <ArrowUpDown size={14} strokeWidth={2} />
          {sort === 'relevance' ? 'Relevance' : 'Newest'}
        </button>
      </div>

      <div className="screen-content screen-with-nav" style={{ paddingTop: 0, paddingBottom: 80 }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : viewState === 'empty' || displayed.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={36} strokeWidth={1.5} />}
            title="No jobs match these filters"
            body="Try adjusting your filters or search terms."
            action={<Btn variant="secondary" onClick={() => { setQuery(''); setActiveFilters([]); }}>Clear filters</Btn>}
          />
        ) : viewState === 'error' ? (
          <EmptyState
            icon={<AlertTriangle size={36} strokeWidth={1.5} />}
            title="Something went wrong"
            body="We couldn't load jobs right now."
            action={<Btn onClick={() => {}}>Retry</Btn>}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
            {displayed.map(job => (
              <JobCard
                key={job.id}
                {...job}
                saved={savedJobs.includes(job.id)}
                onSave={() => toggleSave(job.id)}
                onClick={() => navigate('E3_JOB_DETAIL')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filters sheet */}
      <FiltersSheet open={showFilters} onClose={() => setShowFilters(false)} onApply={() => setShowFilters(false)} />

      <BottomNav active="jobs" />
    </div>
  );
}

// =============================================
//  E2 — FILTERS BOTTOM SHEET
// =============================================
function FiltersSheet({ open, onClose, onApply }: { open: boolean; onClose: () => void; onApply: () => void }) {
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [accommodations, setAccommodations] = useState<string[]>([]);

  const toggle = (set: string[], setFn: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    setFn(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const count = jobTypes.length + workMode.length + (verified ? 1 : 0) + accommodations.length;

  if (!open) return null;

  return (
    <div className="sheet-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Job filters">
      <div className="bottom-sheet">
        <div className="sheet-handle" />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className="text-h3">Filters</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close filters">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Job type */}
          <div>
            <p className="text-overline text-medium" style={{ marginBottom: 10 }}>Job type</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Full-time', 'Part-time', 'Contract', 'Apprenticeship', 'Govt. post'].map(t => (
                <button key={t} className={`chip ${jobTypes.includes(t) ? 'active' : ''}`} onClick={() => toggle(jobTypes, setJobTypes, t)}>{t}</button>
              ))}
            </div>
          </div>

          {/* Work mode */}
          <div>
            <p className="text-overline text-medium" style={{ marginBottom: 10 }}>Work mode</p>
            <div className="segment-group">
              {['Remote', 'Hybrid', 'On-site'].map(m => (
                <button key={m} className={`segment-btn ${workMode.includes(m) ? 'active' : ''}`} onClick={() => toggle(workMode, setWorkMode, m)}>{m}</button>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div>
            <p className="text-overline text-medium" style={{ marginBottom: 10 }}>Salary range (LPA)</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <input className="input-field" placeholder="Min" type="number" />
              <input className="input-field" placeholder="Max" type="number" />
            </div>
          </div>

          {/* Accommodations */}
          <div>
            <p className="text-overline text-medium" style={{ marginBottom: 10 }}>Accessibility & accommodations</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Interpreter provided', 'Assistive tech', 'Accessible office', 'Flexible hours', 'Remote-friendly'].map(a => (
                <button key={a} className={`chip ${accommodations.includes(a) ? 'active' : ''}`} onClick={() => toggle(accommodations, setAccommodations, a)}>{a}</button>
              ))}
            </div>
          </div>

          {/* Verified */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="text-body" style={{ fontWeight: 600 }}>Verified employers only</p>
              <p className="text-caption text-medium">Shows only DIPP/NASSCOM verified companies</p>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} />
              <span className="toggle-track" />
              <span className="toggle-thumb" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px 24px', borderTop: '1px solid var(--surface)', display: 'flex', gap: 12 }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={() => { setJobTypes([]); setWorkMode([]); setVerified(false); setAccommodations([]); }}
          >
            Clear all
          </button>
          <Btn style={{ flex: 2 }} onClick={onApply}>
            Show {count > 0 ? `${27 - count * 3} results` : '27 results'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  E3 — JOB DETAIL
// =============================================
export function JobDetailScreen() {
  const { navigate, back } = useRouter();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const job = JOBS[0];

  const tabs = ['About role', 'Requirements', 'Accessibility', 'About company', 'Interview'];
  const tabContent = [
    <p key="about" className="text-body text-medium" style={{ lineHeight: 1.7 }}>{job.description}</p>,
    <ul key="req" style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {job.requirements.map((r, i) => <li key={i} className="text-body text-medium">{r}</li>)}
    </ul>,
    <div key="a11y" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {Object.entries(job.accessibility).map(([k, v]) => (
        <div key={k} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={18} strokeWidth={2.5} color="var(--success)" />
          </div>
          <div>
            <p className="text-caption text-medium" style={{ textTransform: 'capitalize', fontWeight: 600 }}>{k.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-body">{v}</p>
          </div>
        </div>
      ))}
    </div>,
    <div key="company">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <div className="job-card-logo" style={{ width: 56, height: 56, borderRadius: 14 }}><Building2 size={26} strokeWidth={2} /></div>
        <div>
          <p className="text-body" style={{ fontWeight: 700 }}>{job.company}</p>
          <span className="badge badge-verified"><ShieldCheck size={10} strokeWidth={2} /> Verified employer</span>
        </div>
      </div>
      <p className="text-body text-medium">A leading technology company with a strong inclusion programme. 200+ employees with disabilities across India.</p>
    </div>,
    <p key="interview" className="text-body text-medium" style={{ lineHeight: 1.7 }}>{job.interview}</p>,
  ];

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3">Job details</h1>
        <button className="topbar-action" onClick={() => setSaved(!saved)} aria-label={saved ? 'Remove bookmark' : 'Bookmark job'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'var(--primary)' : 'none'} stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </header>

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Company header */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <div className="job-card-logo" style={{ width: 60, height: 60, borderRadius: 16 }}>
            <Building2 size={28} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-h2">{job.role}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <p className="text-body text-medium">{job.company}</p>
              <ShieldCheck size={14} strokeWidth={2} color="var(--success)" />
            </div>
          </div>
        </div>

        {/* Key facts */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="text-body text-medium">
            <MapPin size={14} strokeWidth={2} color="var(--primary)" /> {job.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="text-body text-medium">
            <IndianRupee size={14} strokeWidth={2} color="var(--primary)" /> {job.salary}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="text-body text-medium">
            <Clock size={14} strokeWidth={2} color="var(--primary)" /> {job.type}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          <span className="badge badge-primary">{job.type}</span>
          <span className="badge badge-neutral">{job.mode}</span>
          {job.accommodation && <span className="badge badge-verified"><Accessibility size={10} strokeWidth={2} /> Accessible</span>}
          {job.verified && <span className="badge badge-verified"><ShieldCheck size={10} strokeWidth={2} /> Verified</span>}
          <span className="badge badge-neutral">Posted {job.postedDays}d ago</span>
        </div>

        {/* Tabs */}
        <div className="h-scroll" style={{ marginBottom: 20, gap: 4 }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`chip ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {i === 2 && <Accessibility size={12} strokeWidth={2} />} {tab}
            </button>
          ))}
        </div>

        <div style={{ minHeight: 120 }}>
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Sticky apply bar */}
      <div className="sticky-bottom-bar" style={{ display: 'flex', gap: 12 }}>
        <button
          style={{ width: 48, height: 48, borderRadius: 12, border: '2px solid var(--surface)', background: 'var(--base)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'var(--primary)' : 'none'} stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <Btn onClick={() => navigate('E4_APPLY_CONFIRM')} style={{ flex: 1 }}>Apply now</Btn>
      </div>
    </div>
  );
}

// =============================================
//  E4 — APPLY CONFIRMATION SHEET
// =============================================
export function ApplyConfirmScreen() {
  const { navigate, back } = useRouter();
  const [note, setNote] = useState('');
  const [accommodations] = useState(['Accessible workplace', 'Extended interview time']);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3 topbar-title-center">Review your application</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="screen-content" style={{ paddingTop: 20, paddingBottom: 100 }}>
        {/* Profile preview */}
        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 20, flexShrink: 0 }}>P</div>
          <div>
            <p className="text-body" style={{ fontWeight: 700 }}>Priya Sharma</p>
            <p className="text-caption text-medium">Junior Software Developer • Bengaluru</p>
            <span className="badge badge-verified" style={{ marginTop: 4 }}><ShieldCheck size={10} strokeWidth={2} /> Verified profile</span>
          </div>
        </div>

        {/* Applying to */}
        <div className="card-surface" style={{ marginBottom: 20 }}>
          <p className="text-overline text-medium" style={{ marginBottom: 8 }}>Applying to</p>
          <p className="text-body" style={{ fontWeight: 700 }}>Junior Software Developer</p>
          <p className="text-body text-medium">TechCorp India • Bengaluru</p>
        </div>

        {/* Accommodations */}
        <div style={{ marginBottom: 20 }}>
          <p className="text-h3" style={{ marginBottom: 12 }}>Accommodation requests</p>
          <p className="text-caption text-medium" style={{ marginBottom: 12 }}>These will be shared with the employer. Edit if your needs differ for this role.</p>
          {accommodations.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--surface)' }}>
              <Check size={16} strokeWidth={2.5} color="var(--success)" />
              <span className="text-body">{a}</span>
            </div>
          ))}
        </div>

        {/* Note to employer */}
        <div className="input-group" style={{ marginBottom: 16 }}>
          <label className="input-label" htmlFor="note">Note to employer (optional)</label>
          <textarea
            id="note"
            className="input-field"
            rows={4}
            placeholder="Anything specific you'd like to mention? (max 300 characters)"
            value={note}
            onChange={e => setNote(e.target.value.slice(0, 300))}
            style={{ resize: 'none' }}
          />
          <p className="input-helper">{note.length}/300</p>
        </div>
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn onClick={() => navigate('E5_SUBMITTED')}>
          Submit application
        </Btn>
        <p className="text-caption text-medium text-center">Your profile and accommodations will be shared with TechCorp India.</p>
      </div>
    </div>
  );
}

// =============================================
//  E5 — APPLICATION SUBMITTED
// =============================================
export function ApplicationSubmittedScreen() {
  const { navigate } = useRouter();

  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={56} strokeWidth={1.5} color="var(--success)" />
        </div>
        <div>
          <h1 className="text-h1" style={{ color: 'var(--success)', marginBottom: 12 }}>Application sent!</h1>
          <p className="text-body text-medium" style={{ lineHeight: 1.6 }}>
            TechCorp India will review your application. You'll get a notification when there's an update — usually within 7–14 days.
          </p>
        </div>

        <div className="card-surface" style={{ width: '100%', textAlign: 'left' }}>
          <p className="text-overline text-medium" style={{ marginBottom: 8 }}>What happens next</p>
          {[
            'Employer reviews your profile',
            'You\'ll be notified if shortlisted',
            'Interview invite sent with accommodation details',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < 2 ? 12 : 0 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <p className="text-body">{step}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <Btn onClick={() => navigate('F2_APP_DETAIL')}>Track this application</Btn>
          <Btn variant="secondary" onClick={() => navigate('E1_JOBS')}>Keep browsing jobs</Btn>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  F1 — APPLICATIONS LIST
// =============================================
export function ApplicationsScreen() {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<'active' | 'archived'>('active');

  const active = APPLICATIONS.filter(a => a.status !== 'Not selected');
  const archived = APPLICATIONS.filter(a => a.status === 'Not selected');
  const displayed = tab === 'active' ? active : archived;

  return (
    <div className="screen screen-with-nav">
      <header className="topbar">
        <div style={{ width: 40 }} />
        <h1 className="topbar-title text-h3 topbar-title-center">My applications</h1>
        <div style={{ width: 40 }} />
      </header>

      <div style={{ padding: '8px 16px', background: 'var(--base)' }}>
        <div className="segment-group">
          <button className={`segment-btn ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>
            Active ({active.length})
          </button>
          <button className={`segment-btn ${tab === 'archived' ? 'active' : ''}`} onClick={() => setTab('archived')}>
            Archived ({archived.length})
          </button>
        </div>
      </div>

      <div className="screen-content screen-with-nav" style={{ paddingTop: 16, paddingBottom: 80 }}>
        {displayed.length === 0 ? (
          <EmptyState
            icon={<ListChecks size={36} strokeWidth={1.5} />}
            title="No applications yet"
            body="Jobs you apply to will appear here."
            action={<Btn onClick={() => navigate('E1_JOBS')}>Browse jobs</Btn>}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayed.map(app => (
              <button
                key={app.id}
                className="card"
                style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', background: 'var(--base)', border: 'none', textAlign: 'left', width: '100%' }}
                onClick={() => navigate('F2_APP_DETAIL')}
              >
                <div className="job-card-logo" style={{ width: 44, height: 44 }}>
                  <img src={app.logo} alt={app.company} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="text-body" style={{ fontWeight: 700 }}>{app.role}</p>
                  <p className="text-caption text-medium" style={{ marginBottom: 6 }}>{app.company}</p>
                  <span className={`badge badge-${app.statusVariant}`}>{app.status}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <p className="text-caption text-disabled">{app.lastUpdate}</p>
                  <ChevronRight size={16} strokeWidth={2} color="var(--text-disabled)" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="applications" />
    </div>
  );
}

// =============================================
//  F2 — APPLICATION DETAIL / TIMELINE
// =============================================
export function AppDetailScreen() {
  const { navigate, back } = useRouter();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const app = APPLICATIONS[0];

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3">Application</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Header */}
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <div className="job-card-logo" style={{ width: 52, height: 52 }}>
            <img src={app.logo} alt={app.company} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-body" style={{ fontWeight: 700 }}>{app.role}</p>
            <p className="text-caption text-medium">{app.company}</p>
            <span className={`badge badge-${app.statusVariant}`} style={{ marginTop: 6, display: 'inline-flex' }}>{app.status}</span>
          </div>
        </div>

        <h2 className="text-h3" style={{ marginBottom: 20 }}>Application timeline</h2>

        {/* Timeline */}
        <div className="timeline">
          {app.timeline.map((step, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-left">
                <div className={`timeline-dot ${step.active ? 'active' : step.done ? 'done' : ''}`}>
                  {step.done
                    ? <Check size={14} strokeWidth={2.5} />
                    : <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', opacity: 0.4 }} />
                  }
                </div>
                {i < app.timeline.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <p className="text-body" style={{ fontWeight: step.active ? 700 : 500 }}>{step.status}</p>
                <p className="text-caption text-medium">{step.date}</p>
                {step.note && <p className="text-caption text-medium" style={{ marginTop: 4 }}>{step.note}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Interview CTA */}
        {app.status === 'Shortlisted' && (
          <div className="card" style={{ marginTop: 24, borderLeft: '4px solid var(--accent)' }}>
            <p className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Interview invite incoming</p>
            <p className="text-caption text-medium" style={{ marginBottom: 12 }}>You'll get a notification when TechCorp India sends available slots.</p>
            <Btn onClick={() => navigate('F3_INTERVIEW')} size="sm" style={{ width: 'auto' }}>
              Preview interview scheduler
            </Btn>
          </div>
        )}
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: 'var(--body)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}
          onClick={() => setShowWithdraw(true)}
        >
          <Trash2 size={16} strokeWidth={2} /> Withdraw application
        </button>
      </div>

      {/* Withdraw confirm */}
      {showWithdraw && (
        <div className="sheet-overlay" onClick={() => setShowWithdraw(false)} role="dialog" aria-modal="true">
          <div className="modal">
            <h3 className="text-h3" style={{ marginBottom: 12 }}>Withdraw this application?</h3>
            <p className="text-body text-medium" style={{ marginBottom: 20 }}>This can't be undone. You can always apply again when the role reopens.</p>
            <div className="input-group" style={{ marginBottom: 20 }}>
              <label className="input-label">Reason (optional)</label>
              <select className="input-field">
                <option value="">Select a reason…</option>
                <option>Accepted another offer</option>
                <option>Role no longer suitable</option>
                <option>Personal reasons</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="secondary" onClick={() => setShowWithdraw(false)} style={{ flex: 1 }}>Cancel</Btn>
              <Btn variant="danger" onClick={() => { setShowWithdraw(false); navigate('F1_APPLICATIONS'); }} style={{ flex: 1 }} icon={<Trash2 size={16} strokeWidth={2} />}>
                Withdraw
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================
//  F3 — INTERVIEW SCHEDULING
// =============================================
export function InterviewScheduleScreen() {
  const { navigate, back } = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [noSlots, setNoSlots] = useState(false);

  const slots = [
    { date: 'Mon, 28 Jul', time: '10:00 AM', mode: 'Video' },
    { date: 'Mon, 28 Jul', time: '2:00 PM', mode: 'Video' },
    { date: 'Tue, 29 Jul', time: '11:00 AM', mode: 'In-person' },
    { date: 'Wed, 30 Jul', time: '3:00 PM', mode: 'Video' },
  ];

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3">Choose a slot</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="screen-content" style={{ paddingTop: 20, paddingBottom: 100 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Schedule your interview</h1>
        <p className="text-body text-medium" style={{ marginBottom: 8 }}>TechCorp India — Junior Software Developer</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <span className="badge badge-primary"><Video size={10} strokeWidth={2} /> Video available</span>
          <span className="badge badge-verified">Interpreter on request</span>
        </div>

        {/* Accommodations confirm */}
        <div className="card-border" style={{ marginBottom: 24 }}>
          <p className="text-caption text-medium" style={{ fontWeight: 700, marginBottom: 8 }}>Your accommodation requests</p>
          {['Extended interview time (60 min)', 'Video format preferred', 'Sign language interpreter'].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <Check size={14} strokeWidth={2.5} color="var(--success)" />
              <span className="text-body">{a}</span>
            </div>
          ))}
        </div>

        {/* Slots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {slots.map((slot, i) => (
            <button
              key={i}
              className="card-border"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', background: selected === `${i}` ? 'var(--primary-light)' : 'var(--base)',
                borderColor: selected === `${i}` ? 'var(--primary)' : 'var(--surface)',
                transition: 'all 150ms',
              }}
              onClick={() => setSelected(`${i}`)}
              aria-pressed={selected === `${i}`}
            >
              <div>
                <p className="text-body" style={{ fontWeight: 700 }}>{slot.date} • {slot.time}</p>
                <span className="badge badge-neutral" style={{ marginTop: 4 }}>
                  {slot.mode === 'Video' ? <><Video size={10} strokeWidth={2} /> Video</> : <><MapPin size={10} strokeWidth={2} /> In-person</>}
                </span>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${selected === `${i}` ? 'var(--primary)' : 'var(--surface)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selected === `${i}` && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />}
              </div>
            </button>
          ))}
        </div>

        <button
          style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-medium)', fontSize: 'var(--body)', textDecoration: 'underline' }}
          onClick={() => setNoSlots(true)}
        >
          None of these work for me
        </button>

        {noSlots && (
          <div className="card-border" style={{ marginTop: 16 }}>
            <p className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Request a reschedule</p>
            <textarea className="input-field" rows={3} placeholder="Describe your availability and we'll pass it along…" style={{ resize: 'none' }} />
            <div style={{ marginTop: 12 }}>
              <Btn size="sm" onClick={() => setNoSlots(false)}>Send reschedule request</Btn>
            </div>
          </div>
        )}
      </div>

      <div className="sticky-bottom-bar">
        <Btn disabled={!selected} onClick={() => navigate('F2_APP_DETAIL')}>
          Confirm slot
        </Btn>
      </div>
    </div>
  );
}
