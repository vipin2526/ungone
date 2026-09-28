import Navigation from './components/navigation';
import Footer from './components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, HoverCard, TapButton } from './components/animations';
import HeroSlider from './components/hero-slider';

export default function Home() {
  const services = [
    { 
      title: 'Digital Marketing', 
      description: 'Comprehensive strategies to boost your online presence',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    },
    { 
      title: 'Branding & Strategy', 
      description: 'Build a memorable brand that resonates',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80'
    },
    {
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that deliver ROI',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80'
    },
    { 
      title: 'Customer Acquisition', 
      description: 'Targeted approaches to attract ideal customers',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80'
    },
    { 
      title: 'Web & CRO Optimization', 
      description: 'Convert visitors into customers',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80'
    },
    { 
      title: 'Analytics & Growth', 
      description: 'Insights that fuel continuous improvement',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
    },
  ];

  const stats = [
    { label: 'Lead Growth', value: '+230%' },
    { label: 'Revenue Growth', value: '+180%' },
    { label: 'Brand Visibility', value: '+140%' },
    { label: 'Campaign ROI', value: '+200%' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <HeroSlider />

        {/* Problem/Solution Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                    Businesses Disappear Into Digital Noise
                  </h2>
                  <p className="text-foreground/70 text-base md:text-lg mb-4">
                    In today's crowded digital landscape, even great businesses struggle to get noticed. Your competitors are winning the attention game while you're left wondering why your marketing isn't working.
                  </p>
                </div>
                <div className="bg-surface-light p-6 md:p-8 rounded-2xl border border-primary/20">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">The UnGone Solution</h3>
                  <p className="text-foreground/70 text-base md:text-lg">
                    We don't just run campaigns — we engineer visibility. Our data-driven approach ensures your brand cuts through the noise, attracts the right customers, and generates measurable growth.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                  Our Services
                </h2>
                <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
                  Comprehensive solutions designed to accelerate your growth
                </p>
              </div>
            </ScrollReveal>
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
                        <p className="text-foreground/70 text-sm md:text-base">
                          {service.description}
                        </p>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
            <div className="text-center mt-8 md:mt-12">
              <ScrollReveal>
                <Link href="/services" className="text-primary hover:text-primary-dark font-semibold text-base md:text-lg">
                  View All Services →
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                  Featured Case Studies
                </h2>
                <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
                  Real results for real businesses
                </p>
              </div>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StaggerItem>
                  <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="h-40 md:h-48 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                        alt="E-commerce Case Study"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                        E-commerce Revenue Growth
                      </h3>
                      <p className="text-foreground/70 text-sm md:text-base mb-3">
                        How we helped a fashion brand triple their revenue.
                      </p>
                      <div className="text-primary font-medium text-sm md:text-base mb-2">+230% Revenue Growth</div>
                      <Link href="/case-studies/1" className="text-primary hover:text-primary-dark font-medium text-sm md:text-base">
                        Read Case Study →
                      </Link>
                    </div>
                  </HoverCard>
                </StaggerItem>
                <StaggerItem>
                  <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="h-40 md:h-48 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
                        alt="SaaS Case Study"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                        SaaS User Acquisition
                      </h3>
                      <p className="text-foreground/70 text-sm md:text-base mb-3">
                        Accelerating user acquisition for a B2B SaaS platform.
                      </p>
                      <div className="text-primary font-medium text-sm md:text-base mb-2">+300% User Signups</div>
                      <Link href="/case-studies/3" className="text-primary hover:text-primary-dark font-medium text-sm md:text-base">
                        Read Case Study →
                      </Link>
                    </div>
                  </HoverCard>
                </StaggerItem>
                <StaggerItem>
                  <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="h-40 md:h-48 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                        alt="Real Estate Case Study"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                        Real Estate Lead Generation
                      </h3>
                      <p className="text-foreground/70 text-sm md:text-base mb-3">
                        Transforming lead generation for a real estate agency.
                      </p>
                      <div className="text-primary font-medium text-sm md:text-base mb-2">+200% Qualified Leads</div>
                      <Link href="/case-studies/2" className="text-primary hover:text-primary-dark font-medium text-sm md:text-base">
                        Read Case Study →
                      </Link>
                    </div>
                  </HoverCard>
                </StaggerItem>
              </div>
            </StaggerContainer>
            <div className="text-center mt-8 md:mt-12">
              <ScrollReveal>
                <Link href="/case-studies" className="text-primary hover:text-primary-dark font-semibold text-base md:text-lg">
                  View All Case Studies →
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                  Industries We Serve
                </h2>
                <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
                  Deep expertise across diverse sectors
                </p>
              </div>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {['E-commerce', 'Real Estate', 'Education', 'SaaS', 'Healthcare', 'Finance'].map((industry, index) => (
                  <StaggerItem key={index}>
                    <HoverCard className="glass-card p-4 md:p-6 rounded-xl text-center hover:border-primary/50 transition-colors">
                      <p className="text-foreground/70 text-sm md:text-base font-medium">{industry}</p>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
            <div className="text-center mt-8 md:mt-12">
              <ScrollReveal>
                <Link href="/industries" className="text-primary hover:text-primary-dark font-semibold text-base md:text-lg">
                  View All Industries →
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                  Our Impact
                </h2>
                <p className="text-foreground/70 text-base md:text-lg">
                  Results that speak for themselves
                </p>
              </div>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {stats.map((stat, index) => (
                  <StaggerItem key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-foreground/70 text-sm md:text-lg">
                      {stat.label}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12 rounded-2xl border border-primary/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Ready to Become Impossible to Ignore?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Get a free growth audit and discover the opportunities you're missing.
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
