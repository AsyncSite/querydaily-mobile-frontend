import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import InnerLayout from './components/InnerLayout';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: '쿼리데일리 - 매일 3문제, 다른 사람의 생각 엿보기',
  description: '현직 개발자들의 면접 답변을 보며 성장하는 모바일 학습 플랫폼',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '쿼리데일리',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#10b981',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={raleway.className}>
        <InnerLayout>{children}</InnerLayout>
      </body>
    </html>
  );
}
