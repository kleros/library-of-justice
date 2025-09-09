import clsx from "clsx";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter as _Inter } from "next/font/google";
import { getLangDir } from "rtl-detect";

import "../globals.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Inter = _Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kleros: Library of Justice",
  description: "Kleros archival UI",
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
        className={clsx(Inter.className, "antialiased bg-white-background")}
        dir={langDir}
      >
        <NextIntlClientProvider {...{ messages }}>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-muted/20 flex flex-col">
            <Navbar {...{ locale }} />
            <main className="flex-grow flex flex-col w-full">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
