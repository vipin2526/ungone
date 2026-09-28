import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, HoverCard, TapButton } from '../components/animations';

export default function Services() {
  const services = [
    {
      title: 'Digital Marketing',
      description: 'Comprehensive strategies to boost your online presence across all channels.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      details: [
        'SEO & Content Strategy',
        'Social Media Marketing',
        'Email Marketing Campaigns',
        'Paid Advertising (PPC)',
      ],
    },
    {
      title: 'Branding & Strategy',
      description: 'Build a memorable brand that resonates with your target audience.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
      details: [
        'Brand Identity Development',
        'Market Positioning',
        'Competitive Analysis',
        'Brand Guidelines',
      ],
    },
    {
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that deliver measurable ROI and growth.',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
      details: [
        'Campaign Optimization',
        'A/B Testing',
        'Conversion Tracking',
        'ROI Analysis',
      ],
    },
    {
      title: 'Customer Acquisition',
      description: 'Targeted approaches to attract and convert ideal customers.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      details: [
        'Lead Generation',
        'Sales Funnel Design',
        'Landing Page Optimization',
        'Customer Journey Mapping',
      ],
    },
    {
      title: 'Web & CRO Optimization',
      description: 'Convert visitors into customers with optimized user experiences.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
      details: [
        'Website Audits',
        'User Experience Design',
        'Conversion Rate Optimization',
        'Speed & Performance',
      ],
    },
    {
      title: 'Analytics & Growth',
      description: 'Insights that fuel continuous improvement and scalable growth.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      details: [
        'Data Analytics Setup',
        'Performance Dashboards',
        'Growth Strategy Consulting',
        'Predictive Analytics',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeIn duration={0.8}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-center">
                Our Services
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-8 md:mb-12 text-center">
                Comprehensive solutions designed to accelerate your growth and make your business impossible to ignore.
              </p>
            </SlideUp>

            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {services.map((service, index) => (
                  <StaggerItem key={index}>
                    <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                      <div className="h-40 md:h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                          {service.title}
                        </h3>
                        <p className="text-foreground/70 text-sm md:text-base mb-3 md:mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-foreground/60">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Ready to Grow?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Let's discuss how our services can transform your business.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Get a Free Consultation
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
