"use client";
import React from "react";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer/Footer";
import { Leaf, Heart, Shield, Sprout, Award, Users } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative gradient-hero leaf-pattern pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Leaf size={14} className="text-green-300" />
              <span className="text-green-200 text-sm font-medium">About HerbalCure</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Rooted in Nature,
              <span className="block text-green-300">Crafted with Care</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We bring you the purest herbal remedies, handpicked from nature's pharmacy,
              to support your journey towards holistic wellness.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="var(--background)"/>
            </svg>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider mb-2">Our Story</p>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                Ancient Wisdom, Modern Wellness
              </h2>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
                HerbalCure was founded with a simple mission — to make authentic herbal medicine accessible to everyone.
                We believe that nature holds the key to true healing. Our ancestors knew this, and modern science is
                now confirming what traditional healers have practiced for centuries.
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                Every product in our store is sourced from certified organic farms and prepared using time-honored
                methods that preserve the plant's natural potency. From Ashwagandha to Turmeric, from essential oils
                to herbal teas — each item is carefully selected to support your health naturally, without harsh chemicals
                or synthetic additives.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
              <h2 className="text-3xl font-bold text-[var(--foreground)]">Our Values & Commitment</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-[var(--primary-light)] border border-[var(--border)]">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <Leaf size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">100% Natural</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  All our products are made from pure, natural ingredients without any artificial colors,
                  preservatives, or harmful chemicals. We source directly from organic farms.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-[var(--accent-light)] border border-[var(--border)]">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Lab Tested & Certified</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Every batch is tested in certified laboratories for purity, potency, and safety.
                  We follow strict quality control measures at every step.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-green-50 border border-[var(--border)]">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                  <Heart size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Holistic Healing</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  We believe in treating the whole person — body, mind, and spirit. Our products
                  support your natural healing processes rather than masking symptoms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 gradient-herbal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-white">25+</p>
                <p className="text-green-200 mt-2 text-sm">Herbal Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">5000+</p>
                <p className="text-green-200 mt-2 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">100%</p>
                <p className="text-green-200 mt-2 text-sm">Organic Certified</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">3+</p>
                <p className="text-green-200 mt-2 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--foreground)]">What We Offer</h2>
              <p className="text-[var(--muted)] mt-2">Complete range of herbal wellness solutions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Herbal Supplements</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Ashwagandha, Turmeric, Moringa, Spirulina & more</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Essential Oils</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Lavender, Tea Tree, Eucalyptus, Peppermint</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Herbal Teas</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Green Tea, Chamomile, Hibiscus, Tulsi</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Natural Skincare</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Aloe Vera, Rose Hip, Coconut Oil, Shea Butter</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Honey & Superfoods</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Manuka Honey, Black Seed Oil, Chia Seeds</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--border)]">
                <Sprout size={20} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm">Wellness Combos</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">Curated packs for immunity, beauty & detox</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-[var(--muted)] mb-8">
              Experience the transformative power of nature. Browse our collection and find
              the perfect herbal remedy for your needs.
            </p>
            <Link
              href="/Shop"
              className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
            >
              <Leaf size={18} />
              Browse Products
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
