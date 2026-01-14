"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Package
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

 const getSingleItem = async (id) => {
  const res = await fetch(`/api/items/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch item data");
  }
  const data =await res.json();
 
return data
  
 }

export default function ItemDetailsPage() {
  
  const {id} = useParams();
  
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const data = await getSingleItem(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "circOut"
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };





  const initAnimations = () => {
  
    if (item && item.discount) {
      gsap.from(".price-counter", {
        duration: 1.5,
        innerHTML: 0,
        ease: "power2.out",
        snap: { innerHTML: 1 }
      });
    }


    gsap.from(".rating-star", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.5
    });


    gsap.from(".feature-icon", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });


    gsap.to(".cta-button", {
      y: -5,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  };

useEffect(() => {
  if (!item) return;

  const ctx = gsap.context(() => {
    initAnimations();
  });

  return () => ctx.revert();
}, [item]);


  const handleAddToCart = () => {
    setShowNotification(true);
    

    gsap.to(".cart-button", {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });

    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    
    // Heart animation
    gsap.to(".wishlist-button", {
      scale: 1.3,
      duration: 0.3,
      color: isWishlisted ? "#9CA3AF" : "#EF4444",
      onComplete: () => {
        gsap.to(".wishlist-button", {
          scale: 1,
          duration: 0.2
        });
      }
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out ${item.name} - ${item.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      
      // Share button animation
      gsap.to(".share-button", {
        backgroundColor: "#10B981",
        duration: 0.3,
        onComplete: () => {
          gsap.to(".share-button", {
            backgroundColor: "#3B82F6",
            duration: 0.3,
            delay: 1
          });
        }
      });
    }
  };

  const calculateDiscountedPrice = () => {
    if (!item) return 0;
    if (item.discount && item.discount > 0) {
      const discountAmount = (item.price * item.discount) / 100;
      return item.price - discountAmount;
    }
    return item.price;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <Package className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" />
          </div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading Product Details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <Check className="w-5 h-5" />
              <span className="font-semibold">Added to cart successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            variants={contentVariants}
            className="space-y-6"
          >
            {/* Main Image */}
            <motion.div
              variants={imageVariants}
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl"
            >
              {item.image && (
                <>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-500 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    priority
                    onLoadingComplete={() => setImageLoading(false)}
                    unoptimized
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  )}
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.discount && item.discount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg"
                  >
                    -{item.discount}% OFF
                  </motion.span>
                )}
                {item.stock === "In Stock" ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg"
                  >
                    {item.stock}
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg"
                  >
                    Out of Stock
                  </motion.span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlistToggle}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow wishlist-button"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow share-button"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </motion.div>

            {/* Thumbnail Images - Single image থাকলে শুধুমাত্র main image show করবে */}
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {[item.image].map((img, index) => (
                <motion.button
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 ${
                    selectedImage === index 
                      ? "border-blue-500 ring-2 ring-blue-200" 
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.name} view ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={contentVariants}
            className="space-y-8"
          >
            {/* Category & Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                  {item.category}
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">{item.brand || "Unknown Brand"}</span>
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {item.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 rating-star ${
                        i < Math.floor(item.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {item.rating || "No rating"} • {item.reviews || "0"} reviews
                </span>
              </motion.div>
            </div>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-gray-900 price-counter">
                  ${calculateDiscountedPrice().toFixed(2)}
                </span>
                {item.discount && item.discount > 0 && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 font-bold rounded-lg">
                      Save ${((item.price * item.discount) / 100).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 font-semibold flex items-center gap-2">
                <Check className="w-5 h-5" />
                {item.stock === "In Stock" ? "In Stock • Ready to ship" : "Out of Stock"}
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                {item.description}
              </p>
              
              {/* Features List - যদি features না থাকে তাহলে কিছু default features দেখাবে */}
              <ul className="space-y-2">
                {(item.features || [
                  "High performance processor",
                  "Premium build quality",
                  "Long battery life",
                  "Fast charging support"
                ]).map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Total Price */}
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${(calculateDiscountedPrice() * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={item.stock !== "In Stock"}
                className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all cart-button ${
                  item.stock === "In Stock"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {item.stock === "In Stock" ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-4 px-8 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-3"
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t features-section"
            >
              <motion.div variants={fadeInUp} className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 feature-icon">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800">Free Shipping</p>
                <p className="text-sm text-gray-500">Over $100</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 feature-icon">
                  <RotateCcw className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-gray-800">30-Day Returns</p>
                <p className="text-sm text-gray-500">Money Back</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 feature-icon">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-semibold text-gray-800">2-Year Warranty</p>
                <p className="text-sm text-gray-500">Full Coverage</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 feature-icon">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <p className="font-semibold text-gray-800">Safe Packaging</p>
                <p className="text-sm text-gray-500">Guaranteed</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-lg border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {activeTab === "description" && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700">
                    {item.description} This premium product delivers exceptional performance
                    for both work and play. With cutting-edge technology and premium
                    build quality, it's designed to exceed expectations.
                  </p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {item.specifications ? (
                    item.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">{spec.name}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    // Default specifications যদি না থাকে
                    <>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-semibold">{item.brand || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Category</span>
                        <span className="font-semibold">{item.category}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-semibold">New</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Availability</span>
                        <span className="font-semibold">{item.stock}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}