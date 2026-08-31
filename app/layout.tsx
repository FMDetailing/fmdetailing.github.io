import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `${SITE.name} — Premium Car Detailing in the GTA`,
  description: `${SITE.name}: professional interior & exterior car detailing serving the Greater Toronto Area. Book your detail today.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
