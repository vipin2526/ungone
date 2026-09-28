import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, TapButton } from '../../components/animations';

// This would normally come from CMS, but for now we'll use static data
const industryData: Record<string, {
  title: string;
  description: string;
  image: string;
  challenges: string[];
  approach: string[];
  results: string[];
  services: string[];
}> = {
  'e-commerce': {
    title: 'E-commerce',
    description: 'Drive sales and customer loyalty for online stores with targeted digital strategies.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    challenges: [
      'High competition and price wars',
      'Customer acquisition costs rising',
      'Cart abandonment optimization',
      'Seasonal demand fluctuations',
    ],
    approach: [
      'Data-driven product positioning',
      'Advanced retargeting strategies',
      'Conversion rate optimization',
      'Customer lifetime value maximization',
    ],
    results: [
      '+45% increase in conversion rates',
      '+60% reduction in cart abandonment',
      '+200% improvement in customer retention',
      '+150% growth in average order value',
    ],
    services: [
      'Performance Marketing',
      'Customer Acquisition',
      'Web & CRO Optimization',
      'Analytics & Growth',
    ],
  },
  'real-estate': {
    title: 'Real Estate',
    description: 'Generate qualified leads and build brand presence in competitive property markets.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    challenges: [
      'Long sales cycles',
      'Building trust with prospective buyers',
      'Local market differentiation',
      'Virtual showing adoption',
    ],
    approach: [
      'Hyper-local targeting strategies',
      'Trust-building content marketing',
      'Virtual tour optimization',
      'Lead nurturing automation',
    ],
    results: [
      '+80% increase in qualified leads',
      '+50% reduction in sales cycle time',
      '+120% improvement in lead-to-close rate',
      '+90% growth in brand awareness',
    ],
    services: [
      'Digital Marketing',
      'Customer Acquisition',
      'Branding & Strategy',
      'Analytics & Growth',
    ],
  },
  'education': {
    title: 'Education',
    description: 'Attract students and showcase institutional excellence through digital channels.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    challenges: [
      'Standing out in crowded education market',
      'Converting prospective students',
      'Showcasing campus and programs',
      'Engaging parents and decision makers',
    ],
    approach: [
      'Multi-channel student recruitment',
      'Virtual campus experience',
      'Program-specific campaigns',
      'Parent and student journey mapping',
    ],
    results: [
      '+70% increase in enrollment inquiries',
      '+55% improvement in application completion',
      '+130% growth in campus visit bookings',
      '+85% increase in program awareness',
    ],
    services: [
      'Digital Marketing',
      'Branding & Strategy',
      'Customer Acquisition',
      'Web & CRO Optimization',
    ],
  },
  'saas': {
    title: 'SaaS & Technology',
    description: 'Accelerate user acquisition and reduce churn for software products.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    challenges: [
      'Complex product value communication',
      'Free-to-paid conversion',
      'Reducing customer churn',
      'Competitive feature differentiation',
    ],
    approach: [
      'Product-led growth strategies',
      'Freemium optimization',
      'Customer success marketing',
      'Competitive positioning',
    ],
    results: [
      '+90% increase in free-to-paid conversion',
      '+65% reduction in customer churn',
      '+180% growth in monthly active users',
      '+140% improvement in trial signups',
    ],
    services: [
      'Performance Marketing',
      'Customer Acquisition',
      'Analytics & Growth',
      'Web & CRO Optimization',
    ],
  },
  'healthcare': {
    title: 'Healthcare',
    description: 'Build patient trust and streamline appointment booking with digital solutions.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    challenges: [
      'HIPAA compliance in marketing',
      'Building patient trust online',
      'Local practice visibility',
      'Patient experience optimization',
    ],
    approach: [
      'Compliant patient acquisition',
      'Trust-building content strategy',
      'Local SEO optimization',
      'Patient journey mapping',
    ],
    results: [
      '+75% increase in new patient appointments',
      '+60% improvement in patient satisfaction',
      '+110% growth in online bookings',
      '+95% increase in practice visibility',
    ],
    services: [
      'Digital Marketing',
      'Customer Acquisition',
      'Web & CRO Optimization',
      'Analytics & Growth',
    ],
  },
  'finance': {
    title: 'Finance',
    description: 'Generate leads and establish authority in competitive financial services.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    challenges: [
      'Regulatory compliance constraints',
      'Building credibility and trust',
      'Complex product simplification',
      'Targeting high-value prospects',
    ],
    approach: [
      'Compliant financial marketing',
      'Thought leadership content',
      'High-value prospect targeting',
      'Trust-building campaigns',
    ],
    results: [
      '+85% increase in qualified leads',
      '+70% improvement in lead quality',
      '+160% growth in brand authority',
      '+120% increase in conversion rates',
    ],
    services: [
      'Digital Marketing',
      'Branding & Strategy',
      'Customer Acquisition',
      'Analytics & Growth',
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'e-commerce' },
    { slug: 'real-estate' },
    { slug: 'education' },
    { slug: 'saas' },
    { slug: 'healthcare' },
    { slug: 'finance' },
  ];
}

export default function IndustryDetail({ params }: { params: { slug: string } }) {
  const industry = industryData[params.slug];

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Industry Not Found</h1>
            <Link href="/industries" className="text-primary hover:text-primary-dark">
              View All Industries
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70"></div>
            <img
              src={industry.image}
              alt={industry.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn duration={0.8}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-center">
                {industry.title}
              </h1>
            </FadeIn>
            <SlideUp delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-8 md:mb-12 text-center">
                {industry.description}
              </p>
            </SlideUp>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Industry Challenges
              </h2>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {industry.challenges.map((challenge, index) => (
                  <StaggerItem key={index}>
                    <div className="glass-card p-4 md:p-6 rounded-xl">
                      <p className="text-foreground/70 text-sm md:text-base">{challenge}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Our Approach
              </h2>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {industry.approach.map((approach, index) => (
                  <StaggerItem key={index}>
                    <div className="glass-card p-4 md:p-6 rounded-xl border-l-4 border-primary">
                      <p className="text-foreground/70 text-sm md:text-base">{approach}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Results We've Delivered
              </h2>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {industry.results.map((result, index) => (
                  <StaggerItem key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                      {result.split(' ')[0]}
                    </div>
                    <div className="text-foreground/70 text-xs md:text-sm">
                      {result.split(' ').slice(1).join(' ')}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Services for {industry.title}
              </h2>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {industry.services.map((service, index) => (
                  <StaggerItem key={index}>
                    <div className="glass-card p-4 md:p-6 rounded-xl text-center">
                      <p className="text-foreground/70 text-sm md:text-base font-medium">{service}</p>
                    </div>
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
                Ready to Grow Your {industry.title} Business?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Let's discuss how our industry-specific expertise can transform your business.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Get Industry-Specific Insights
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