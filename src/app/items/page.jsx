"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronRight, Loader2, Filter, Grid, List } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/items");
        if (!response.ok) throw new Error("Failed to fetch items");
        
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(["all", ...uniqueCategories]);
        
        // Initialize GSAP animations
        if (data.length > 0) {
          initAnimations();
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Cleanup GSAP animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initAnimations = () => {
    // Stagger animation for items on load
    gsap.from(".item-card", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });

    // Scroll animations for cards
    gsap.utils.toArray(".item-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05
      });
    });
  };

  useEffect(() => {
    let result = [...items];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term)
      );
    }

    // Sort items
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    setFilteredItems(result);
  }, [items, selectedCategory, searchTerm, sortBy]);

  const handleItemClick = (itemId) => {
    router.push(`/items/${itemId}`);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading items...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center p-8 bg-red-50 rounded-xl max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Items</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Our Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our curated selection of premium items
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  🔍
                </div>
              </div>
            </div>

            {/* Controls Group */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none pr-10"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none pr-10"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-3 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-3 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> items
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Items Grid/List */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Items Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="items"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`
                ${viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid grid-cols-1"
                } 
                gap-6 md:gap-8
              `}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="item-card group"
                  onClick={() => handleItemClick(item._id)}
                >
                  <div className={`
                    ${viewMode === "grid" 
                      ? "flex flex-col h-full" 
                      : "flex flex-col md:flex-row gap-6"
                    }
                    bg-white rounded-2xl overflow-hidden border border-gray-200
                    shadow-sm hover:shadow-xl transition-all duration-300
                    cursor-pointer h-full
                  `}>
                    {/* Image Container */}
                    <div className={`
                      relative overflow-hidden
                      ${viewMode === "grid" ? "aspect-square" : "md:w-64 md:shrink-0"}
                    `}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={index < 4}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-4xl">🏷️</span>
                        </div>
                      )}
                      {item.isNew && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            NEW
                          </span>
                        </div>
                      )}
                      {item.discount && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            -{item.discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`
                      ${viewMode === "grid" ? "flex-1 p-5" : "flex-1 p-6"}
                      flex flex-col
                    `}>
                      {/* Category */}
                      {item.category && (
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                          {item.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className={`
                        font-bold text-gray-900 mb-2
                        ${viewMode === "grid" ? "text-lg" : "text-xl"}
                        group-hover:text-blue-600 transition-colors
                      `}>
                        {item.name}
                      </h3>

                      {/* Description */}
                      {item.description && viewMode === "list" && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm font-semibold mr-1">View Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}