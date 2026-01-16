"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { useState, useRef } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  User,
  MailCheck,
  Globe,
  Zap,
  Sparkles
} from 'lucide-react';

const CallAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    contactMethod: 'email',
    projectType: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  const projectTypes = [
    { id: 'saas', label: 'SaaS Development', icon: '⚡' },
    { id: 'design', label: 'UI/UX Design', icon: '🎨' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'marketing', label: 'Marketing', icon: '📈' },
    { id: 'enterprise', label: 'Enterprise Solution', icon: '🏢' },
    { id: 'custom', label: 'Custom Project', icon: '🔧' }
  ];

  const contactMethods = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone Call', icon: Phone },
    { id: 'video', label: 'Video Call', icon: MessageSquare },
    { id: 'meeting', label: 'In-person Meeting', icon: Globe }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {

      await new Promise(resolve => setTimeout(resolve, 1500));
      
 
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        contactMethod: 'email',
        projectType: ''
      });
      

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectTypeSelect = (typeId) => {
    setFormData(prev => ({
      ...prev,
      projectType: typeId
    }));
  };

  const handleContactMethodSelect = (methodId) => {
    setFormData(prev => ({
      ...prev,
      contactMethod: methodId
    }));
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" id="contact" ref={containerRef}>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
    
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 max-w-md"
            >
              <div className="bg-success/10 backdrop-blur-sm border border-success/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <div>
                    <h4 className="font-bold text-success mb-1">Message Sent Successfully!</h4>
                    <p className="text-sm opacity-80">
                      We'll get back to you within 24 hours. Check your email for confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

     
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Let's Build Together
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          
          <p className="text-lg md:text-xl opacity-70 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help transform your ideas into reality.
            Our team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
      
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="lg:col-span-1"
          >
            <div className="space-y-8">
      
              <motion.div
                variants={fadeInUp}
                className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="opacity-80 mb-2">For general inquiries and support</p>
                    <a 
                      href="mailto:hello@producthub.com" 
                      className="text-primary hover:text-primary/80 font-medium text-lg"
                    >
                      hello@producthub.com
                    </a>
                    <p className="text-sm opacity-60 mt-2">Response time: Within 4 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="opacity-80 mb-2">For urgent matters and sales</p>
                    <a 
                      href="tel:+11234567890" 
                      className="text-primary hover:text-primary/80 font-medium text-lg"
                    >
                      +1 (123) 456-7890
                    </a>
                    <p className="text-sm opacity-60 mt-2">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                    <p className="opacity-80 mb-2">Our headquarters</p>
                    <address className="not-italic text-primary font-medium text-lg">
                      123 Innovation Drive<br />
                      San Francisco, CA 94107
                    </address>
                    <p className="text-sm opacity-60 mt-2">By appointment only</p>
                  </div>
                </div>
              </motion.div>

        
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Support Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-70">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Sunday</span>
                    <span className="font-medium">Emergency Only</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-success/5 to-success/10 border border-success/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-success" />
                  <h3 className="font-bold">Quick Response Guarantee</h3>
                </div>
                <p className="text-sm opacity-80">
                  We guarantee a response within 24 hours for all inquiries.
                  Most responses are within 4 hours during business days.
                </p>
              </motion.div>
            </div>
          </motion.div>

   
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8 }}
              className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
            >
    
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 border-b border-base-300">
                <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                <p className="opacity-70">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8">

                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-4">
                    What type of project are you interested in?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleProjectTypeSelect(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          formData.projectType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-base-300 hover:border-primary/50 hover:bg-base-200/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
          
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all ${
                          errors.name ? 'border-error' : 'border-base-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <MailCheck className="inline w-4 h-4 mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all ${
                          errors.email ? 'border-error' : 'border-base-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

            
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Inc."
                      className="w-full px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

          
                  <div>
                    <label className="block text-sm font-semibold mb-4">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {contactMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handleContactMethodSelect(method.id)}
                            className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                              formData.contactMethod === method.id
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-base-300 hover:border-primary/50 hover:bg-base-200/50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{method.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-2" />
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none ${
                        errors.message ? 'border-error' : 'border-base-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

            
                  <div className="pt-4">
                    {errors.submit && (
                      <p className="mb-4 text-sm text-error flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.submit}
                      </p>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-8 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed ${
                        isSubmitting ? 'opacity-70' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-sm opacity-60 mt-4">
                      By submitting, you agree to our Privacy Policy. We'll never share your information.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>

      
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <div className="bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-4">Other ways to connect</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a 
                    href="https://calendly.com/producthub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-base-300 rounded-xl hover:border-primary/50 hover:shadow-md transition-all text-center group"
                  >
                    <div className="text-2xl mb-2">📅</div>
                    <div className="font-medium mb-1 group-hover:text-primary">Schedule a Call</div>
                    <div className="text-sm opacity-70">Book a 30-min discovery call</div>
                  </a>
                  <a 
                    href="https://discord.gg/producthub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-base-300 rounded-xl hover:border-primary/50 hover:shadow-md transition-all text-center group"
                  >
                    <div className="text-2xl mb-2">💬</div>
                    <div className="font-medium mb-1 group-hover:text-primary">Join Discord</div>
                    <div className="text-sm opacity-70">Chat with our community</div>
                  </a>
                  <a 
                    href="https://twitter.com/producthub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-base-300 rounded-xl hover:border-primary/50 hover:shadow-md transition-all text-center group"
                  >
                    <div className="text-2xl mb-2">🐦</div>
                    <div className="font-medium mb-1 group-hover:text-primary">Twitter DM</div>
                    <div className="text-sm opacity-70">Quick questions & updates</div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

   
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
      
        </motion.div>
      </div>
    </section>
  );
};

export default CallAction;