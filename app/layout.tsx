import type { Metadata } from "next";
import "./globals.css";

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
        <meta name="theme-color" content="#0F6E6B" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}
