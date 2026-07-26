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
  | 'C5E_PREFERENCES' | 'C5F_LANGUAGES' | 'C6_PROFILE_REVIEW' | 'C7_CELEBRATION'
  | 'D1_HOME'
  | 'E1_JOBS' | 'E2_FILTERS' | 'E3_JOB_DETAIL' | 'E4_APPLY_CONFIRM' | 'E5_SUBMITTED'
  | 'F1_APPLICATIONS' | 'F2_APP_DETAIL' | 'F3_INTERVIEW' | 'F4_WITHDRAW'
  | 'G1_CARE' | 'G2_THERAPY_LIST' | 'G3_PROVIDER' | 'G4_BOOK_CONFIRM' 
  | 'G5_MY_BOOKINGS' | 'G6_COMMUNITY' | 'G7_THREAD' | 'G8_MENTORSHIP'
  | 'G9_BENEFITS' | 'G10_SCHEME_DETAIL' | 'G11_DOC_VAULT'
  | 'H1_NOTIFICATIONS'
  | 'I1_PROFILE' | 'I2_EDIT' | 'I3_SETTINGS' | 'I4_ACCESSIBILITY' 
  | 'I5_PRIVACY' | 'I6_HELP' | 'I7_LOGOUT'
  | 'J1_NO_INTERNET' | 'J2_SERVER_ERROR' | 'J3_UPDATE' | 'J4_SUSPENDED';

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
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextType>({
  state: {
    language: 'English',
    phone: '',
    verificationStatus: 'none',
    userName: 'Priya',
    hasProfile: true,
    notifications: 3,
    bookmarkedJobs: [],
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
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
