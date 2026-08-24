"use client";
import Link from "next/link";
import { Leaf, Truck, ShieldCheck, Sparkles, Heart } from "lucide-react";

const Herosection = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero leaf-pattern overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-6 z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Leaf size={14} className="text-green-300" />
                <span className="text-green-200 text-sm font-medium">100% Natural & Organic</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Nature's Healing
                <span className="block text-green-300">Power in Every Drop</span>
              </h1>

              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Discover the ancient wisdom of herbal medicine. Pure, organic remedies crafted from nature to nurture your body, mind, and soul.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Link
                  href="/Shop"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                >
                  <Leaf size={18} />
                  Explore Products
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all border border-white/25"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="flex-1 relative">
              <div className="relative max-w-md mx-auto">
                {/* Floating Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-effect rounded-2xl p-5 text-center animate-float">
                    <p className="text-3xl font-bold text-white">25+</p>
                    <p className="text-sm text-green-200 mt-1">Herbal Products</p>
                  </div>
                  <div className="glass-effect rounded-2xl p-5 text-center animate-float" style={{animationDelay: "1s"}}>
                    <p className="text-3xl font-bold text-green-300">100%</p>
                    <p className="text-sm text-green-200 mt-1">Organic</p>
                  </div>
                  <div className="glass-effect rounded-2xl p-5 text-center animate-float" style={{animationDelay: "2s"}}>
                    <p className="text-3xl font-bold text-green-300">5K+</p>
                    <p className="text-sm text-green-200 mt-1">Happy Customers</p>
                  </div>
                  <div className="glass-effect rounded-2xl p-5 text-center animate-float" style={{animationDelay: "0.5s"}}>
                    <p className="text-3xl font-bold text-white">Pure</p>
                    <p className="text-sm text-green-200 mt-1">No Chemicals</p>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="var(--background)"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-[var(--border)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                <Leaf size={20} className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">100% Natural</p>
                <p className="text-xs text-[var(--muted)]">No chemicals added</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                <ShieldCheck size={20} className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Lab Tested</p>
                <p className="text-xs text-[var(--muted)]">Quality certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                <Truck size={20} className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Free Delivery</p>
                <p className="text-xs text-[var(--muted)]">Above Rs.1000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                <Heart size={20} className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Wellness First</p>
                <p className="text-xs text-[var(--muted)]">Your health matters</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
