import React from 'react'
import Image from 'next/image'
import Navbar from '@/app/component/Navbar/Navbar'
import Footer from '@/app/component/Footer/Footer'

const About = () => {
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white text-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Store</h1>
            <p className="text-xl opacity-90">Delivering Quality Fashion for Everyone</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            We are committed to providing high-quality fashion items at affordable prices.
            Our goal is to make trendy and comfortable clothing accessible to everyone while
            maintaining the highest standards of customer service and satisfaction.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
              <p className="text-gray-600">Carefully curated collection of premium fashion items</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
              <p className="text-gray-600">24/7 support to assist you with your needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">support@yourstore.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-600">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default About
