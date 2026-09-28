'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'We Make You',
    subtitle: 'Impossible to Ignore',
    description: 'From digital invisibility to market leadership — UnGone builds visibility, drives relevance, and transforms businesses into growth machines.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80',
    cta: 'Get a Free Growth Audit',
    ctaLink: '/contact',
  },
  {
    id: 2,
    title: 'Data-Driven',
    subtitle: 'Marketing Excellence',
    description: 'Every decision backed by analytics and measurable results. We don\'t guess — we know what works for your business.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    cta: 'Explore Our Services',
    ctaLink: '/services',
  },
  {
    id: 3,
    title: 'Industry-Specific',
    subtitle: 'Growth Strategies',
    description: 'Deep expertise across E-commerce, Real Estate, SaaS, Healthcare, Education, and Finance. We understand your unique challenges.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
    cta: 'View Industries',
    ctaLink: '/industries',
  },
  {
    id: 4,
    title: 'Proven Results',
    subtitle: 'Real Case Studies',
    description: '+230% revenue growth, +200% qualified leads, +300% user signups. See how we\'ve transformed businesses like yours.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
    cta: 'See Case Studies',
    ctaLink: '/case-studies',
  },
  {
    id: 5,
    title: 'Start Your',
    subtitle: 'Growth Journey Today',
    description: 'Get a free growth audit and discover the opportunities you\'re missing. Let\'s make your business impossible to ignore.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=80',
    cta: 'Get Started Now',
    ctaLink: '/contact',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      ref={sliderRef}
      className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              {/* Content */}
              <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center">
                <div className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-2 md:mb-4 text-center">
                      {slide.title}
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-4 md:mb-6 text-center">
                      {slide.subtitle}
                    </h2>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-6 md:mb-8 text-center"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center"
                  >
                    <Link
                      href={slide.ctaLink}
                      className="bg-primary hover:bg-primary-dark text-background px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors inline-block"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-3 rounded-full transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-surface-light"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-3 rounded-full transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-surface-light"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all hover:scale-125 active:scale-90 ${
              index === currentSlide
                ? 'bg-primary w-6 md:w-8'
                : 'bg-surface-light hover:bg-surface'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}