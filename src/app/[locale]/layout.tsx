import clsx from "clsx";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";

import Navbar from "./components/Navbar";

import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-white-background",
        )}
      >
        <NextIntlClientProvider {...{ messages }}>
          <div
            className={clsx(
              "bg-white-background min-h-screen",
              "p-4 flex flex-col",
            )}
          >
            <div
              className={clsx(
                "bg-gradient-to-r from-secondary-purple to-primary-purple",
                "flex-grow p-1.5 flex flex-col",
              )}
            >
              <div className="bg-white-background flex-grow p-4 flex flex-col">
                <Navbar {...{ locale }} />
                <main className="flex-grow flex flex-col">{children}</main>
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
