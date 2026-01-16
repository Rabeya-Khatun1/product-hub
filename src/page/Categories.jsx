"use client";
import { motion, useInView } from "framer-motion";
import React, { useState, useRef } from 'react';
import { 
  Cpu, 
  Palette, 
  Brain, 
  Grid3x3, 
  Megaphone, 
  Database,
  Code,
  Shield,
  Globe,
  TrendingUp,
  Filter,
  X
} from 'lucide-react';
import Link from "next/link";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });


  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const categories = [
    {
      id: 'all',
      name: 'All Products',
      icon: Grid3x3,
      count: 248,
      color: 'from-primary to-secondary',
      description: 'Browse all available products'
    },
    {
      id: 'saas',
      name: 'SaaS Tools',
      icon: Cpu,
      count: 64,
      color: 'from-blue-500 to-cyan-400',
      description: 'Software as a service solutions'
    },
    {
      id: 'design',
      name: 'Design Assets',
      icon: Palette,
      count: 42,
      color: 'from-purple-500 to-pink-500',
      description: 'UI Kits, templates, and resources'
    },
    {
      id: 'ai',
      name: 'AI Tools',
      icon: Brain,
      count: 38,
      color: 'from-emerald-500 to-teal-400',
      description: 'Artificial intelligence solutions'
    },
    {
      id: 'components',
      name: 'Components',
      icon: Code,
      count: 56,
      color: 'from-orange-500 to-red-500',
      description: 'Reusable code components'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      count: 32,
      color: 'from-violet-500 to-purple-500',
      description: 'Marketing and growth tools'
    },
    {
      id: 'data',
      name: 'Data & Analytics',
      icon: Database,
      count: 28,
      color: 'from-indigo-500 to-blue-500',
      description: 'Data visualization and analytics'
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      count: 24,
      color: 'from-red-500 to-orange-500',
      description: 'Security and compliance tools'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: Globe,
      count: 18,
      color: 'from-cyan-500 to-blue-500',
      description: 'Cloud and infrastructure tools'
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: TrendingUp,
      count: 36,
      color: 'from-green-500 to-emerald-500',
      description: 'Growth and optimization tools'
    }
  ];

  const popularTags = [
    'React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js',
    'Mobile', 'Web3', 'API', 'Automation', 'Low Code',
    'Open Source', 'Enterprise', 'Startup', 'No Code'
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    console.log(`Selected category: ${categoryId}`);
   
  };

  const handleTagClick = (tag) => {
    console.log(`Selected tag: ${tag}`);
    
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={containerRef} id="categories">
    
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-100/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
       
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-sm font-semibold text-primary">
              🏷️ Browse Categories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Product Hub
            </span>
          </h2>
          
          <p className="text-lg md:text-xl opacity-70 mb-8 max-w-2xl mx-auto">
            Discover thousands of premium digital assets, tools, and resources across all major categories.
            Filter by technology, use case, or popularity.
          </p>


          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products, tools, or resources..."
                  className="w-full px-6 py-4 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-10 h-10 bg-primary text-primary-content rounded-xl flex items-center justify-center">
                    🔍
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-base-100 border border-base-300 rounded-2xl flex items-center justify-center gap-2 hover:bg-base-200 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
                {showFilters && <X className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </motion.div>


        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                variants={fadeInUp}
                onClick={() => handleCategoryClick(category.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                  isActive 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-base-300 bg-base-100 hover:border-primary/30'
                }`}
              >
          
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
        
                <div className={`relative mb-4 p-3 rounded-xl w-fit ${
                  isActive 
                    ? 'bg-primary text-primary-content' 
                    : 'bg-base-200 group-hover:bg-primary/10'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-base-content'}`} />
                </div>
                
         
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-2 text-left group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-60 text-left mb-3">
                    {category.description}
                  </p>
                  
     
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    isActive
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-200 group-hover:bg-primary/10'
                  }`}>
                    <span>{category.count}</span>
                    <span>Products</span>
                  </div>
                </div>

           
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Popular Tags</h3>
            <span className="text-sm opacity-60">Click to filter</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-base-100 border border-base-300 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-content hover:border-primary transition-all"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

 
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold mb-4">
                Currently viewing: <span className="text-primary">
                  {categories.find(c => c.id === activeCategory)?.name || 'All Products'}
                </span>
              </h3>
              <p className="opacity-80 mb-6">
                Explore {categories.find(c => c.id === activeCategory)?.count || 248} products in this category. 
                Each product is vetted for quality, regularly updated, and comes with professional support.
              </p>
              <div className="flex gap-4">
               <Link href='/items'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-primary-content rounded-xl font-medium"
                >
                  View All Products
                </motion.button></Link>
                <Link href='/items'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-base-100 border border-base-300 rounded-xl font-medium"
                >
                  Sort by Popularity
                </motion.button></Link>
              </div>
            </div>
            
            <div className="lg:w-1/3 text-center lg:text-right">
              <div className="inline-flex flex-col items-center lg:items-end">
                <div className="text-5xl font-bold text-primary mb-2">
                  {categories.find(c => c.id === activeCategory)?.count || 248}
                </div>
                <div className="text-sm opacity-70">Premium Products</div>
                <div className="mt-4 text-xs opacity-50">Updated Daily</div>
              </div>
            </div>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-base-300/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Active Users' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '24h', label: 'Avg. Response Time' },
              { value: '100+', label: 'Expert Contributors' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm opacity-70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;