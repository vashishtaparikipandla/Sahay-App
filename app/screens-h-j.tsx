'use client';
import React, { useState } from 'react';
import {
  Bell, Briefcase, Calendar, ShieldCheck, Users, ChevronRight,
  Edit3, User, Settings, Accessibility, Lock, HelpCircle, LogOut,
  Phone, MessageCircle, Mail, Smartphone, Volume2, Moon, Type,
  Download, Trash2, AlertTriangle, Check, WifiOff, RefreshCw,
  Store, Info, ArrowRight, Globe
} from 'lucide-react';
import { useRouter, useApp } from './context';
import { DishaFAB, AppHeader, BottomNav, TopBar, Btn, SettingRow, ToggleRow, AccordionItem, InfoCard, Badge } from './components';
import { APPLICATIONS } from './data';

// =============================================
//  H1 — NOTIFICATIONS
// =============================================
export function NotificationsScreen() {
  const { back } = useRouter();
  const { navigate } = useRouter();

  type NotifData = { type: string; icon: React.ReactNode; bg: string; title: string; body: string; time: string; unread: boolean; screen: Parameters<typeof navigate>[0] };

  const today: NotifData[] = [
    {
      type: 'application',
      icon: <Briefcase size={18} strokeWidth={2} color="var(--primary)" />,
      bg: 'var(--primary-light)',
      title: 'You\'ve been shortlisted!',
      body: 'TechCorp India — Junior Software Developer',
      time: '2h ago',
      unread: true,
      screen: 'F2_APP_DETAIL' as const,
    },
    {
      type: 'booking',
      icon: <Calendar size={18} strokeWidth={2} color="var(--accent)" />,
      bg: 'var(--accent-light)',
      title: 'Session reminder',
      body: 'Counseling with Rahul Mehta — tomorrow at 4:00 PM',
      time: '4h ago',
      unread: true,
      screen: 'G5_MY_BOOKINGS' as const,
    },
    {
      type: 'verification',
      icon: <ShieldCheck size={18} strokeWidth={2} color="var(--success)" />,
      bg: 'var(--success-light)',
      title: 'Profile verified',
      body: 'Your UDID verification is complete. Start applying!',
      time: '6h ago',
      unread: false,
      screen: 'B7_VERIFY_STATUS' as const,
    },
  ];

  const earlier: NotifData[] = [
    {
      type: 'community',
      icon: <Users size={18} strokeWidth={2} color="var(--text-medium)" />,
      bg: 'var(--surface)',
      title: 'New reply in your thread',
      body: 'Karthik replied to your post in Community',
      time: '2d ago',
      unread: false,
      screen: 'G7_THREAD',
    },
    {
      type: 'application',
      icon: <Briefcase size={18} strokeWidth={2} color="var(--text-medium)" />,
      bg: 'var(--surface)',
      title: 'Application received',
      body: 'Zomato — Customer Support Associate',
      time: '4d ago',
      unread: false,
      screen: 'F1_APPLICATIONS',
    },
  ];

  const NotifItem = ({ item }: { item: NotifData }) => (
    <button
      className="setting-row"
      style={{ width: '100%', background: item.unread ? 'var(--primary-light)' : 'transparent' }}
      onClick={() => navigate(item.screen)}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {item.icon}
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <p className="text-body" style={{ fontWeight: 700 }}>{item.title}</p>
        <p className="text-caption text-medium">{item.body}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <p className="text-caption text-disabled">{item.time}</p>
        {item.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />}
      </div>
    </button>
  );

  return (
    <div className="screen">
      <AppHeader title="Notifications" />

      <div className="screen-content" style={{ paddingTop: 8 }}>
        <p className="text-overline text-medium" style={{ padding: '12px 0 8px' }}>Today</p>
        {today.map((item, i) => <NotifItem key={i} item={item} />)}

        <p className="text-overline text-medium" style={{ padding: '20px 0 8px' }}>Earlier</p>
        {earlier.map((item, i) => <NotifItem key={i} item={item} />)}
      </div>
    </div>
  );
}

// =============================================
//  I1 — MY PROFILE VIEW
// =============================================
export function ProfileViewScreen() {
  const { navigate } = useRouter();
  const { state } = useApp();

  const sections = [
    { title: 'About', content: 'Junior Software Developer with 2 years of experience. Seeking hybrid/remote roles in tech.', editable: true },
    {
      title: 'Education', items: ['B.Tech Computer Science — VIT Vellore (2020)'], editable: true
    },
    {
      title: 'Experience', items: ['Junior Developer — StartupX (2020–2022)'], editable: true
    },
    {
      title: 'Skills', badges: ['React', 'Node.js', 'SQL', 'Figma', 'Communication'], editable: true
    },
    {
      title: 'Disability & accommodations',
      items: ['Locomotor disability (60%)', 'Wheelchair user', 'Needs: Accessible workplace, Extended interview time'],
      editable: true,
      sensitive: true,
    },
  ];

  return (
    <div className="screen screen-with-nav">
      <AppHeader title="My profile" centerTitle showBack={false} />

      <div className="screen-content" style={{ paddingTop: 20, paddingBottom: 80 }}>
        {/* Profile header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 36, fontWeight: 700 }}>
              P
            </div>
            <button
              style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Change profile photo"
            >
              <Edit3 size={14} strokeWidth={2} color="white" />
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 className="text-h2">{state.userName} Sharma</h2>
            <p className="text-body text-medium">Junior Software Developer • Bengaluru</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              <span className="badge badge-verified"><ShieldCheck size={10} strokeWidth={2} /> Verified</span>
              <span className="badge badge-primary">Open to work</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 className="text-h3">{sec.title}</h3>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--caption)', fontWeight: 600 }}
                onClick={() => navigate('I2_EDIT')}
              >
                <Edit3 size={14} strokeWidth={2} /> Edit
              </button>
            </div>
            <div className="card-surface">
              {sec.content && <p className="text-body text-medium" style={{ lineHeight: 1.6 }}>{sec.content}</p>}
              {sec.items?.map((item, j) => <p key={j} className="text-body" style={{ marginBottom: j < (sec.items?.length || 0) - 1 ? 4 : 0 }}>{item}</p>)}
              {sec.badges && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {sec.badges.map(b => <span key={b} className="badge badge-primary">{b}</span>)}
                </div>
              )}
              {sec.sensitive && (
                <p className="text-caption text-disabled" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Lock size={10} strokeWidth={2} /> Only shared with your consent
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="profile" />
    </div>
  );
}

// =============================================
//  I2 — EDIT PROFILE
// =============================================
export function EditProfileScreen() {
  const { back } = useRouter();

  return (
    <div className="screen">
      <AppHeader title="Edit profile" />

      <div className="screen-content" style={{ paddingTop: 24, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="input-group">
          <label className="input-label" htmlFor="fullname">Full name</label>
          <input id="fullname" className="input-field" defaultValue="Priya Sharma" />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="headline">Professional headline</label>
          <input id="headline" className="input-field" defaultValue="Junior Software Developer" />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="location">Location</label>
          <input id="location" className="input-field" defaultValue="Bengaluru, Karnataka" />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="about">About</label>
          <textarea id="about" className="input-field" rows={4} defaultValue="Junior Software Developer with 2 years of experience. Seeking hybrid/remote roles in tech." style={{ resize: 'none' }} />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <input id="email" className="input-field" type="email" defaultValue="priya.sharma@email.com" />
        </div>
      </div>
    </div>
  );
}

// =============================================
//  I3 — SETTINGS
// =============================================
export function SettingsScreen() {
  const { navigate, back } = useRouter();

  return (
    <div className="screen">
      <AppHeader title="Settings" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <div className="card-surface" style={{ marginBottom: 16 }}>
          <SettingRow icon={<User size={18} strokeWidth={2} />} label="Account" description="Manage your account details" onClick={() => navigate('I2_EDIT')} />
          <SettingRow icon={<Accessibility size={18} strokeWidth={2} />} label="Accessibility" description="Text size, contrast, motion" onClick={() => navigate('I4_ACCESSIBILITY')} />
          <SettingRow icon={<Bell size={18} strokeWidth={2} />} label="Notification preferences" description="Manage push alerts" onClick={() => {}} />
          <SettingRow icon={<Lock size={18} strokeWidth={2} />} label="Privacy & data" description="Data control and export" onClick={() => navigate('I5_PRIVACY')} />
          <SettingRow icon={<Globe size={18} strokeWidth={2} />} label="Language" description="English" onClick={() => navigate('A2_LANGUAGE')} />
          <SettingRow icon={<HelpCircle size={18} strokeWidth={2} />} label="Help & support" description="FAQs, chat, call" onClick={() => navigate('I6_HELP')} />
        </div>

        <div className="card-surface">
          <SettingRow icon={<LogOut size={18} strokeWidth={2} />} label="Log out" description="" onClick={() => navigate('I7_LOGOUT')} danger />
        </div>

        <p className="text-caption text-disabled text-center" style={{ marginTop: 24 }}>
          Sahay v1.0.0 · Made with care in India 🇮🇳
        </p>
      </div>
    </div>
  );
}



// =============================================
//  I4 — ACCESSIBILITY SETTINGS
// =============================================
export function AccessibilityScreen() {
  const { back } = useRouter();
  const [textSize, setTextSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);

  const handleTextSize = (v: number) => {
    setTextSize(v);
    document.documentElement.style.setProperty('--text-scale', String(v));
  };

  const handleContrast = (v: boolean) => {
    setHighContrast(v);
    document.documentElement.setAttribute('data-high-contrast', String(v));
  };

  return (
    <div className="screen">
      <AppHeader title="Accessibility" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* Text size */}
        <div className="card-border" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Type size={20} strokeWidth={2} color="var(--primary)" />
            <h2 className="text-h3">Text size</h2>
          </div>
          <input
            type="range"
            min={1}
            max={1.5}
            step={0.1}
            value={textSize}
            onChange={e => handleTextSize(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', marginBottom: 12 }}
            aria-label="Text size multiplier"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-caption text-medium">1× (Default)</span>
            <span className="text-caption text-medium">1.5× (Large)</span>
          </div>
          {/* Live preview */}
          <div className="card-surface" style={{ marginTop: 16 }}>
            <p style={{ fontSize: `calc(16px * ${textSize})`, lineHeight: 1.5, color: 'var(--text-high)' }}>
              Preview: This is how your text will look across the app.
            </p>
          </div>
        </div>

        <div className="card-surface">
          <ToggleRow
            id="high-contrast"
            label="High contrast mode"
            description="Increases text and border contrast"
            checked={highContrast}
            onChange={handleContrast}
          />
          <ToggleRow
            id="screen-reader"
            label="Screen reader optimized"
            description="Adds additional labels for assistive tech"
            checked={screenReader}
            onChange={setScreenReader}
          />
          <ToggleRow
            id="reduce-motion"
            label="Reduce motion"
            description="Minimizes animations and transitions"
            checked={reduceMotion}
            onChange={v => {
              setReduceMotion(v);
              // Apply CSS custom property
              document.documentElement.style.setProperty('--dur-fast', v ? '0ms' : '150ms');
              document.documentElement.style.setProperty('--dur-normal', v ? '0ms' : '250ms');
            }}
          />
          <ToggleRow
            id="voice-input"
            label="Voice input for forms"
            description="Use your voice to fill in form fields"
            checked={voiceInput}
            onChange={setVoiceInput}
          />
        </div>

        <div className="card-border" style={{ marginTop: 16, borderColor: 'var(--primary)' }}>
          <p className="text-body" style={{ fontWeight: 700, marginBottom: 4 }}>Your system accessibility settings matter too</p>
          <p className="text-caption text-medium">Sahay respects your device's dynamic text size, reduce motion, and dark mode settings automatically.</p>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  I5 — PRIVACY & DATA
// =============================================
export function PrivacyScreen() {
  const { navigate, back } = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="screen">
      <AppHeader title="Privacy & data" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <h2 className="text-h3" style={{ marginBottom: 12 }}>What we collect</h2>
        {[
          { label: 'Identity data', desc: 'Aadhaar (for verification only, not stored raw), name, phone', purpose: 'Verify your identity to employers and government schemes' },
          { label: 'Disability data', desc: 'UDID category, percentage, accommodation needs', purpose: 'Match you to accessible jobs and eligible schemes' },
          { label: 'Employment data', desc: 'Resume, experience, skills, work preferences', purpose: 'Create your professional profile for employers' },
          { label: 'Health-adjacent data', desc: 'Therapy bookings (provider, date, specialty)', purpose: 'Show your upcoming sessions and booking history' },
        ].map((item, i) => (
          <div key={i} className="card-border" style={{ marginBottom: 12 }}>
            <p className="text-body" style={{ fontWeight: 700 }}>{item.label}</p>
            <p className="text-caption text-medium" style={{ margin: '4px 0 8px' }}>{item.desc}</p>
            <p className="text-caption" style={{ color: 'var(--primary)' }}>Why: {item.purpose}</p>
          </div>
        ))}

        <div className="divider" />

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Your controls</h2>
        <div className="card-surface" style={{ marginBottom: 20 }}>
          <SettingRow
            icon={<Download size={18} strokeWidth={2} />}
            label="Export my data"
            description="Download everything we hold about you"
            onClick={() => {}}
          />
          <SettingRow
            icon={<Trash2 size={18} strokeWidth={2} />}
            label="Delete my account"
            description="Permanently remove all your data"
            onClick={() => setShowDeleteConfirm(true)}
            danger
          />
        </div>
      </div>

      {/* Delete confirm multi-step modal */}
      {showDeleteConfirm && (
        <div className="sheet-overlay" role="dialog" aria-modal="true" aria-label="Delete account confirmation">
          <div className="modal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--error-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={24} strokeWidth={2} color="var(--error)" />
            </div>
            <h3 className="text-h3" style={{ color: 'var(--error)' }}>Delete account?</h3>
            <p className="text-body text-medium">This permanently deletes your profile, verification data, applications, bookings, and documents. This cannot be undone.</p>
            <div className="input-group">
              <label className="input-label" htmlFor="delete-confirm">Type DELETE to confirm</label>
              <input id="delete-confirm" className="input-field" placeholder="DELETE" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="secondary" onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1 }}>Cancel</Btn>
              <Btn variant="danger" onClick={() => { setShowDeleteConfirm(false); navigate('A4_SIGNIN'); }} style={{ flex: 1 }}>Delete</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================
//  I6 — HELP & SUPPORT
// =============================================
export function HelpScreen() {
  const { navigate, back } = useRouter();

  const faqs = [
    { q: 'How do I update my disability certificate?', a: 'Go to Profile → Disability & accommodations → Edit. Upload your new UDID or certificate. Our team reviews updates within 24 hours.' },
    { q: 'Can I apply to jobs without completing verification?', a: 'You can browse jobs without verification. To apply, you need at least provisional verification. Full verification gives you the "Verified" badge employers trust most.' },
    { q: 'How do I request an accessible interview format?', a: 'Your accommodation preferences from your profile are automatically attached to every application. You can also edit them per-application on the Apply screen.' },
    { q: 'Is my data shared with the government?', a: 'No. We use UIDAI (Aadhaar) APIs for verification only. Your profile data is never shared with government without your consent. See Privacy & Data settings for full details.' },
    { q: 'How do I delete my account?', a: 'Go to Settings → Privacy & data → Delete my account. We\'ll ask you to confirm and your data will be permanently removed within 30 days.' },
  ];

  return (
    <div className="screen">
      <AppHeader title="Help & support" />

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Search */}
        <div className="search-input-wrapper" style={{ marginBottom: 24 }}>
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search help articles…" />
        </div>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Frequently asked</h2>
        <div style={{ marginBottom: 24 }}>
          {faqs.map((f, i) => <AccordionItem key={i} question={f.q} answer={f.a} />)}
        </div>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Safety & Trust</h2>
        <div className="card-surface" style={{ marginBottom: 24 }}>
          <SettingRow
            icon={<ShieldCheck size={18} strokeWidth={2} color="var(--primary)" />}
            label="Disclosure Assistant"
            description="Guide on when to share your disability"
            onClick={() => navigate('O2_DISCLOSURE_ASSISTANT')}
          />
          <SettingRow
            icon={<AlertTriangle size={18} strokeWidth={2} color="var(--error)" />}
            label="Scam Awareness"
            description="Spot red flags and protect yourself"
            onClick={() => navigate('O3_RED_FLAGS')}
          />
        </div>

        <h2 className="text-h3" style={{ marginBottom: 16 }}>Contact us</h2>
        <p className="text-caption text-medium" style={{ marginBottom: 16 }}>We offer multiple channels because everyone communicates differently.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn icon={<MessageCircle size={18} strokeWidth={2} />}>Live chat support</Btn>
          <Btn variant="secondary" icon={<Phone size={18} strokeWidth={2} />}>Call: 1800-xxx-xxxx (free)</Btn>
          <Btn variant="secondary" icon={<Mail size={18} strokeWidth={2} />}>Email us</Btn>
        </div>

        <p className="text-caption text-medium" style={{ marginTop: 16, textAlign: 'center' }}>
          Support is available in English, Hindi, Tamil, Telugu, and Kannada.<br />
          Mon–Sat, 9 AM–7 PM IST.
        </p>
      </div>
    </div>
  );
}

// =============================================
//  I7 — LOG OUT CONFIRM
// =============================================
export function LogoutScreen() {
  const { navigate, back } = useRouter();

  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)' }}>
      <div className="modal" style={{ maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={24} strokeWidth={2} color="var(--text-medium)" />
          </div>
          <div>
            <h3 className="text-h3" style={{ marginBottom: 8 }}>Log out of Sahay?</h3>
            <p className="text-body text-medium">Your profile and data stay safe. You can log back in anytime with your mobile number.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="secondary" onClick={back} style={{ flex: 1 }}>Stay</Btn>
            <Btn onClick={() => navigate('A4_SIGNIN')} style={{ flex: 1 }}>Log out</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  J1 — NO INTERNET
// =============================================
export function NoInternetScreen() {
  const { back } = useRouter();
  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)', gap: 24, textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WifiOff size={48} strokeWidth={1.5} color="var(--text-disabled)" />
      </div>
      <div>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>You're offline</h1>
        <p className="text-body text-medium">Check your internet connection and try again. Your data is saved.</p>
      </div>
      <Btn icon={<RefreshCw size={18} strokeWidth={2} />} onClick={() => window.location.reload()}>Retry</Btn>
      <Btn variant="secondary" onClick={back}>Go back</Btn>
    </div>
  );
}

// =============================================
//  J2 — SERVER ERROR
// =============================================
export function ServerErrorScreen() {
  const { back } = useRouter();
  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)', gap: 24, textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--error-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AlertTriangle size={48} strokeWidth={1.5} color="var(--error)" />
      </div>
      <div>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Something went wrong on our end</h1>
        <p className="text-body text-medium">Our team has been notified. Please try again in a moment.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <Btn icon={<RefreshCw size={18} strokeWidth={2} />} onClick={() => window.location.reload()}>Retry</Btn>
        <Btn variant="secondary" onClick={back}>Contact support</Btn>
      </div>
    </div>
  );
}

// =============================================
//  J3 — APP UPDATE REQUIRED
// =============================================
export function UpdateScreen() {
  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)', gap: 24, textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, borderRadius: 24, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Store size={44} strokeWidth={1.5} color="white" />
      </div>
      <div>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Update needed to continue</h1>
        <p className="text-body text-medium">A new version of Sahay is available with important improvements. Please update to continue.</p>
      </div>
      <Btn icon={<ArrowRight size={18} strokeWidth={2} />} onClick={() => {}}>
        Update now
      </Btn>
    </div>
  );
}

// =============================================
//  J4 — ACCOUNT SUSPENDED
// =============================================
export function SuspendedScreen() {
  const { navigate } = useRouter();
  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)', gap: 24, textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Info size={48} strokeWidth={1.5} color="var(--warning)" />
      </div>
      <div>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Your account is under review</h1>
        <p className="text-body text-medium" style={{ lineHeight: 1.7 }}>
          We're reviewing some details on your account. This is a routine check — most accounts are restored within 24 hours. Your data is safe.
        </p>
      </div>
      <InfoCard icon={<Lock size={14} strokeWidth={2} />} variant="warning">
        You haven't done anything wrong. If you think this is a mistake, contact our support team — we'll resolve it quickly.
      </InfoCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <Btn icon={<MessageCircle size={18} strokeWidth={2} />} onClick={() => navigate('I6_HELP')}>Contact support</Btn>
        <Btn variant="secondary" icon={<Phone size={18} strokeWidth={2} />}>Call: 1800-xxx-xxxx</Btn>
      </div>
    </div>
  );
}
