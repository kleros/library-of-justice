"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { getLangDir } from "rtl-detect";
import { useState } from "react";

import { useRouter } from "@/i18n/routing";

const Home: React.FC = () => {
  const t = useTranslations("landing");
  const locale = useLocale();
  const langDir = getLangDir(locale);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (formData: FormData) => {
    const disputeId = formData.get("dispute")?.toString();
    if (!disputeId) return;
    
    setIsSearching(true);
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push(`/case/${disputeId}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12 animate-fade-in">
        {/* Main Title */}
        <div className="space-y-3">
          <h1 className={clsx(
            "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
            "text-gradient text-balance",
            "text-shadow-sm"
          )}>
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </div>
        
        {/* Subtitle */}
        <p className={clsx(
          "text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto",
          "text-balance leading-relaxed"
        )}>
          {t("subtitle")}
        </p>

        {/* Additional descriptive text */}
        <p className="text-sm text-neutral-500 max-w-lg mx-auto">
          Access comprehensive arbitration records and explore the history of decentralized justice decisions
        </p>
      </div>

      {/* Search Interface */}
      <div className="w-full max-w-md mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <form
          className="space-y-4"
          action={handleSearch}
        >
          {/* Search Input Container */}
          <div className="relative group">
            <div className={clsx(
              "relative flex overflow-hidden",
              "bg-white rounded-xl shadow-medium border border-neutral-200",
              "hover:shadow-strong hover:border-primary-300",
              "focus-within:shadow-purple focus-within:border-primary-400",
              "transition-all duration-300"
            )}>
              {/* Hash Symbol */}
              <div className={clsx(
                "flex items-center justify-center w-12 h-14",
                "bg-gradient-to-br from-neutral-50 to-neutral-100",
                "border-r border-neutral-200 text-neutral-500 font-semibold text-lg"
              )}>
                #
              </div>
              
              {/* Input Field */}
              <input
                name="dispute"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={clsx(
                  "flex-1 h-14 px-4 text-lg font-medium",
                  "bg-transparent border-none outline-none",
                  "text-neutral-800 placeholder-neutral-400",
                  "transition-all duration-200"
                )}
                type="number"
                step={1}
                min={0}
                max={1000000}
                placeholder="Enter case number"
                disabled={isSearching}
              />
              
              {/* Search Button */}
              <button
                type="submit"
                disabled={!searchValue || isSearching}
                className={clsx(
                  "flex items-center justify-center gap-2 px-6 h-14",
                  "bg-gradient-to-r from-primary-600 to-primary-700",
                  "hover:from-primary-700 hover:to-primary-800",
                  "text-white font-medium transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "active:scale-95",
                  {
                    "cursor-not-allowed opacity-50": !searchValue || isSearching,
                  }
                )}
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Image src="/search.svg" alt="Search" width="18" height="18" />
                    <span>{t("button")}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <div className="text-center text-sm text-neutral-500">
            <p>Try searching for case numbers like <span className="font-medium text-primary-600">#1</span>, <span className="font-medium text-primary-600">#42</span>, or <span className="font-medium text-primary-600">#123</span></p>
          </div>
        </form>
      </div>

      {/* Features Grid */}
      <div className="mt-16 w-full max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card-elevated p-6 text-center group hover:shadow-purple transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Historical Records</h3>
            <p className="text-sm text-neutral-600">Access complete arbitration case histories and decisions</p>
          </div>

          {/* Feature 2 */}
          <div className="card-elevated p-6 text-center group hover:shadow-purple transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Advanced Search</h3>
            <p className="text-sm text-neutral-600">Find specific cases quickly with our intuitive search</p>
          </div>

          {/* Feature 3 */}
          <div className="card-elevated p-6 text-center group hover:shadow-purple transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-primary-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Verified Results</h3>
            <p className="text-sm text-neutral-600">All data verified through blockchain transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
