'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, Paperclip, Sparkles, Briefcase, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useRouter, useApp } from './context';
import { AppHeader, BottomNav } from './components';

// =============================================
//  DISHA AVATAR
// =============================================
function DishaAvatar({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <Bot size={size * 0.55} color="white" strokeWidth={1.8} />
    </div>
  );
}

// =============================================
//  INLINE JOB CARD (rendered inside chat)
// =============================================
function InlinJobCard({ title, company, location, type }: { title: string; company: string; location: string; type: string }) {
  const { navigate } = useRouter();
  return (
    <button
      onClick={() => navigate('E3_JOB_DETAIL')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        background: 'var(--base)',
        border: '1.5px solid var(--primary-50)',
        borderRadius: 10,
        padding: '10px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        marginTop: 4,
        transition: 'box-shadow 150ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(37,99,235,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-high)' }}>{title}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Briefcase size={11} color="var(--text-medium)" />
        <span style={{ fontSize: 12, color: 'var(--text-medium)' }}>{company}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={11} color="var(--text-medium)" />
          <span style={{ fontSize: 11, color: 'var(--text-medium)' }}>{location}</span>
        </div>
        <span style={{ fontSize: 11, background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 7px', borderRadius: 4, fontWeight: 600 }}>{type}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, color: 'var(--primary)', fontSize: 11, fontWeight: 600 }}>
        View details <ArrowRight size={10} />
      </div>
    </button>
  );
}

// =============================================
//  N1 — DISHA AI CHAT
// =============================================

type Message = {
  id: string;
  role: 'disha' | 'user';
  text?: string;
  chips?: string[];
  jobs?: { title: string; company: string; location: string; type: string }[];
};

const QUICK_CHIPS = [
  'Find me a job',
  'How\'s my application doing?',
  'Help me prepare for an interview',
  'Update my profile',
  'Explain a job to me',
  'I need some support',
];

function getDishaResponse(userMsg: string): Message {
  const lower = userMsg.toLowerCase();
  const id = Math.random().toString(36).slice(2);

  if (lower.includes('job') && (lower.includes('find') || lower.includes('search'))) {
    return {
      id,
      role: 'disha',
      text: 'On it! Based on your profile — locomotor disability, full-time, hybrid, Bengaluru — here are a couple of good matches:',
      jobs: [
        { title: 'Junior Software Developer', company: 'TCS Accessibility Hub', location: 'Bengaluru', type: 'Full-time' },
        { title: 'Data Entry Analyst', company: 'Infosys (PWD Cell)', location: 'Remote', type: 'Full-time' },
        { title: 'Customer Support Specialist', company: 'Accenture', location: 'Bengaluru', type: 'Hybrid' },
      ],
    };
  }

  if (lower.includes('application') || lower.includes('status')) {
    return {
      id,
      role: 'disha',
      text: 'Your most recent application is to **TCS Accessibility Hub** — they\'ve reviewed your profile and you\'re in the shortlisting stage. 🎉 Want me to open the full timeline?',
      chips: ['Yes, open timeline', 'Any other applications?'],
    };
  }

  if (lower.includes('interview') && lower.includes('prepare')) {
    return {
      id,
      role: 'disha',
      text: 'Happy to help you prep! I can either coach you with sample questions right here, or we can jump into Practice Mode for a full mock interview with feedback. What sounds good?',
      chips: ['Chat with me here', 'Start Practice Mode'],
    };
  }

  if (lower.includes('profile') || lower.includes('update')) {
    return {
      id,
      role: 'disha',
      text: 'Sure — which section would you like to update?',
      chips: ['Education', 'Experience', 'Skills', 'Work Preferences', 'Languages'],
    };
  }

  if (lower.includes('explain') || lower.includes('job to me')) {
    return {
      id,
      role: 'disha',
      text: 'Paste a job link or share the title and company — I\'ll break it down for you in plain language, including what the role actually involves day-to-day.',
      chips: [],
    };
  }

  if (lower.includes('support') || lower.includes('help')) {
    return {
      id,
      role: 'disha',
      text: 'Of course. I can help with job search, applications, and benefits. For anything emotional, medical, or urgent, I\'d rather connect you with a real person who can actually help. Would you like to speak with human support?',
      chips: ['Connect with support', 'I\'m okay, just had a question'],
    };
  }

  if (lower.includes('start practice mode') || lower.includes('practice mode')) {
    return {
      id,
      role: 'disha',
      text: 'Let\'s go! Heading to Practice Interview Mode now.',
      chips: [],
    };
  }

  return {
    id,
    role: 'disha',
    text: 'Got it — let me look into that for you. If I\'m not sure, I\'ll be honest and point you in the right direction.',
    chips: ['Search for a job', 'Check my applications', 'Talk to support'],
  };
}

export function DishaScreen() {
  const { navigate } = useRouter();
  const { state } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'disha',
      text: `Hi ${state.userName}! I'm Disha — here to help you find the right opportunity, prep for interviews, track applications, and more. What can I help you with today?`,
      chips: QUICK_CHIPS,
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Math.random().toString(36).slice(2), role: 'user', text: text.trim() };
    const dishaReply = getDishaResponse(text);

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate a short typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, dishaReply]);
      if (dishaReply.text?.includes('Practice Interview Mode')) {
        setTimeout(() => navigate('M3A_PRACTICE_SETUP'), 600);
      }
    }, 700);
  };

  return (
    <div
      className="screen"
      style={{
        background: 'var(--bg)',
        paddingBottom: 'calc(var(--bottomnav-h) + 64px)',
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--base)',
          borderBottom: '1px solid var(--surface)',
          padding: '0 16px',
          height: 'var(--topbar-h)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        <DishaAvatar size={32} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-high)', lineHeight: 1.2 }}>Disha</div>
          <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>● Online</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Sparkles size={18} color="var(--primary)" />
        </div>
      </header>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: 6,
              maxWidth: '100%',
            }}
          >
            {/* Bubble row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: '85%' }}>
              {msg.role === 'disha' && <DishaAvatar size={28} />}
              {msg.text && (
                <div
                  style={{
                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--base)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-high)',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {msg.text}
                </div>
              )}
            </div>

            {/* Inline job cards */}
            {msg.jobs && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '85%', marginLeft: 36 }}>
                {msg.jobs.map((job, i) => (
                  <InlinJobCard key={i} {...job} />
                ))}
              </div>
            )}

            {/* Quick-reply chips */}
            {msg.chips && msg.chips.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginLeft: msg.role === 'disha' ? 36 : 0,
                  marginTop: 2,
                }}
              >
                {msg.chips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: '1.5px solid var(--primary)',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 120ms',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer bar — fixed inside the screen, above bottom nav */}
      <div
        style={{
          position: 'fixed',
          bottom: 'var(--bottomnav-h)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 'var(--max-w)',
          padding: '10px 16px',
          background: 'var(--base)',
          borderTop: '1px solid var(--surface)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 150,
        }}
      >
        <button
          aria-label="Attach file"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-medium)', padding: 4, flexShrink: 0 }}
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask Disha anything..."
          style={{
            flex: 1,
            padding: '9px 14px',
            borderRadius: 22,
            border: '1.5px solid var(--surface)',
            background: 'var(--surface)',
            fontSize: 14,
            outline: 'none',
            fontFamily: 'var(--font-primary)',
          }}
        />
        {input.trim() ? (
          <button
            onClick={() => sendMessage(input)}
            aria-label="Send"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'transform 120ms',
            }}
          >
            <Send size={15} color="white" />
          </button>
        ) : (
          <button
            aria-label="Voice input"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1.5px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Mic size={15} color="var(--primary)" />
          </button>
        )}
      </div>

      <BottomNav active="disha" />
    </div>
  );
}
