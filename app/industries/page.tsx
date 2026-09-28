import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, HoverCard, TapButton } from '../components/animations';

export default function Industries() {
  const industries = [
    {
      title: 'E-commerce',
      description: 'Drive sales and customer loyalty for online stores with targeted digital strategies.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      challenges: [
        'High competition and price wars',
        'Customer acquisition costs rising',
        'Cart abandonment optimization',
        'Seasonal demand fluctuations',
      ],
    },
    {
      title: 'Real Estate',
      description: 'Generate qualified leads and build brand presence in competitive property markets.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      challenges: [
        'Long sales cycles',
        'Building trust with prospective buyers',
        'Local market differentiation',
        'Virtual showing adoption',
      ],
    },
    {
      title: 'Education',
      description: 'Attract students and showcase institutional excellence through digital channels.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      challenges: [
        'Standing out in crowded education market',
        'Converting prospective students',
        'Showcasing campus and programs',
        'Engaging parents and decision makers',
      ],
    },
    {
      title: 'SaaS & Technology',
      description: 'Accelerate user acquisition and reduce churn for software products.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
      challenges: [
        'Complex product value communication',
        'Free-to-paid conversion',
        'Reducing customer churn',
        'Competitive feature differentiation',
      ],
    },
    {
      title: 'Healthcare',
      description: 'Build patient trust and streamline appointment booking with digital solutions.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      challenges: [
        'HIPAA compliance in marketing',
        'Building patient trust online',
        'Local practice visibility',
        'Patient experience optimization',
      ],
    },
    {
      title: 'Finance',
      description: 'Generate leads and establish authority in competitive financial services.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      challenges: [
        'Regulatory compliance constraints',
        'Building credibility and trust',
        'Complex product simplification',
        'Targeting high-value prospects',
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
                Industries We Serve
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-8 md:mb-12 text-center">
                Deep expertise across diverse sectors, delivering tailored growth strategies that understand your unique challenges and opportunities.
              </p>
            </SlideUp>

            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {industries.map((industry, index) => (
                  <StaggerItem key={index}>
                    <HoverCard className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                      <div className="h-40 md:h-48 overflow-hidden">
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                          {industry.title}
                        </h3>
                        <p className="text-foreground/70 text-sm md:text-base mb-3 md:mb-4">
                          {industry.description}
                        </p>
                        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-foreground/60">
                          {industry.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {challenge}
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
                Industry-Specific Expertise
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                We don't just apply generic marketing tactics. We understand the nuances of your industry and craft strategies that resonate with your specific audience.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Discuss Your Industry
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