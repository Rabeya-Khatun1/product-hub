"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Creative Director at TechVision",
      company: "TechVision Inc.",
      avatar: "AR",
      quote: "Product Hub revolutionized our entire design workflow. What used to take days now happens in hours. It's become the single source of truth for our global team of 50+ designers.",
      rating: 5,
      metrics: "Increased productivity by 240%",
      color: "from-blue-500 to-cyan-400",
      logo: "🎨",
      video: false
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "VP of Engineering at ScaleFast",
      company: "ScaleFast",
      avatar: "SC",
      quote: "The API-first approach and seamless integrations cut our development time by 60%. Our engineering team ships features 3x faster with Product Hub's ecosystem.",
      rating: 5,
      metrics: "Reduced development time by 60%",
      color: "from-purple-500 to-pink-500",
      logo: "⚡",
      video: true
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Product Lead at InnovateCorp",
      company: "InnovateCorp",
      avatar: "MJ",
      quote: "As a product-led organization, we've seen a 180% increase in team collaboration and a 95% reduction in asset management overhead. Truly transformative.",
      rating: 5,
      metrics: "180% increase in collaboration",
      color: "from-emerald-500 to-teal-400",
      logo: "🚀",
      video: false
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "CTO at StartupStack",
      company: "StartupStack",
      avatar: "PP",
      quote: "The ROI was immediate. Within 30 days, we streamlined operations across 8 departments. Customer satisfaction scores increased by 45 points.",
      rating: 5,
      metrics: "45-point CSAT increase",
      color: "from-orange-500 to-red-500",
      logo: "📈",
      video: true
    },
    {
      id: 5,
      name: "David Kim",
      role: "Head of Marketing at GrowthLab",
      company: "GrowthLab",
      avatar: "DK",
      quote: "Our marketing team's efficiency skyrocketed. Campaign deployment went from weeks to days, and asset consistency is now 100% maintained.",
      rating: 5,
      metrics: "100% asset consistency",
      color: "from-indigo-500 to-blue-500",
      logo: "🎯",
      video: false
    }
  ];


  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" id="testimonials" ref={containerRef}>
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-200/30 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Trusted by Industry Leaders
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Teams Worldwide
            </span>
          </h2>
          
          <p className="text-lg md:text-xl opacity-70 max-w-3xl mx-auto">
            Join thousands of teams who have transformed their workflows with Product Hub.
            See what industry leaders are saying about their experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
       
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  value: "10,000+",
                  label: "Active Teams",
                  description: "Across 85+ countries"
                },
                {
                  icon: TrendingUp,
                  value: "98.7%",
                  label: "Satisfaction Rate",
                  description: "Based on customer surveys"
                },
                {
                  icon: Sparkles,
                  value: "4.9/5.0",
                  label: "Average Rating",
                  description: "Across all review platforms"
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-sm opacity-70">{stat.label}</div>
                      </div>
                    </div>
                    <p className="text-sm opacity-60">{stat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

    
          <div className="lg:col-span-2">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
            
              <div className="absolute -top-8 -left-8 z-0">
                <Quote className="w-24 h-24 text-primary/10" />
              </div>

           
              <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden relative z-10">

                <div className={`h-2 bg-gradient-to-r ${activeTestimonial.color}`} />

                <div className="p-8 lg:p-12">
     
                  <div className="mb-8">
                    <p className="text-2xl lg:text-3xl font-serif italic leading-relaxed mb-8">
                      "{activeTestimonial.quote}"
                    </p>
                    
         
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {activeTestimonial.metrics}
                      </span>
                    </div>
                  </div>

        
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
             
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold">
                          {activeTestimonial.avatar}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm">
                          {activeTestimonial.logo}
                        </div>
                      </div>

           
                      <div>
                        <h4 className="text-xl font-bold">
                          {activeTestimonial.name}
                        </h4>
                        <p className="opacity-80 mb-1">{activeTestimonial.role}</p>
                        <p className="text-sm opacity-60">{activeTestimonial.company}</p>
                        
       
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(activeTestimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                 
                    {activeTestimonial.video && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                        <Play className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">
                          Watch Case Study
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

      
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-base-100 border border-base-300 hover:bg-base-200 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

        
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeIndex
                          ? 'bg-primary w-8'
                          : 'bg-base-300 hover:bg-primary/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-base-100 border border-base-300 hover:bg-base-200 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

            
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className="p-3 rounded-full bg-base-100 border border-base-300 hover:bg-base-200 transition-colors ml-4"
                  aria-label={autoplay ? "Pause autoplay" : "Play autoplay"}
                >
                  {autoplay ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

        
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-base-300/30"
            >
              <p className="text-center text-sm opacity-60 mb-6 tracking-wider">
                TRUSTED BY INDUSTRY LEADERS
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { name: "TechVision", color: "from-blue-500 to-cyan-500" },
                  { name: "ScaleFast", color: "from-purple-500 to-pink-500" },
                  { name: "InnovateCorp", color: "from-emerald-500 to-teal-500" },
                  { name: "StartupStack", color: "from-orange-500 to-red-500" },
                  { name: "GrowthLab", color: "from-indigo-500 to-blue-500" }
                ].map((company, index) => (
                  <div
                    key={company.name}
                    className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-xl p-4 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <div className={`text-lg font-bold bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}>
                      {company.name}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

 
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;