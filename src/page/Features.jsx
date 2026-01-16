"use client";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from 'react';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Workflow, 
  Globe,
  Lock,
  Cpu,
  Cloud,
  Rocket,
  Palette,
  Code,
  Database,
  Wifi,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeTab, setActiveTab] = useState('performance');
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
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };


  const featureCategories = [
    {
      id: 'performance',
      name: 'Performance',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        {
          title: 'Edge Computing',
          description: 'Process data closer to users with our global edge network',
          icon: Cpu,
          stats: '2.3ms avg response',
          color: 'blue'
        },
        {
          title: 'Global CDN',
          description: 'Deliver content instantly across 150+ locations worldwide',
          icon: Globe,
          stats: '99.9% uptime',
          color: 'cyan'
        },
        {
          title: 'Real-time Sync',
          description: 'Live updates across all devices with sub-second latency',
          icon: Wifi,
          stats: '500ms sync',
          color: 'indigo'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      color: 'from-emerald-500 to-teal-500',
      features: [
        {
          title: 'Zero Trust Architecture',
          description: 'Enterprise-grade security with continuous verification',
          icon: Lock,
          stats: 'SOC2 Type II',
          color: 'emerald'
        },
        {
          title: 'End-to-End Encryption',
          description: 'Military-grade encryption for all data at rest and in transit',
          icon: Database,
          stats: '256-bit AES',
          color: 'teal'
        },
        {
          title: 'Compliance Ready',
          description: 'GDPR, HIPAA, PCI DSS, and ISO 27001 compliant',
          icon: Shield,
          stats: '100% compliant',
          color: 'green'
        }
      ]
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      features: [
        {
          title: 'Real-time Editing',
          description: 'Collaborate simultaneously with live cursor presence',
          icon: Users,
          stats: '50+ users',
          color: 'purple'
        },
        {
          title: 'Role-based Permissions',
          description: 'Granular access controls for teams of any size',
          icon: Lock,
          stats: '20+ roles',
          color: 'pink'
        },
        {
          title: 'Version Control',
          description: 'Track changes and rollback with full history',
          icon: Code,
          stats: 'Unlimited versions',
          color: 'violet'
        }
      ]
    }
  ];

  const allFeatures = [
    {
      id: 1,
      title: 'Ultra-Fast Performance',
      description: 'Global CDN with edge computing for milliseconds response times worldwide',
      icon: Zap,
      color: 'primary',
      stats: '99.9% uptime',
      metrics: ['2.3ms response', 'Global edge', 'Auto-scaling'],
      spotlight: true
    },
    {
      id: 2,
      title: 'Enterprise Security',
      description: 'Military-grade encryption, zero-trust architecture, and SOC2 compliance',
      icon: Shield,
      color: 'secondary',
      stats: '256-bit AES',
      metrics: ['Zero Trust', 'SOC2', 'GDPR Ready'],
      spotlight: true
    },
    {
      id: 3,
      title: 'AI-Powered Analytics',
      description: 'Real-time insights and predictive analytics powered by machine learning',
      icon: BarChart3,
      color: 'accent',
      stats: '98% accuracy',
      metrics: ['Real-time', 'Predictive', 'Custom Dashboards'],
      spotlight: false
    },
    {
      id: 4,
      title: 'Team Collaboration',
      description: 'Role-based permissions, real-time editing, and seamless integrations',
      icon: Users,
      color: 'info',
      stats: '50+ integrations',
      metrics: ['Real-time', 'Role-based', 'API First'],
      spotlight: false
    },
    {
      id: 5,
      title: 'Workflow Automation',
      description: 'Custom automation pipelines to streamline your development processes',
      icon: Workflow,
      color: 'success',
      stats: '80% time saved',
      metrics: ['Visual Builder', 'Triggers', 'Scheduled Tasks'],
      spotlight: true
    },
    {
      id: 6,
      title: 'Global Infrastructure',
      description: 'Deploy in 15+ regions worldwide with automatic scaling and load balancing',
      icon: Globe,
      color: 'warning',
      stats: '15+ regions',
      metrics: ['Auto-scaling', 'Multi-region', 'Low Latency'],
      spotlight: false
    },
    {
      id: 7,
      title: 'Design System',
      description: 'Complete design system with 150+ components and full customization',
      icon: Palette,
      color: 'primary',
      stats: '150+ components',
      metrics: ['Figma Files', 'Themes', 'Customizable'],
      spotlight: false
    },
    {
      id: 8,
      title: 'API-First Architecture',
      description: 'RESTful APIs with comprehensive documentation and SDKs',
      icon: Code,
      color: 'secondary',
      stats: '100+ endpoints',
      metrics: ['REST API', 'WebSocket', 'Webhooks'],
      spotlight: false
    }
  ];

  const activeCategory = featureCategories.find(cat => cat.id === activeTab) || featureCategories[0];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" id="features" ref={containerRef}>
  
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
    
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >

        </motion.div>

  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            Spotlight Features
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {allFeatures.filter(f => f.spotlight).map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="relative group"
                >
                  <div className="bg-base-100 rounded-2xl border border-base-300 p-6 lg:p-8 hover:shadow-2xl transition-all h-full">
        
                    <div className="mb-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-${feature.color}/10`}>
                        <Icon className={`w-8 h-8 text-${feature.color}`} />
                      </div>
                    </div>

            
                    <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                    <p className="opacity-70 mb-6">{feature.description}</p>

          
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-semibold text-primary">
                        {feature.stats}
                      </span>
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>

        
                    <div className="flex flex-wrap gap-2 mb-6">
                      {feature.metrics.map((metric, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-base-200"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                 
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                  
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${feature.color} to-transparent rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredFeature === feature.id ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${feature.color}/10`}>
                      <Icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <h4 className="font-bold">{feature.title}</h4>
                  </div>
                  <p className="text-sm opacity-70 mb-4">{feature.description}</p>
                  <div className="text-xs px-3 py-1 bg-base-200 rounded-full w-fit">
                    {feature.stats}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-base-100 to-base-200 rounded-3xl border border-base-300 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-12">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${activeCategory.color}`}>
                      <activeCategory.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold">{activeCategory.name}</h3>
                      <p className="opacity-70">Complete suite of tools for {activeCategory.name.toLowerCase()} excellence</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {activeCategory.features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 border border-base-300">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-${feature.color}/10`}>
                              <Icon className={`w-5 h-5 text-${feature.color}`} />
                            </div>
                            <h4 className="font-bold">{feature.title}</h4>
                          </div>
                          <p className="text-sm opacity-70 mb-3">{feature.description}</p>
                          <div className="text-xs font-semibold text-primary">
                            {feature.stats}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
            
                <div className="lg:w-1/3">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
                    <h4 className="font-bold text-lg mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Speed</span>
                          <span className="text-sm font-bold text-primary">99.9%</span>
                        </div>
                        <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '99.9%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Reliability</span>
                          <span className="text-sm font-bold text-primary">100%</span>
                        </div>
                        <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-gradient-to-r from-success to-emerald-500"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Customer Satisfaction</span>
                          <span className="text-sm font-bold text-primary">98%</span>
                        </div>
                        <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '98%' }}
                            transition={{ duration: 1, delay: 0.9 }}
                            className="h-full bg-gradient-to-r from-warning to-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        
              <div className="bg-base-100/30 backdrop-blur-sm rounded-2xl p-6 border border-base-300">
                <h4 className="font-bold text-lg mb-6">How We Compare</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-base-300">
                        <th className="text-left py-4 font-semibold">Feature</th>
                        <th className="text-center py-4 font-semibold">Product Hub</th>
                        <th className="text-center py-4 font-semibold">Competitor A</th>
                        <th className="text-center py-4 font-semibold">Competitor B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Global CDN', productHub: '✓', compA: '✓', compB: '✗' },
                        { feature: 'Real-time Collaboration', productHub: '✓', compA: 'Limited', compB: '✓' },
                        { feature: 'Enterprise Security', productHub: '✓', compA: '✓', compB: 'Limited' },
                        { feature: 'AI Analytics', productHub: '✓', compA: '✗', compB: 'Additional Cost' },
                        { feature: '24/7 Support', productHub: '✓', compA: 'Business Hours', compB: '✓' }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-base-300/50">
                          <td className="py-4">{row.feature}</td>
                          <td className="text-center py-4">
                            <CheckCircle className="w-5 h-5 text-success inline" />
                          </td>
                          <td className="text-center py-4">
                            <span className={row.compA === '✓' ? 'text-success' : 'text-warning'}>
                              {row.compA}
                            </span>
                          </td>
                          <td className="text-center py-4">
                            <span className={row.compB === '✓' ? 'text-success' : 'text-warning'}>
                              {row.compB}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="text-center"
        >
        
        </motion.div>
      </div>
    </section>
  );
};

export default Features;