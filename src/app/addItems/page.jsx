"use client";
import { motion } from "framer-motion";
import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Tag,
  DollarSign,
  Code,
  Palette,
  BarChart3,
  Globe,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Package
} from 'lucide-react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    features: [],
    imageUrl: '',
    demoUrl: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const categories = [
    { id: 'saas', label: 'SaaS Tools', icon: Code, color: 'primary' },
    { id: 'design', label: 'Design Assets', icon: Palette, color: 'secondary' },
    { id: 'ai', label: 'AI Tools', icon: BarChart3, color: 'accent' },
    { id: 'components', label: 'Components', icon: Package, color: 'info' },
    { id: 'marketing', label: 'Marketing', icon: Globe, color: 'success' },
    { id: 'security', label: 'Security', icon: Shield, color: 'warning' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
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
        features: [...prev.features, featureInput.trim()] 
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Product submitted:', {
        ...formData,
        price: parseFloat(formData.price)
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
          features: [],
          imageUrl: '',
          demoUrl: ''
        });
        setPreviewImage(null);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to add product. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-success/10 border border-success/20 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium text-success">Product added successfully!</p>
                <p className="text-sm opacity-80">Your product is now live.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Add New Product
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            List Your Product
          </h1>
          
          <p className="opacity-70 max-w-2xl mx-auto">
            Share your digital product with our community
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Category */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 ${
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
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.category ? 'border-error' : 'border-base-300'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-error flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    errors.description ? 'border-error' : 'border-base-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price & Demo URL */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="49.99"
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 ${
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

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Demo URL (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleChange}
                      placeholder="https://demo.example.com"
                      className="w-full px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Image
                </label>
                <div className="flex gap-4">
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-base-300 rounded-xl p-6 text-center hover:border-primary/50 cursor-pointer flex-1"
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(null);
                            setFormData(prev => ({ ...prev, imageUrl: '' }));
                          }}
                          className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-base-300 mx-auto mb-2" />
                        <p className="text-sm opacity-60">Click to upload image</p>
                      </>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-2">
                      Or enter URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-4 py-2 border border-base-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="btn btn-primary btn-sm"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleFeatureAdd())}
                    placeholder="Add features (press Enter)"
                    className="flex-1 px-4 py-2 border border-base-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleFeatureAdd}
                    className="btn btn-primary btn-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-base-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>{feature}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFeatureRemove(index)}
                        className="btn btn-ghost btn-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
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
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Tips */}
            <div className="mt-8 pt-6 border-t border-base-300">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Quick Tips
              </h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Use clear, high-quality images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Add relevant tags for better discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Include demo links when possible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddItem;