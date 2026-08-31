import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

// Outfit is no longer used — headings are Inter 500/600 with tight tracking.
// You can remove @fontsource-variable/outfit from package.json.

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
        {/* Nav is sticky now, so <main> no longer needs top padding. */}
        <Nav />
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
