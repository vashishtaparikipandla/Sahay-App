'use client';
import React, { useState } from 'react';
import {
  HeartHandshake, Users, ShieldCheck, FileCheck2, Eye, Send, Settings2,
  Mic, Video, LayoutGrid, BookOpen, MousePointerClick, Wind, Volume2,
  Sparkles, MessageCircleQuestion, Receipt, MapPin, Search, Plus, Info
} from 'lucide-react';
import { useRouter, useApp } from './context';
import { DishaFAB, AppHeader, TopBar, Btn, InfoCard, SettingRow, AccordionItem, Badge, BottomNav } from './components';

// =============================================
//  K1 — SAATHI ENTRY
// =============================================
export function SaathiEntryScreen() {
  const { navigate, back } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Proxy Setup" />
      <div className="content">
        <HeartHandshake size={48} color="var(--primary)" style={{ marginBottom: 24 }} />
        <h2 className="text-h2" style={{ marginBottom: 12 }}>You're helping someone access Sahay</h2>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>
          As a Saathi (companion), you can manage this account on behalf of someone who needs assistance, without replacing their own identity.
        </p>
        <Btn onClick={() => navigate('K2_CONSENT')}>Get started</Btn>
      </div>
    </div>
  );
}

// =============================================
//  K2 — CONSENT
// =============================================
export function SaathiConsentScreen() {
  const { navigate, back } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Verification" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 24 }}>Relationship & Consent</h2>
        
        <div className="input-group">
          <label className="input-label">Your Name</label>
          <input className="input" placeholder="Enter your full name" />
        </div>
        <div className="input-group">
          <label className="input-label">Your Mobile Number (Aadhaar linked)</label>
          <input className="input" placeholder="e.g. 9876543210" type="tel" />
        </div>
        <div className="input-group">
          <label className="input-label">Relationship to Applicant</label>
          <select className="input">
            <option>Parent</option>
            <option>Sibling</option>
            <option>Spouse</option>
            <option>Appointed Guardian</option>
            <option>Professional Caregiver</option>
            <option>NGO Worker</option>
          </select>
        </div>

        <InfoCard icon={<ShieldCheck size={20} color="var(--primary)" />}>
          <strong>Consent Required</strong><br />
          You must upload a legal guardian order or agree to the family declaration.
        </InfoCard>
        
        <div style={{ marginTop: 24 }}>
          <Btn onClick={() => navigate('K3_TIER')}>Continue</Btn>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  K3 — PERMISSION TIER
// =============================================
export function SaathiTierScreen() {
  const { navigate, back } = useRouter();
  const { setState } = useApp();
  
  const selectTier = (tier: 'view' | 'apply' | 'full') => {
    setState(s => ({ ...s, saathi: { enabled: true, handlerName: 'Saathi', relation: 'Guardian', tier } }));
    navigate('K4_PROFILE');
  };

  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Permissions" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 24 }}>Choose your access level</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" onClick={() => selectTier('view')}>
            <Eye size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
            <h3 className="text-h3">View-only</h3>
            <p className="text-body-s text-medium">See profile, applications, and status. Cannot apply or manage.</p>
          </div>
          
          <div className="card" onClick={() => selectTier('apply')}>
            <Send size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
            <h3 className="text-h3">Apply on behalf</h3>
            <p className="text-body-s text-medium">Can submit applications and schedule interviews. Cannot edit profile.</p>
          </div>
          
          <div className="card" onClick={() => selectTier('full')}>
            <Settings2 size={24} color="var(--primary)" style={{ marginBottom: 8 }} />
            <h3 className="text-h3">Full management</h3>
            <p className="text-body-s text-medium">Can edit profile and manage bookings. Cannot change verified Aadhaar/UDID data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  K4 — PROFILE CREATION (SAATHI)
// =============================================
export function SaathiProfileScreen() {
  const { navigate } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <div className="content center-all text-center">
        <Users size={48} color="var(--primary)" style={{ marginBottom: 24 }} />
        <h2 className="text-h2">Setup Profile</h2>
        <p className="text-body text-medium" style={{ margin: '16px 0' }}>
          Now you will set up the profile for the applicant using their Aadhaar/UDID.
        </p>
        <Btn onClick={() => navigate('B1_VERIFY_INTRO')}>Start Verification</Btn>
      </div>
    </div>
  );
}

// =============================================
//  K7 — SAATHI REVIEW
// =============================================
export function SaathiReviewScreen() {
  const { back, navigate } = useRouter();
  const { state, setState } = useApp();
  
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Manage Saathi" />
      <div className="content">
        <InfoCard icon={<Users size={20} />}>
          <strong>Managing on behalf of {state.userName}</strong><br />
          Current Access: {state.saathi.tier.toUpperCase()}
        </InfoCard>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn variant="secondary" onClick={() => navigate('K3_TIER')}>Change Access Tier</Btn>
          <Btn variant="danger" onClick={() => {
            setState(s => ({ ...s, saathi: { enabled: false, handlerName: '', relation: '', tier: 'view' } }));
            navigate('I1_PROFILE');
          }}>Revoke Access</Btn>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  L1 — MODES
// =============================================
export function ModesScreen() {
  const { navigate } = useRouter();
  const { state, setState } = useApp();
  
  const toggle = (key: keyof typeof state.experienceModes) => {
    setState(s => ({
      ...s,
      experienceModes: { ...s.experienceModes, [key]: !s.experienceModes[key] }
    }));
  };
  
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Experience Settings" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 12 }}>Anything we should set up for you?</h2>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>You can turn these on or off at any time.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ModeCard icon={<Mic />} title="Voice-First" desc="Voice navigation & audio jobs" active={state.experienceModes.voiceFirst} onClick={() => toggle('voiceFirst')} />
          <ModeCard icon={<Video />} title="Sign Language" desc="ISL video explainers" active={state.experienceModes.signLanguage} onClick={() => toggle('signLanguage')} />
          <ModeCard icon={<LayoutGrid />} title="Symbol Input" desc="Picture-word tiles" active={state.experienceModes.aac} onClick={() => toggle('aac')} />
          <ModeCard icon={<BookOpen />} title="Easy Read" desc="Simple language & no timers" active={state.experienceModes.easyRead} onClick={() => toggle('easyRead')} />
          <ModeCard icon={<MousePointerClick />} title="Switch Control" desc="Large targets, no swipes" active={state.experienceModes.switchControl} onClick={() => toggle('switchControl')} />
          <ModeCard icon={<Wind />} title="Calm Mode" desc="No countdowns, batch alerts" active={state.experienceModes.calmMode} onClick={() => toggle('calmMode')} />
        </div>
        
        <div style={{ marginTop: 24 }}>
          <Btn onClick={() => navigate('C1_PROFILE_CHOICE')}>Continue</Btn>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ icon, title, desc, active, onClick }: any) {
  return (
    <div className="card" onClick={onClick} style={{ border: active ? '2px solid var(--primary)' : '1px solid var(--border)', cursor: 'pointer', padding: 16 }}>
      <div style={{ color: active ? 'var(--primary)' : 'var(--text-medium)', marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--text-medium)', marginTop: 4 }}>{desc}</div>
    </div>
  );
}

// =============================================
//  M-SERIES (Differentiators)
// =============================================
export function ReviewScreen() {
  const { back } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Accessibility Review" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 24 }}>How accessible was this employer?</h2>
        <p className="text-body text-medium mb-4">Your review is anonymized to protect you.</p>
        <div className="card mb-4">
          <h3 className="font-bold mb-2">Physical Accessibility</h3>
          <div style={{ display: 'flex', gap: 8 }}><Sparkles color="gold" /><Sparkles color="gold" /><Sparkles color="gold" /><Sparkles color="gold" /><Sparkles color="var(--border)" /></div>
        </div>
        <textarea className="input" rows={4} placeholder="Any specific feedback?" />
        <div style={{ marginTop: 24 }}><Btn onClick={back}>Submit Review</Btn></div>
      </div>
    </div>
  );
}

export function PracticeSetupScreen() {
  const { navigate, back } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Practice Interview" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 24 }}>Setup your mock interview</h2>
        <div className="input-group">
          <label className="input-label">Role Type</label>
          <select className="input"><option>Customer Support</option><option>Data Entry</option></select>
        </div>
        <Btn onClick={() => navigate('M3B_PRACTICE_SESSION')}>Start Session</Btn>
      </div>
    </div>
  );
}

export function PracticeSessionScreen() {
  const { navigate } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Mock Interview" />
      <div className="content center-all text-center">
        <Video size={64} color="var(--primary)" />
        <h2 className="text-h2 mt-4">Interview in progress...</h2>
        <Btn variant="danger" onClick={() => navigate('M3C_PRACTICE_FEEDBACK')} style={{ marginTop: 24 }}>End Session</Btn>
      </div>
    </div>
  );
}

export function PracticeFeedbackScreen() {
  const { navigate } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Feedback" />
      <div className="content">
        <InfoCard icon={<Sparkles color="gold" />}>
          <strong>What went well</strong><br />
          You spoke clearly and answered the technical questions perfectly.
        </InfoCard>
        <div style={{ marginTop: 12 }}>
          <InfoCard icon={<Info />}>
            <strong>One thing to try next time</strong><br />
            Take a short pause before answering to gather your thoughts.
          </InfoCard>
        </div>
        <div style={{ marginTop: 24 }}><Btn onClick={() => navigate('G1_CARE')}>Done</Btn></div>
      </div>
    </div>
  );
}

export function TravelRequestScreen() {
  const { back } = useRouter();
  return (
    <div className="screen bg-base pb-safe">
      <TopBar title="Travel Support" />
      <div className="content">
        <h2 className="text-h2" style={{ marginBottom: 12 }}>Accessible Transport</h2>
        <p className="text-body text-medium mb-4">Request a ride or reimbursement for your upcoming interview.</p>
        <div className="card mb-4">
          <h3 className="font-bold">Upcoming: Support Executive</h3>
          <p className="text-sm text-medium">Oct 15, 10:00 AM at TechCorp Office</p>
        </div>
        <Btn style={{ marginBottom: 12 }}>Request Accessible Cab</Btn>
        <Btn variant="secondary">Upload Reimbursement Receipt</Btn>
      </div>
    </div>
  );
}
