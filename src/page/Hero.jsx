"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle primary CTA click
  const handlePrimaryClick = () => {
    console.log('Primary CTA clicked');
    // Add your navigation or action here
    // Example: router.push('/explore');
  };

  // Handle secondary CTA click
  const handleSecondaryClick = () => {
    console.log('Secondary CTA clicked');
    // Add your action here
    // Example: openVideoModal();
  };

  // Handle badge click
  const handleBadgeClick = () => {
    console.log('Badge clicked - View changelog');
    // Add navigation to changelog
  };

  // Animation variants for cleaner code
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleWords = ["Innovate", "Faster."];
  
  return (
    <section className="hero relative min-h-screen bg-gradient-to-b from-base-300 via-base-200 to-base-100 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>


      <motion.div 
        style={{ y, opacity }}
        className="hero-content text-center relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          className="max-w-5xl w-full"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBadgeClick}
            className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Version 2.0 is live
            </span>
            <motion.svg
              className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.div>


          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none mb-6 md:mb-8">
              {titleWords.map((word, index) => (
                <React.Fragment key={index}>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                    className={`inline-block ${index === 1 ? 'text-primary italic' : ''} mr-2`}
                  >
                    {word}
                  </motion.span>
                  {index === 0 && <span className="inline-block"> </span>}
                </React.Fragment>
              ))}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-2 text-primary"
              >
                ✨
              </motion.span>
            </h1>
          </motion.div>

    
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl lg:text-2xl opacity-80 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              The central hub for all your premium digital assets, high-performance tools, 
              and creative ecosystems. Transform your workflow today.
            </p>
          </motion.div>


          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-12 md:mb-16"
          >
          
            <motion.button
              onClick={handlePrimaryClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="btn btn-primary btn-lg rounded-full px-8 md:px-10 relative overflow-hidden group min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide">
                Explore Hub
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

       
            <motion.button
              onClick={handleSecondaryClick}
              className="btn btn-ghost btn-lg rounded-full px-6 md:px-8 group min-w-[180px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center gap-2 font-medium">
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                Watch Demo
              </span>
            </motion.button>
          </motion.div>

     
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-base-content/10"
          >
            <p className="text-sm opacity-60 mb-4 tracking-wide">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="flex justify-center items-center gap-8 md:gap-12 opacity-50">
              {['A', 'B', 'C', 'D', 'E'].map((letter, index) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="text-lg md:text-xl font-bold tracking-tighter"
                >
                  {letter}Co
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs opacity-50 mb-2 tracking-wider">EXPLORE MORE</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border border-base-content/20 rounded-full flex justify-center"
          >
            <div className="w-0.5 h-3 bg-base-content/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;