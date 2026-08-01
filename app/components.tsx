'use client';
import React, { useState } from 'react';
import { useRouter } from './context';
import {
  Home, Briefcase, ListChecks, User,
  ChevronLeft, Bell, Search, MoreVertical,
  Bot, Sparkles, Send, Mic, Paperclip, X, Trash2,
  Volume2, Flag, Play, Pause, Square, AlertTriangle, Check
} from 'lucide-react';

// =============================================
//  TOP APP BAR
// =============================================
interface TopBarProps {
  title?: React.ReactNode;
  showBack?: boolean;
  centerTitle?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  variant?: 'tabRoot' | 'detail';
}

// Sahay logo mark — small inline SVG
function SahayMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="48" height="48" rx="12" fill="#2563EB" />
      <path d="M18 24l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 14v3M24 31v3M14 24h3M31 24h3" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function AppHeader({ title, showBack = true, centerTitle, rightAction, transparent, variant = 'detail' }: TopBarProps) {
  const { back } = useRouter();
  return (
    <header
      className="topbar"
      style={transparent ? { background: 'transparent', borderBottom: 'none' } : undefined}
    >
      {variant === 'tabRoot' && <SahayMark />}
      {showBack && variant === 'detail' ? (
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      ) : (
        <div style={{ width: variant === 'tabRoot' ? 8 : 40 }} />
      )}
      {title && (
        <h1
          className={`topbar-title text-h3 ${centerTitle ? 'topbar-title-center' : ''}`}
        >
          {title}
        </h1>
      )}
      {rightAction || <div style={{ width: 40 }} />}
    </header>
  );
}

export const TopBar = AppHeader;

// =============================================
//  BOTTOM NAVIGATION
// =============================================
type NavTab = 'home' | 'jobs' | 'applications' | 'disha' | 'profile';

interface BottomNavProps {
  active: NavTab;
}

export function BottomNav({ active }: BottomNavProps) {
  const { navigate } = useRouter();

  const tabs: { id: NavTab; label: string; icon: React.ReactNode; screen: Parameters<typeof navigate>[0] }[] = [
    { id: 'home',         label: 'Home',     icon: <Home size={22} strokeWidth={2} />,     screen: 'D1_HOME' },
    { id: 'jobs',         label: 'Jobs',     icon: <Briefcase size={22} strokeWidth={2} />, screen: 'E1_JOBS' },
    { id: 'applications', label: 'Applied',  icon: <ListChecks size={22} strokeWidth={2} />, screen: 'F1_APPLICATIONS' },
    { id: 'disha',        label: 'Disha',    icon: <Bot size={22} strokeWidth={2} />,       screen: 'N1_DISHA' },
    { id: 'profile',      label: 'Profile',  icon: <User size={22} strokeWidth={2} />,      screen: 'I1_PROFILE' },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${active === tab.id ? 'active' : ''}`}
          onClick={() => navigate(tab.screen)}
          aria-label={tab.label}
          aria-current={active === tab.id ? 'page' : undefined}
        >
          {tab.icon}
          <span className="nav-item-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

// =============================================
//  PRIMARY BUTTON
// =============================================
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'default' | 'sm';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Btn({ variant = 'primary', size, loading, icon, children, className, disabled, ...props }: BtnProps) {
  return (
    <button
      className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={`spinner ${variant === 'primary' ? 'spinner-white' : ''}`} aria-hidden="true" />
      ) : icon}
      {children}
    </button>
  );
}

// =============================================
//  STATUS BADGE
// =============================================
type BadgeVariant = 'verified' | 'pending' | 'action' | 'info' | 'primary' | 'neutral' | 'accent';

interface BadgeProps {
  variant: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  large?: boolean;
}

export function Badge({ variant, icon, children, large }: BadgeProps) {
  return (
    <span
      className={`badge badge-${variant}`}
      style={large ? { padding: '6px 14px', fontSize: 'var(--body)' } : undefined}
    >
      {icon}
      {children}
    </span>
  );
}

// =============================================
//  INPUT
// =============================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({ label, helper, error, leftIcon, id, className, ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label className="input-label" htmlFor={id}>{label}</label>}
      <div className={leftIcon ? 'input-with-icon' : undefined}>
        {leftIcon && <span className="input-icon" aria-hidden="true">{leftIcon}</span>}
        <input
          id={id}
          className={`input-field ${error ? 'has-error' : ''} ${className || ''}`}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          aria-invalid={!!error}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="input-error" role="alert">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
      {helper && !error && (
        <p id={`${id}-helper`} className="input-helper">{helper}</p>
      )}
    </div>
  );
}

// =============================================
//  OTP INPUT
// =============================================
interface OTPInputProps {
  value: string[];
  onChange: (val: string[]) => void;
  hasError?: boolean;
}

export function OTPInput({ value, onChange, hasError }: OTPInputProps) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[i] = char;
    onChange(next);
    if (char && i < 5) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = Array(6).fill('');
    text.split('').forEach((c, i) => { next[i] = c; });
    onChange(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div className="otp-wrapper" onPaste={handlePaste}>
      {Array(6).fill(0).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          className={`otp-box ${value[i] ? 'has-value' : ''} ${hasError ? 'shake' : ''}`}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKey(i, e)}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

// =============================================
//  PROGRESS STEPPER (bar style)
// =============================================
interface StepperProps {
  current: number;
  total: number;
  label?: string;
}

export function Stepper({ current, total, label }: StepperProps) {
  return (
    <div className="stepper-bar">
      <span className="stepper-bar-label text-caption text-medium">
        {label || `Step ${current} of ${total}`}
      </span>
      <div className="stepper-bar-track" aria-hidden="true">
        <div
          className="stepper-bar-fill"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

// =============================================
//  EMPTY STATE
// =============================================
interface EmptyStateProps {
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  title: string;
  body?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, illustration, title, body, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {illustration || (
        <div className="empty-state-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h2 className="text-h3 text-center">{title}</h2>
      {body && <p className="text-body text-medium text-center">{body}</p>}
      {action}
    </div>
  );
}

// =============================================
//  TOAST
// =============================================
interface ToastProps {
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  icon?: React.ReactNode;
}

export function Toast({ message, variant = 'default', icon }: ToastProps) {
  return (
    <div className="toast-container">
      <div className={`toast ${variant !== 'default' ? `toast-${variant}` : ''}`} role="status" aria-live="polite">
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{message}</span>
      </div>
    </div>
  );
}

// =============================================
//  BOTTOM SHEET WRAPPER
// =============================================
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modal?: boolean;
}

export function BottomSheet({ open, onClose, children, modal }: BottomSheetProps) {
  if (!open) return null;
  return (
    <div
      className={`sheet-overlay ${modal ? 'centered' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      {modal ? (
        <div className="modal">{children}</div>
      ) : (
        <div className="bottom-sheet">
          <div className="sheet-handle" aria-hidden="true" />
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================
//  JOB CARD
// =============================================
interface JobCardProps {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  mode: string;
  verified?: boolean;
  logo?: string;
  saved?: boolean;
  onSave?: () => void;
  onClick: () => void;
  accommodation?: boolean;
}

export function JobCard({
  role, company, location, salary, type, mode,
  verified, logo, saved, onSave, onClick, accommodation
}: JobCardProps) {
  const { Bookmark, Building2, MapPin, IndianRupee, ShieldCheck, Accessibility } = require('lucide-react');
  return (
    <div className="job-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="flex gap-3 items-start">
        <div className="job-card-logo">
          {logo
            ? <img src={logo} alt={company} />
            : <Building2 size={22} strokeWidth={2} />
          }
        </div>
        <div className="flex-1">
          <div className="job-card-title">{role}</div>
          <div className="job-card-company">
            {company}
            {verified && (
              <span style={{ marginLeft: 6, color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <ShieldCheck size={12} strokeWidth={2} />
              </span>
            )}
          </div>
        </div>
        <button
          className={`job-card-bookmark ${saved ? 'saved' : ''}`}
          onClick={e => { e.stopPropagation(); onSave?.(); }}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark this job'}
        >
          <Bookmark size={18} strokeWidth={2} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="job-card-meta">
        <span className="job-card-meta-item">
          <MapPin size={12} strokeWidth={2} />
          {location}
        </span>
        <span className="job-card-meta-item">
          <IndianRupee size={12} strokeWidth={2} />
          {salary}
        </span>
      </div>
      <div className="job-card-tags">
        <span className="badge badge-primary">{type}</span>
        <span className="badge badge-neutral">{mode}</span>
        {accommodation && (
          <span className="badge badge-verified">
            <Accessibility size={10} strokeWidth={2} /> Accessible
          </span>
        )}
        {verified && (
          <span className="badge badge-verified">
            <ShieldCheck size={10} strokeWidth={2} /> Verified employer
          </span>
        )}
      </div>
    </div>
  );
}

// =============================================
//  SKELETON LOADER
// =============================================
export function SkeletonCard() {
  return (
    <div className="card" style={{ gap: 12, display: 'flex', flexDirection: 'column' }}>
      <div className="flex gap-3 items-center">
        <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 10 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
      </div>
      <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      <div className="flex gap-2">
        <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 99 }} />
        <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 99 }} />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array(lines).fill(0).map((_, i) => (
        <div
          key={i}
          className="skeleton skeleton-text"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

// =============================================
//  NO INTERNET BANNER
// =============================================
export function NoInternetBanner() {
  const { WifiOff } = require('lucide-react');
  return (
    <div className="info-banner error-banner" role="alert">
      <WifiOff size={14} strokeWidth={2} aria-hidden="true" />
      <span>You're offline — some features are limited</span>
    </div>
  );
}

// =============================================
//  VERIFICATION BANNER (persists on home)
// =============================================
export function VerificationBanner({ onComplete }: { onComplete: () => void }) {
  const { AlertTriangle } = require('lucide-react');
  return (
    <button
      className="info-banner"
      style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
      onClick={onComplete}
      aria-label="Complete your verification"
    >
      <AlertTriangle size={14} strokeWidth={2} aria-hidden="true" />
      <span style={{ flex: 1 }}>Complete verification to apply to jobs</span>
      <span style={{ fontWeight: 700, textDecoration: 'underline' }}>Finish →</span>
    </button>
  );
}

// =============================================
//  INFO CARD (inline notice)
// =============================================
interface InfoCardProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'error';
}

export function InfoCard({ icon, children, variant = 'info' }: InfoCardProps) {
  const colorMap: Record<string, string> = {
    info: 'var(--info-light)',
    warning: 'var(--warning-light)',
    success: 'var(--success-light)',
    error: 'var(--error-light)',
  };
  const textMap: Record<string, string> = {
    info: 'var(--info)',
    warning: 'var(--warning)',
    success: 'var(--success)',
    error: 'var(--error)',
  };
  return (
    <div
      className="card-border"
      style={{
        background: colorMap[variant],
        color: textMap[variant],
        display: 'flex',
        gap: 'var(--sp-3)',
        alignItems: 'flex-start',
        padding: 'var(--sp-3)',
      }}
    >
      <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <p className="text-body" style={{ color: 'inherit' }}>{children}</p>
    </div>
  );
}

// =============================================
//  SECTION HEADER
// =============================================
interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-h3">{title}</h2>
      {action && (
        <button
          className="btn-ghost btn btn-sm"
          style={{ width: 'auto', padding: '4px 8px' }}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// =============================================
//  TOGGLE ROW
// =============================================
interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}

export function ToggleRow({ label, description, checked, onChange, id }: ToggleRowProps) {
  return (
    <div className="toggle-wrapper" style={{ padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--surface)' }}>
      <div>
        <label htmlFor={id} className="text-body" style={{ fontWeight: 600, cursor: 'pointer' }}>{label}</label>
        {description && <p className="text-caption text-medium">{description}</p>}
      </div>
      <label className="toggle" htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-track" />
        <span className="toggle-thumb" />
      </label>
    </div>
  );
}

// =============================================
//  SETTING ROW
// =============================================
interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  chevron?: boolean;
  danger?: boolean;
  badge?: React.ReactNode;
}

export function SettingRow({ icon, label, description, onClick, chevron = true, danger, badge }: SettingRowProps) {
  const { ChevronRight } = require('lucide-react');
  return (
    <button
      className="setting-row"
      onClick={onClick}
      style={{ background: 'transparent', border: 'none', width: '100%' }}
    >
      <div className="setting-row-icon" aria-hidden="true" style={danger ? { background: 'var(--error-light)', color: 'var(--error)' } : undefined}>
        {icon}
      </div>
      <div className="setting-row-content" style={{ textAlign: 'left' }}>
        <div className="setting-row-label" style={danger ? { color: 'var(--error)' } : undefined}>{label}</div>
        {description && <div className="setting-row-desc">{description}</div>}
      </div>
      {badge}
      {chevron && <ChevronRight size={18} strokeWidth={2} color="var(--text-disabled)" aria-hidden="true" />}
    </button>
  );
}

// =============================================
//  AVATAR
// =============================================
interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`avatar avatar-${size}`} aria-hidden="true">
      {src
        ? <img src={src} alt={name || 'Profile'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        : <span style={{ fontSize: size === 'sm' ? 10 : size === 'md' ? 14 : 20, fontWeight: 700, color: 'var(--text-medium)' }}>{initials}</span>
      }
    </div>
  );
}

// =============================================
//  ACCORDION ITEM
// =============================================
interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = React.useState(false);
  const { ChevronDown, ChevronUp } = require('lucide-react');
  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        {open
          ? <ChevronUp size={18} strokeWidth={2} color="var(--primary)" aria-hidden="true" />
          : <ChevronDown size={18} strokeWidth={2} color="var(--text-disabled)" aria-hidden="true" />
        }
      </button>
      {open && <div className="accordion-body">{answer}</div>}
    </div>
  );
}

// =============================================
//  STAR RATING
// =============================================
export function StarRating({ rating, count }: { rating: number; count?: number }) {
  const { Star } = require('lucide-react');
  return (
    <div className="flex items-center gap-1">
      <div className="star-row">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={2}
            fill={i < Math.round(rating) ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <span className="text-caption text-medium">{rating.toFixed(1)}{count ? ` (${count})` : ''}</span>
    </div>
  );
}

// =============================================
//  FILL WITH AI OVERLAY
// =============================================
interface FillWithAIProps {
  pageTitle: string;
  fields: string[];
  onFill: (values: Record<string, string>) => void;
}

export function FillWithAIButton({ pageTitle, fields, onFill }: FillWithAIProps) {
  const [open, setOpen] = useState(false);

  const handleFill = (values: Record<string, string>) => {
    onFill(values);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Fill with AI"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid var(--primary)',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <Sparkles size={14} />
        Fill with AI
      </button>
      {open && <FillWithAIOverlay pageTitle={pageTitle} fields={fields} onClose={() => setOpen(false)} onFill={handleFill} />}
    </>
  );
}

function FillWithAIOverlay({ pageTitle, fields, onClose, onFill }: FillWithAIProps & { onClose: () => void }) {
  const isDemo = pageTitle.toLowerCase().includes('experience');
  
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>(() => {
    if (isDemo) {
      return [{ role: 'ai', text: "Let's fill in your work experience — tell me about your most recent job, or just say 'I haven't worked before' if this is your first role." }];
    }
    return [{ role: 'ai', text: `Hi! I'll help you fill in the ${pageTitle} fields. Let's go through them together. What's your ${fields[0]}?` }];
  });
  
  const [input, setInput] = useState('');
  const [fieldIdx, setFieldIdx] = useState(0);
  const [collected, setCollected] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text: text.trim() };
    
    if (isDemo) {
      if (demoStep === 0) {
        setMessages(m => [...m, userMsg, { role: 'ai', text: "Got it — Barista at Café Coffee Day, roughly 2021 to 2023. Do you have anything like an offer letter or a payslip from that job? You can skip this if not." }]);
        setDemoStep(1);
      } else if (demoStep === 1) {
        setMessages(m => [...m, userMsg, { role: 'ai', text: "Any other previous roles, or is that the only one?" }]);
        setDemoStep(2);
      } else if (demoStep === 2) {
        setMessages(m => [...m, userMsg, { role: 'ai', text: "Great — here's what I've got for you." }]);
        setCollected({
          'Job title': 'Barista',
          'Company': 'Café Coffee Day',
          'From': 'Jan 2021',
          'To': 'Dec 2023'
        });
        setDone(true);
      }
      setInput('');
      return;
    }

    const newCollected = { ...collected, [fields[fieldIdx]]: text.trim() };
    setCollected(newCollected);
    const nextIdx = fieldIdx + 1;

    if (nextIdx >= fields.length) {
      setMessages(m => [...m, userMsg, { role: 'ai', text: `Got it! I've filled in all the fields. Check them over and make any corrections, then tap Continue.` }]);
      setDone(true);
    } else {
      setMessages(m => [...m, userMsg, { role: 'ai', text: `Got it. Now, what's your ${fields[nextIdx]}?` }]);
      setFieldIdx(nextIdx);
    }
    setInput('');
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--base)',
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--surface)', flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={16} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-high)' }}>Fill with AI</div>
          <div style={{ fontSize: 12, color: 'var(--text-medium)' }}>{pageTitle}</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text-medium)' }}>
          <X size={20} />
        </button>
      </header>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'ai' && (
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, flexShrink: 0, alignSelf: 'flex-end' }}>
                <Sparkles size={14} color="white" />
              </div>
            )}
            <div style={{
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
              color: msg.role === 'user' ? 'white' : 'var(--text-high)',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              maxWidth: '80%',
              fontSize: 14,
              lineHeight: 1.5,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {done && (
          <button
            onClick={() => onFill(collected)}
            style={{ marginTop: 8, background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 14 }}
          >
            Apply to form
          </button>
        )}
      </div>

      {/* Composer */}
      {!done && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--surface)', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your answer..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: 24, border: '1px solid var(--surface)', background: 'var(--surface)', fontSize: 14, outline: 'none' }}
          />
          <button
            onClick={() => handleSend(input)}
            aria-label="Send"
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <Send size={16} color="white" />
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================
//  CONVERSATIONAL BUBBLE
// =============================================
export function ConversationalBubble({
  isUser,
  message,
  options,
  onOptionSelect,
}: {
  isUser?: boolean;
  message: string;
  options?: string[];
  onOptionSelect?: (opt: string) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 16
    }}>
      <div style={{
        background: isUser ? 'var(--primary)' : 'var(--surface)',
        color: isUser ? 'white' : 'var(--text-main)',
        padding: '12px 16px',
        borderRadius: 16,
        borderBottomRightRadius: isUser ? 4 : 16,
        borderBottomLeftRadius: isUser ? 16 : 4,
        maxWidth: '85%'
      }}>
        {message}
      </div>
      {options && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onOptionSelect && onOptionSelect(opt)}
              style={{
                border: '1px solid var(--border)',
                background: 'white',
                padding: '8px 12px',
                borderRadius: 20,
                fontSize: 14
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
//  REPEATABLE ENTRY CARD
// =============================================
interface RepeatableEntryCardProps {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function RepeatableEntryCard({ title, onRemove, children }: RepeatableEntryCardProps) {
  return (
    <div className="card-border" style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span className="text-caption text-medium" style={{ fontWeight: 700 }}>{title}</span>
        {onRemove && (
          <button onClick={onRemove} aria-label="Remove this entry" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}>
            <Trash2 size={16} strokeWidth={2} />
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

// =============================================
//  DISHA AI FAB
// =============================================
export function DishaFAB({ pageTitle, fields, onFill }: FillWithAIProps) {
  const [open, setOpen] = useState(false);

  const handleFill = (values: Record<string, string>) => {
    onFill(values);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Fill with Disha"
        style={{
          position: 'absolute',
          top: '10px',
          right: '16px',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid var(--primary)',
          background: 'var(--base)',
          color: 'var(--primary)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Sparkles size={14} />
        Auto-fill
      </button>
      {open && <FillWithAIOverlay pageTitle={pageTitle} fields={fields} onClose={() => setOpen(false)} onFill={handleFill} />}
    </>
  );
}

// =============================================
//  TRUST & ACCESSIBILITY (PATCH v2)
// =============================================

const JARGON_GLOSSARY: Record<string, string> = {
  'CTC': 'Cost to Company: The total salary package including benefits and taxes.',
  'Notice period': 'The time you must continue working after resigning before you can leave.',
  'Onboarding': 'The process of welcoming and training a new employee.',
  'KRA': 'Key Result Areas: The specific goals you are expected to achieve.',
  'WFH': 'Work From Home: Doing your job from your house instead of the office.',
  'ESOP': 'Employee Stock Ownership Plan: Company shares given to employees.',
  'Probation': 'A trial period at the start of a job to check if you are a good fit.',
  'PF': 'Provident Fund: A retirement savings account funded by you and your employer.',
  'ESIC': 'Employee State Insurance Corporation: Health insurance for employees.',
  'Variable pay': 'A bonus part of your salary based on performance.',
  'Background verification': 'A check on your past employment, criminal record, and education.',
};

export function JargonText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // Sort terms by length descending for longest-match rule
  const terms = Object.keys(JARGON_GLOSSARY).sort((a, b) => b.length - a.length);

  // A very basic regex approach to find jargon without splitting words.
  // In a robust implementation, this would parse text nodes properly.
  let elements: React.ReactNode[] = [text];
  
  terms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    const newElements: React.ReactNode[] = [];
    elements.forEach((el, idx) => {
      if (typeof el === 'string') {
        const parts = el.split(regex);
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].toLowerCase() === term.toLowerCase()) {
            newElements.push(
              <span key={`${term}-${idx}-${i}`} style={{ position: 'relative', display: 'inline-block' }}>
                <span
                  role="button"
                  tabIndex={0}
                  onFocus={() => {
                    setActiveTerm(term);
                    // Screen reader announce
                    if ('speechSynthesis' in window) {
                       const u = new SpeechSynthesisUtterance(`${term}. ${JARGON_GLOSSARY[term]}`);
                       window.speechSynthesis.speak(u);
                    }
                  }}
                  onClick={() => setActiveTerm(term)}
                  style={{
                    borderBottom: '2px dotted var(--primary)',
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    fontWeight: 600,
                  }}
                  aria-label={`${term}. ${JARGON_GLOSSARY[term]}`}
                >
                  {parts[i]}
                </span>
                {activeTerm === term && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 8,
                      background: 'var(--text-high)',
                      color: 'white',
                      padding: '12px',
                      borderRadius: 12,
                      width: 250,
                      zIndex: 100,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      fontSize: 14,
                      lineHeight: 1.4,
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <strong style={{ display: 'block', color: 'var(--primary-light)' }}>{term}</strong>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if ('speechSynthesis' in window) {
                              window.speechSynthesis.speak(new SpeechSynthesisUtterance(JARGON_GLOSSARY[term]));
                            }
                          }}
                          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}
                          aria-label="Read definition aloud"
                        >
                          <Volume2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTerm(null);
                          }}
                          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}
                          aria-label="Close"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    {JARGON_GLOSSARY[term]}
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', border: '6px solid transparent', borderTopColor: 'var(--text-high)' }} />
                  </div>
                )}
              </span>
            );
          } else if (parts[i]) {
            newElements.push(parts[i]);
          }
        }
      } else {
        newElements.push(el);
      }
    });
    elements = newElements;
  });

  return (
    <div style={style} onClick={() => setActiveTerm(null)}>
      {elements}
    </div>
  );
}

export function ReportBottomSheet({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <BottomSheet open={true} onClose={onClose}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <h2 className="text-h3" style={{ marginBottom: 16 }}>Report Submitted</h2>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Check size={24} strokeWidth={3} />
          </div>
          <h3 className="text-h3" style={{ marginBottom: 8 }}>Thanks for reporting</h3>
          <p className="text-body text-medium" style={{ marginBottom: 24 }}>
            Our team reviews reports within 24–48 hours. This helps keep Sahay safe for everyone.
          </p>
          <Btn onClick={onClose}>Done</Btn>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet open={true} onClose={onClose}>
      <h2 className="text-h3" style={{ marginBottom: 16 }}>Report this employer</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p className="text-body text-medium">Why are you reporting them?</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Asked for payment', 'Asked for my Aadhaar/UDID again', 'Discriminatory language', 'Fake or misleading job', 'Other'].map(r => (
            <button
              key={r}
              onClick={() => setReason(r)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px',
                borderRadius: 12,
                border: `2px solid ${reason === r ? 'var(--primary)' : 'var(--surface)'}`,
                background: reason === r ? 'var(--primary-light)' : 'transparent',
                textAlign: 'left',
                fontSize: 16,
                fontWeight: reason === r ? 600 : 500,
              }}
            >
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${reason === r ? 'var(--primary)' : 'var(--text-disabled)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {reason === r && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }} />}
              </div>
              {r}
            </button>
          ))}
        </div>

        {/* Block Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface)', borderRadius: 12, marginTop: 8 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Block employer</div>
            <div style={{ fontSize: 14, color: 'var(--text-medium)', marginTop: 4 }}>Hide their jobs and messages from you</div>
          </div>
          <button
            onClick={() => setBlocked(!blocked)}
            style={{
              width: 52,
              height: 32,
              borderRadius: 16,
              background: blocked ? 'var(--error)' : 'var(--border)',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            aria-checked={blocked}
            role="switch"
          >
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'white',
              position: 'absolute',
              top: 4,
              left: blocked ? 24 : 4,
              transition: 'all 0.2s',
            }} />
          </button>
        </div>

        <Btn
          disabled={!reason && !blocked}
          onClick={() => {
             if (reason) setSubmitted(true);
             else onClose();
          }}
          style={{ marginTop: 8 }}
        >
          {reason ? 'Submit report' : blocked ? 'Block employer' : 'Submit'}
        </Btn>
      </div>
    </BottomSheet>
  );
}

export function GlobalTTSReader() {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Very basic prototype TTS runner
  const handleToggle = () => {
    if (!active) {
      setActive(true);
      setPlaying(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // clear queue
        const u = new SpeechSynthesisUtterance("Reading page content aloud. This is a prototype global read aloud feature.");
        window.speechSynthesis.speak(u);
      }
    } else {
      setActive(false);
      setPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handlePlayPause = () => {
    if (playing) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        aria-label="Read page aloud"
        style={{
          position: 'absolute',
          bottom: 120, // Above bottom nav and FABs
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: active ? 'var(--primary-dark)' : 'white',
          color: active ? 'white' : 'var(--text-main)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 900,
          transition: 'all 0.2s',
        }}
      >
        <Volume2 size={24} strokeWidth={2} />
      </button>

      {active && (
        <div style={{
          position: 'absolute',
          bottom: 80, // Above bottom nav
          left: 20,
          right: 90,
          maxWidth: 300, // keep it inside mobile frame
          background: 'var(--text-high)',
          borderRadius: 16,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          zIndex: 900,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>
           <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 8 }}>
             {playing ? <Pause size={24} /> : <Play size={24} />}
           </button>
           <button onClick={handleToggle} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 8 }}>
             <Square size={20} />
           </button>
        </div>
      )}
    </>
  );
}

export function ScamWarningInterstitial({ onReport, onDismiss }: { onReport: () => void; onDismiss: () => void }) {
  return (
    <div style={{
      background: '#FEF2F2', // Red-50
      border: '1px solid #F87171', // Red-400
      borderRadius: 12,
      padding: 16,
      margin: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <AlertTriangle size={24} color="#DC2626" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontWeight: 700, color: '#991B1B', margin: '0 0 4px', fontSize: 16 }}>Stay Safe</h4>
          <p style={{ color: '#7F1D1D', margin: 0, fontSize: 14, lineHeight: 1.4 }}>
            This message is asking for payment. Sahay listings never require a fee or registration charge to apply.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
        <button
          onClick={onReport}
          style={{
            background: '#DC2626',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Report this
        </button>
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            color: '#991B1B',
            border: 'none',
            padding: '12px',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Continue anyway, I understand the risk
        </button>
      </div>
    </div>
  );
}

