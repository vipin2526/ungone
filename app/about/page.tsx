import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, HoverCard, TapButton } from '../components/animations';

export default function About() {
  const values = [
    {
      title: 'Data-Driven',
      description: 'Every decision backed by analytics and measurable results',
    },
    {
      title: 'Transparent',
      description: 'Clear communication, honest reporting, no hidden agendas',
    },
    {
      title: 'Results-Oriented',
      description: 'Focused on outcomes that drive your business growth',
    },
    {
      title: 'Agile',
      description: 'Quick to adapt, iterate, and optimize for success',
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
                About UnGone
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 md:mb-16 text-center">
                We're not just another marketing agency. We're your growth partners, committed to making your business impossible to ignore.
              </p>
            </SlideUp>

            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6">Our Mission</h2>
                  <p className="text-foreground/70 text-base md:text-lg mb-4">
                    To transform businesses from digital invisibility to market leadership through innovative growth strategies and data-driven marketing.
                  </p>
                  <p className="text-foreground/70 text-base md:text-lg">
                    We believe every great business deserves to be seen, heard, and valued. Our mission is to bridge the gap between exceptional products/services and the customers who need them most.
                  </p>
                </div>
                <div className="bg-surface-light p-6 md:p-8 rounded-2xl border border-primary/20">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Our Approach</h3>
                  <p className="text-foreground/70 text-base md:text-lg">
                    We combine cutting-edge digital marketing techniques with deep industry insights to create customized growth strategies that deliver measurable results. No cookie-cutter solutions — just tailored approaches that work for your unique business.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mb-12 md:mb-20">
              <ScrollReveal>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6 text-center">
                  Founder & CEO
                </h2>
                <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Manishiv Chauhan</h3>
                  <p className="text-foreground/70 text-sm md:text-base">
                    Leading the vision to make businesses impossible to ignore through innovative digital growth strategies.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 md:mb-12 text-center">
                  Our Values
                </h2>
                <StaggerContainer staggerDelay={0.1}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {values.map((value, index) => (
                      <StaggerItem key={index}>
                        <HoverCard className="glass-card p-4 md:p-6 rounded-xl hover:border-primary/50 transition-colors text-center">
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                            {value.title}
                          </h3>
                          <p className="text-foreground/70 text-sm md:text-base">
                            {value.description}
                          </p>
                        </HoverCard>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="bg-surface p-6 md:p-8 lg:p-12 rounded-2xl border border-surface-light">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6 text-center">
                  Why Choose UnGone?
                </h2>
                <StaggerContainer staggerDelay={0.15}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <StaggerItem className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10+</div>
                      <p className="text-foreground/70 text-sm md:text-base">Years of Combined Experience</p>
                    </StaggerItem>
                    <StaggerItem className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">200+</div>
                      <p className="text-foreground/70 text-sm md:text-base">Businesses Transformed</p>
                    </StaggerItem>
                    <StaggerItem className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">$50M+</div>
                      <p className="text-foreground/70 text-sm md:text-base">Revenue Generated for Clients</p>
                    </StaggerItem>
                  </div>
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Let's discuss how we can help your business grow.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Start a Conversation
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
