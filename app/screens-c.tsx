'use client';
import React, { useState } from 'react';
import {
  Link2, FileText, Edit3, GraduationCap, Briefcase, Award,
  Accessibility, Plus, Trash2, Check, ArrowRight, Upload,
  IndianRupee, MapPin, Globe, Info, AlertTriangle, Sparkles, MessageCircle
} from 'lucide-react';
import { useRouter, useApp } from './context';
import { Btn, Stepper, InfoCard, Badge, ToggleRow, ConversationalBubble } from './components';

// =============================================
//  C1 — PROFILE SETUP CHOICE
// =============================================
export function ProfileChoiceScreen() {
  const { navigate } = useRouter();
  const { state, setState } = useApp();

  const options = [
    {
      icon: <Link2 size={28} strokeWidth={2} color="var(--primary)" />,
      title: 'Import from LinkedIn',
      desc: 'Auto-fill your experience and skills',
      badge: 'Fastest',
      screen: 'C2_LINKEDIN' as const,
    },
    {
      icon: <FileText size={28} strokeWidth={2} color="var(--primary)" />,
      title: 'Upload your resume',
      desc: 'PDF or Word — we\'ll extract the details',
      badge: null,
      screen: 'C3_RESUME' as const,
    },
    {
      icon: <Edit3 size={28} strokeWidth={2} color="var(--primary)" />,
      title: 'I\'ll fill it in myself',
      desc: 'Step-by-step guided entry',
      badge: null,
      screen: 'C5A_EDUCATION' as const,
    },
  ];

  return (
    <div className="screen">
      <div style={{ height: 'var(--topbar-h)' }} />
      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Let's build your profile</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>
          Your profile is what employers see when you apply. Choose how to get started.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {options.map((opt, i) => (
            <button
              key={i}
              className="card-border"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer',
                background: 'var(--base)',
                textAlign: 'left',
                transition: 'all 150ms',
              }}
              onClick={() => navigate(opt.screen)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--surface)')}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'var(--primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {opt.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span className="text-body" style={{ fontWeight: 700 }}>{opt.title}</span>
                  {opt.badge && <span className="badge badge-accent">{opt.badge}</span>}
                </div>
                <span className="text-caption text-medium">{opt.desc}</span>
              </div>
              <ArrowRight size={18} strokeWidth={2} color="var(--text-disabled)" />
            </button>
          ))}
        </div>

        {state.v2Enabled && (
          <div style={{ marginTop: 24, padding: 16, background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageCircle size={18} /> Prefer a conversation?
            </h3>
            <p className="text-body-s text-medium" style={{ marginBottom: 12 }}>
              You can turn on chat mode to go through this setup like a conversation instead of forms.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn size="sm" onClick={() => setState(s => ({ ...s, chatMode: true }))} style={{ flex: 1, background: state.chatMode ? 'var(--primary)' : 'white', color: state.chatMode ? 'white' : 'var(--primary)', border: '1px solid var(--primary)' }}>Chat Mode {state.chatMode ? 'ON' : 'OFF'}</Btn>
              <Btn size="sm" variant="secondary" onClick={() => setState(s => ({ ...s, chatMode: false }))} style={{ flex: 1 }}>Use Form</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
//  C2 — LINKEDIN OAUTH
// =============================================
export function LinkedInScreen() {
  const { navigate, back } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('C6_PROFILE_REVIEW');
    }, 2500);
  };

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3 topbar-title-center">Import from LinkedIn</h1>
        <div style={{ width: 40 }} />
      </header>
      <div className="screen-content" style={{ paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {loading ? (
          <>
            <div className="spinner" style={{ width: 48, height: 48, borderWidth: 4 }} />
            <p className="text-body-l text-medium text-center">Fetching your details from LinkedIn…</p>
          </>
        ) : (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: '#0077B5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Link2 size={36} strokeWidth={2} color="white" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 className="text-h2" style={{ marginBottom: 8 }}>Connect LinkedIn</h2>
              <p className="text-body text-medium">We'll import your experience, education, and skills. You can review and edit everything before your profile goes live.</p>
            </div>
            <Btn onClick={handleConnect}>Connect LinkedIn account</Btn>
            <button className="text-body text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }} onClick={back}>
              Cancel — go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================
//  C3 — RESUME UPLOAD
// =============================================
export function ResumeUploadScreen() {
  const { navigate, back } = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      navigate('C4_RESUME_REVIEW');
    }, 2000);
  };

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3 topbar-title-center">Upload resume</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Upload your resume</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>PDF or Word document, up to 5MB.</p>

        {uploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 40 }}>
            <div className="spinner" style={{ width: 48, height: 48, borderWidth: 4 }} />
            <p className="text-body text-medium">Parsing your resume…</p>
          </div>
        ) : (
          <>
            <div
              style={{
                border: '2px dashed var(--primary)',
                borderRadius: 'var(--radius-card)',
                padding: '48px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                background: 'var(--primary-light)',
                cursor: 'pointer',
                marginBottom: 24,
              }}
              onClick={handleUpload}
            >
              <Upload size={40} strokeWidth={1.5} color="var(--primary)" />
              <div style={{ textAlign: 'center' }}>
                <p className="text-body" style={{ fontWeight: 700, color: 'var(--primary)' }}>Tap to upload</p>
                <p className="text-caption text-medium">PDF or Word • max 5MB</p>
              </div>
            </div>

            {error && (
              <div className="card-border" style={{ borderColor: 'var(--error)', background: 'var(--error-light)', marginBottom: 16 }}>
                <p className="text-body" style={{ color: 'var(--error)' }}>{error}</p>
                <p className="text-caption text-medium" style={{ marginTop: 4 }}>Let's fill your profile in together instead.</p>
                <button onClick={() => navigate('C5A_EDUCATION')} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--error)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                  Fill in manually
                </button>
              </div>
            )}

            <div className="section-divider">
              <div className="section-divider-line" /><span className="section-divider-text">Don't have a resume?</span><div className="section-divider-line" />
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn variant="secondary" onClick={() => navigate('C5A_EDUCATION')}>
                Fill in my profile manually
              </Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================
//  C4 — RESUME PARSE REVIEW
// =============================================
export function ResumeReviewScreen() {
  const { navigate, back } = useRouter();
  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3 topbar-title-center">Review details</h1>
        <div style={{ width: 40 }} />
      </header>
      <div className="screen-content" style={{ paddingTop: 16 }}>
        <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
          We've extracted these details from your resume — check everything is correct.
        </InfoCard>

        {[
          { section: 'Education', icon: <GraduationCap size={18} strokeWidth={2} />, items: ['B.Tech Computer Science — VIT Vellore (2020)', 'Class 12 — CBSE (2016)'] },
          { section: 'Experience', icon: <Briefcase size={18} strokeWidth={2} />, items: ['Junior Developer — StartupX (2020–2022)', 'Intern — TCS (2019)'], flagged: true },
          { section: 'Skills', icon: <Award size={18} strokeWidth={2} />, items: ['React', 'Node.js', 'SQL', 'Figma', 'Communication'] },
        ].map((sec, i) => (
          <div key={i} style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--primary)' }}>
              {sec.icon}
              <h2 className="text-h3" style={{ color: 'var(--primary)' }}>{sec.section}</h2>
              {sec.flagged && <span className="badge badge-pending"><AlertTriangle size={10} strokeWidth={2} /> Check</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sec.items.map((item, j) => (
                <div key={j} className={sec.flagged ? 'card-border' : 'card-surface'} style={sec.flagged ? { borderColor: 'var(--warning)' } : undefined}>
                  <p className="text-body">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C6_PROFILE_REVIEW')}>Looks good — continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5a — EDUCATION
// =============================================
export function EducationScreen() {
  const { navigate, back } = useRouter();
  const [noFormal, setNoFormal] = useState(false);
  const [entries, setEntries] = useState([{ degree: '', institution: '', year: '', ongoing: false }]);

  const addEntry = () => setEntries(e => [...e, { degree: '', institution: '', year: '', ongoing: false }]);
  const removeEntry = (i: number) => setEntries(e => e.filter((_, idx) => idx !== i));

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={1} total={6} label="Step 1 of 6 — Education" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <GraduationCap size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Education</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>Add your educational background. All fields are optional.</p>

        <ToggleRow
          id="no-formal"
          label="I don't have formal education"
          description="Skip this section and continue"
          checked={noFormal}
          onChange={setNoFormal}
        />

        {!noFormal && (
          <>
            {entries.map((entry, i) => (
              <div key={i} className="card-border" style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="text-caption text-medium" style={{ fontWeight: 700 }}>Education {i + 1}</span>
                  {entries.length > 1 && (
                    <button onClick={() => removeEntry(i)} aria-label="Remove this entry" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}>
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="input-group">
                    <label className="input-label">Degree / Certificate</label>
                    <input className="input-field" placeholder="e.g. B.Tech, 10th, Diploma" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Institution</label>
                    <input className="input-field" placeholder="e.g. VIT Vellore" />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="input-group" style={{ flex: 1 }}>
                      <label className="input-label">Year</label>
                      <input className="input-field" type="number" placeholder="2022" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                      <input type="checkbox" id={`ongoing-${i}`} />
                      <label htmlFor={`ongoing-${i}`} className="text-body">Ongoing</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEntry}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 12, width: 'auto', display: 'inline-flex', gap: 6 }}
            >
              <Plus size={16} strokeWidth={2} /> Add another
            </button>
          </>
        )}
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5B_EXPERIENCE')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5b — EXPERIENCE
// =============================================
export function ExperienceScreen() {
  const { navigate, back } = useRouter();
  const [firstJob, setFirstJob] = useState(false);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={2} total={6} label="Step 2 of 6 — Experience" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Briefcase size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Work experience</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>Add your past roles. Skip this section if you're a fresher.</p>

        <ToggleRow
          id="first-job"
          label="This is my first job"
          description="Skip to skills"
          checked={firstJob}
          onChange={v => {
            setFirstJob(v);
          }}
        />

        {firstJob && (
          <div className="card-border" style={{ marginTop: 16, borderColor: 'var(--success)', background: 'var(--success-light)' }}>
            <p className="text-body" style={{ color: 'var(--success)', fontWeight: 600 }}>Great — we'll focus on your skills and education to make your profile stand out!</p>
          </div>
        )}

        {!firstJob && (
          <div className="card-border" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="input-group">
                <label className="input-label">Job title</label>
                <input className="input-field" placeholder="e.g. Software Developer" />
              </div>
              <div className="input-group">
                <label className="input-label">Company</label>
                <input className="input-field" placeholder="e.g. TCS" />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">From</label>
                  <input className="input-field" placeholder="Jan 2020" />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">To</label>
                  <input className="input-field" placeholder="Dec 2022" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Brief description (optional)</label>
                <textarea className="input-field" rows={3} placeholder="What did you work on?" style={{ resize: 'none' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5C_SKILLS')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5c — SKILLS
// =============================================
const SUGGESTED_SKILLS = ['React', 'Python', 'Excel', 'Communication', 'Data Entry', 'Design', 'Marketing', 'Sales', 'Teaching', 'Writing', 'Customer Service', 'Accounting'];

export function SkillsScreen() {
  const { navigate, back } = useRouter();
  const [selected, setSelected] = useState<string[]>(['React', 'Communication']);
  const [custom, setCustom] = useState('');

  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const addCustom = () => {
    if (custom.trim() && !selected.includes(custom.trim())) {
      setSelected(p => [...p, custom.trim()]);
      setCustom('');
    }
  };

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={3} total={6} label="Step 3 of 6 — Skills" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Sparkles size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Your skills</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>Select from suggestions or type your own.</p>

        {/* Selected */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {selected.map(s => (
              <button
                key={s}
                className="chip active"
                onClick={() => toggle(s)}
                aria-pressed="true"
              >
                {s} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        {/* Custom input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <input
            className="input-field"
            style={{ flex: 1 }}
            placeholder="Type a skill and press Add"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
          />
          <button onClick={addCustom} className="btn btn-secondary btn-sm" style={{ width: 'auto', paddingInline: 16 }}>Add</button>
        </div>

        {/* Suggestions */}
        <p className="text-overline text-medium" style={{ marginBottom: 12 }}>Suggested</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SUGGESTED_SKILLS.filter(s => !selected.includes(s)).map(s => (
            <button key={s} className="chip" onClick={() => toggle(s)} aria-pressed="false">{s}</button>
          ))}
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5D_DISABILITY')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5d — DISABILITY & ACCOMMODATIONS
// =============================================
const DEVICES = ['Wheelchair', 'Hearing aid', 'Screen reader', 'Prosthetic limb', 'White cane', 'Cochlear implant', 'AAC device', 'Other'];
const ACCOMMODATIONS = ['Sign language interpreter', 'Flexible hours', 'Remote work only', 'Accessible workplace', 'Extended interview time', 'Large-print materials', 'Scribe support', 'Other'];

export function DisabilityScreen() {
  const { navigate, back } = useRouter();
  const { state } = useApp();
  const [devices, setDevices] = useState<string[]>([]);
  const [accom, setAccom] = useState<string[]>(['Accessible workplace']);
  
  // Chat state
  const [chatStep, setChatStep] = useState(0);

  const toggleSet = (set: string[], setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setFn(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const handleDeviceSelect = (d: string) => {
    if (d === 'None of these') {
      setChatStep(1);
      return;
    }
    toggleSet(devices, setDevices, d);
    setTimeout(() => setChatStep(1), 600);
  };
  
  const handleAccomSelect = (a: string) => {
    if (a === 'Nothing else') {
      setChatStep(2);
      return;
    }
    toggleSet(accom, setAccom, a);
    setTimeout(() => setChatStep(2), 600);
  };

  if (state.chatMode) {
    return (
      <div className="screen">
        <header className="topbar">
          <button className="topbar-back-btn" onClick={back} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{ width: 40 }} />
        </header>
        <div className="screen-content" style={{ paddingTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <Sparkles size={24} strokeWidth={2} color="var(--primary)" />
            <h1 className="text-h2">Let's talk about support.</h1>
          </div>
          
          <ConversationalBubble message={`I see from your UDID that you have a locomotor disability. To help employers prepare, do you use any of these assistive devices?`} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, marginLeft: 16 }}>
             {DEVICES.slice(0, 3).map(d => (
                <button key={d} onClick={() => handleDeviceSelect(d)} className={`chip ${devices.includes(d) ? 'active' : ''}`}>{d}</button>
             ))}
             <button onClick={() => handleDeviceSelect('None of these')} className="chip">None of these</button>
          </div>
          
          {chatStep >= 1 && (
            <>
              {devices.length > 0 ? (
                <ConversationalBubble isUser message={`I use: ${devices.join(', ')}`} />
              ) : (
                <ConversationalBubble isUser message={`None of those.`} />
              )}
              
              <ConversationalBubble message={`Got it. What workplace accommodations do you need?`} />
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, marginLeft: 16 }}>
                 {ACCOMMODATIONS.slice(0, 3).map(a => (
                    <button key={a} onClick={() => handleAccomSelect(a)} className={`chip ${accom.includes(a) ? 'active' : ''}`}>{a}</button>
                 ))}
                 <button onClick={() => handleAccomSelect('Nothing else')} className="chip">Nothing else for now</button>
              </div>
            </>
          )}

          {chatStep >= 2 && (
            <>
              <ConversationalBubble isUser message={`I need: ${accom.join(', ')}`} />
              <ConversationalBubble message={`All set! This is strictly confidential and only shared when you apply.`} />
              <div style={{ marginTop: 24 }}>
                <Btn onClick={() => navigate('C5E_PREFERENCES')}>Continue</Btn>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={4} total={6} label="Step 4 of 6 — Disability & Accommodations" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Accessibility size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Disability & accommodations</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>
          Help employers prepare the right support for you.
        </p>

        {/* UDID-sourced data (read-only) */}
        <div className="card-surface" style={{ marginBottom: 24 }}>
          <p className="text-overline text-medium" style={{ marginBottom: 8 }}>From your UDID</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="badge badge-primary">Locomotor disability</span>
            <span className="badge badge-primary">60%</span>
          </div>
          <p className="text-caption text-medium" style={{ marginTop: 8 }}>
            Contact support to correct this information.
          </p>
        </div>

        {/* Assistive devices */}
        <h2 className="text-h3" style={{ marginBottom: 12 }}>Assistive devices I use</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {DEVICES.map(d => (
            <button
              key={d}
              className={`chip ${devices.includes(d) ? 'active' : ''}`}
              onClick={() => toggleSet(devices, setDevices, d)}
              aria-pressed={devices.includes(d)}
            >
              {devices.includes(d) && <Check size={12} strokeWidth={2.5} />} {d}
            </button>
          ))}
        </div>

        {/* Accommodation needs */}
        <h2 className="text-h3" style={{ marginBottom: 12 }}>Workplace accommodations I need</h2>
        <p className="text-caption text-medium" style={{ marginBottom: 12 }}>This is shared with employers when you apply — only what you select.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ACCOMMODATIONS.map(a => (
            <button
              key={a}
              className={`chip ${accom.includes(a) ? 'active' : ''}`}
              onClick={() => toggleSet(accom, setAccom, a)}
              aria-pressed={accom.includes(a)}
            >
              {accom.includes(a) && <Check size={12} strokeWidth={2.5} />} {a}
            </button>
          ))}
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5E_PREFERENCES')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5e — WORK PREFERENCES
// =============================================
export function PreferencesScreen() {
  const { navigate, back } = useRouter();
  const [jobTypes, setJobTypes] = useState<string[]>(['Full-time']);
  const [mode, setMode] = useState('Hybrid');

  const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Apprenticeship', 'Govt. reservation post'];
  const MODES = ['Remote', 'Hybrid', 'On-site'];

  const toggleType = (t: string) =>
    setJobTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={5} total={6} label="Step 5 of 6 — Work preferences" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Work preferences</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>This helps us match you with the right jobs.</p>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Job type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {JOB_TYPES.map(t => (
            <button key={t} className={`chip ${jobTypes.includes(t) ? 'active' : ''}`} onClick={() => toggleType(t)} aria-pressed={jobTypes.includes(t)}>
              {jobTypes.includes(t) && <Check size={12} strokeWidth={2.5} />} {t}
            </button>
          ))}
        </div>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Work mode</h2>
        <div className="segment-group" style={{ marginBottom: 28 }}>
          {MODES.map(m => (
            <button key={m} className={`segment-btn ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>{m}</button>
          ))}
        </div>

        <div className="input-group" style={{ marginBottom: 20 }}>
          <label className="input-label">Preferred locations</label>
          <input className="input-field" placeholder="e.g. Bengaluru, Remote, Mumbai" />
        </div>

        <div className="input-group" style={{ marginBottom: 20 }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IndianRupee size={14} strokeWidth={2} /> Expected salary (LPA)
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <input className="input-field" placeholder="Min (e.g. 3)" type="number" />
            <input className="input-field" placeholder="Max (e.g. 8)" type="number" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Notice period</label>
          <select className="input-field" style={{ cursor: 'pointer' }}>
            <option>Immediate</option>
            <option>15 days</option>
            <option>1 month</option>
            <option>2 months</option>
            <option>3 months</option>
          </select>
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5F_LANGUAGES')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5f — LANGUAGES
// =============================================
const ALL_LANGS = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Urdu', 'Odia'];

export function LanguagesScreen() {
  const { navigate, back } = useRouter();
  const [selected, setSelected] = useState<string[]>(['English', 'Hindi']);

  const toggle = (l: string) => setSelected(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={6} total={6} label="Step 6 of 6 — Languages" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Globe size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Languages</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>Select languages you can speak or write for work.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ALL_LANGS.map(l => (
            <button key={l} className={`chip ${selected.includes(l) ? 'active' : ''}`} onClick={() => toggle(l)} aria-pressed={selected.includes(l)}>
              {selected.includes(l) && <Check size={12} strokeWidth={2.5} />} {l}
            </button>
          ))}
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C6_PROFILE_REVIEW')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C6 — PROFILE REVIEW
// =============================================
export function ProfileReviewScreen() {
  const { navigate, back } = useRouter();

  const sections = [
    { title: 'Education', items: ['B.Tech CS — VIT Vellore (2020)', 'Class 12 — CBSE (2016)'], complete: true },
    { title: 'Experience', items: ['Junior Developer — StartupX (2020–2022)'], complete: true },
    { title: 'Skills', items: ['React', 'Node.js', 'Communication', 'SQL'], complete: true },
    { title: 'Disability & accommodations', items: ['Locomotor (60%)', 'Wheelchair user', 'Accessible workplace needed'], complete: true },
    { title: 'Work preferences', items: ['Full-time', 'Hybrid', 'Bengaluru / Remote', '4–7 LPA'], complete: true },
    { title: 'Languages', items: ['English', 'Hindi', 'Telugu'], complete: true },
  ];

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="topbar-title text-h3 topbar-title-center">Review profile</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* Profile header preview */}
        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>P</div>
          <div>
            <p className="text-body" style={{ fontWeight: 700 }}>Priya Sharma</p>
            <p className="text-caption text-medium">Junior Software Developer</p>
            <span className="badge badge-verified" style={{ marginTop: 4 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verified</span>
          </div>
        </div>

        {sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h2 className="text-h3">{sec.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!sec.complete && <span className="badge badge-pending">Incomplete</span>}
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontSize: 'var(--caption)', fontWeight: 600 }}
                >
                  <Edit3 size={14} strokeWidth={2} /> Edit
                </button>
              </div>
            </div>
            <div className="card-surface">
              {sec.items.map((item, j) => (
                <p key={j} className="text-body" style={{ marginBottom: j < sec.items.length - 1 ? 4 : 0 }}>{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C7_CELEBRATION')} icon={<Check size={18} strokeWidth={2.5} />}>
          Looks good — finish
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  C7 — CELEBRATION
// =============================================
export function CelebrationScreen() {
  const { navigate } = useRouter();

  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)', background: 'linear-gradient(160deg, var(--surface) 0%, var(--surface) 100%)' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative' }}>
        {/* Floating confetti */}
        {['🎉', '⭐', '🎊', '✨', '🌟', '💚'].map((e, i) => (
          <span key={i} style={{
            position: 'fixed',
            fontSize: 24,
            animation: `confetti-fall ${2 + i * 0.4}s ease-out ${i * 0.3}s both`,
            left: `${[10, 25, 50, 70, 85, 40][i]}%`,
            top: 0,
            pointerEvents: 'none',
          }}>{e}</span>
        ))}

        <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        <div>
          <h1 className="text-h1" style={{ marginBottom: 12 }}>You're all set, Priya!</h1>
          <p className="text-body text-medium" style={{ lineHeight: 1.6 }}>
            Your verified profile is live. Employers can now discover and contact you. Let's find your next opportunity.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <Btn onClick={() => navigate('D1_HOME')} icon={<ArrowRight size={18} strokeWidth={2} />}>
            Explore jobs
          </Btn>
          <Btn variant="secondary" onClick={() => navigate('G1_CARE')}>
            Explore care & benefits
          </Btn>
        </div>
      </div>
    </div>
  );
}
