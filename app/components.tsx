'use client';
import React from 'react';
import { useRouter } from './context';
import {
  Home, Briefcase, ListChecks, HeartHandshake, User,
  ChevronLeft, Bell, Search, MoreVertical
} from 'lucide-react';

// =============================================
//  TOP APP BAR
// =============================================
interface TopBarProps {
  title?: string;
  showBack?: boolean;
  centerTitle?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export function TopBar({ title, showBack = true, centerTitle, rightAction, transparent }: TopBarProps) {
  const { back } = useRouter();
  return (
    <header
      className="topbar"
      style={transparent ? { background: 'transparent', borderBottom: 'none' } : undefined}
    >
      {showBack ? (
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
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

// =============================================
//  BOTTOM NAVIGATION
// =============================================
type NavTab = 'home' | 'jobs' | 'applications' | 'care' | 'profile';

interface BottomNavProps {
  active: NavTab;
}

export function BottomNav({ active }: BottomNavProps) {
  const { navigate } = useRouter();

  const tabs: { id: NavTab; label: string; icon: React.ReactNode; screen: Parameters<typeof navigate>[0] }[] = [
    { id: 'home',         label: 'Home',     icon: <Home size={22} strokeWidth={2} />,          screen: 'D1_HOME' },
    { id: 'jobs',         label: 'Jobs',     icon: <Briefcase size={22} strokeWidth={2} />,     screen: 'E1_JOBS' },
    { id: 'applications', label: 'Applied',  icon: <ListChecks size={22} strokeWidth={2} />,    screen: 'F1_APPLICATIONS' },
    { id: 'care',         label: 'Care',     icon: <HeartHandshake size={22} strokeWidth={2} />, screen: 'G1_CARE' },
    { id: 'profile',      label: 'Profile',  icon: <User size={22} strokeWidth={2} />,           screen: 'I1_PROFILE' },
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
