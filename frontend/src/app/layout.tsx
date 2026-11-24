import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moatix Check – Sri Lanka Scam & Fraud Verification',
  description: 'Public scam and fraud verification engine for Sri Lanka by ZegBit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0B0B0B] text-white">
        {children}
      </body>
    </html>
  );
}
