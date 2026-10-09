import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lokesh Ram Hariram | AI Engineer · Machine Learning · FDE',
  description: 'AI applications, machine learning systems, reliable integrations, and data platforms built for real workflows.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
