import type { Metadata } from 'next';
import './globals.css';
import QuizBuilder from '@/components/QuizBuilder';

export const metadata: Metadata = {
  title: 'TikTok Quiz Generator',
  description: 'Create viral quiz videos optimized for TikTok and Instagram',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QuizBuilder />
      </body>
    </html>
  );
}
