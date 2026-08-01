import type { Metadata } from "next";
import "./globals.css";
import { DeviceScaler } from "./DeviceScaler";

export const metadata: Metadata = {
  title: "Sahay — Jobs & Care",
  description: "Your ability, your opportunity. The premier jobs and care platform for persons with disabilities in India.",
  keywords: ["jobs", "disability", "PwD", "India", "accessibility", "employment", "care"],
  openGraph: {
    title: "Sahay — Jobs & Care",
    description: "Your ability, your opportunity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#2563EB" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', background: '#333' }}>
        <DeviceScaler>
          <div className="device-frame">
            <div className="device-notch"></div>
            <div className="device-status-bar">
              <span>9:41</span>
              <div className="device-status-icons">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0L12 21l-3.47-4.89z"></path></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><rect x="4" y="9" width="16" height="6" fill="currentColor"></rect></svg>
              </div>
            </div>
            <div id="app-root">
              {children}
            </div>
          </div>
        </DeviceScaler>
      </body>
    </html>
  );
}
