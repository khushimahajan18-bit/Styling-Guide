import React, { useState } from 'react';
import { JewelryProduct } from '../types';
import { PATIKH_PRODUCTS } from '../data';
import { Sparkles, ShoppingBag, Heart, Plus, ArrowRight, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsCatalogProps {
  onAddToCart: (product: JewelryProduct) => void;
  onAddToWishlist: (product: JewelryProduct) => void;
  wishlist: string[];
  cart: string[];
  selectedAesthetic?: string;
}

export default function ProductsCatalog({
  onAddToCart,
  onAddToWishlist,
  wishlist,
  cart,
  selectedAesthetic
}: ProductsCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<JewelryProduct | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAesthetic, setFilterAesthetic] = useState<string>('all');
  const [addedItemMessage, setAddedItemMessage] = useState<string | null>(null);

  // Filter products based on user selections
  const filteredProducts = PATIKH_PRODUCTS.filter(product => {
    const matchesType = filterType === 'all' || product.type === filterType;
    const matchesAesthetic = filterAesthetic === 'all' || product.aesthetic === filterAesthetic;
    return matchesType && matchesAesthetic;
  });

  const uniqueAesthetics = Array.from(new Set(PATIKH_PRODUCTS.map(p => p.aesthetic)));

  const handleAddToCartWithAlert = (product: JewelryProduct) => {
    onAddToCart(product);
    setAddedItemMessage(`Added "${product.name}" to style cart!`);
    setTimeout(() => setAddedItemMessage(null), 2500);
  };

  const getPairsWellWith = (product: JewelryProduct): JewelryProduct[] => {
    // Recommend jewelry of different types sharing the same aesthetic
    return PATIKH_PRODUCTS.filter(p => 
      p.id !== product.id && 
      p.aesthetic === product.aesthetic && 
      p.type !== product.type
    ).slice(0, 2);
  };

  return (
    <div className="space-y-8" id="catalog-section">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#8C8279] block">
            PATIKH CURATED
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-2 italic font-serif">
            The Style Discovery Feed
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-sans max-w-xl">
            Explore accessory pairings meticulously styled for modern Indian silhouettes and structured Western looks alike.
          </p>
        </div>

        {/* Filter Badges - Chic Rounded design elements */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => { setFilterAesthetic('all'); setFilterType('all'); }}
            className={`px-5 py-2 font-sans text-[10px] uppercase tracking-[0.15em] border transition-all cursor-pointer rounded-full ${
              filterAesthetic === 'all' && filterType === 'all'
                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold'
                : 'border-[#1A1A1A]/10 text-stone-600 hover:border-[#1A1A1A] bg-[#FAF8F5]'
            }`}
          >
            All Pieces
          </button>
          {selectedAesthetic && (
            <button
              onClick={() => setFilterAesthetic(selectedAesthetic)}
              className={`px-5 py-2 font-sans text-[10px] uppercase tracking-[0.15em] border transition-all cursor-pointer rounded-full ${
                filterAesthetic === selectedAesthetic
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold'
                  : 'border-[#1A1A1A]/10 text-[#1A1A1A] hover:bg-[#F0EBE5]'
              }`}
            >
              ★ For You ({selectedAesthetic})
            </button>
          )}
        </div>
      </div>

      {/* Sub-Filters: Type Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#F0EBE5]/40 border border-[#1A1A1A]/10 p-4">
        {/* Jewellery Category Filters */}
        <div className="flex flex-wrap gap-1">
          {['all', 'earrings', 'necklace', 'ring', 'bracelet', 'set'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans font-bold transition-all cursor-pointer ${
                filterType === type
                  ? 'text-[#1A1A1A] bg-[#FAF8F5] border border-[#1A1A1A]/10'
                  : 'text-stone-500 hover:text-[#1A1A1A]'
              }`}
            >
              {type}s
            </button>
          ))}
        </div>

        {/* Aesthetic Specific Filters */}
        <div className="flex items-center gap-2.5 px-2">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C8279] font-bold whitespace-nowrap">Aesthetic:</span>
          <select
            value={filterAesthetic}
            onChange={(e) => setFilterAesthetic(e.target.value)}
            className="bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-none px-4 py-1.5 text-[11px] font-sans uppercase tracking-wider text-[#1A1A1A] outline-none focus:border-[#1A1A1A] bg-[#FAF8F5]"
          >
            <option value="all">Every Vibe</option>
            {uniqueAesthetics.map(aes => (
              <option key={aes} value={aes}>{aes}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Floating alert message */}
      <AnimatePresence>
        {addedItemMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-5 py-3 rounded-none flex items-center gap-3 shadow-xl border border-stone-800 text-sm font-sans"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-black">
              ✓
            </div>
            <span>{addedItemMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinterest-Inspired Bento Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-200 bg-white">
          <Sparkles className="w-8 h-8 text-stone-300 mx-auto mb-2 stroke-1" />
          <p className="font-serif text-lg text-stone-500">No pieces found matching this exact filter combination</p>
          <button 
            onClick={() => { setFilterType('all'); setFilterAesthetic('all'); }}
            className="text-xs text-amber-950 underline mt-2 font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const isWishlisted = wishlist.includes(product.id);
            const isInCart = cart.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-[#FAF8F5] border border-[#1A1A1A]/10 overflow-hidden flex flex-col"
              >
                {/* Visual Image container with hovering controls */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/5 group-hover:bg-[#1A1A1A]/15 transition-colors duration-300" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-[#FAF8F5] text-[9px] font-sans uppercase tracking-[0.25em] px-2.5 py-1 text-[#1A1A1A] border border-[#1A1A1A]/10 font-bold">
                    {product.aesthetic}
                  </span>

                  {/* Top-Right Wishlist Toggle */}
                  <button
                    onClick={() => onAddToWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center border border-[#1A1A1A]/15 hover:bg-white text-[#1A1A1A] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-stone-600'}`}
                    />
                  </button>

                  {/* hover Quickview Button overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-1.5 z-10">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-[#FAF8F5] hover:bg-[#F0EBE5] text-[#1A1A1A] font-sans text-[10px] uppercase tracking-[0.15em] py-2.5 font-bold flex items-center justify-center gap-1.5 border border-[#1A1A1A]/15 cursor-pointer rounded-none"
                    >
                      <Eye className="w-3.5 h-3.5" /> Styling Room
                    </button>
                    <button
                      onClick={() => handleAddToCartWithAlert(product)}
                      className="w-11 bg-[#1A1A1A] hover:bg-[#333] text-white flex items-center justify-center cursor-pointer rounded-none"
                    >
                      {isInCart ? <Check className="w-4 h-4 text-emerald-300" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Information block */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#8C8279] font-bold">
                      {product.type} • ₹{product.price}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:opacity-75 transition-opacity mt-1 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 italic">
                      {product.description}
                    </p>
                  </div>

                  {/* Shopping Actions */}
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                    <span className="font-sans text-sm font-bold text-[#1A1A1A]">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-[10px] font-sans font-bold tracking-[0.15em] text-[#1A1A1A] uppercase inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      View Looks <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* LUXURY EDITORIAL STYLE LOOK DRAWER (Detail Modal) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#1A1A1A]/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image Frame with Editorial overlay */}
              <div className="w-full md:w-1/2 relative bg-[#EAE7E2] min-h-[300px] md:min-h-[500px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
                
                {/* Brand watermark mark */}
                <div className="absolute bottom-5 left-5 text-[#FAF8F5] font-serif italic text-sm tracking-widest uppercase select-none font-bold">
                  PATIKH STUDIO
                </div>
                
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-5 left-5 bg-[#1A1A1A] text-[#FAF8F5] text-[10px] uppercase font-sans tracking-[0.2em] font-bold px-4 py-2 hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Close Drawer
                </button>
              </div>

              {/* Styling Content Specifications */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh] md:max-h-[600px] bg-[#FAF8F5]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
                    <span className="text-[10px] uppercase text-[#8C8279] tracking-[0.2em] font-sans font-bold">
                      Aesthetic: {selectedProduct.aesthetic}
                    </span>
                    <span className="font-sans text-sm font-bold text-[#1A1A1A]">
                      ₹{selectedProduct.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-5 leading-tight">
                    {selectedProduct.name}
                  </h3>
                  
                  <p className="text-xs leading-relaxed text-stone-600 mt-3 font-sans">
                    {selectedProduct.description}
                  </p>

                  {/* Outfit compatibility tags */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-[9px] text-[#8C8279] font-sans uppercase tracking-[0.2em] font-bold mb-2">
                        Suggested Outfit Pairings
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.compatibility.outfits.map(outfit => (
                          <span key={outfit} className="bg-[#F0EBE5] text-[#1A1A1A] text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 border border-[#1A1A1A]/5">
                            {outfit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[9px] text-[#8C8279] font-sans uppercase tracking-[0.2em] font-bold mb-2">
                        Ideal Occasions
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.compatibility.occasions.map(occ => (
                          <span key={occ} className="bg-[#F0EBE5] text-[#1A1A1A] text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 border border-[#1A1A1A]/5">
                            {occ.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[9px] text-[#8C8279] font-sans uppercase tracking-[0.2em] font-bold mb-2">
                        Craftsmanship Specs
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedProduct.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-stone-600 font-sans flex items-start gap-2.5">
                            <span className="text-[#1A1A1A] font-bold font-mono">—</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Shop the complete look and Add to cart */}
                <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10">
                  {/* Pair suggestion */}
                  {getPairsWellWith(selectedProduct).length > 0 && (
                    <div className="mb-5 bg-[#F0EBE5]/40 p-3.5 border border-[#1A1A1A]/10">
                      <h5 className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#8C8279] font-bold mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#1A1A1A]" /> Complete The Look
                      </h5>
                      <div className="flex gap-4">
                        {getPairsWellWith(selectedProduct).map(pair => (
                          <div key={pair.id} className="flex items-center gap-3 flex-1 min-w-0">
                            <img src={pair.image} alt={pair.name} className="w-10 h-10 object-cover border border-[#1A1A1A]/5" referrerPolicy="no-referrer" />
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-serif font-bold text-[#1A1A1A] truncate">{pair.name}</p>
                              <p className="text-[9px] font-sans text-stone-500">₹{pair.price}</p>
                            </div>
                            <button
                              onClick={() => handleAddToCartWithAlert(pair)}
                              className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A] font-bold underline cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCartWithAlert(selectedProduct)}
                      className="flex-1 bg-[#1A1A1A] hover:bg-[#333] text-white font-sans text-[11px] uppercase tracking-[0.2em] py-4 px-6 font-bold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" /> 
                      {cart.includes(selectedProduct.id) ? 'In Style Cart ✓' : 'Add to Style Cart'}
                    </button>
                    <button
                      onClick={() => onAddToWishlist(selectedProduct)}
                      className="px-6 py-4 border border-[#1A1A1A]/20 hover:bg-[#F0EBE5] rounded-full transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-[#1A1A1A]'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
