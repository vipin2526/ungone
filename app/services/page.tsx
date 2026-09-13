import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Digital Marketing',
      description: 'Comprehensive strategies to boost your online presence across all channels.',
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
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-center">
              Our Services
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12 text-center">
              Comprehensive solutions designed to accelerate your growth and make your business impossible to ignore.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-surface p-8 rounded-2xl border border-surface-light hover:border-primary/50 transition-all group">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-foreground/60 flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Grow?
            </h2>
            <p className="text-foreground/70 text-lg mb-8">
              Let's discuss how our services can transform your business.
            </p>
            <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
              Get a Free Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
