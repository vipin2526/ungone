'use client';

import { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, HoverCard, TapButton } from '../components/animations';

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  const caseStudies = [
    {
      id: 1,
      title: 'E-commerce Revenue Growth',
      client: 'TechStyle Fashion',
      industry: 'E-commerce',
      service: 'Performance Marketing',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
      results: ['+230% Revenue Growth', '+180% Conversion Rate', '+150% Customer Retention'],
      excerpt: 'How we helped a fashion e-commerce brand triple their revenue through data-driven performance marketing.',
    },
    {
      id: 2,
      title: 'Real Estate Lead Generation',
      client: 'Prime Properties',
      industry: 'Real Estate',
      service: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      results: ['+200% Qualified Leads', '+60% Sales Cycle Reduction', '+120% Brand Awareness'],
      excerpt: 'Transforming a real estate agency\'s lead generation strategy with hyper-local targeting and trust-building content.',
    },
    {
      id: 3,
      title: 'SaaS User Acquisition',
      client: 'CloudSync Pro',
      industry: 'SaaS & Technology',
      service: 'Customer Acquisition',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
      results: ['+300% User Signups', '+90% Free-to-Paid Conversion', '+65% Churn Reduction'],
      excerpt: 'Accelerating user acquisition for a B2B SaaS platform through product-led growth strategies.',
    },
    {
      id: 4,
      title: 'Healthcare Patient Acquisition',
      client: 'Wellness First Clinic',
      industry: 'Healthcare',
      service: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      results: ['+150% New Patients', '+110% Online Bookings', '+75% Patient Satisfaction'],
      excerpt: 'Building patient trust and streamlining appointment booking for a multi-location healthcare provider.',
    },
    {
      id: 5,
      title: 'Education Enrollment Growth',
      client: 'Excel Academy',
      industry: 'Education',
      service: 'Customer Acquisition',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      results: ['+180% Enrollment Inquiries', '+130% Campus Visits', '+85% Program Awareness'],
      excerpt: 'Attracting students and showcasing institutional excellence through multi-channel digital campaigns.',
    },
    {
      id: 6,
      title: 'Finance Lead Generation',
      client: 'WealthWise Financial',
      industry: 'Finance',
      service: 'Branding & Strategy',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      results: ['+160% Qualified Leads', '+140% Brand Authority', '+120% Conversion Rate'],
      excerpt: 'Establishing authority and generating high-value leads for a financial services firm through thought leadership.',
    },
  ];

  const industries = ['all', 'E-commerce', 'Real Estate', 'SaaS & Technology', 'Healthcare', 'Education', 'Finance'];
  const services = ['all', 'Digital Marketing', 'Performance Marketing', 'Customer Acquisition', 'Branding & Strategy'];

  const filteredCaseStudies = caseStudies.filter(study => {
    const industryMatch = selectedIndustry === 'all' || study.industry === selectedIndustry;
    const serviceMatch = selectedService === 'all' || study.service === selectedService;
    return industryMatch && serviceMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeIn duration={0.8}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-center">
                Case Studies
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-8 md:mb-12 text-center">
                Real results for real businesses. See how we've helped companies across industries achieve remarkable growth.
              </p>
            </SlideUp>

            {/* Filters */}
            <ScrollReveal>
              <div className="mb-8 md:mb-12">
                <div className="mb-6">
                  <label className="block text-foreground font-medium mb-3 text-sm md:text-base">Filter by Industry</label>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <TapButton key={industry}>
                        <button
                          onClick={() => setSelectedIndustry(industry)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedIndustry === industry
                              ? 'bg-primary text-background'
                              : 'bg-surface text-foreground hover:bg-surface-light'
                          }`}
                        >
                          {industry === 'all' ? 'All Industries' : industry}
                        </button>
                      </TapButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-3 text-sm md:text-base">Filter by Service</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <TapButton key={service}>
                        <button
                          onClick={() => setSelectedService(service)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedService === service
                              ? 'bg-primary text-background'
                              : 'bg-surface text-foreground hover:bg-surface-light'
                          }`}
                        >
                          {service === 'all' ? 'All Services' : service}
                        </button>
                      </TapButton>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Case Studies Grid */}
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredCaseStudies.map((study) => (
                  <StaggerItem key={study.id}>
                    <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                      <div className="h-40 md:h-48 overflow-hidden">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs md:text-sm text-primary font-medium">{study.industry}</span>
                          <span className="text-xs md:text-sm text-foreground/50">•</span>
                          <span className="text-xs md:text-sm text-foreground/60">{study.service}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                          {study.title}
                        </h3>
                        <p className="text-foreground/70 text-sm md:text-base mb-3">
                          {study.excerpt}
                        </p>
                        <div className="space-y-1 mb-4">
                          {study.results.slice(0, 2).map((result, idx) => (
                            <div key={idx} className="text-xs md:text-sm text-primary font-medium">
                              {result}
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/case-studies/${study.id}`}
                          className="inline-block text-primary hover:text-primary-dark font-medium text-sm md:text-base"
                        >
                          Read Case Study →
                        </Link>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {filteredCaseStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/70 text-lg">No case studies found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedIndustry('all');
                    setSelectedService('all');
                  }}
                  className="mt-4 text-primary hover:text-primary-dark font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Want Results Like These?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Let's discuss how we can achieve similar growth for your business.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Get Your Free Growth Audit
                </Link>
              </TapButton>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}