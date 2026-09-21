import Navigation from './components/navigation';
import Footer from './components/footer';
import Link from 'next/link';

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
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
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
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70"></div>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80"
              alt="Digital Growth"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-center">
              We Make You
              <span className="text-primary block mt-2">Impossible to Ignore</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12 text-center">
              From digital invisibility to market leadership — UnGone builds visibility, drives relevance, and transforms businesses into growth machines.
            </p>
            <div className="text-center">
              <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
                Get a Free Growth Audit
              </Link>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Businesses Disappear Into Digital Noise
                </h2>
                <p className="text-foreground/70 text-lg mb-4">
                  In today's crowded digital landscape, even great businesses struggle to get noticed. Your competitors are winning the attention game while you're left wondering why your marketing isn't working.
                </p>
              </div>
              <div className="bg-surface-light p-8 rounded-2xl border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">The UnGone Solution</h3>
                <p className="text-foreground/70 text-lg">
                  We don't just run campaigns — we engineer visibility. Our data-driven approach ensures your brand cuts through the noise, attracts the right customers, and generates measurable growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                Comprehensive solutions designed to accelerate your growth
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="glass-card rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-foreground/70">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="text-primary hover:text-primary-dark font-semibold text-lg">
                View All Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact
              </h2>
              <p className="text-foreground/70 text-lg">
                Results that speak for themselves
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Become Impossible to Ignore?
            </h2>
            <p className="text-foreground/70 text-lg mb-8">
              Get a free growth audit and discover the opportunities you're missing.
            </p>
            <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
              Get Your Free Growth Audit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
