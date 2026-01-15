"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  Tag,
  DollarSign,
  Package,
  Globe,
  Code,
  Palette,
  BarChart3,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Info,
  Camera
} from 'lucide-react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    features: [''],
    imageUrl: '',
    demoUrl: '',
    fileUrl: '',
    documentationUrl: '',
    supportEmail: '',
    isFeatured: false,
    isPremium: false,
    stock: 'unlimited',
    discount: '',
    originalPrice: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const categories = [
    { id: 'saas', label: 'SaaS Tools', icon: Code, color: 'blue' },
    { id: 'design', label: 'Design Assets', icon: Palette, color: 'purple' },
    { id: 'ai', label: 'AI Tools', icon: BarChart3, color: 'green' },
    { id: 'components', label: 'Components', icon: Package, color: 'orange' },
    { id: 'marketing', label: 'Marketing', icon: Globe, color: 'pink' },
    { id: 'enterprise', label: 'Enterprise', icon: Shield, color: 'red' },
    { id: 'community', label: 'Community', icon: Users, color: 'teal' },
    { id: 'other', label: 'Other', icon: Package, color: 'gray' }
  ];

  const stockOptions = [
    { id: 'unlimited', label: 'Unlimited Stock' },
    { id: 'limited', label: 'Limited Stock' },
    { id: 'custom', label: 'Custom Stock' }
  ];

  const steps = [
    { id: 1, label: 'Basic Info', icon: Info },
    { id: 2, label: 'Media & Links', icon: ImageIcon },
    { id: 3, label: 'Pricing & Stock', icon: DollarSign },
    { id: 4, label: 'Features & Tags', icon: Tag }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features.filter(f => f.trim()), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // In production, upload to your backend
          // For now, set a placeholder
          setFormData(prev => ({
            ...prev,
            imageUrl: URL.createObjectURL(file)
          }));
          
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate file upload
    // In production, upload to your storage service
    setFormData(prev => ({
      ...prev,
      fileUrl: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    if (formData.features.filter(f => f.trim()).length === 0) {
      newErrors.features = 'At least one feature is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, replace with actual API call:
      // const response = await fetch('/api/items', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     price: parseFloat(formData.price),
      //     discount: formData.discount ? parseFloat(formData.discount) : null,
      //     originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      //     stock: formData.stock === 'unlimited' ? -1 : parseInt(formData.stock) || 0
      //   })
      // });
      
      console.log('Product submitted:', {
        ...formData,
        price: parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : null,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: formData.stock === 'unlimited' ? -1 : parseInt(formData.stock) || 0
      });
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          tags: [],
          features: [''],
          imageUrl: '',
          demoUrl: '',
          fileUrl: '',
          documentationUrl: '',
          supportEmail: '',
          isFeatured: false,
          isPremium: false,
          stock: 'unlimited',
          discount: '',
          originalPrice: ''
        });
        setPreviewImage(null);
        setUploadProgress(0);
        setActiveStep(1);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to add product. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const StepProgress = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                activeStep >= step.id 
                  ? 'bg-primary border-primary text-primary-content' 
                  : 'border-base-300 bg-base-100'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2 font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>
      <div className="relative h-2 bg-base-300 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: '0%' }}
          animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );

  return (
    <section className="py-12 lg:py-16 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
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
                    <h4 className="font-bold text-success mb-1">Product Added Successfully!</h4>
                    <p className="text-sm opacity-80">
                      Your product has been submitted for review. You'll be notified when it's live.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Add New Product
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            List Your <span className="text-primary">Product</span>
          </h1>
          
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Share your digital product with thousands of potential customers. Fill in the details below to get started.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-6 border-b border-base-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Product Details</h2>
                  <p className="opacity-70">Step {activeStep} of {steps.length}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        tags: [],
                        features: [''],
                        imageUrl: '',
                        demoUrl: '',
                        fileUrl: '',
                        documentationUrl: '',
                        supportEmail: '',
                        isFeatured: false,
                        isPremium: false,
                        stock: 'unlimited',
                        discount: '',
                        originalPrice: ''
                      });
                      setPreviewImage(null);
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    Clear Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="btn btn-outline btn-sm"
                  >
                    Restart
                  </button>
                </div>
              </div>
              
              <StepProgress />
            </div>

            <form onSubmit={handleSubmit} className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Basic Information
                    </h3>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Product Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name (e.g., Premium UI Kit)"
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
                        Category *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                              className={`p-4 rounded-xl border-2 transition-all text-center ${
                                formData.category === category.id
                                  ? `border-${category.color} bg-${category.color}/10`
                                  : 'border-base-300 hover:border-primary/50 hover:bg-base-200/50'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mx-auto mb-2 text-${category.color}`} />
                              <div className="text-sm font-medium">{category.label}</div>
                            </button>
                          );
                        })}
                      </div>
                      {errors.category && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your product in detail. Include key features, use cases, and target audience..."
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none ${
                          errors.description ? 'border-error' : 'border-base-300'
                        }`}
                      />
                      <div className="flex justify-between mt-2">
                        <p className="text-xs opacity-60">
                          Minimum 20 characters
                        </p>
                        <p className={`text-xs ${
                          formData.description.length < 20 ? 'text-warning' : 'text-success'
                        }`}>
                          {formData.description.length}/20
                        </p>
                      </div>
                      {errors.description && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Media & Links */}
                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Media & Links
                    </h3>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Product Image *
                      </label>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Upload Area */}
                        <div 
                          onClick={() => imageInputRef.current?.click()}
                          className="border-2 border-dashed border-base-300 rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-base-200/50 transition-all cursor-pointer"
                        >
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          
                          {uploadProgress > 0 && uploadProgress < 100 ? (
                            <div className="space-y-4">
                              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                              <div>
                                <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                <p className="text-sm mt-2">Uploading... {uploadProgress}%</p>
                              </div>
                            </div>
                          ) : previewImage ? (
                            <div className="relative">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-xl mb-4"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewImage(null);
                                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                                  setUploadProgress(0);
                                }}
                                className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-12 h-12 text-base-300 mx-auto mb-4" />
                              <p className="font-medium mb-2">Click to upload image</p>
                              <p className="text-sm opacity-60">PNG, JPG, GIF up to 5MB</p>
                            </>
                          )}
                        </div>

                        {/* Image URL Input */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Or enter image URL
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              name="imageUrl"
                              value={formData.imageUrl}
                              onChange={handleChange}
                              placeholder="https://example.com/product-image.jpg"
                              className="w-full px-4 py-3 pl-12 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                            />
                            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Demo URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            name="demoUrl"
                            value={formData.demoUrl}
                            onChange={handleChange}
                            placeholder="https://demo.yourproduct.com"
                            className="w-full px-4 py-3 pl-12 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                          />
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Documentation URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            name="documentationUrl"
                            value={formData.documentationUrl}
                            onChange={handleChange}
                            placeholder="https://docs.yourproduct.com"
                            className="w-full px-4 py-3 pl-12 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                          />
                          <Code className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          File Upload
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.fileUrl}
                            readOnly
                            placeholder="Upload product files"
                            className="w-full px-4 py-3 pr-32 border border-base-300 rounded-xl bg-base-200"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary btn-sm"
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Browse
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                        {formData.fileSize && (
                          <p className="text-sm opacity-60 mt-2">File size: {formData.fileSize}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Pricing & Stock */}
                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Pricing & Stock
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Price */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Price (USD) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">$</span>
                          <input
                            id="price"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="49.99"
                            step="0.01"
                            min="0"
                            className={`w-full px-4 py-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all ${
                              errors.price ? 'border-error' : 'border-base-300'
                            }`}
                          />
                        </div>
                        {errors.price && (
                          <p className="mt-2 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.price}
                          </p>
                        )}
                      </div>

                      {/* Original Price (for discount) */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Original Price (Optional)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">$</span>
                          <input
                            type="number"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            placeholder="99.99"
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-3 pl-10 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Discount */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Discount Percentage
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="20"
                            min="0"
                            max="100"
                            className="w-full px-4 py-3 pr-10 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">%</span>
                        </div>
                      </div>

                      {/* Stock Options */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Stock Type
                        </label>
                        <div className="flex gap-4">
                          {stockOptions.map((option) => (
                            <label key={option.id} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="stock"
                                value={option.id}
                                checked={formData.stock === option.id}
                                onChange={handleChange}
                                className="radio radio-primary"
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Premium & Featured */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPremium"
                          checked={formData.isPremium}
                          onChange={handleChange}
                          className="checkbox checkbox-primary"
                        />
                        <div>
                          <span className="font-semibold">Mark as Premium</span>
                          <p className="text-sm opacity-70">Premium products get featured placement</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleChange}
                          className="checkbox checkbox-primary"
                        />
                        <div>
                          <span className="font-semibold">Featured Product</span>
                          <p className="text-sm opacity-70">Show on homepage and featured sections</p>
                        </div>
                      </label>
                    </div>

                    {/* Support Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Support Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="supportEmail"
                          value={formData.supportEmail}
                          onChange={handleChange}
                          placeholder="support@yourproduct.com"
                          className="w-full px-4 py-3 pl-12 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Features & Tags */}
                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Features & Tags
                    </h3>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tags *
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                          placeholder="Add tags (React, Next.js, UI Kit)"
                          className="flex-1 px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                        <button
                          type="button"
                          onClick={handleTagAdd}
                          className="btn btn-primary"
                        >
                          Add Tag
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                              className="hover:text-primary/70"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      {errors.tags && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.tags}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Features *
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleFeatureAdd())}
                          placeholder="Add features (Responsive Design, Dark Mode, TypeScript)"
                          className="flex-1 px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                        <button
                          type="button"
                          onClick={handleFeatureAdd}
                          className="btn btn-primary"
                        >
                          Add Feature
                        </button>
                      </div>
                      
                      <div className="space-y-2 mb-2">
                        {formData.features.filter(f => f.trim()).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between px-4 py-3 bg-base-200 rounded-xl"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span>{feature}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleFeatureRemove(index)}
                              className="btn btn-ghost btn-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {errors.features && (
                        <p className="mt-2 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.features}
                        </p>
                      )}
                    </div>

                    {/* Preview Button */}
                    <div className="pt-4 border-t border-base-300">
                      <button
                        type="button"
                        onClick={() => {
                          // Show preview modal or section
                          console.log('Preview product:', formData);
                        }}
                        className="btn btn-outline w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Product
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-base-300">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-ghost"
                  >
                    ← Previous Step
                  </button>
                ) : (
                  <div></div>
                )}
                
                {activeStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Add Product
                      </>
                    )}
                  </button>
                )}
              </div>

              {errors.submit && (
                <p className="mt-4 text-center text-sm text-error flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </p>
              )}
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-6 bg-base-100/50 backdrop-blur-sm border border-base-300 rounded-2xl">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Tips for Success
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-1" />
                <span>Use high-quality images that showcase your product</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-1" />
                <span>Write detailed descriptions with key features and use cases</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-1" />
                <span>Add relevant tags to help users discover your product</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-1" />
                <span>Include demo links and documentation for better conversion</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddItem;