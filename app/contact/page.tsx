'use client';

import { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { FadeIn, SlideUp, ScrollReveal, TapButton } from '../components/animations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countryCodes = [
    { code: '+91', flag: '🇮🇳', country: 'India' },
    { code: '+1', flag: '🇺🇸', country: 'USA' },
    { code: '+971', flag: '🇦🇪', country: 'UAE' },
    { code: '+44', flag: '🇬🇧', country: 'UK' },
    { code: '+65', flag: '🇸🇬', country: 'Singapore' },
    { code: '+61', flag: '🇦🇺', country: 'Australia' },
    { code: '+1', flag: '🇨🇦', country: 'Canada' },
    { code: '+49', flag: '🇩🇪', country: 'Germany' },
    { code: '+33', flag: '🇫🇷', country: 'France' },
    { code: '+81', flag: '🇯🇵', country: 'Japan' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phoneNumber}`,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          leadType: 'audit_request',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phoneNumber: '',
          company: '',
          service: '',
          message: '',
        });
      } else {
        console.error('Form submission failed:', data);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn duration={0.8}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-center">
                Get a Free Growth Audit
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 md:mb-12 text-center">
                Tell us about your business and we'll show you how to become impossible to ignore.
              </p>
            </SlideUp>

            <ScrollReveal>
              <div className="bg-surface p-6 md:p-8 lg:p-12 rounded-2xl border border-surface-light">
                {isSubmitted ? (
                  <div className="text-center py-8 md:py-12">
                    <FadeIn>
                      <div className="text-5xl md:text-6xl mb-4">✓</div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">Thank You!</h3>
                      <p className="text-foreground/70 text-sm md:text-base">
                        We've received your request and will be in touch within 24 hours.
                      </p>
                    </FadeIn>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                          placeholder="rahul@company.in"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                          Phone
                        </label>
                        <div className="flex gap-2">
                          <select
                            id="countryCode"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="bg-background border border-surface-light rounded-lg px-3 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base min-w-[100px]"
                          >
                            {countryCodes.map((country) => (
                              <option key={`${country.code}-${country.country}`} value={country.code}>
                                {country.flag} {country.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="flex-1 bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                            placeholder="98765 43210"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                          placeholder="Your Company Pvt Ltd"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                      >
                        <option value="">Select a service</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="branding">Branding & Strategy</option>
                        <option value="performance-marketing">Performance Marketing</option>
                        <option value="customer-acquisition">Customer Acquisition</option>
                        <option value="web-cro">Web & CRO Optimization</option>
                        <option value="analytics">Analytics & Growth</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-foreground font-medium mb-2 text-sm md:text-base">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
                        placeholder="Tell us about your goals and challenges..."
                      />
                    </div>

                    <TapButton>
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors"
                      >
                        Get Your Free Growth Audit
                      </button>
                    </TapButton>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Why Get a Growth Audit?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-4">🎯</div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Identify Gaps</h3>
                  <p className="text-foreground/70 text-sm md:text-base">
                    Discover what's holding your growth back
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-4">📊</div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Actionable Insights</h3>
                  <p className="text-foreground/70 text-sm md:text-base">
                    Get specific recommendations you can implement
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-4">🚀</div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Growth Roadmap</h3>
                  <p className="text-foreground/70 text-sm md:text-base">
                    See the path to becoming impossible to ignore
                  </p>
                </div>
              </div>

              <div className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <span className="text-xl md:text-2xl">📍</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Address</h4>
                      <p className="text-foreground/70 text-sm md:text-base">Gali No 5, Hoshiyarpur, Sector 51, Noida</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <span className="text-xl md:text-2xl">📞</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Phone</h4>
                      <a href="tel:+917897891020" className="text-foreground/70 hover:text-primary transition-colors text-sm md:text-base">
                        +91 78978 91020
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <span className="text-xl md:text-2xl">✉️</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Email</h4>
                      <a href="mailto:support@ungone.in" className="text-foreground/70 hover:text-primary transition-colors text-sm md:text-base">
                        support@ungone.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <span className="text-xl md:text-2xl">📱</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Social Media</h4>
                      <div className="space-y-1">
                        <a href="https://instagram.com/ungone.in" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors block text-sm md:text-base">
                          Instagram: @ungone.in
                        </a>
                        <a href="https://youtube.com/@ungone" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors block text-sm md:text-base">
                          YouTube: @ungone
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
