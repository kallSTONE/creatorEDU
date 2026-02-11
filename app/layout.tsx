import './globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AuthHeader from '@/components/layout/auth-header';
import Footer from '@/components/layout/footer';
import { SupabaseProvider } from '@/components/providers/supabase-provider';
import { RouteLoadingProvider } from '@/components/route-loading-provider';
import RouteLoadingOverlay from '@/components/route-loading-overlay';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Learn - From Any Place',
  description: 'A comprehensive portal for Training Mandatory for license renewal for Ethiopian Legal professionals, training, and resources for continuing professional development.',

  icons: {
    icon: 'assets/Icon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <SupabaseProvider>
            <Suspense fallback={null}>
              <RouteLoadingProvider>
                <RouteLoadingOverlay />
                <AuthHeader />
                <main className="flex-grow w-full">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </RouteLoadingProvider>
            </Suspense>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}