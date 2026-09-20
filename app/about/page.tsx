import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Link from 'next/link';

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
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-center">
              About UnGone
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-16 text-center">
              We're not just another marketing agency. We're your growth partners, committed to making your business impossible to ignore.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-foreground/70 text-lg mb-4">
                  To transform businesses from digital invisibility to market leadership through innovative growth strategies and data-driven marketing.
                </p>
                <p className="text-foreground/70 text-lg">
                  We believe every great business deserves to be seen, heard, and valued. Our mission is to bridge the gap between exceptional products/services and the customers who need them most.
                </p>
              </div>
              <div className="bg-surface-light p-8 rounded-2xl border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Approach</h3>
                <p className="text-foreground/70 text-lg">
                  We combine cutting-edge digital marketing techniques with deep industry insights to create customized growth strategies that deliver measurable results. No cookie-cutter solutions — just tailored approaches that work for your unique business.
                </p>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Founder & CEO
              </h2>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h3 className="text-2xl font-bold text-primary mb-2">Manishiv Chauhan</h3>
                <p className="text-foreground/70">
                  Leading the vision to make businesses impossible to ignore through innovative digital growth strategies.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl hover:border-primary/50 transition-colors text-center">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface p-8 md:p-12 rounded-2xl border border-surface-light">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Why Choose UnGone?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <p className="text-foreground/70">Years of Combined Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <p className="text-foreground/70">Businesses Transformed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                  <p className="text-foreground/70">Revenue Generated for Clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-foreground/70 text-lg mb-8">
              Let's discuss how we can help your business grow.
            </p>
            <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
