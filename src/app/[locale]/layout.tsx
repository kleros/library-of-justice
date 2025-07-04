import clsx from "clsx";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Open_Sans } from "next/font/google";
import { getLangDir } from "rtl-detect";

import Navbar from "./components/Navbar";

import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kleros: Library of Justice",
  description: "The Kleros Library of Justice - A comprehensive archive for accessing historical records of arbitration cases and justice decisions.",
  keywords: ["Kleros", "arbitration", "justice", "blockchain", "dispute resolution", "legal archive"],
  authors: [{ name: "Kleros" }],
  openGraph: {
    title: "Kleros: Library of Justice",
    description: "Access historical records of arbitration cases and justice decisions",
    type: "website",
  },
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  const messages = await getMessages({ locale });
  const langDir = getLangDir(locale);

  return (
    <html lang={locale}>
      <body
        className={clsx(
          openSans.className,
          "antialiased min-h-screen bg-gradient-to-br from-neutral-50 via-purple-50/30 to-accent-50/20"
        )}
        dir={langDir}
      >
        <NextIntlClientProvider {...{ messages }}>
          {/* Background Elements */}
          <div className="fixed inset-0 bg-mesh opacity-40 pointer-events-none" />
          <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
          
          {/* Main Layout Container */}
          <div className="relative min-h-screen flex flex-col">
            {/* Elegant Border Frame */}
            <div className="flex-grow p-3 sm:p-4 lg:p-6">
              <div className={clsx(
                "h-full min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]",
                "bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700",
                "rounded-2xl lg:rounded-3xl shadow-strong",
                "relative overflow-hidden"
              )}>
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
                
                {/* Content Container */}
                <div className={clsx(
                  "relative h-full",
                  "bg-white/95 backdrop-blur-sm",
                  "m-3 sm:m-4 lg:m-6",
                  "rounded-xl lg:rounded-2xl",
                  "shadow-medium border border-white/60",
                  "flex flex-col overflow-hidden"
                )}>
                  {/* Header Area */}
                  <div className="bg-gradient-to-r from-white to-purple-50/50 border-b border-neutral-200/60">
                    <div className="section-container py-4 lg:py-6">
                      <Navbar {...{ locale }} />
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <main className="flex-grow flex flex-col relative">
                    <div className="flex-grow section-container py-8 lg:py-12">
                      <div className="animate-fade-in">
                        {children}
                      </div>
                    </div>
                  </main>
                  
                  {/* Footer */}
                  <footer className="border-t border-neutral-200/60 bg-gradient-to-r from-neutral-50 to-purple-50/30">
                    <div className="section-container py-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></span>
                          <span>Powered by Kleros Protocol</span>
                        </div>
                        <div className="text-center sm:text-right">
                          <p>Library of Justice • Historical Archive</p>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
