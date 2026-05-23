import React, { useState } from 'react';
import { JewelryProduct, OutfitOption } from '../types';
import { PRESET_OUTFITS, PATIKH_PRODUCTS } from '../data';
import { Sparkles, Upload, ArrowRight, Check, Eye, AlertCircle, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StyleSimilarProps {
  onAddToCart: (product: JewelryProduct) => void;
  onAddToWishlist: (product: JewelryProduct) => void;
  selectedAesthetic?: string;
  cart: string[];
}

interface StylistResponse {
  aestheticVibe: string;
  summary: string;
  stylingTips: string[];
  colorPalette: string[];
  suggestedProductIds: string[];
  notice?: string;
}

export default function StyleSimilar({
  onAddToCart,
  onAddToWishlist,
  selectedAesthetic,
  cart
}: StyleSimilarProps) {
  const [selectedPreset, setSelectedPreset] = useState<OutfitOption | null>(null);
  const [customDescription, setCustomDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [stylistResult, setStylistResult] = useState<StylistResponse | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter products by recommended IDs
  const recommendedJewellery = stylistResult
    ? PATIKH_PRODUCTS.filter(p => stylistResult.suggestedProductIds.includes(p.id))
    : [];

  const handleSelectPreset = (preset: OutfitOption) => {
    setSelectedPreset(preset);
    setCustomDescription(`A classic ${preset.name} outfit styled as a ${preset.aesthetic} vibe. Key characteristics: ${preset.color} palette, with a ${preset.neckline} neck design.`);
    setUploadedImage(preset.image);
    setStylistResult(null); // Clear previous output
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setSelectedPreset(null);
          setStylistResult(null);
          // Suggest something in description:
          setCustomDescription(prev => prev || `Premium look inspired by file "${file.name}". Includes modern silhouettes and bespoke colors.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setSelectedPreset(null);
          setStylistResult(null);
          setCustomDescription(prev => prev || `Premium styling look. Elegant textures containing custom neckline and colors.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const executeStylistAnalysis = async () => {
    if (!customDescription.trim()) {
      setErrorMessage("Please select a look or specify outfit details first.");
      return;
    }
    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/analyze-look', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfitDescription: customDescription,
          userAesthetic: selectedAesthetic || 'Modern Minimalist',
          sampleOutfitId: selectedPreset?.id
        })
      });

      if (!response.ok) {
        throw new Error('Analyst response was not ok');
      }

      const data = await response.json();
      setStylistResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to consult the AI Stylist. Playing back local styled rules.");
      
      // Secondary fallback
      setStylistResult({
        aestheticVibe: "Contemporary Minimal Editorial",
        summary: "An incredibly chic linen-modern composition leveraging warm brass tones and delicate stacking accents.",
        stylingTips: [
          "Choose deep-set necklines to let chokers shine independently.",
          "Keep arms minimal—let the earrings frame the jawline.",
          "Best styled with relaxed high-knot buns."
        ],
        colorPalette: ["#FAF8F5", "#DCD5C9", "#A79D8D", "#211F1D"],
        suggestedProductIds: ["pj-01", "pj-02", "pj-05"]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const shopCompleteLook = () => {
    recommendedJewellery.forEach(p => {
      onAddToCart(p);
    });
  };

  return (
    <div className="space-y-8" id="visual-stylist-room">
      
      {/* Editorial Title */}
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#928472]">Feature 02</span>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 mt-1">
          Outfit → Jewellery Matcher
        </h2>
        <p className="text-sm text-stone-500 mt-1 leading-relaxed">
          Upload a Pinterest screenshot, photograph your clothes, or write outfit specifics to generate a Bespoke Jewelled Composition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT PANEL: OUTFIT SETTINGS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Preset look togglers */}
          <div className="bg-white border border-stone-200 p-5 space-y-3">
            <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-2">
              Select Preset Outfit Inspirations
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_OUTFITS.map(preset => {
                const isSelected = selectedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`relative aspect-[3/4] border transition-all text-left overflow-hidden cursor-pointer ${
                      isSelected ? 'border-amber-900 ring-2 ring-amber-900/10' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={preset.image} alt={preset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
                    <span className="absolute bottom-2 inset-x-2 text-[10px] font-sans font-medium text-white truncate text-center">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screenshot Drop Area / Manual Details */}
          <div className="bg-white border border-stone-200 p-5 space-y-4">
            <h3 className="font-serif text-lg font-light text-stone-900 border-b border-stone-100 pb-2">
              Or Upload Pinterest Screen / Celebrity Look
            </h3>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border border-dashed p-6 text-center transition-all relative ${
                uploadedImage ? 'bg-stone-50/50 border-stone-300' : 'bg-white border-stone-300'
              } ${dragActive ? 'border-amber-900 bg-amber-950/5' : ''}`}
            >
              <input
                type="file"
                id="image-picker"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadedImage ? (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-40 border border-stone-200 relative overflow-hidden mb-3">
                    <img src={uploadedImage} alt="Uploaded Look" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <label
                    htmlFor="image-picker"
                    className="text-[11px] font-mono uppercase tracking-wider text-amber-900 cursor-pointer hover:underline"
                  >
                    Change Snapshot
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="w-8 h-8 text-stone-300 stroke-1" />
                  <p className="text-xs text-stone-500">
                    Drag & Drop your look here, or{' '}
                    <label
                      htmlFor="image-picker"
                      className="text-amber-900 font-medium underline cursor-pointer"
                    >
                      browse folders
                    </label>
                  </p>
                  <p className="text-[10px] font-mono text-stone-400">supports PNG, JPG, WEBP formats</p>
                </div>
              )}
            </div>

            {/* Description prompt textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#928472] uppercase tracking-wider">
                Outfit Aesthetic / Colors / Neckline Details:
              </label>
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="e.g. A gorgeous champagne linen co-ord set with a relaxed collar. Looking for minimal but warm jewellery styled for an outdoor summer brunch."
                className="w-full bg-stone-50 border border-stone-200 rounded-none p-3 text-xs text-stone-800 outline-none focus:border-stone-400 resize-none h-24"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 border border-red-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Analysis */}
            <button
              onClick={executeStylistAnalysis}
              disabled={isAnalyzing}
              className={`w-full uppercase font-mono tracking-widest text-xs py-3.5 text-center flex items-center justify-center gap-2 cursor-pointer ${
                isAnalyzing
                  ? 'bg-stone-105 text-stone-400 border border-stone-200'
                  : 'bg-amber-950 hover:bg-amber-900 text-stone-50'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-stone-400 mr-2" />
                  Stylist is curating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Consult Patikh AI Stylist
                </>
              )}
            </button>
          </div>

        </div>

        {/* OUTPUT PANEL: STYLING REPORT */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {!stylistResult ? (
              <motion.div
                key="empty-report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-dashed border-stone-200 bg-white/50 p-8 text-center h-[450px] flex flex-col justify-center items-center"
              >
                <div className="w-12 h-12 bg-stone-100 flex items-center justify-center rounded-full text-stone-400 mb-3">
                  <Sparkles className="w-5 h-5 stroke-1" />
                </div>
                <h4 className="font-serif text-lg text-stone-700 font-light">Bespoke Design Awaiting</h4>
                <p className="text-xs text-stone-400 max-w-xs mt-1.5 leading-relaxed">
                  Select an outfit inspiration above or construct a custom visual scenario, then click "Consult Patikh AI Stylist" to generate shoppable jewelry matches.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="stylist-report"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-stone-200 bg-white p-6 space-y-6 relative"
              >
                {/* Visual grid watermark */}
                <div className="absolute inset-0 opacity-10 pointer-events-none editorial-grid" />

                {/* Editorial Recipe Sheet Header */}
                <div className="relative z-10 border-b border-stone-200 pb-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#a8a29e]">AI Styled Proposal Sheet</span>
                  <h3 className="font-serif text-2xl text-stone-900 leading-tight mt-1">
                    {stylistResult.aestheticVibe}
                  </h3>
                  <p className="text-xs italic text-stone-500 mt-2 font-serif">
                    “{stylistResult.summary}”
                  </p>
                </div>

                {/* Aesthetic Palette recommendations */}
                <div className="relative z-10">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-2">Complements Color Tones</h4>
                  <div className="flex gap-2">
                    {stylistResult.colorPalette.map((col, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full border border-stone-200" style={{ backgroundColor: col }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom styling coordinates tips */}
                <div className="relative z-10 space-y-2">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">
                    How to style this combination
                  </h4>
                  <ul className="space-y-2">
                    {stylistResult.stylingTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-stone-600 font-sans flex items-start gap-2 bg-stone-50 p-2.5 border border-stone-200/50">
                        <span className="font-mono font-bold text-amber-900 mt-0.5">0{idx + 1}</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Shoppable Items */}
                <div className="relative z-10 pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                      Matching Curated Ornaments
                    </h4>
                    {recommendedJewellery.length > 0 && (
                      <button
                        onClick={shopCompleteLook}
                        className="text-[10px] font-mono text-amber-900 border border-amber-900/30 px-3 py-1 flex items-center gap-1 bg-amber-900/5 cursor-pointer hover:bg-amber-900/10"
                      >
                        <ShoppingCart className="w-3 h-3" /> Add Entire Look
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {recommendedJewellery.map(product => {
                      const isInCart = cart.includes(product.id);
                      return (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 bg-stone-50 p-3 border border-stone-200 hover:border-stone-300 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-16 object-cover bg-stone-100 border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-800">
                              {product.aesthetic}
                            </span>
                            <h5 className="font-serif text-sm text-stone-800 truncate leading-tight">
                              {product.name}
                            </h5>
                            <span className="text-xs font-mono text-stone-500">₹{product.price}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => { onAddToCart(product); }}
                              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer ${
                                isInCart 
                                  ? 'bg-stone-200 text-stone-600' 
                                  : 'bg-stone-900 hover:bg-stone-850 text-stone-50'
                              }`}
                            >
                              {isInCart ? 'In Cart' : 'Style Shop'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 pt-2 flex justify-between items-center text-[9px] font-mono text-stone-400">
                  <span>Styled instantly by Patikh Jewels AI module</span>
                  <span>© 2026</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
