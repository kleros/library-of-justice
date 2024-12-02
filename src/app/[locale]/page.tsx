"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";

const Home: React.FC = () => {
  const t = useTranslations("landing");
  const router = useRouter();
  return (
    <div className="mx-auto my-auto">
      <h1 className="text-secondary-text text-2xl font-bold text-center">
        {t("navigate").toUpperCase()}
      </h1>
      <form
        className="my-4 text-center"
        action={(formData) => {
          const disputeId = formData.get("dispute")?.toString();
          if (!disputeId) return;
          router.push(`/case/${disputeId}`);
        }}
      >
        <label
          htmlFor="dispute"
          className="text-2xl font-bold text-primary-blue"
        >
          #
          <input
            name="dispute"
            className={clsx(
              "w-32 ml-2 border-b-4",
              "text-2xl font-semibold border-slate-300 focus:outline-0 p-2",
            )}
            type="number"
            step={1}
            min={0}
            max={1000000}
          />
        </label>
        <button type="submit" className="p-2 text-2xl text-primary-blue">
          ➞
        </button>
      </form>
    </div>
  );
};

export default Home;
