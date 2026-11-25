import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moatix Check – Sri Lanka Scam & Fraud Verification',
  description: 'Public scam assessment portal for Sri Lanka by ZegBit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#9ec5fe', color: '#0f172a', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
