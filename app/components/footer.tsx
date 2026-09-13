import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">UnGone</h3>
            <p className="text-foreground/70 mb-4">
              We Make You Impossible to Ignore. From digital invisibility to market leadership.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Customer Acquisition
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Web & CRO Optimization
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-light mt-8 pt-8 text-center text-foreground/50">
          <p>&copy; {new Date().getFullYear()} UnGone. All rights reserved. Making you impossible to ignore.</p>
        </div>
      </div>
    </footer>
  );
}
