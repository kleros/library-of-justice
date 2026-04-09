"use client";

import React from "react";

import clsx from "clsx";
import { useTranslations } from "next-intl";

const Loading: React.FC = () => {
  const t = useTranslations("loading");

  return (
    <div className="m-auto">
      <div
        className={clsx(
          "w-16 h-16 border-4 border-r-white-background border-primary-blue",
          "rounded-full animate-spin mx-auto",
        )}
      />
      <span
        className={
          "mt-2 font-semibold text-primary-blue text-center animate-pulse block"
        }
      >
        {t("title")}
      </span>
    </div>
  );
};

export default Loading;
