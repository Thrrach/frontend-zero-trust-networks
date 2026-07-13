import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = { title: 'Zero Trust Networks', description: 'Zero Trust Network Access management plane' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AntdRegistry><Providers>{children}</Providers></AntdRegistry></body></html>;
}
