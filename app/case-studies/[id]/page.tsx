import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import Link from 'next/link';
import { FadeIn, SlideUp, ScrollReveal, StaggerContainer, StaggerItem, TapButton } from '../../components/animations';

// This would normally come from CMS, but for now we'll use static data
const caseStudyData: Record<string, {
  title: string;
  client: string;
  industry: string;
  service: string;
  image: string;
  results: string[];
  challenge: string;
  approach: string;
  solution: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
}> = {
  '1': {
    title: 'E-commerce Revenue Growth',
    client: 'TechStyle Fashion',
    industry: 'E-commerce',
    service: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    results: ['+230% Revenue Growth', '+180% Conversion Rate', '+150% Customer Retention', '+200% ROI'],
    challenge: 'TechStyle Fashion was struggling with high customer acquisition costs and declining conversion rates. Despite having quality products, they were losing market share to competitors with more sophisticated digital marketing strategies.',
    approach: 'We implemented a comprehensive performance marketing strategy focused on data-driven decision making and customer lifetime value optimization.',
    solution: [
      'Advanced audience segmentation and targeting',
      'Dynamic product retargeting campaigns',
      'Conversion rate optimization across all touchpoints',
      'Customer loyalty program implementation',
      'Real-time bidding optimization',
      'Cross-channel attribution modeling',
    ],
    testimonial: {
      quote: 'UnGone transformed our digital presence completely. We went from struggling to acquire customers to having a predictable, scalable growth engine. The ROI has been incredible.',
      author: 'Sarah Chen',
      position: 'CEO, TechStyle Fashion',
    },
  },
  '2': {
    title: 'Real Estate Lead Generation',
    client: 'Prime Properties',
    industry: 'Real Estate',
    service: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    results: ['+200% Qualified Leads', '+60% Sales Cycle Reduction', '+120% Brand Awareness', '+90% Lead Quality'],
    challenge: 'Prime Properties was facing fierce competition in their local market. Their traditional marketing methods were becoming less effective, and they needed a modern digital approach to attract qualified buyers.',
    approach: 'We developed a hyper-local digital marketing strategy that focused on building trust and authority in their specific market areas.',
    solution: [
      'Hyper-local SEO and content marketing',
      'Virtual tour optimization and promotion',
      'Targeted social media advertising',
      'Lead nurturing automation',
      'Neighborhood-focused landing pages',
      'Google Business Profile optimization',
    ],
    testimonial: {
      quote: 'The quality of leads we receive now is dramatically better. Our sales team can focus on closing deals instead of chasing unqualified prospects.',
      author: 'Michael Rodriguez',
      position: 'Founder, Prime Properties',
    },
  },
  '3': {
    title: 'SaaS User Acquisition',
    client: 'CloudSync Pro',
    industry: 'SaaS & Technology',
    service: 'Customer Acquisition',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    results: ['+300% User Signups', '+90% Free-to-Paid Conversion', '+65% Churn Reduction', '+180% MRR Growth'],
    challenge: 'CloudSync Pro had a great product but struggled to acquire users at scale. Their free-to-paid conversion rate was low, and customer churn was impacting their growth trajectory.',
    approach: 'We implemented a product-led growth strategy combined with targeted acquisition campaigns to improve both user acquisition and retention.',
    solution: [
      'Product-led growth framework implementation',
      'Freemium model optimization',
      'In-app onboarding improvements',
      'Targeted content marketing for developer audience',
      'Customer success program development',
      'Churn prediction and prevention',
    ],
    testimonial: {
      quote: 'UnGone helped us crack the code on SaaS growth. Our user acquisition costs dropped while conversion rates soared. The strategy they implemented is now our growth engine.',
      author: 'David Kim',
      position: 'CTO, CloudSync Pro',
    },
  },
  '4': {
    title: 'Healthcare Patient Acquisition',
    client: 'Wellness First Clinic',
    industry: 'Healthcare',
    service: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    results: ['+150% New Patients', '+110% Online Bookings', '+75% Patient Satisfaction', '+95% Practice Visibility'],
    challenge: 'Wellness First Clinic needed to modernize their patient acquisition process while maintaining HIPAA compliance. Their online presence was weak, and they were missing out on patients who preferred digital booking.',
    approach: 'We created a compliant digital marketing strategy that built patient trust while streamlining the appointment booking process.',
    solution: [
      'HIPAA-compliant marketing campaigns',
      'Patient education content strategy',
      'Online booking system optimization',
      'Local SEO for healthcare practices',
      'Patient review management',
      'Telehealth promotion and integration',
    ],
    testimonial: {
      quote: 'Our patient acquisition has transformed completely. The online booking system alone has revolutionized how we operate, and patient satisfaction has never been higher.',
      author: 'Dr. Emily Watson',
      position: 'Medical Director, Wellness First Clinic',
    },
  },
  '5': {
    title: 'Education Enrollment Growth',
    client: 'Excel Academy',
    industry: 'Education',
    service: 'Customer Acquisition',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    results: ['+180% Enrollment Inquiries', '+130% Campus Visits', '+85% Program Awareness', '+70% Application Completion'],
    challenge: 'Excel Academy was facing declining enrollment numbers and needed to attract students in a competitive education market. Their traditional recruitment methods were becoming less effective with modern students and parents.',
    approach: 'We developed a multi-channel digital recruitment strategy that spoke to both students and their decision-making parents.',
    solution: [
      'Multi-channel student recruitment campaigns',
      'Virtual campus experience development',
      'Program-specific marketing initiatives',
      'Parent engagement strategy',
      'Student ambassador program',
      'Application funnel optimization',
    ],
    testimonial: {
      quote: 'The enrollment numbers speak for themselves. We\'re now attracting quality students who are genuinely interested in our programs, not just filling seats.',
      author: 'Dr. Robert Martinez',
      position: 'Dean of Admissions, Excel Academy',
    },
  },
  '6': {
    title: 'Finance Lead Generation',
    client: 'WealthWise Financial',
    industry: 'Finance',
    service: 'Branding & Strategy',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    results: ['+160% Qualified Leads', '+140% Brand Authority', '+120% Conversion Rate', '+200% Client Retention'],
    challenge: 'WealthWise Financial needed to establish themselves as thought leaders in a crowded financial services market. They struggled to differentiate from competitors and attract high-value clients.',
    approach: 'We built a comprehensive branding and content strategy that positioned them as industry experts while generating qualified leads.',
    solution: [
      'Thought leadership content strategy',
      'High-value prospect targeting',
      'Trust-building campaign development',
      'LinkedIn and professional network optimization',
      'Educational webinar series',
      'Client testimonial and case study program',
    ],
    testimonial: {
      quote: 'UnGone helped us establish real authority in our market. The quality of clients we\'re attracting now is exactly who we want to work with.',
      author: 'Jennifer Adams',
      position: 'Managing Partner, WealthWise Financial',
    },
  },
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function CaseStudyDetail({ params }: { params: { id: string } }) {
  const caseStudy = caseStudyData[params.id];

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
            <Link href="/case-studies" className="text-primary hover:text-primary-dark">
              View All Case Studies
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
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70"></div>
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn duration={0.8}>
              <div className="flex items-center gap-2 mb-4 justify-center">
                <span className="text-sm md:text-base text-primary font-medium">{caseStudy.industry}</span>
                <span className="text-sm md:text-base text-foreground/50">•</span>
                <span className="text-sm md:text-base text-foreground/60">{caseStudy.service}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-center">
                {caseStudy.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-6 md:mb-8 text-center">
                {caseStudy.client}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                Results
              </h2>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {caseStudy.results.map((result, index) => (
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

        {/* Challenge Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6">
                The Challenge
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                {caseStudy.challenge}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6">
                Our Approach
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                {caseStudy.approach}
              </p>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="space-y-3 md:space-y-4">
                {caseStudy.solution.map((solution, index) => (
                  <StaggerItem key={index}>
                    <div className="glass-card p-4 md:p-6 rounded-xl border-l-4 border-primary">
                      <p className="text-foreground/70 text-sm md:text-base">{solution}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="glass-card p-8 md:p-12 rounded-2xl border border-primary/20">
                <div className="text-4xl md:text-6xl text-primary mb-4 md:mb-6">"</div>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">
                  {caseStudy.testimonial.quote}
                </p>
                <div>
                  <p className="text-foreground font-semibold text-base md:text-lg">{caseStudy.testimonial.author}</p>
                  <p className="text-foreground/60 text-sm md:text-base">{caseStudy.testimonial.position}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Want Similar Results?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 md:mb-8">
                Let's discuss how we can achieve remarkable growth for your business.
              </p>
              <TapButton>
                <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block">
                  Get Your Free Growth Audit
                </Link>
              </TapButton>
            </div>
          </ScrollReveal>
        </section>

        {/* Back to Case Studies */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/case-studies" className="text-primary hover:text-primary-dark font-medium text-sm md:text-base">
              ← Back to All Case Studies
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}