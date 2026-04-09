"use client";

import React from "react";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Error({
  error: _,
  reset: __,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])

  const t = useTranslations("error");
  const locale = useLocale();

  return (
    <div className="mx-auto my-auto flex flex-col justify-center items-center">
      <h2 className="text-secondary-text text-xl font-bold text-center mb-4">
        {t("title")}
      </h2>
      <h3 className="text-secondary-text text-md text-center mb-4">
        {t("subtitle")}
      </h3>
      <Link
        href={`/${locale}`}
        className={clsx(
          "rounded bg-primary-blue hover:bg-secondary-blue transition w-max",
          "px-6 py-2 text-white-background font-semibold",
        )}
      >
        {t("button")}
      </Link>
    </div>
  );
}
