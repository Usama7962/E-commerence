'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '@/app/component/Navbar/Navbar';
import Footer from '@/app/component/Footer/Footer';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      // Here you can add your API call to handle form submission
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 backdrop-blur-lg bg-opacity-95">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-3">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-lg">We had love to hear from you. Lets start a conversation!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused({ ...focused, name: true })}
                    onBlur={() => setFocused({ ...focused, name: false })}
                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 
                      ${focused.name ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}
                      focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                    required
                  />
                  <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-opacity duration-200 
                    ${formData.name ? 'opacity-100' : 'opacity-0'}`}>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused({ ...focused, email: true })}
                    onBlur={() => setFocused({ ...focused, email: false })}
                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 
                      ${focused.email ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}
                      focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused({ ...focused, subject: true })}
                  onBlur={() => setFocused({ ...focused, subject: false })}
                  className={`mt-1 block w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 
                    ${focused.subject ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused({ ...focused, message: true })}
                  onBlur={() => setFocused({ ...focused, message: false })}
                  className={`mt-1 block w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 
                    ${focused.message ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center py-4 px-8 border border-transparent text-lg font-medium rounded-full
                  text-white bg-black
                  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200
                  transform hover:scale-105 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center items-center w-16 h-16 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">Phone</h3>
              <p className="mt-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200">+1 (555) 123-4567</p>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center items-center w-16 h-16 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">Email</h3>
              <p className="mt-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200">support@example.com</p>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center items-center w-16 h-16 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">Address</h3>
              <p className="mt-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200">123 Business Street, Suite 100, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
