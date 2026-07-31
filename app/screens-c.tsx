'use client';
import React, { useState } from 'react';
import {
  Link2, FileText, Edit3, GraduationCap, Briefcase, Award,
  Accessibility, Plus, Trash2, Check, ArrowRight, Upload, FileCheck2,
  IndianRupee, MapPin, Globe, Info, AlertTriangle, Sparkles,
  Volume2, PenLine, HeartHandshake
} from 'lucide-react';
import { useRouter, useApp } from './context';
import { Btn, Stepper, InfoCard, Badge, ToggleRow, FillWithAIButton } from './components';

// =============================================
//  C1 — PROFILE SETUP CHOICE
// =============================================
export function ProfileChoiceScreen() {
  const { navigate } = useRouter();

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

        {/* School certificates */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <h2 className="text-h3" style={{ marginBottom: 4 }}>School certificates</h2>
          <p className="text-caption text-medium" style={{ marginBottom: 16 }}>Optional but helps your profile stand out.</p>
          {[
            { label: '10th (Secondary) Certificate', id: 'cert10' },
            { label: '12th (Senior Secondary) Certificate', id: 'cert12' },
          ].map(cert => (
            <div key={cert.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border, #E2E8F0)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileCheck2 size={18} color="var(--primary)" />
                <span className="text-body" style={{ fontSize: 13 }}>{cert.label}</span>
              </div>
              <button
                style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, background: 'none', border: '1px solid var(--primary)', padding: '4px 10px', borderRadius: 6, cursor: 'pointer' }}
              >
                Add later
              </button>
            </div>
          ))}
        </div>

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
              <div className="input-group" style={{ marginTop: 4 }}>
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileCheck2 size={13} strokeWidth={2} color="var(--text-medium)" />
                  Proof of employment (optional)
                </label>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: '1.5px dashed var(--primary)', borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                  <Upload size={14} />
                  Add offer letter / payslip / experience letter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sticky-bottom-bar">
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="secondary" icon={<Plus size={16} />} style={{ flex: 1 }} onClick={() => {}}>Add another</Btn>
              <Btn style={{ flex: 1 }} onClick={() => navigate('C5C_SKILLS')}>Continue</Btn>
            </div>
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
  const [devices, setDevices] = useState<string[]>([]);
  const [accom, setAccom] = useState<string[]>(['Accessible workplace']);

  const toggleSet = (set: string[], setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setFn(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ flex: 1 }} />
        <FillWithAIButton
          pageTitle="Disability & Accommodations"
          fields={['Assistive devices', 'Workplace accommodations']}
          onFill={(vals) => {
            if (vals['Assistive devices']) setDevices([vals['Assistive devices']]);
            if (vals['Workplace accommodations']) setAccom([vals['Workplace accommodations']]);
          }}
        />
        <div style={{ width: 8 }} />
      </header>
      <Stepper current={4} total={7} label="Step 4 of 7 — Disability & Accommodations" />

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
            <span className="badge badge-primary" style={{ background: 'var(--surface)', color: 'var(--text-medium)' }}>60% — From your UDID record</span>
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
const INDIAN_CITIES = ['Ahmedabad', 'Bengaluru', 'Bhopal', 'Chennai', 'Coimbatore', 'Delhi', 'Gurgaon', 'Hyderabad', 'Indore', 'Jaipur', 'Kochi', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Noida', 'Patna', 'Pune', 'Remote', 'Surat', 'Vadodara', 'Visakhapatnam'];

export function PreferencesScreen() {
  const { navigate, back } = useRouter();
  const [jobTypes, setJobTypes] = useState<string[]>(['Full-time']);
  const [mode, setMode] = useState('Hybrid');
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [city3, setCity3] = useState('');

  const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Apprenticeship', 'Govt. reservation post'];
  const MODES = ['Remote', 'Hybrid', 'On-site'];

  const toggleType = (t: string) =>
    setJobTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const cityOptions = (exclude: string[]) => INDIAN_CITIES.filter(c => !exclude.filter(Boolean).includes(c));

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={5} total={7} label="Step 5 of 7 — Work preferences" />

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

        <h2 className="text-h3" style={{ marginBottom: 4 }}>Preferred cities</h2>
        <p className="text-caption text-medium" style={{ marginBottom: 16 }}>Adding a couple more helps us find you more matches.</p>
        {[
          { label: '1st choice city', value: city1, set: setCity1, exclude: [city2, city3], required: true },
          { label: '2nd choice city', value: city2, set: setCity2, exclude: [city1, city3], required: false },
          { label: '3rd choice city', value: city3, set: setCity3, exclude: [city1, city2], required: false },
        ].map((slot, i) => (
          <div key={i} className="input-group" style={{ marginBottom: 12 }}>
            <label className="input-label">
              {slot.label} {slot.required && <span style={{ color: 'var(--error)' }}>*</span>}
            </label>
            <select
              className="input-field"
              value={slot.value}
              onChange={e => slot.set(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select a city</option>
              {cityOptions(slot.exclude).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        ))}

        <div className="input-group" style={{ marginBottom: 20, marginTop: 16 }}>
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
  const [speak, setSpeak] = useState<string[]>(['English', 'Hindi']);
  const [write, setWrite] = useState<string[]>(['English']);
  const [appLang, setAppLang] = useState('English');

  const toggleSpeak = (l: string) => setSpeak(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
  const toggleWrite = (l: string) => setWrite(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={6} total={7} label="Step 6 of 7 — Languages" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Globe size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Languages</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 28 }}>Help employers know how you communicate.</p>

        {/* Speak */}
        <div style={{ marginBottom: 28 }}>
          <h2 className="text-h3" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Volume2 size={18} color="var(--primary)" /> Languages you can speak
          </h2>
          <p className="text-caption text-medium" style={{ marginBottom: 12 }}>For verbal interviews and calls</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_LANGS.map(l => (
              <button key={l} className={`chip ${speak.includes(l) ? 'active' : ''}`} onClick={() => toggleSpeak(l)} aria-pressed={speak.includes(l)}>
                {speak.includes(l) && <Check size={12} strokeWidth={2.5} />} {l}
              </button>
            ))}
          </div>
        </div>

        {/* Write */}
        <div style={{ marginBottom: 28 }}>
          <h2 className="text-h3" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <PenLine size={18} color="var(--primary)" /> Languages you can write
          </h2>
          <p className="text-caption text-medium" style={{ marginBottom: 12 }}>For emails, reports, and written communication</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_LANGS.map(l => (
              <button key={l} className={`chip ${write.includes(l) ? 'active' : ''}`} onClick={() => toggleWrite(l)} aria-pressed={write.includes(l)}>
                {write.includes(l) && <Check size={12} strokeWidth={2.5} />} {l}
              </button>
            ))}
          </div>
        </div>

        {/* App language preference */}
        <div className="input-group" style={{ background: 'var(--surface)', padding: 14, borderRadius: 10 }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Globe size={14} color="var(--text-medium)" /> App language preference
          </label>
          <select className="input-field" value={appLang} onChange={e => setAppLang(e.target.value)} style={{ cursor: 'pointer', marginTop: 6 }}>
            {ALL_LANGS.map(l => <option key={l}>{l}</option>)}
          </select>
          <p className="text-caption text-medium" style={{ marginTop: 6 }}>This changes the app's display language only.</p>
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('C5G_GUARDIAN')}>Continue</Btn>
      </div>
    </div>
  );
}

// =============================================
//  C5g — GUARDIAN / SUPPORT CONTACT
// =============================================
export function GuardianScreen() {
  const { navigate, back } = useRouter();
  const { setState } = useApp();
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    if (name || phone) {
      setState(s => ({ ...s, guardian: { name, relation, phone, email, address } }));
    }
    navigate('C6_PROFILE_REVIEW');
  };

  return (
    <div className="screen">
      <header className="topbar">
        <button className="topbar-back-btn" onClick={back} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </header>
      <Stepper current={7} total={7} label="Step 7 of 7 — Support Contact" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <HeartHandshake size={24} strokeWidth={2} color="var(--primary)" />
          <h1 className="text-h2">Is there someone we should be able to reach if needed?</h1>
        </div>
        <p className="text-body text-medium" style={{ marginBottom: 8 }}>
          This is just a contact for support — it doesn't give them access to your account.
        </p>
        <button
          onClick={() => navigate('K1_SAATHI_ENTRY')}
          style={{ fontSize: 12, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, textDecoration: 'underline' }}
        >
          Looking to let someone manage your account? Set up Saathi Mode →
        </button>

        <div className="input-group">
          <label className="input-label">Contact name</label>
          <input className="input-field" placeholder="e.g. Ramesh Sharma" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label className="input-label">Relationship</label>
          <select className="input-field" value={relation} onChange={e => setRelation(e.target.value)} style={{ cursor: 'pointer' }}>
            <option value="">Select relationship</option>
            <option>Parent</option>
            <option>Sibling</option>
            <option>Spouse</option>
            <option>Caregiver</option>
            <option>Other</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Phone number</label>
          <input className="input-field" placeholder="e.g. 9876543210" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <div className="input-group">
          <label className="input-label">Email (optional)</label>
          <input className="input-field" placeholder="e.g. ramesh@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label className="input-label">Address (optional)</label>
          <input className="input-field" placeholder="City, State" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <Btn onClick={handleSave}>Save & continue</Btn>
        <Btn variant="ghost" onClick={() => navigate('C6_PROFILE_REVIEW')} style={{ marginTop: 8 }}>Skip for now</Btn>
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
    { title: 'Support contact', items: ['Ramesh Sharma (Parent) — 9876543210'], complete: true },
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
        {['🎉', '⭐', '🎊', '✨', '🌟', '💙'].map((e, i) => (
          <span key={i} style={{
            position: 'absolute',
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

        <div style={{ width: '100%' }}>
          <Btn onClick={() => navigate('E1_JOBS')} icon={<ArrowRight size={18} strokeWidth={2} />}>
            Explore jobs
          </Btn>
        </div>
      </div>
    </div>
  );
}
