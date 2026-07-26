'use client';
import React from 'react';
import { RouterProvider, AppProvider, useRouter } from './context';

import {
  SplashScreen,
  LanguageScreen,
  OnboardingScreen,
  SignInScreen,
  MobileScreen,
  OTPScreen,
  VerifyIntroScreen,
  AadhaarScreen,
  AadhaarOTPScreen,
  UDIDScreen,
  UDIDUploadScreen,
  SelfieScreen,
  VerifyStatusScreen,
  VerifyHelpScreen,
} from './screens-a-b';


// --- C Screens ---
import {
  ProfileChoiceScreen,
  LinkedInScreen,
  ResumeUploadScreen,
  ResumeReviewScreen,
  EducationScreen,
  ExperienceScreen,
  SkillsScreen,
  DisabilityScreen,
  PreferencesScreen,
  LanguagesScreen,
  ProfileReviewScreen,
  CelebrationScreen,
} from './screens-c';

// --- D-F Screens ---
import {
  HomeScreen,
  JobListScreen,
  JobDetailScreen,
  ApplyConfirmScreen,
  ApplicationSubmittedScreen,
  ApplicationsScreen,
  AppDetailScreen,
  InterviewScheduleScreen,
} from './screens-d-f';

// --- G Screens ---
import {
  CareHomeScreen,
  TherapyListScreen,
  ProviderDetailScreen,
  BookingConfirmScreen,
  MyBookingsScreen,
  CommunityScreen,
  ThreadScreen,
  MentorshipScreen,
  BenefitsScreen,
  SchemeDetailScreen,
  DocVaultScreen,
} from './screens-g';

// --- H-J Screens ---
import {
  NotificationsScreen,
  ProfileViewScreen,
  EditProfileScreen,
  SettingsScreen,
  AccessibilityScreen,
  PrivacyScreen,
  HelpScreen,
  LogoutScreen,
  NoInternetScreen,
  ServerErrorScreen,
  UpdateScreen,
  SuspendedScreen,
} from './screens-h-j';

// --- K-M Screens (V2) ---
import {
  SaathiEntryScreen,
  SaathiConsentScreen,
  SaathiTierScreen,
  SaathiProfileScreen,
  SaathiReviewScreen,
  ModesScreen,
  ReviewScreen,
  PracticeSetupScreen,
  PracticeSessionScreen,
  PracticeFeedbackScreen,
  TravelRequestScreen,
} from './screens-k-m';

// =============================================
//  MAIN SCREEN ROUTER
// =============================================
function AppRouter() {
  const { screen } = useRouter();

  const screenMap: Record<typeof screen, React.ReactNode> = {
    // A — Onboarding
    A1_SPLASH:        <SplashScreen />,
    A2_LANGUAGE:      <LanguageScreen />,
    A3_ONBOARDING:    <OnboardingScreen />,
    A4_SIGNIN:        <SignInScreen />,
    A5_MOBILE:        <MobileScreen />,
    A6_OTP:           <OTPScreen />,

    // B — Verification
    B1_VERIFY_INTRO:  <VerifyIntroScreen />,
    B2_AADHAAR:       <AadhaarScreen />,
    B3_AADHAAR_OTP:   <AadhaarOTPScreen />,
    B4_UDID:          <UDIDScreen />,
    B5_UDID_UPLOAD:   <UDIDUploadScreen />,
    B6_SELFIE:        <SelfieScreen />,
    B7_VERIFY_STATUS: <VerifyStatusScreen />,
    B8_VERIFY_HELP:   <VerifyHelpScreen />,

    // C — Profile
    C1_PROFILE_CHOICE: <ProfileChoiceScreen />,
    C2_LINKEDIN:       <LinkedInScreen />,
    C3_RESUME:         <ResumeUploadScreen />,
    C4_RESUME_REVIEW:  <ResumeReviewScreen />,
    C5A_EDUCATION:     <EducationScreen />,
    C5B_EXPERIENCE:    <ExperienceScreen />,
    C5C_SKILLS:        <SkillsScreen />,
    C5D_DISABILITY:    <DisabilityScreen />,
    C5E_PREFERENCES:   <PreferencesScreen />,
    C5F_LANGUAGES:     <LanguagesScreen />,
    C6_PROFILE_REVIEW: <ProfileReviewScreen />,
    C7_CELEBRATION:    <CelebrationScreen />,

    // D — Home
    D1_HOME:           <HomeScreen />,

    // E — Jobs
    E1_JOBS:           <JobListScreen />,
    E2_FILTERS:        <JobListScreen />,
    E3_JOB_DETAIL:     <JobDetailScreen />,
    E4_APPLY_CONFIRM:  <ApplyConfirmScreen />,
    E5_SUBMITTED:      <ApplicationSubmittedScreen />,

    // F — Applications
    F1_APPLICATIONS:   <ApplicationsScreen />,
    F2_APP_DETAIL:     <AppDetailScreen />,
    F3_INTERVIEW:      <InterviewScheduleScreen />,
    F4_WITHDRAW:       <AppDetailScreen />,

    // G — Care
    G1_CARE:           <CareHomeScreen />,
    G2_THERAPY_LIST:   <TherapyListScreen />,
    G3_PROVIDER:       <ProviderDetailScreen />,
    G4_BOOK_CONFIRM:   <BookingConfirmScreen />,
    G5_MY_BOOKINGS:    <MyBookingsScreen />,
    G6_COMMUNITY:      <CommunityScreen />,
    G7_THREAD:         <ThreadScreen />,
    G8_MENTORSHIP:     <MentorshipScreen />,
    G9_BENEFITS:       <BenefitsScreen />,
    G10_SCHEME_DETAIL: <SchemeDetailScreen />,
    G11_DOC_VAULT:     <DocVaultScreen />,

    // H — Notifications
    H1_NOTIFICATIONS:  <NotificationsScreen />,

    // I — Profile/Settings
    I1_PROFILE:        <ProfileViewScreen />,
    I2_EDIT:           <EditProfileScreen />,
    I3_SETTINGS:       <SettingsScreen />,
    I4_ACCESSIBILITY:  <AccessibilityScreen />,
    I5_PRIVACY:        <PrivacyScreen />,
    I6_HELP:           <HelpScreen />,
    I7_LOGOUT:         <LogoutScreen />,

    // J — Errors
    J1_NO_INTERNET:    <NoInternetScreen />,
    J2_SERVER_ERROR:   <ServerErrorScreen />,
    J3_UPDATE:         <UpdateScreen />,
    J4_SUSPENDED:      <SuspendedScreen />,

    // K — Saathi Mode
    K1_SAATHI_ENTRY:   <SaathiEntryScreen />,
    K2_CONSENT:        <SaathiConsentScreen />,
    K3_TIER:           <SaathiTierScreen />,
    K4_PROFILE:        <SaathiProfileScreen />,
    K7_REVIEW:         <SaathiReviewScreen />,

    // L — Experience Modes
    L1_MODES:          <ModesScreen />,

    // M — Differentiators
    M2A_REVIEW:            <ReviewScreen />,
    M3A_PRACTICE_SETUP:    <PracticeSetupScreen />,
    M3B_PRACTICE_SESSION:  <PracticeSessionScreen />,
    M3C_PRACTICE_FEEDBACK: <PracticeFeedbackScreen />,
    M4A_TRAVEL_REQ:        <TravelRequestScreen />,
  };

  return (
    <div className="app-shell">
      {screenMap[screen]}
    </div>
  );
}

// =============================================
//  ROOT
// =============================================
export default function SahayApp() {
  return (
    <AppProvider>
      <RouterProvider>
        <AppRouter />
      </RouterProvider>
    </AppProvider>
  );
}
