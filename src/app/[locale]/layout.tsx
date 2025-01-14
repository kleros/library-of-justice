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
  description: "Kleros archival UI",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({ locale });
  const langDir = getLangDir(locale);

  return (
    <html lang={locale}>
      <body
        className={clsx(openSans.className, "antialiased bg-white-background")}
        dir={langDir}
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
              <div className="bg-white-background flex-grow p-4 flex flex-col items-center">
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
