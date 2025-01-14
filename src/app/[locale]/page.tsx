"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { getLangDir } from "rtl-detect";

import { useRouter } from "@/i18n/routing";

const Home: React.FC = () => {
  const t = useTranslations("landing");
  const locale = useLocale();
  const langDir = getLangDir(locale);

  const router = useRouter();

  return (
    <div className="mx-auto my-auto">
      <h1 className="text-secondary-text text-xl font-bold text-center">
        {t("title")}
      </h1>
      <h2 className="text-secondary-text text-md text-center">
        {t("subtitle")}
      </h2>
      <form
        className="my-4 flex justify-center items-center"
        action={(formData) => {
          const disputeId = formData.get("dispute")?.toString();
          if (!disputeId) return;
          router.push(`/case/${disputeId}`);
        }}
      >
        <div className="relative">
          <input
            name="dispute"
            className={clsx(
              "w-32 h-10 border-2 border-stroke",
              "focus:outline-none",
              {
                "rounded-l pl-6": langDir === "ltr",
                "rounded-r pr-6": langDir === "rtl",
              },
              "text-md font-semibold text-secondary-text p-2",
            )}
            type="number"
            step={1}
            min={0}
            max={1000000}
          />
          <span
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 text-lg",
              {
                "left-2": langDir === "ltr",
                "right-2": langDir === "rtl",
              },
              "font-semibold text-secondary-text",
            )}
          >
            #
          </span>
        </div>
        <button
          type="submit"
          className={clsx(
            "bg-primary-blue h-10",
            {
              "rounded-r": langDir === "ltr",
              "rounded-l": langDir === "rtl",
            },
            "text-base text-white-background font-semibold",
            "px-4 flex gap-2 justify-center items-center",
            "hover:bg-secondary-blue transition",
          )}
        >
          <Image src="/search.svg" alt="Search" width="16" height="16" />
          {t("button")}
        </button>
      </form>
    </div>
  );
};

export default Home;
