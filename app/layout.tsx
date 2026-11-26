import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arlene Ishimwe — Software Developer',
  description: 'Portfolio of Arlene Ishimwe, a software developer interested in useful digital products, systems, and creative technology.',
  applicationName: 'Arlene Ishimwe Portfolio',
  keywords: ['Arlene Ishimwe', 'software developer', 'full-stack developer', 'portfolio', 'Kigali', 'Rwanda'],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Arlene Ishimwe — Software Developer',
    description: 'A portfolio of software engineering, creative technology, and product-focused projects.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try { document.documentElement.dataset.theme = localStorage.getItem('arlene-theme') === 'light' ? 'light' : 'dark'; } catch { document.documentElement.dataset.theme = 'dark'; }`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
