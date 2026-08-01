'use client';
import React, { useState } from 'react';
import {
  Calendar, Users, HandHeart, Landmark, FileCheck2,
  Star, MapPin, Video, Clock, Check, Plus, ThumbsUp,
  MessageCircle, Flag, ChevronRight, Upload, Lock,
  FileText, Trash2, AlertTriangle, Phone, X, Info,
  ShieldCheck, ArrowRight, Accessibility
} from 'lucide-react';
import { useRouter } from './context';
import {  AppHeader, BottomNav, Btn, Badge, EmptyState, StarRating,
  SectionHeader, InfoCard, AccordionItem, Avatar , JargonText } from './components';
import { PROVIDERS, SCHEMES, COMMUNITY_POSTS, MENTORS } from './data';

// =============================================
//  G1 — CARE HOME
// =============================================
export function CareHomeScreen() {
  const { navigate } = useRouter();

  const tiles = [
    { icon: <Calendar size={28} strokeWidth={2} />, label: 'Book a session', desc: 'Therapy, counseling & consultations', screen: 'G2_THERAPY_LIST' as const, color: 'var(--surface)' },
    { icon: <Users size={28} strokeWidth={2} />, label: 'Community', desc: 'Connect with peers & mentors', screen: 'G6_COMMUNITY' as const, color: 'var(--surface)' },
    { icon: <HandHeart size={28} strokeWidth={2} />, label: 'Mentorship', desc: 'Find a mentor or become one', screen: 'G8_MENTORSHIP' as const, color: 'var(--surface)' },
    { icon: <Landmark size={28} strokeWidth={2} />, label: 'My benefits', desc: 'Schemes you\'re eligible for', screen: 'G9_BENEFITS' as const, color: 'var(--surface)' },
  ];

  return (
    <div className="screen screen-with-nav">
      <AppHeader title="Care" centerTitle showBack={false} />

      <div className="screen-content" style={{ paddingTop: 20, paddingBottom: 80 }}>
        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {tiles.map((tile, i) => (
            <button
              key={i}
              onClick={() => navigate(tile.screen)}
              style={{
                background: tile.color,
                borderRadius: 'var(--radius-card)',
                padding: 20,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                textAlign: 'left',
                transition: 'transform 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseLeave={e => (e.currentTarget.style.transform = '')}
            >
              <span style={{ color: 'var(--primary)' }}>{tile.icon}</span>
              <div>
                <p className="text-body" style={{ fontWeight: 700 }}>{tile.label}</p>
                <p className="text-caption text-medium" style={{ marginTop: 2 }}>{tile.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Upcoming bookings */}
        <SectionHeader title="Upcoming sessions" action={{ label: 'View all', onClick: () => navigate('G5_MY_BOOKINGS') }} />
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 28, cursor: 'pointer' }} onClick={() => navigate('G5_MY_BOOKINGS')}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
            <Video size={22} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-body" style={{ fontWeight: 700 }}>Counseling — Rahul Mehta</p>
            <p className="text-caption text-medium">Tomorrow, 4:00 PM • Video</p>
          </div>
          <ChevronRight size={16} strokeWidth={2} color="var(--text-disabled)" />
        </div>

        {/* Document vault shortcut */}
        <button
          onClick={() => navigate('G11_DOC_VAULT')}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            background: 'var(--surface)', borderRadius: 'var(--radius-card)',
            padding: 16, border: 'none', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <FileCheck2 size={22} strokeWidth={2} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <p className="text-body" style={{ fontWeight: 700 }}>Document vault</p>
            <p className="text-caption text-medium">5 documents stored securely</p>
          </div>
          <Lock size={14} strokeWidth={2} color="var(--text-disabled)" />
          <ChevronRight size={16} strokeWidth={2} color="var(--text-disabled)" />
        </button>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

// =============================================
//  G2 — THERAPY / COUNSELING LIST
// =============================================
const CATEGORIES = ['All', 'Physiotherapy', 'Occupational therapy', 'Speech therapy', 'Counseling', 'General doctor'];

export function TherapyListScreen() {
  const { navigate, back } = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROVIDERS
    : PROVIDERS.filter(p => p.specialty === activeCategory);

  return (
    <div className="screen">
      <AppHeader title="Book a session" />

      {/* Category filters */}
      <div style={{ borderBottom: '1px solid var(--surface)', paddingBottom: 10 }}>
        <div className="h-scroll" style={{ paddingInline: 16, paddingTop: 10 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Calendar size={36} strokeWidth={1.5} />}
            title="No providers in this category yet"
            body="Try video consults — available across all specialties."
            action={<Btn onClick={() => setActiveCategory('All')}>Show all</Btn>}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(p => (
              <button
                key={p.id}
                className="card"
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', background: 'var(--base)', border: 'none', textAlign: 'left', width: '100%' }}
                onClick={() => navigate('G3_PROVIDER')}
              >
                <div className="avatar avatar-lg" style={{ flexShrink: 0 }}>
                  <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="text-body" style={{ fontWeight: 700 }}>{p.name}</p>
                  <p className="text-caption text-medium" style={{ marginBottom: 6 }}>{p.specialty}</p>
                  <StarRating rating={p.rating} count={p.reviews} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    <span className="badge badge-neutral"><MapPin size={10} strokeWidth={2} /> {p.location.split(',')[0]}</span>
                    {p.mode.map(m => (
                      <span key={m} className="badge badge-primary">{m === 'Video' ? <><Video size={10} strokeWidth={2} /> Video</> : m}</span>
                    ))}
                  </div>
                  <p className="text-caption" style={{ color: 'var(--success)', fontWeight: 600, marginTop: 6 }}>
                    <Clock size={10} strokeWidth={2} /> Next: {p.nextSlot}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
//  G3 — PROVIDER DETAIL
// =============================================
export function ProviderDetailScreen() {
  const { navigate, back } = useRouter();
  const [mode, setMode] = useState<'Video' | 'In-person'>('Video');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const p = PROVIDERS[1];

  const slots = [
    'Today 4:00 PM', 'Today 5:30 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM', 'Thu 11:00 AM',
  ];

  return (
    <div className="screen">
      <AppHeader />

      <div className="screen-content" style={{ paddingTop: 20, paddingBottom: 100 }}>
        {/* Profile */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div className="avatar avatar-xl">
            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div>
            <h1 className="text-h2">{p.name}</h1>
            <p className="text-body text-medium">{p.specialty}</p>
            <StarRating rating={p.rating} count={p.reviews} />
          </div>
        </div>

        <p className="text-body text-medium" style={{ lineHeight: 1.7, marginBottom: 20 }}>{p.bio}</p>

        <InfoCard icon={<Accessibility size={14} strokeWidth={2} />} variant="success">
          {p.accessibility}
        </InfoCard>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <p className="text-overline text-medium" style={{ marginBottom: 8 }}>Languages</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {p.languages.map(l => <span key={l} className="badge badge-neutral">{l}</span>)}
          </div>
        </div>

        {/* Mode toggle */}
        <p className="text-h3" style={{ marginBottom: 12 }}>Session mode</p>
        <div className="segment-group" style={{ marginBottom: 20 }}>
          {p.mode.map(m => (
            <button key={m} className={`segment-btn ${mode === m ? 'active' : ''}`} onClick={() => setMode(m as any)}>{m}</button>
          ))}
        </div>

        {/* Available slots */}
        <p className="text-h3" style={{ marginBottom: 12 }}>Available slots</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {slots.map(slot => (
            <button
              key={slot}
              className={`chip ${selectedSlot === slot ? 'active' : ''}`}
              onClick={() => setSelectedSlot(slot)}
              aria-pressed={selectedSlot === slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <Btn disabled={!selectedSlot} onClick={() => navigate('G4_BOOK_CONFIRM')}>
          Book appointment
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  G4 — BOOKING CONFIRM
// =============================================
export function BookingConfirmScreen() {
  const { navigate, back } = useRouter();
  const p = PROVIDERS[1];
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      navigate('G5_MY_BOOKINGS');
    }, 1500);
  };

  return (
    <div className="screen">
      <AppHeader title="Confirm booking" centerTitle />

      <div className="screen-content" style={{ paddingTop: 24, paddingBottom: 100 }}>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div className="avatar avatar-md">
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div>
              <p className="text-body" style={{ fontWeight: 700 }}>{p.name}</p>
              <p className="text-caption text-medium">{p.specialty}</p>
            </div>
          </div>

          {[
            { label: 'Date & time', value: 'Today, 4:00 PM' },
            { label: 'Session type', value: 'Video consultation (45 min)' },
            { label: 'Platform', value: 'Google Meet (link sent to your email)' },
            { label: 'Cost', value: '₹400 (covered under CGHS)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--surface)' : 'none' }}>
              <span className="text-caption text-medium">{item.label}</span>
              <span className="text-body" style={{ fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>

        <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
          A reminder will be sent 30 minutes before your session.
        </InfoCard>
      </div>

      <div className="sticky-bottom-bar">
        <Btn loading={confirming} onClick={handleConfirm}>
          Confirm booking
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  G5 — MY BOOKINGS
// =============================================
export function MyBookingsScreen() {
  const { navigate, back } = useRouter();

  const bookings = [
    { name: 'Rahul Mehta', specialty: 'Counseling', date: 'Tomorrow, 4:00 PM', mode: 'Video', upcoming: true, photo: PROVIDERS[1].photo },
    { name: 'Dr. Ananya Krishnan', specialty: 'Physiotherapy', date: 'Sat, 2 Aug, 10:00 AM', mode: 'In-person', upcoming: true, photo: PROVIDERS[0].photo },
    { name: 'Dr. Meera Pillai', specialty: 'Speech Therapy', date: '15 Jul 2026, 2:00 PM', mode: 'Video', upcoming: false, photo: PROVIDERS[2].photo },
  ];

  return (
    <div className="screen">
      <AppHeader title="My bookings" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <p className="text-overline text-medium" style={{ marginBottom: 12 }}>Upcoming</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {bookings.filter(b => b.upcoming).map((b, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="avatar avatar-md">
                <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="text-body" style={{ fontWeight: 700 }}>{b.name}</p>
                <p className="text-caption text-medium">{b.specialty} • {b.date}</p>
                <span className="badge badge-primary" style={{ marginTop: 4 }}>
                  {b.mode === 'Video' ? <><Video size={10} strokeWidth={2} /> Video</> : <><MapPin size={10} strokeWidth={2} /> In-person</>}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button style={{ background: 'var(--primary-light)', border: 'none', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', color: 'var(--primary)', fontSize: 12, fontWeight: 600 }}>Reschedule</button>
                <button style={{ background: 'var(--error-light)', border: 'none', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', color: 'var(--error)', fontSize: 12, fontWeight: 600 }}>Cancel</button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-overline text-medium" style={{ marginBottom: 12 }}>Past sessions</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bookings.filter(b => !b.upcoming).map((b, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: 0.7 }}>
              <div className="avatar avatar-md">
                <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="text-body" style={{ fontWeight: 700 }}>{b.name}</p>
                <p className="text-caption text-medium">{b.date}</p>
              </div>
              <span className="badge badge-neutral">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================
//  G6 — COMMUNITY HOME
// =============================================
export function CommunityScreen() {
  const { navigate, back } = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  const tags = ['All', 'Locomotor', 'Visual', 'Hearing', 'Cognitive', 'Success stories', 'Questions', 'Benefits'];

  return (
    <div className="screen">
      <AppHeader title="Community" />

      {/* Community guidelines */}
      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--surface)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={12} strokeWidth={2} color="var(--primary)" />
        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 'var(--caption)', fontWeight: 600, cursor: 'pointer' }}>
          Community guidelines
        </button>
      </div>

      {/* Topic filter */}
      <div style={{ borderBottom: '1px solid var(--surface)', paddingBottom: 10 }}>
        <div className="h-scroll" style={{ paddingInline: 16, paddingTop: 10 }}>
          {tags.map(t => (
            <button key={t} className={`chip ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 80 }}>
        {COMMUNITY_POSTS.map(post => (
          <div key={post.id} className="card" style={{ marginBottom: 12, cursor: 'pointer' }} onClick={() => navigate('G7_THREAD')}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <div className="avatar avatar-sm">
                <img src={post.avatar} alt={post.author} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="text-body" style={{ fontWeight: 700 }}>{post.author}</p>
                <p className="text-caption text-medium">{post.time}</p>
              </div>
              <span className="badge badge-primary">{post.tag}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-disabled)' }} aria-label="Report post">
                <Flag size={14} strokeWidth={2} />
              </button>
            </div>
            <p className="text-body" style={{ lineHeight: 1.6, marginBottom: 12 }}>{post.content}</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-medium)', fontSize: 'var(--body)' }}>
                <ThumbsUp size={16} strokeWidth={2} /> {post.likes}
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-medium)', fontSize: 'var(--body)' }}>
                <MessageCircle size={16} strokeWidth={2} /> {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('G7_THREAD')}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--primary)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
          color: 'white',
          zIndex: 100,
        }}
        aria-label="Create new post"
      >
        <Plus size={24} strokeWidth={2} />
      </button>
    </div>
  );
}

// =============================================
//  G7 — FORUM THREAD
// =============================================
export function ThreadScreen() {
  const { back } = useRouter();
  const post = COMMUNITY_POSTS[0];
  const [reply, setReply] = useState('');

  const comments = [
    { author: 'Karthik S.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', time: '1h ago', text: 'Congratulations! Which role did you apply for?' },
    { author: 'Meena P.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face', time: '45m ago', text: 'This is so encouraging — thank you for sharing!' },
  ];

  return (
    <div className="screen">
      <AppHeader title="Post" />

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Original post */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div className="avatar avatar-md">
              <img src={post.avatar} alt={post.author} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div>
              <p className="text-body" style={{ fontWeight: 700 }}>{post.author}</p>
              <p className="text-caption text-medium">{post.time}</p>
            </div>
          </div>
          <p className="text-body" style={{ lineHeight: 1.7 }}>{post.content}</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>
              <ThumbsUp size={16} strokeWidth={2} fill="currentColor" /> {post.likes}
            </button>
          </div>
        </div>

        {/* Comments */}
        <p className="text-overline text-medium" style={{ marginBottom: 12 }}>{comments.length} replies</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {comments.map((c, i) => (
            <div key={i} className="card-surface" style={{ display: 'flex', gap: 10 }}>
              <div className="avatar avatar-sm" style={{ flexShrink: 0 }}>
                <img src={c.avatar} alt={c.author} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <p className="text-caption" style={{ fontWeight: 700 }}>{c.author}</p>
                  <p className="text-caption text-disabled">{c.time}</p>
                </div>
                <p className="text-body">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply input */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '12px 16px', background: 'var(--base)', borderTop: '1px solid var(--surface)', display: 'flex', gap: 8 }}>
        <input
          className="input-field"
          style={{ flex: 1, minHeight: 44, padding: '10px 14px' }}
          placeholder="Write a reply…"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button
          style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          aria-label="Send reply"
        >
          <ArrowRight size={20} strokeWidth={2} color="white" />
        </button>
      </div>
    </div>
  );
}

// =============================================
//  G8 — MENTORSHIP MATCHING
// =============================================
export function MentorshipScreen() {
  const { back } = useRouter();
  const [tab, setTab] = useState<'find' | 'become'>('find');
  const [becomeMentor, setBecomeMentor] = useState(false);

  return (
    <div className="screen">
      <AppHeader title="Mentorship" />

      <div style={{ padding: '8px 16px' }}>
        <div className="segment-group">
          <button className={`segment-btn ${tab === 'find' ? 'active' : ''}`} onClick={() => setTab('find')}>Find a mentor</button>
          <button className={`segment-btn ${tab === 'become' ? 'active' : ''}`} onClick={() => setTab('become')}>Become a mentor</button>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {tab === 'find' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MENTORS.map(m => (
              <div key={m.id} className="card" style={{ display: 'flex', gap: 12 }}>
                <div className="avatar avatar-lg" style={{ flexShrink: 0 }}>
                  <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="text-body" style={{ fontWeight: 700 }}>{m.name}</p>
                  <p className="text-caption text-medium" style={{ marginBottom: 8 }}>{m.role}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                    {m.tags.map(t => <span key={t} className="badge badge-neutral">{t}</span>)}
                  </div>
                  <p className="text-caption text-medium" style={{ marginBottom: 12 }}>{m.bio}</p>
                  <Btn size="sm" onClick={() => {}}>Request mentorship</Btn>
                </div>
              </div>
            ))}
            <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
              You can have up to 1 active mentorship request at a time. Mentors typically respond within 5–7 days.
            </InfoCard>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card">
              <h2 className="text-h3" style={{ marginBottom: 8 }}>Share your journey</h2>
              <p className="text-body text-medium" style={{ marginBottom: 16, lineHeight: 1.6 }}>
                As a verified working professional with a disability, you can mentor job seekers navigating similar paths. It's a chance to give back and build the community.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-body" style={{ fontWeight: 600 }}>Enable mentor profile</p>
                <label className="toggle">
                  <input type="checkbox" checked={becomeMentor} onChange={e => setBecomeMentor(e.target.checked)} />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>
            </div>
            {becomeMentor && (
              <div className="card-border" style={{ borderColor: 'var(--success)' }}>
                <p className="text-body" style={{ color: 'var(--success)', fontWeight: 700, marginBottom: 8 }}>
                  <Check size={16} strokeWidth={2.5} /> You're now listed as a mentor!
                </p>
                <p className="text-caption text-medium">Your profile will appear to job seekers matching your tags. You'll get a notification when someone requests mentorship.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
//  G9 — BENEFITS & SCHEMES TRACKER
// =============================================
export function BenefitsScreen() {
  const { navigate, back } = useRouter();

  return (
    <div className="screen">
      <AppHeader title="Your benefits" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <InfoCard icon={<ShieldCheck size={14} strokeWidth={2} />} variant="success">
          Schemes below are auto-matched to your UDID category (Locomotor, 60%) and state (Andhra Pradesh).
        </InfoCard>

        <p className="text-overline text-medium" style={{ margin: '20px 0 12px' }}>Eligible for you</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {SCHEMES.map(s => (
            <button
              key={s.id}
              className="card"
              style={{ cursor: 'pointer', background: 'var(--base)', border: 'none', textAlign: 'left', width: '100%' }}
              onClick={() => navigate('G10_SCHEME_DETAIL')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <p className="text-body" style={{ fontWeight: 700 }}>{s.name}</p>
                  <p className="text-caption text-medium" style={{ marginTop: 2 }}>{s.ministry}</p>
                </div>
                {s.status === 'applied'
                  ? <span className="badge badge-pending"><Clock size={10} strokeWidth={2} /> Applied</span>
                  : <span className="badge badge-success"><Check size={10} strokeWidth={2} /> Eligible</span>
                }
              </div>
              <p className="text-caption" style={{ color: 'var(--success)', fontWeight: 700, marginBottom: 6 }}>{s.amount}</p>
              <p className="text-body text-medium" style={{ lineHeight: 1.5 }}>{s.description}</p>
              <span className="badge badge-verified" style={{ marginTop: 8 }}>
                <ShieldCheck size={10} strokeWidth={2} /> {s.matchReason}
              </span>
            </button>
          ))}
        </div>

        <details>
          <summary style={{ cursor: 'pointer', color: 'var(--text-medium)', fontSize: 'var(--body)', fontWeight: 600, userSelect: 'none', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Schemes you may not be eligible for yet</span>
            <ChevronRight size={16} strokeWidth={2} />
          </summary>
          <p className="text-caption text-medium" style={{ marginTop: 8 }}>
            Schemes like DRDP and NHFDC loans require income certification — contact your district office to check eligibility.
          </p>
        </details>
      </div>
    </div>
  );
}

// =============================================
//  G10 — SCHEME DETAIL & APPLY
// =============================================
export function SchemeDetailScreen() {
  const { back } = useRouter();
  const scheme = SCHEMES[0];
  const [tracking, setTracking] = useState(false);

  const docsInVault = ['UDID card', 'Bank account details'];
  const docsMissing = scheme.documentsRequired.filter(d => !docsInVault.includes(d));

  return (
    <div className="screen">
      <AppHeader />

      <div className="screen-content" style={{ paddingTop: 16, paddingBottom: 100 }}>
        <span className="badge badge-verified" style={{ marginBottom: 12 }}>{scheme.ministry}</span>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>{scheme.name}</h1>
        <p className="text-caption" style={{ color: 'var(--success)', fontWeight: 700, fontSize: 'var(--body-l)', marginBottom: 16 }}>{scheme.amount}</p>
        <p className="text-body text-medium" style={{ lineHeight: 1.7, marginBottom: 24 }}>{scheme.description}</p>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Eligibility</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {scheme.eligibility.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Check size={16} strokeWidth={2.5} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
              <p className="text-body">{e}</p>
            </div>
          ))}
        </div>

        <h2 className="text-h3" style={{ marginBottom: 12 }}>Documents needed</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {scheme.documentsRequired.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {docsInVault.includes(d)
                ? <Check size={16} strokeWidth={2.5} color="var(--success)" />
                : <AlertTriangle size={16} strokeWidth={2} color="var(--warning)" />
              }
              <p className="text-body">{d}</p>
              {docsInVault.includes(d)
                ? <span className="badge badge-verified">In vault</span>
                : <span className="badge badge-pending">Upload needed</span>
              }
            </div>
          ))}
        </div>

        {/* Track toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--surface)' }}>
          <div>
            <p className="text-body" style={{ fontWeight: 700 }}>Track this application</p>
            <p className="text-caption text-medium">Add to your benefits checklist</p>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={tracking} onChange={e => setTracking(e.target.checked)} />
            <span className="toggle-track" />
            <span className="toggle-thumb" />
          </label>
        </div>
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {docsMissing.length > 0 && (
          <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="warning">
            Upload {docsMissing.join(', ')} to your vault before applying.
          </InfoCard>
        )}
        <Btn icon={<ArrowRight size={18} strokeWidth={2} />} onClick={() => window.open(scheme.applyLink, '_blank')}>
          Apply on official portal
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  G11 — DOCUMENT VAULT
// =============================================
export function DocVaultScreen() {
  const { back } = useRouter();

  const docs = [
    { name: 'UDID Card', category: 'Disability', date: '15 Mar 2021', type: 'pdf', verified: true },
    { name: 'Aadhaar Card', category: 'Identity', date: '10 Jan 2019', type: 'img', verified: true },
    { name: 'B.Tech Degree Certificate', category: 'Education', date: '1 Jun 2020', type: 'pdf', verified: false },
    { name: 'Income Certificate', category: 'Financial', date: '5 Jul 2026', type: 'pdf', verified: false },
    { name: 'Disability Certificate (old)', category: 'Disability', date: '3 Aug 2015', type: 'pdf', verified: false },
  ];

  const categories = [...new Set(docs.map(d => d.category))];

  return (
    <div className="screen">
      <AppHeader title="Document vault" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <InfoCard icon={<Lock size={14} strokeWidth={2} />} variant="info">
          Stored securely with AES-256 encryption. Only shared with your explicit consent.
        </InfoCard>

        {categories.map(cat => (
          <div key={cat} style={{ marginTop: 20 }}>
            <p className="text-overline text-medium" style={{ marginBottom: 10 }}>{cat}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.filter(d => d.category === cat).map((doc, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: doc.verified ? 'var(--success-light)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {doc.verified
                      ? <FileCheck2 size={20} strokeWidth={2} color="var(--success)" />
                      : <FileText size={20} strokeWidth={2} color="var(--text-medium)" />
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="text-body" style={{ fontWeight: 700 }}>{doc.name}</p>
                    <p className="text-caption text-medium">Uploaded {doc.date} • {doc.type.toUpperCase()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="View document">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'var(--error-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Delete document">
                      <Trash2 size={14} strokeWidth={2} color="var(--error)" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
