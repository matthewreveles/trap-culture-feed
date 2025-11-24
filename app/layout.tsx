import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trap Culture • Past Events',
  description: 'Past Trap Culture events photo archive.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-black text-white min-h-screen antialiased'>
        {children}
      </body>
    </html>
  );
}
