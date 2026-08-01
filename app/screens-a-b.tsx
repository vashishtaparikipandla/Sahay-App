'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Globe, Check, ArrowRight, Phone, ShieldCheck, Camera,
  FileText, Lock, Info, AlertTriangle, Upload, RefreshCw,
  MessageCircle, IdCard, ChevronDown, ChevronUp, MapPin
} from 'lucide-react';
import { useRouter, useApp } from './context';
import { DishaFAB, AppHeader, Btn, OTPInput, Stepper, InfoCard, AccordionItem } from './components';

// =============================================
//  A1 — SPLASH SCREEN
// =============================================
export function SplashScreen() {
  const { navigate } = useRouter();
  const { setState } = useApp();

  return (
    <div
      className="screen"
      style={{
        background: 'linear-gradient(160deg, #2563EB 0%, #1D4ED8 50%, #1E3A8A 100%)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 24,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8z" fill="rgba(255,255,255,0.15)" />
          <path d="M18 24l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 14v4M24 30v4M14 24h4M30 24h4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: 'white', letterSpacing: '-0.5px', lineHeight: 1 }}>Sahay</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--body)', marginTop: 6 }}>सहाय</p>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--body-l)', textAlign: 'center', maxWidth: 240, marginBottom: 24 }}>
        Your ability, your opportunity.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', padding: '0 24px' }}>
        <button
          onClick={() => navigate('A2_LANGUAGE')}
          style={{ background: 'white', color: '#1D4ED8', padding: '14px', borderRadius: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// =============================================
//  A2 — LANGUAGE SELECT
// =============================================
const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export function LanguageScreen() {
  const { navigate } = useRouter();
  const { setState } = useApp();
  const [selected, setSelected] = useState('en');

  const handleContinue = () => {
    const lang = LANGUAGES.find(l => l.code === selected);
    setState(s => ({ ...s, language: lang?.label || 'English' }));
    navigate('A3_ONBOARDING');
  };

  return (
    <div className="screen">
      <header className="topbar" style={{ borderBottom: 'none' }}>
        <Globe size={22} strokeWidth={2} color="var(--primary)" aria-hidden="true" />
        <h1 className="topbar-title text-h3">Choose your language</h1>
        <div style={{ width: 40 }} />
      </header>
      <div className="screen-content" style={{ padding: '0 var(--content-mx)', paddingBottom: 100 }}>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>
          You can change this anytime in settings.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`language-card ${selected === lang.code ? 'selected' : ''}`}
              onClick={() => setSelected(lang.code)}
              aria-pressed={selected === lang.code}
            >
              <div>
                <div className="text-body" style={{ fontWeight: 700 }}>{lang.native}</div>
                <div className="text-caption text-medium">{lang.label}</div>
              </div>
              {selected === lang.code && (
                <Check size={18} strokeWidth={2.5} color="var(--primary)" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="sticky-bottom-bar">
        <Btn onClick={handleContinue} disabled={!selected} icon={<ArrowRight size={18} strokeWidth={2} />}>
          Continue
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  A3 — ONBOARDING CAROUSEL
// =============================================
const SLIDES = [
  {
    title: 'Jobs built around your ability',
    body: 'Discover verified employers who offer accessible workplaces, accommodation support, and flexible arrangements — tailored to how you work best.',
    color: 'var(--surface)',
    svgColor: '#2563EB',
    svg: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 160 }}>
        <rect x="20" y="40" width="160" height="100" rx="12" fill="#2563EB" opacity="0.1"/>
        <rect x="40" y="20" width="120" height="80" rx="10" fill="#2563EB" opacity="0.18"/>
        <rect x="60" y="60" width="80" height="50" rx="8" fill="#2563EB" opacity="0.9"/>
        <circle cx="140" cy="50" r="20" fill="#F2A93B" opacity="0.9"/>
        <path d="M133 50l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="68" y="72" width="30" height="4" rx="2" fill="white" opacity="0.8"/>
        <rect x="68" y="80" width="20" height="3" rx="1.5" fill="white" opacity="0.5"/>
        <rect x="68" y="88" width="25" height="3" rx="1.5" fill="white" opacity="0.5"/>
        <circle cx="110" cy="80" r="12" fill="white" opacity="0.15"/>
        <path d="M106 80l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Verified, so employers trust you instantly',
    body: 'Your Aadhaar and UDID verification creates a trusted profile. No more explaining your disability repeatedly — your credentials speak for you.',
    color: 'var(--surface)',
    svgColor: '#F2A93B',
    svg: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 160 }}>
        <rect x="30" y="30" width="140" height="100" rx="16" fill="#F2A93B" opacity="0.15"/>
        <rect x="50" y="50" width="100" height="65" rx="10" fill="white" stroke="#F2A93B" strokeWidth="1.5"/>
        <circle cx="100" cy="75" r="18" fill="#2563EB" opacity="0.12"/>
        <circle cx="100" cy="75" r="12" fill="#2563EB"/>
        <path d="M95 75l3 3 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="62" y="100" width="76" height="4" rx="2" fill="#E7EEED"/>
        <rect x="72" y="108" width="56" height="3" rx="1.5" fill="#E7EEED"/>
        <circle cx="150" cy="40" r="16" fill="#F2A93B"/>
        <path d="M143 40l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Care and community, not just a job board',
    body: 'Book therapy sessions, connect with mentors who\'ve walked your path, track government benefits you\'re entitled to, and find your community.',
    color: 'var(--surface)',
    svgColor: '#1E8E5A',
    svg: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 160 }}>
        <circle cx="60" cy="70" r="28" fill="#1E8E5A" opacity="0.12"/>
        <circle cx="140" cy="70" r="28" fill="#2563EB" opacity="0.12"/>
        <circle cx="100" cy="55" r="28" fill="#F2A93B" opacity="0.12"/>
        <circle cx="60" cy="70" r="18" fill="#1E8E5A" opacity="0.8"/>
        <circle cx="140" cy="70" r="18" fill="#2563EB" opacity="0.8"/>
        <circle cx="100" cy="50" r="18" fill="#F2A93B" opacity="0.9"/>
        <path d="M97 50l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M57 70l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M137 70l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="30" y="110" width="140" height="28" rx="12" fill="#2563EB" opacity="0.1"/>
        <rect x="50" y="118" width="40" height="4" rx="2" fill="#2563EB" opacity="0.4"/>
        <rect x="110" y="118" width="40" height="4" rx="2" fill="#2563EB" opacity="0.4"/>
        <rect x="75" y="126" width="50" height="4" rx="2" fill="#2563EB" opacity="0.4"/>
      </svg>
    ),
  },
];

export function OnboardingScreen() {
  const { navigate } = useRouter();
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    setCurrent(i);
    scrollRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
    setCurrent(idx);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 16px' }}>
        {current < 2 && (
          <button
            className="btn btn-ghost btn-sm"
            style={{ width: 'auto', padding: '4px 12px' }}
            onClick={() => navigate('A4_SIGNIN')}
          >
            Skip
          </button>
        )}
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="carousel-container"
        onScroll={handleScroll}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="carousel-slide"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 32px',
              gap: 32,
              background: slide.color,
            }}
          >
            <div
              style={{
                width: 220,
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {slide.svg}
            </div>
            <div style={{ textAlign: 'center', maxWidth: 320 }}>
              <h2 className="text-h2" style={{ color: 'var(--text-high)', marginBottom: 12 }}>{slide.title}</h2>
              <p className="text-body-l text-medium" style={{ lineHeight: 1.6 }}>{slide.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ padding: '24px 16px 12px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div className="dot-pagination">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`dot ${current === i ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={current === i}
            />
          ))}
        </div>
        {current === 2 ? (
          <Btn onClick={() => navigate('A4_SIGNIN')} icon={<ArrowRight size={18} strokeWidth={2} />}>
            Get started
          </Btn>
        ) : (
          <Btn onClick={() => goTo(current + 1)} icon={<ArrowRight size={18} strokeWidth={2} />}>
            Next
          </Btn>
        )}
      </div>
    </div>
  );
}

// =============================================
//  A4 — SIGN IN / SIGN UP ENTRY
// =============================================
export function SignInScreen() {
  const { navigate } = useRouter();
  return (
    <div className="screen" style={{ justifyContent: 'center', padding: '0 var(--content-mx)' }}>
      {/* Logo */}
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
            <path d="M18 24l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 14v4M24 30v4M14 24h4M30 24h4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-h1" style={{ textAlign: 'center' }}>Welcome to Sahay</h1>
        <p className="text-body text-medium" style={{ textAlign: 'center' }}>
          India's platform for jobs and care for persons with disabilities.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn icon={<Phone size={18} strokeWidth={2} />} onClick={() => navigate('A5_MOBILE')}>
          Continue with mobile number
        </Btn>
        <button
          className="text-body text-medium"
          style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 8 }}
          onClick={() => navigate('I6_HELP')}
        >
          Having trouble signing in? Contact support
        </button>
      </div>

      <p className="text-caption text-disabled" style={{ textAlign: 'center', marginTop: 32, padding: '0 16px' }}>
        <FileText size={12} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
        By continuing, you agree to our{' '}
        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>
          Terms of Service
        </button>{' '}
        and{' '}
        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>
          Privacy Policy
        </button>
      </p>
    </div>
  );
}

// =============================================
//  A5 — MOBILE NUMBER ENTRY
// =============================================
export function MobileScreen() {
  const { navigate, back } = useRouter();
  const { setState } = useApp();
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const valid = number.replace(/\D/g, '').length === 10;

  const handleSend = () => {
    const digits = number.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setState(s => ({ ...s, phone: digits }));
    navigate('A6_OTP');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setNumber(val);
    if (error && val.length === 10) setError('');
  };

  return (
    <div className="screen">
      <AppHeader />

      <div className="screen-content" style={{ paddingTop: 32 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>What's your mobile number?</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>
          We'll send a one-time code to verify your number.
        </p>

        <div className="input-group">
          <label htmlFor="phone" className="input-label">Mobile number</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                border: '2px solid var(--surface)',
                borderRadius: 'var(--radius-card)',
                background: 'var(--surface)',
                fontSize: 'var(--body-l)',
                fontWeight: 600,
                color: 'var(--text-medium)',
                flexShrink: 0,
                height: 52,
              }}
            >
              🇮🇳 +91
            </div>
            <div className="input-with-icon" style={{ flex: 1 }}>
              <Phone size={18} strokeWidth={2} className="input-icon" aria-hidden="true" />
              <input
                id="phone"
                className={`input-field ${error ? 'has-error' : ''}`}
                type="tel"
                inputMode="numeric"
                placeholder="9876543210"
                value={number}
                onChange={handleChange}
                aria-describedby={error ? 'phone-error' : 'phone-helper'}
                aria-invalid={!!error}
                style={{ paddingLeft: 44, height: 52 }}
                maxLength={10}
              />
            </div>
          </div>
          {error && <p id="phone-error" className="input-error" role="alert"><span>⚠</span> {error}</p>}
          {!error && <p id="phone-helper" className="input-helper">We'll send a one-time code</p>}
        </div>

        {/* Voice call fallback */}
        <div style={{ marginTop: 24 }}>
          <InfoCard icon={<Phone size={14} strokeWidth={2} />} variant="info">
            Can't receive SMS? You can also request a voice call with your code below.
          </InfoCard>
        </div>
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn onClick={handleSend} disabled={!valid} icon={<ArrowRight size={18} strokeWidth={2} />}>
          Send code
        </Btn>
        <Btn variant="secondary" onClick={() => {}}>
          Call me with the code instead
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  A6 — OTP VERIFICATION
// =============================================
export function OTPScreen() {
  const { navigate, back } = useRouter();
  const { state } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resendCount, setResendCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const phone = state.phone || '9876543210';
  const maskedPhone = phone.slice(0, 5) + 'XXXXX'.slice(0, phone.length - 5) + phone.slice(-2);

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits'); return; }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // Simulate: code "123456" = existing user, anything else = new user
      if (code === '123456') {
        navigate('D1_HOME');
      } else {
        navigate('B1_VERIFY_INTRO');
      }
    }, 1500);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setCountdown(30);
    setResendCount(c => c + 1);
  };

  const handleOtpChange = (val: string[]) => {
    setOtp(val);
    setHasError(false);
    setError('');
  };

  return (
    <div className="screen">
      <AppHeader />

      <div className="screen-content" style={{ paddingTop: 32 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Enter the code</h1>
        <p className="text-body text-medium" style={{ marginBottom: 40 }}>
          Sent to +91 {maskedPhone}
        </p>

        <OTPInput value={otp} onChange={handleOtpChange} hasError={hasError} />

        {error && (
          <p className="input-error" role="alert" style={{ justifyContent: 'center', marginTop: 12 }}>
            <AlertTriangle size={14} strokeWidth={2} /> {error}
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            className="text-body"
            style={{
              background: 'none',
              border: 'none',
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
              color: countdown > 0 ? 'var(--text-disabled)' : 'var(--primary)',
              fontWeight: 600,
              textDecoration: countdown > 0 ? 'none' : 'underline',
            }}
            disabled={countdown > 0}
            onClick={handleResend}
          >
            {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
          </button>
        </div>

        {resendCount >= 2 && (
          <div style={{ marginTop: 24 }}>
            <InfoCard icon={<Phone size={14} strokeWidth={2} />} variant="warning">
              Having trouble? You can{' '}
              <button
                style={{ background: 'none', border: 'none', color: 'var(--warning)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit' }}
                onClick={() => navigate('I6_HELP')}
              >
                contact our support team
              </button>{' '}
              or request a voice call with your code.
            </InfoCard>
          </div>
        )}

        {/* Demo hint */}
        <div style={{ marginTop: 24 }}>
          <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
            <strong>Demo mode:</strong> Enter <strong>123456</strong> to sign in as a returning user, or any other 6 digits for a new user flow.
          </InfoCard>
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <Btn
          onClick={handleVerify}
          disabled={otp.join('').length < 6}
          loading={loading}
        >
          Verify
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  B1 — VERIFICATION INTRO
// =============================================
export function VerifyIntroScreen() {
  const { navigate, back } = useRouter();
  return (
    <div className="screen">
      <AppHeader />

      <div className="screen-content" style={{ paddingTop: 16, textAlign: 'center' }}>
        {/* Illustration */}
        <div style={{ margin: '24px auto 32px', width: 160, height: 140, background: 'var(--primary-light)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 140 120" fill="none" style={{ width: 140, height: 120 }}>
            <rect x="20" y="30" width="100" height="65" rx="12" fill="#2563EB" opacity="0.15"/>
            <rect x="30" y="20" width="80" height="55" rx="10" fill="#2563EB" opacity="0.25"/>
            <rect x="40" y="10" width="60" height="45" rx="8" fill="#2563EB" opacity="0.9"/>
            <rect x="48" y="20" width="44" height="5" rx="2.5" fill="white" opacity="0.9"/>
            <rect x="48" y="30" width="30" height="4" rx="2" fill="white" opacity="0.6"/>
            <rect x="48" y="38" width="36" height="4" rx="2" fill="white" opacity="0.6"/>
            <circle cx="110" cy="80" r="24" fill="#1E8E5A"/>
            <path d="M102 80l5 5 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-h2" style={{ marginBottom: 12 }}>Let's verify you</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32, lineHeight: 1.6 }}>
          It only takes a few minutes. Verification lets you apply to jobs and access benefits.
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginBottom: 32 }}>
          {[
            { icon: <IdCard size={20} strokeWidth={2} />, text: 'Your Aadhaar number', sub: 'For identity verification' },
            { icon: <ShieldCheck size={20} strokeWidth={2} />, text: 'Your UDID card', sub: 'Disability certificate' },
            { icon: <Camera size={20} strokeWidth={2} />, text: 'A quick selfie', sub: 'To match your identity' },
          ].map((item, i) => (
            <div key={i} className="card-border" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--primary-light)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div className="text-body" style={{ fontWeight: 600 }}>{item.text}</div>
                <div className="text-caption text-medium">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <InfoCard icon={<Lock size={14} strokeWidth={2} />} variant="info">
          Your data is encrypted and never shared with employers without your explicit consent.
        </InfoCard>
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn onClick={() => navigate('B2_AADHAAR')}>
          Start verification
        </Btn>
        <button
          className="text-body"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', textDecoration: 'underline', padding: 8 }}
          onClick={() => navigate('B8_VERIFY_HELP')}
        >
          Don't have a UDID yet?
        </button>
      </div>
    </div>
  );
}

// =============================================
//  B2 — AADHAAR ENTRY
// =============================================
export function AadhaarScreen() {
  const { navigate, back } = useRouter();
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');

  const formatted = aadhaar.replace(/(\d{4})(?=\d)/g, '$1 ').trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaar(digits);
    if (error) setError('');
  };

  const handleContinue = () => {
    if (aadhaar.length !== 12) {
      setError('Enter your 12-digit Aadhaar number');
      return;
    }
    // Simple client-side check (not real Verhoeff)
    navigate('B3_AADHAAR_OTP');
  };

  return (
    <div className="screen">
      <AppHeader />

      <Stepper current={1} total={3} label="Step 1 of 3 — Aadhaar" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Enter your Aadhaar number</h1>
        <p className="text-body text-medium" style={{ marginBottom: 32 }}>
          We'll send a verification code to your Aadhaar-linked mobile number.
        </p>

        <div className="input-group" style={{ marginBottom: 16 }}>
          <label className="input-label" htmlFor="aadhaar">Aadhaar number</label>
          <div className="input-with-icon">
            <IdCard size={18} strokeWidth={2} className="input-icon" aria-hidden="true" />
            <input
              id="aadhaar"
              className={`input-field ${error ? 'has-error' : ''}`}
              type="tel"
              inputMode="numeric"
              placeholder="XXXX XXXX XXXX"
              value={formatted}
              onChange={handleChange}
              aria-invalid={!!error}
              maxLength={14}
              style={{ paddingLeft: 44, letterSpacing: 2 }}
            />
          </div>
          {error && <p className="input-error" role="alert"><AlertTriangle size={12} strokeWidth={2} /> {error}</p>}
        </div>

        <InfoCard icon={<Lock size={14} strokeWidth={2} />} variant="info">
          Used only to verify your identity — your Aadhaar number is never shown to employers.
        </InfoCard>
      </div>

      <div className="sticky-bottom-bar">
        <Btn onClick={handleContinue} disabled={aadhaar.length !== 12}>
          Continue
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  B3 — AADHAAR OTP
// =============================================
export function AadhaarOTPScreen() {
  const { navigate, back } = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [serviceDown, setServiceDown] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('B4_UDID');
    }, 1500);
  };

  return (
    <div className="screen">
      <AppHeader />
      <Stepper current={1} total={3} label="Step 1 of 3 — Aadhaar OTP" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Verify Aadhaar</h1>
        <p className="text-body text-medium" style={{ marginBottom: 12 }}>
          Code sent to your Aadhaar-linked mobile number.
        </p>

        <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
          This code goes to the mobile number linked with your Aadhaar — it might be different from the number you signed in with.
        </InfoCard>

        <div style={{ marginTop: 32, marginBottom: 24 }}>
          <OTPInput value={otp} onChange={setOtp} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              background: 'none', border: 'none', cursor: countdown > 0 ? 'not-allowed' : 'pointer',
              color: countdown > 0 ? 'var(--text-disabled)' : 'var(--primary)',
              fontWeight: 600, fontSize: 'var(--body)',
            }}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
          </button>
        </div>

        {serviceDown && (
          <div style={{ marginTop: 24 }}>
            <InfoCard icon={<AlertTriangle size={14} strokeWidth={2} />} variant="warning">
              Aadhaar service is temporarily unavailable — we've saved your progress. You can continue exploring the app and retry when it's back.
            </InfoCard>
            <div style={{ marginTop: 12 }}>
              <Btn variant="secondary" onClick={() => {}}>Retry now</Btn>
            </div>
            <div style={{ marginTop: 12 }}>
              <Btn variant="ghost" onClick={() => navigate('D1_HOME')}>Continue in limited mode</Btn>
            </div>
          </div>
        )}
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn onClick={handleVerify} disabled={otp.join('').length < 6} loading={loading}>
          Verify
        </Btn>
        <button
          style={{ background: 'none', border: 'none', color: 'var(--text-medium)', fontSize: 'var(--caption)', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setServiceDown(true)}
        >
          Simulate: Aadhaar service down
        </button>
      </div>
    </div>
  );
}

// =============================================
//  B4 — UDID ENTRY
// =============================================
export function UDIDScreen() {
  const { navigate, back } = useRouter();
  const [udid, setUdid] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="screen">
      <AppHeader />
      <Stepper current={2} total={3} label="Step 2 of 3 — UDID" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>Enter your UDID number</h1>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>
          Your Unique Disability ID card number.
        </p>

        <div className="input-group" style={{ marginBottom: 8 }}>
          <label className="input-label" htmlFor="udid">UDID number</label>
          <input
            id="udid"
            className="input-field"
            type="text"
            placeholder="e.g. AP-DL-12345-2021"
            value={udid}
            onChange={e => setUdid(e.target.value)}
          />
        </div>

        <button
          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 'var(--body)', fontWeight: 600, cursor: 'pointer', marginBottom: 32, textDecoration: 'underline', padding: '4px 0' }}
          onClick={() => setShowPopover(true)}
        >
          Where do I find this?
        </button>

        <div className="section-divider">
          <div className="section-divider-line" />
          <span className="section-divider-text">or</span>
          <div className="section-divider-line" />
        </div>

        <Btn variant="secondary" icon={<Upload size={18} strokeWidth={2} />} onClick={() => navigate('B5_UDID_UPLOAD')} style={{ marginTop: 16 }}>
          Upload UDID card instead
        </Btn>

        <div style={{ marginTop: 32 }}>
          <button
            style={{ background: 'none', border: 'none', color: 'var(--text-medium)', fontSize: 'var(--caption)', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('B5_UDID_UPLOAD')}
          >
            Applied but haven't received your UDID yet?
          </button>
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('B5_UDID_UPLOAD')} disabled={!udid.trim()}>
          Continue
        </Btn>
      </div>

      {/* Popover */}
      {showPopover && (
        <div className="sheet-overlay" onClick={() => setShowPopover(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div style={{ padding: '0 16px 24px' }}>
              <h3 className="text-h3" style={{ marginBottom: 16 }}>Where is my UDID number?</h3>
              <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
                <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <div style={{ fontSize: 'var(--caption)', color: 'var(--text-medium)', marginBottom: 4 }}>UNIQUE DISABILITY ID CARD</div>
                  <div style={{ fontSize: 'var(--body-l)', fontWeight: 700, color: 'var(--primary)', letterSpacing: 1 }}>
                    AP-DL-12345-2021
                  </div>
                </div>
                <p className="text-caption text-medium">↑ The number is printed below your name on the front of your UDID card</p>
              </div>
              <Btn onClick={() => setShowPopover(false)}>Got it</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================
//  B5 — UDID UPLOAD / OCR REVIEW
// =============================================
export function UDIDUploadScreen() {
  const { navigate, back } = useRouter();
  const [stage, setStage] = useState<'upload' | 'review'>('upload');

  const editableFields = [
    { label: 'Full name', value: 'Priya Sharma' },
    { label: 'Disability category', value: 'Locomotor disability' },
    { label: 'Issuing authority', value: 'SADP, Andhra Pradesh' },
    { label: 'Issue date', value: '15 March 2021' },
  ];

  const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
  const CITIES_BY_STATE: Record<string, string[]> = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
    'Delhi': ['New Delhi', 'Dwarka', 'Noida', 'Gurgaon'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol'],
  };
  const [resState, setResState] = useState('');
  const [resCity, setResCity] = useState('');

  if (stage === 'upload') {
    return (
      <div className="screen">
        <AppHeader />
        <Stepper current={2} total={3} label="Step 2 of 3 — Upload UDID" />
        <div className="screen-content" style={{ paddingTop: 24 }}>
          <h1 className="text-h2" style={{ marginBottom: 8 }}>Upload your UDID card</h1>
          <p className="text-body text-medium" style={{ marginBottom: 32 }}>Take a clear photo or upload from your gallery.</p>

          <div
            style={{
              border: '2px dashed var(--primary)',
              borderRadius: 'var(--radius-card)',
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              background: 'var(--primary-light)',
              cursor: 'pointer',
            }}
            onClick={() => setStage('review')}
          >
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={28} strokeWidth={2} color="white" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p className="text-body" style={{ fontWeight: 700, color: 'var(--primary)' }}>Tap to upload or take photo</p>
              <p className="text-caption text-medium">PNG, JPG, or PDF — max 5MB</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Btn variant="secondary" icon={<Camera size={16} strokeWidth={2} />} onClick={() => setStage('review')} style={{ flex: 1 }}>Take photo</Btn>
            <Btn variant="secondary" icon={<FileText size={16} strokeWidth={2} />} onClick={() => setStage('review')} style={{ flex: 1 }}>PDF</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <AppHeader title="Confirm your details" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        <InfoCard icon={<Info size={14} strokeWidth={2} />} variant="info">
          We've filled this in automatically — please check it's correct before continuing.
        </InfoCard>

        {/* Disability % — read-only, from UDID record */}
        <div style={{ marginTop: 24, padding: '12px 14px', background: 'var(--surface)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="text-caption text-medium">Disability percentage</p>
            <p className="text-body" style={{ fontWeight: 700, marginTop: 2 }}>60%</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-disabled)', fontSize: 12 }}>
            <Lock size={12} strokeWidth={2} />
            From your UDID record
          </div>
        </div>

        {/* Editable fields */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {editableFields.map((f, i) => (
            <div key={i} className="input-group">
              <label className="input-label">{f.label}</label>
              <input className="input-field" defaultValue={f.value} />
            </div>
          ))}
        </div>

        {/* Place of residence — required */}
        <div style={{ marginTop: 20, padding: '14px', background: 'var(--primary-light)', borderRadius: 10, border: '1.5px solid var(--primary-50)' }}>
          <p className="text-body" style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={15} color="var(--primary)" />
            Place of residence <span style={{ color: 'var(--error)' }}>*</span>
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">State</label>
              <select
                className="input-field"
                value={resState}
                onChange={e => { setResState(e.target.value); setResCity(''); }}
                style={{ cursor: 'pointer' }}
              >
                <option value="">Select state</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">City</label>
              <select
                className="input-field"
                value={resCity}
                onChange={e => setResCity(e.target.value)}
                disabled={!resState}
                style={{ cursor: resState ? 'pointer' : 'not-allowed', opacity: resState ? 1 : 0.5 }}
              >
                <option value="">Select city</option>
                {(CITIES_BY_STATE[resState] || []).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <Btn onClick={() => navigate('B6_SELFIE')}>
          Looks correct — continue
        </Btn>
      </div>
    </div>
  );
}

// =============================================
//  B6 — LIVENESS / SELFIE
// =============================================
export function SelfieScreen() {
  const { navigate, back } = useRouter();
  const [taken, setTaken] = useState(false);

  return (
    <div className="screen">
      <AppHeader />
      <Stepper current={3} total={3} label="Step 3 of 3 — Selfie" />

      <div className="screen-content" style={{ paddingTop: 24 }}>
        <h1 className="text-h2" style={{ marginBottom: 8 }}>One last step — a quick selfie</h1>
        <p className="text-body text-medium" style={{ marginBottom: 24 }}>
          Center your face and hold still. We'll capture automatically.
        </p>

        {/* Camera frame */}
        <div className="camera-frame" style={{ marginBottom: 24 }}>
          {taken ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <p style={{ color: 'white', fontWeight: 600 }}>Selfie captured!</p>
            </div>
          ) : (
            <>
              <div className="face-guide animate-breathe" />
              <p style={{ position: 'absolute', bottom: 24, color: 'rgba(255,255,255,0.8)', fontSize: 'var(--caption)' }}>
                Center your face in the oval
              </p>
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <div className="animate-breathe" style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF4444' }} />
              </div>
            </>
          )}
        </div>

        {!taken && (
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn onClick={() => setTaken(true)} icon={<Camera size={18} strokeWidth={2} />}>
              Take selfie
            </Btn>
            <button
              aria-label="Retake photo"
              style={{ width: 52, height: 52, borderRadius: 12, border: '2px solid var(--surface)', background: 'var(--base)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <RefreshCw size={20} strokeWidth={2} color="var(--text-medium)" />
            </button>
          </div>
        )}

        {taken && (
          <>
            <Btn onClick={() => navigate('B7_VERIFY_STATUS')}>Continue</Btn>
            <div style={{ marginTop: 12 }}>
              <Btn variant="ghost" icon={<RefreshCw size={16} strokeWidth={2} />} onClick={() => setTaken(false)}>
                Retake
              </Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================
//  B7 — VERIFICATION STATUS
// =============================================
type VerifyState = 'verified' | 'pending' | 'action' | 'provisional';

export function VerifyStatusScreen() {
  const { navigate } = useRouter();
  const [statusMode, setStatusMode] = useState<VerifyState>('verified');

  const { setState } = useApp();

  const handleVerified = () => {
    setState(s => ({ ...s, verificationStatus: 'verified' }));
    navigate('C1_PROFILE_CHOICE');
  };

  return (
    <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', padding: '0 var(--content-mx)' }}>
      {/* Demo mode switcher */}
      <div style={{ position: 'absolute', top: 16, left: 16, right: 16 }}>
        <div className="segment-group" style={{ marginBottom: 0 }}>
          {(['verified', 'pending', 'action', 'provisional'] as VerifyState[]).map(s => (
            <button key={s} className={`segment-btn ${statusMode === s ? 'active' : ''}`} onClick={() => setStatusMode(s)} style={{ fontSize: 10, padding: 6 }}>
              {s === 'verified' ? '✓ Verified' : s === 'pending' ? '⏳ Pending' : s === 'action' ? '⚠ Action' : '📋 Provisional'}
            </button>
          ))}
        </div>
      </div>

      {statusMode === 'verified' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* Confetti-style celebration */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={60} strokeWidth={1.5} color="var(--success)" />
            </div>
            {['🎉', '⭐', '✨', '🎊'].map((e, i) => (
              <span key={i} style={{
                position: 'absolute',
                fontSize: 20,
                animation: `confetti-fall ${1 + i * 0.3}s ease-out ${i * 0.2}s both`,
                left: `${[10, 80, 0, 90][i]}%`,
                top: `${[-10, -20, 20, 0][i]}px`,
              }}>{e}</span>
            ))}
          </div>
          <h1 className="text-h1" style={{ color: 'var(--success)' }}>You're verified!</h1>
          <p className="text-body text-medium">Your identity and disability certificate have been confirmed. Employers will see your verified badge.</p>
          <Btn onClick={handleVerified}>Build your profile →</Btn>
        </div>
      )}

      {statusMode === 'pending' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h1 className="text-h1" style={{ color: 'var(--warning)' }}>We're reviewing your details</h1>
          <p className="text-body text-medium">This usually takes 48–72 hours. We'll notify you as soon as it's done.</p>
          <Btn variant="secondary" onClick={() => navigate('D1_HOME')}>Explore jobs in the meantime</Btn>
        </div>
      )}

      {statusMode === 'action' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--error-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={60} strokeWidth={1.5} color="var(--error)" />
          </div>
          <h1 className="text-h1" style={{ color: 'var(--error)' }}>We need one more thing</h1>
          <div className="card-border" style={{ textAlign: 'left', borderColor: 'var(--error)' }}>
            <p className="text-body">The name on your Aadhaar (<strong>Priya Sharma</strong>) and UDID (<strong>P Sharma</strong>) don't quite match. This is common — please upload a document showing both names.</p>
          </div>
          <Btn onClick={() => navigate('B5_UDID_UPLOAD')}>Fix this now</Btn>
        </div>
      )}

      {statusMode === 'provisional' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h1 className="text-h1">Provisional account active</h1>
          <p className="text-body text-medium">You can browse and apply to jobs. Employers will see a "Provisional" badge until your UDID is confirmed. Full verification unlocks when your UDID arrives.</p>
          <Btn onClick={() => navigate('C1_PROFILE_CHOICE')}>Build your profile</Btn>
        </div>
      )}
    </div>
  );
}

// =============================================
//  B8 — VERIFICATION HELP / FAQ
// =============================================
export function VerifyHelpScreen() {
  const { back } = useRouter();
  const faqs = [
    { q: "I don't have a UDID card yet", a: "You can apply for a UDID at swavlambancard.gov.in. While waiting, you can use an older disability certificate or hospital certificate to create a Provisional account and start applying to jobs." },
    { q: "My Aadhaar isn't linked to my mobile number", a: "Visit your nearest Aadhaar Seva Kendra to link your mobile number, or use the mAadhaar app. Alternatively, our team can help you verify through an alternative process — tap 'Contact support' below." },
    { q: "I can't take a clear photo of my card", a: "Try scanning with a document scanner app (like Adobe Scan or CamScanner), or use natural lighting and a flat surface. You can also upload a PDF if you have a scanned version." },
    { q: "The name on my Aadhaar and UDID don't match", a: "This is very common (nicknames, spelling variations, marriage name changes). Upload a supporting document — gazette notification, marriage certificate, or school certificate — and our team will manually verify within 48–72 hours." },
    { q: "How is my data used?", a: "Your Aadhaar and UDID details are used only for identity verification. They are encrypted and never shared with employers. You control what appears on your profile. Read our full Privacy Policy for details." },
    { q: "The selfie match failed", a: "Don't worry — your application goes to our human review team. Old Aadhaar photos, changes in appearance, and lighting all cause mismatches. A real person will review your case within 48 hours." },
  ];

  return (
    <div className="screen">
      <AppHeader title="Verification help" />

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {faqs.map((f, i) => (
          <AccordionItem key={i} question={f.q} answer={f.a} />
        ))}
      </div>

      <div className="sticky-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn icon={<MessageCircle size={18} strokeWidth={2} />}>
          Contact support
        </Btn>
        <Btn variant="secondary" icon={<Phone size={18} strokeWidth={2} />}>
          Call us: 1800-xxx-xxxx (free)
        </Btn>
      </div>
    </div>
  );
}
