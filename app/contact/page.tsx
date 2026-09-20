'use client';

import { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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
          phone: '',
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
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-center">
              Get a Free Growth Audit
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-12 text-center">
              Tell us about your business and we'll show you how to become impossible to ignore.
            </p>

            <div className="bg-surface p-8 md:p-12 rounded-2xl border border-surface-light">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Thank You!</h3>
                  <p className="text-foreground/70">
                    We've received your request and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-foreground font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-foreground font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-foreground font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-foreground font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-foreground font-medium mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
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
                    <label htmlFor="message" className="block text-foreground font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-background border border-surface-light rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your goals and challenges..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-background px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                  >
                    Get Your Free Growth Audit
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Why Get a Growth Audit?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Identify Gaps</h3>
                <p className="text-foreground/70">
                  Discover what's holding your growth back
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Actionable Insights</h3>
                <p className="text-foreground/70">
                  Get specific recommendations you can implement
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Growth Roadmap</h3>
                <p className="text-foreground/70">
                  See the path to becoming impossible to ignore
                </p>
              </div>
            </div>

            <div className="bg-surface-light p-8 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Address</h4>
                    <p className="text-foreground/70">Gali No 5, Hoshiyarpur, Sector 51, Noida</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <a href="tel:7897891020" className="text-foreground/70 hover:text-primary transition-colors">
                      7897891020
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a href="mailto:support@ungone.in" className="text-foreground/70 hover:text-primary transition-colors">
                      support@ungone.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Social Media</h4>
                    <div className="space-y-1">
                      <a href="https://instagram.com/ungone.in" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors block">
                        Instagram: @ungone.in
                      </a>
                      <a href="https://youtube.com/@ungone" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors block">
                        YouTube: @ungone
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
