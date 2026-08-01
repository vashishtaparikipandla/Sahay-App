'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

// =============================================
//  ROUTER CONTEXT  
// =============================================
type Screen = 
  | 'A1_SPLASH' | 'A2_LANGUAGE' | 'A3_ONBOARDING' | 'A4_SIGNIN' 
  | 'A5_MOBILE' | 'A6_OTP'
  | 'B1_VERIFY_INTRO' | 'B2_AADHAAR' | 'B3_AADHAAR_OTP' 
  | 'B4_UDID' | 'B5_UDID_UPLOAD' | 'B6_SELFIE' | 'B7_VERIFY_STATUS' | 'B8_VERIFY_HELP'
  | 'C1_PROFILE_CHOICE' | 'C2_LINKEDIN' | 'C3_RESUME' | 'C4_RESUME_REVIEW'
  | 'C5A_EDUCATION' | 'C5B_EXPERIENCE' | 'C5C_SKILLS' | 'C5D_DISABILITY' 
  | 'C5E_PREFERENCES' | 'C5F_LANGUAGES' | 'C5G_GUARDIAN' | 'C6_PROFILE_REVIEW' | 'C7_CELEBRATION'
  | 'D1_HOME'
  | 'E1_JOBS' | 'E2_FILTERS' | 'E3_JOB_DETAIL' | 'E4_APPLY_CONFIRM' | 'E5_SUBMITTED'
  | 'F1_APPLICATIONS' | 'F2_APP_DETAIL' | 'F3_INTERVIEW' | 'F4_WITHDRAW'
  | 'G1_CARE' | 'G2_THERAPY_LIST' | 'G3_PROVIDER' | 'G4_BOOK_CONFIRM' 
  | 'G5_MY_BOOKINGS' | 'G6_COMMUNITY' | 'G7_THREAD' | 'G8_MENTORSHIP'
  | 'G9_BENEFITS' | 'G10_SCHEME_DETAIL' | 'G11_DOC_VAULT'
  | 'H1_NOTIFICATIONS'
  | 'I1_PROFILE' | 'I2_EDIT' | 'I3_SETTINGS' | 'I4_ACCESSIBILITY' 
  | 'I5_PRIVACY' | 'I6_HELP' | 'I7_LOGOUT'
  | 'J1_NO_INTERNET' | 'J2_SERVER_ERROR' | 'J3_UPDATE' | 'J4_SUSPENDED'
  | 'K1_SAATHI_ENTRY' | 'K2_CONSENT' | 'K3_TIER' | 'K4_PROFILE' | 'K7_REVIEW'
  | 'L1_MODES'
  | 'M2A_REVIEW' | 'M3A_PRACTICE_SETUP' | 'M3B_PRACTICE_SESSION' | 'M3C_PRACTICE_FEEDBACK' | 'M4A_TRAVEL_REQ'
  | 'N1_DISHA'
  | 'O2_DISCLOSURE_ASSISTANT' | 'O3_RED_FLAGS';

interface RouterContextType {
  screen: Screen;
  navigate: (s: Screen) => void;
  back: () => void;
  history: Screen[];
}

const RouterContext = createContext<RouterContextType>({
  screen: 'A1_SPLASH',
  navigate: () => {},
  back: () => {},
  history: [],
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(['A1_SPLASH']);

  const navigate = useCallback((s: Screen) => {
    setHistory(h => [...h, s]);
  }, []);

  const back = useCallback(() => {
    setHistory(h => h.length > 1 ? h.slice(0, -1) : h);
  }, []);

  const screen = history[history.length - 1];

  return (
    <RouterContext.Provider value={{ screen, navigate, back, history }}>
      {children}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);

// =============================================
//  APP STATE CONTEXT
// =============================================
interface AppState {
  language: string;
  phone: string;
  verificationStatus: 'none' | 'pending' | 'verified' | 'action_needed' | 'provisional';
  userName: string;
  hasProfile: boolean;
  notifications: number;
  bookmarkedJobs: string[];
  v2Enabled: boolean;
  saathi: {
    enabled: boolean;
    handlerName: string;
    relation: string;
    tier: 'view' | 'apply' | 'full';
  };
  experienceModes: {
    voiceFirst: boolean;
    signLanguage: boolean;
    aac: boolean;
    easyRead: boolean;
    switchControl: boolean;
    calmMode: boolean;
  };
  guardian: {
    name: string;
    relation: string;
    phone: string;
    email: string;
    address: string;
  };
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const defaultGuardian = { name: '', relation: '', phone: '', email: '', address: '' };

const AppContext = createContext<AppContextType>({
  state: {
    language: 'English',
    phone: '',
    verificationStatus: 'none',
    userName: 'Priya',
    hasProfile: true,
    notifications: 3,
    bookmarkedJobs: [],
    v2Enabled: false,
    saathi: { enabled: false, handlerName: '', relation: '', tier: 'view' },
    experienceModes: { voiceFirst: false, signLanguage: false, aac: false, easyRead: false, switchControl: false, calmMode: false },
    guardian: defaultGuardian,
  },
  setState: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    language: 'English',
    phone: '',
    verificationStatus: 'none',
    userName: 'Priya',
    hasProfile: true,
    notifications: 3,
    bookmarkedJobs: [],
    v2Enabled: false,
    saathi: { enabled: false, handlerName: '', relation: '', tier: 'view' },
    experienceModes: { voiceFirst: false, signLanguage: false, aac: false, easyRead: false, switchControl: false, calmMode: false },
    guardian: defaultGuardian,
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
