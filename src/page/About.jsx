"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from 'react';
import { Trophy, Zap, Shield, Users, TrendingUp, Globe } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Animation variants
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stats = [
    { 
      value: "99.9%", 
      label: "Uptime SLA", 
      description: "Enterprise-grade reliability",
      icon: Shield,
      color: "text-primary",
      delay: 0.1
    },
    { 
      value: "25M+", 
      label: "Assets Delivered", 
      description: "Globally distributed",
      icon: Globe,
      color: "text-secondary",
      delay: 0.2
    },
    { 
      value: "10x", 
      label: "Faster Performance", 
      description: "Compared to industry average",
      icon: Zap,
      color: "text-accent",
      delay: 0.3
    },
    { 
      value: "24/7", 
      label: "Support Coverage", 
      description: "Enterprise support teams",
      icon: Users,
      color: "text-info",
      delay: 0.4
    }
  ];

  const features = [
    "Enterprise-grade security with SOC2 compliance",
    "Real-time analytics and insights dashboard",
    "Automated scaling for unpredictable traffic",
    "Global CDN with edge computing",
    "API-first architecture with full documentation",
    "White-label solutions for agencies"
  ];

  return (
    <section className="py-24 lg:py-32 overflow-hidden relative" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={containerRef} 
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Industry Leader Since 2018
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Engineered for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Modern
              </span>{" "}
              Innovation
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl opacity-80 leading-relaxed mb-8"
            >
              Product Hub is not just a platform—it's a comprehensive ecosystem designed to 
              handle the complexity of modern digital commerce and asset management at scale.
            </motion.p>

            {/* Features List */}
            <motion.div
              variants={fadeInUp}
              className="mb-10"
            >
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="opacity-90">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    transition={{ delay: stat.delay }}
                    className="bg-base-100/20 backdrop-blur-sm border border-base-300 rounded-xl p-4 sm:p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} opacity-90`} />
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="font-semibold text-sm sm:text-base mb-1">{stat.label}</div>
                    <div className="text-xs opacity-60">{stat.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="relative bg-gradient-to-br from-base-100/10 to-base-300/10 h-[500px] sm:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
              {/* Dashboard Mockup */}
              <div className="absolute inset-0 p-6">
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                    <div className="w-24 h-3 bg-base-300/50 rounded-full" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-base-300/50" />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="bg-base-100/20 rounded-xl p-4 border border-base-300/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-16 h-2 bg-base-300/50 rounded-full" />
                        <div className="w-4 h-4 rounded-full bg-primary/30" />
                      </div>
                      <div className="w-12 h-3 bg-base-300/50 rounded-full mb-1" />
                      <div className="w-20 h-2 bg-success/30 rounded-full" />
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-base-100/10 rounded-2xl p-4 border border-base-300/30 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-32 h-3 bg-base-300/50 rounded-full" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-2 bg-base-300/50 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="h-32 relative">
                    {/* Animated Chart Lines */}
                    <svg className="w-full h-full" viewBox="0 0 300 120">
                      <motion.path
                        d="M0,60 C50,40 100,80 150,30 C200,-20 250,100 300,50"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-base-300/50" />
                      <div className="flex-1">
                        <div className="w-48 h-2 bg-base-300/50 rounded-full mb-1" />
                        <div className="w-32 h-2 bg-base-300/30 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/10 backdrop-blur-sm shadow-lg"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-accent/20 to-info/20 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg"
              />
            </div>

            {/* Decorative Background */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2.5rem] blur-xl" />
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-base-300/30"
        >
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-wider opacity-60 mb-2">
              Trusted By Industry Leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
              {['TechCorp', 'InnovateCo', 'GlobalSoft', 'FutureSys', 'CloudNet'].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="text-lg font-bold tracking-tighter hover:text-primary transition-all"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;