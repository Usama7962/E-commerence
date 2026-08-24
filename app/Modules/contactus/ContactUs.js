"use client";
import React, { useState } from "react";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer/Footer";
import { Leaf, Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative gradient-hero leaf-pattern pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Leaf size={14} className="text-green-300" />
              <span className="text-green-200 text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We'd Love to
              <span className="block text-green-300">Hear From You</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions about our herbal products? Need guidance on natural remedies?
              Our team is here to help you on your wellness journey.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="var(--background)"/>
            </svg>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Info Cards */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-4">
                    <Phone size={20} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">Phone</h3>
                  <p className="text-sm text-[var(--muted)]">+92 300 1234567</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Mon - Sat, 9am - 6pm</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-4">
                    <Mail size={20} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">Email</h3>
                  <p className="text-sm text-[var(--muted)]">info@herbalcure.pk</p>
                  <p className="text-xs text-[var(--muted)] mt-1">We reply within 24 hours</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-4">
                    <MapPin size={20} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">Visit Us</h3>
                  <p className="text-sm text-[var(--muted)]">Lahore, Pakistan</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Walk-ins welcome</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[var(--border)]">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Send us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-[var(--border)] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/10 disabled:opacity-50"
                    >
                      <Send size={16} />
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
