import React, { useState, useEffect } from 'react';
import { JewelryProduct, QuizResult, Moodboard } from './types';
import { PATIKH_PRODUCTS, QUIZ_RESULTS } from './data';
import ProductsCatalog from './components/ProductsCatalog';
import PersonalityQuiz from './components/PersonalityQuiz';
import StyleSimilar from './components/StyleSimilar';
import VirtualStylingRoom from './components/VirtualStylingRoom';
import AiStylist from './components/AiStylist';
import { Sparkles, Heart, ShoppingBag, Menu, X, ArrowRight, Instagram, Compass, BookOpen, User, HelpCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('discover'); // 'discover' | 'matcher' | 'virtual' | 'quiz' | 'assistant'
  const [userProfile, setUserProfile] = useState<QuizResult | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<JewelryProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Initialize from local storage if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('patikh_user_profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error(e);
      }
    }
    const savedWish = localStorage.getItem('patikh_wishlist');
    if (savedWish) {
      try {
        setWishlist(JSON.parse(savedWish));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleQuizComplete = (result: QuizResult) => {
    setUserProfile(result);
    localStorage.setItem('patikh_user_profile', JSON.stringify(result));
    setActiveTab('discover'); // Redirect to curated home feed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (product: JewelryProduct) => {
    let updated: string[];
    if (wishlist.includes(product.id)) {
      updated = wishlist.filter(id => id !== product.id);
    } else {
      updated = [...wishlist, product.id];
    }
    setWishlist(updated);
    localStorage.setItem('patikh_wishlist', JSON.stringify(updated));
  };

  const handleAddToCart = (product: JewelryProduct) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleClearProfile = () => {
    setUserProfile(null);
    localStorage.removeItem('patikh_user_profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#F0EBE5] selection:text-[#1A1A1A] flex flex-col justify-between font-serif">
      
      {/* LUXE HEADER FRAME */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          
          {/* Brand Logo - Playfair Luxury */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('discover')} 
              className="text-left cursor-pointer focus:outline-none"
            >
              <span className="text-3xl tracking-tighter font-bold text-[#1A1A1A] block">
                PATIKH
              </span>
              <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#8C8279] block -mt-1 font-semibold">
                STYLING STUDIO
              </span>
            </button>
          </div>

          {/* Desktop Navigation Menus */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'discover', label: 'Studio Feed' },
              { id: 'matcher', label: 'Outfit Matcher' },
              { id: 'virtual', label: 'Styling Room' },
              { id: 'assistant', label: 'AI Chat' },
              { id: 'quiz', label: 'Quiz Portrait' }
            ].map(tab => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-all cursor-pointer focus:outline-none ${
                    activeTab === tab.id
                      ? 'text-[#1A1A1A] font-bold border-b border-[#1A1A1A] pb-1.5'
                      : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A] pb-1.5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Checkout and Wishlist shortcuts text links in font-sans */}
          <div className="flex items-center gap-6 font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]">
            {/* Discovered Look badge indication */}
            {userProfile && (
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#F0EBE5] border border-[#1A1A1A]/10 text-[#1A1A1A] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                VIBE: {userProfile.name}
              </div>
            )}

            {/* Wishlist Indicator */}
            <button
              onClick={() => { setActiveTab('discover'); setTimeout(() => {
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }, 100); }}
              className="hover:opacity-50 transition-opacity cursor-pointer focus:outline-none"
              title="View Wishlist"
            >
              Wish ({wishlist.length})
            </button>

            {/* Shopping Bag trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:opacity-50 transition-opacity cursor-pointer focus:outline-none font-bold"
              title="Shopping Cart"
            >
              Bag ({cart.length})
            </button>

            {/* Mobile Menu Toggler */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#1A1A1A] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-250 z-30 overflow-hidden sticky top-[57px]"
          >
            <div className="px-4 py-4 space-y-3.5 flex flex-col">
              {[
                { id: 'discover', label: 'Style Discovery Feed' },
                { id: 'matcher', label: 'Outfit -> Jewelry Matcher' },
                { id: 'virtual', label: 'Visual Styling Room' },
                { id: 'assistant', label: 'AI Chat Co-Stylist' },
                { id: 'quiz', label: 'Signature Personality Test' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-xs uppercase font-mono tracking-widest py-1.5 border-b border-stone-100 cursor-pointer ${
                    activeTab === tab.id ? 'text-amber-900 font-bold' : 'text-stone-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {userProfile && (
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-950 bg-amber-905/5 p-2 border border-amber-900/10">
                  <span>Signature Vibe: {userProfile.name}</span>
                  <button onClick={handleClearProfile} className="underline text-stone-400">Reset</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY VIEWS LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CURATED DESIGN DISCOVERY FEED */}
          {activeTab === 'discover' && (
            <motion.div
              key="discover-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* EDITORIAL HERO BLOCK */}
              <div className="relative bg-[#FAF8F5] border border-[#1A1A1A]/10 p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                
                {/* Background grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none editorial-grid" />

                {/* Left: Text copy with Bold Typography visual layout */}
                <div className="flex-1 space-y-6 relative z-10 text-center lg:text-left">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-sans font-bold text-[#8C8279] block">
                    PATIKH CURATED
                  </span>
                  
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.85] font-bold tracking-tighter text-[#1A1A1A] font-serif">
                    Beyond <br />
                    Traditional. <br />
                    <span className="italic font-normal">Modern Luxury.</span>
                  </h1>

                  <p className="text-stone-600 text-sm max-w-sm leading-relaxed font-sans mx-auto lg:mx-0">
                    Discover premium fashion jewelry crafted in sustainable brass metals. Tailored for contemporary drapes, structured Western fits, and casual Seoul minimalism.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="bg-[#1A1A1A] hover:bg-[#333] text-white rounded-full text-[11px] uppercase tracking-[0.2em] px-10 py-5 font-sans font-semibold transition-all duration-300 cursor-pointer shadow-xs"
                    >
                      My Styling Portrait
                    </button>
                    <button
                      onClick={() => {
                        const styleElem = document.getElementById('catalog-section');
                        styleElem?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-[#1A1A1A] hover:bg-[#F0EBE5] text-[#1A1A1A] rounded-full text-[11px] uppercase tracking-[0.2em] px-10 py-5 font-sans font-semibold transition-all duration-300 cursor-pointer"
                    >
                      Explore Feed
                    </button>
                  </div>
                </div>

                {/* Right: Immersive Editorial Poster & Graphic Elements */}
                <div className="w-full lg:w-[420px] aspect-[4/5] bg-[#EAE7E2] border border-[#1A1A1A]/10 relative overflow-hidden shrink-0 group">
                  <img
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
                    alt="Aesthetic Editorial Look"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/15 group-hover:bg-[#1A1A1A]/25 transition-colors duration-300" />
                  
                  {/* Styling Watermarks from the theme */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                    <span className="text-[120px] font-sans font-black rotate-12 tracking-tighter text-[#1A1A1A]">
                      PATIKH
                    </span>
                  </div>

                  <div className="absolute top-6 left-6 bg-[#FAF8F5] text-[9px] uppercase font-sans tracking-[0.3em] font-bold px-3 py-1.5 border border-[#1A1A1A]/10">
                    Editorial Look 01
                  </div>
                </div>

              </div>

              {/* PERSONALIZED FEED EDITS (IF USER HAS HIGHLIGHTED PERSONALITY) */}
              {userProfile ? (
                <div className="bg-amber-900/5 border border-amber-900/15 p-6 md:p-8 space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#78350F]">Tailored specifically to your vibe</span>
                      <h3 className="font-serif text-2xl font-light text-stone-900 mt-1">Your Curated Feed: {userProfile.name} Edition</h3>
                    </div>
                    <button
                      onClick={handleClearProfile}
                      className="text-xs font-mono uppercase text-stone-400 hover:text-stone-800 underline active:scale-95 cursor-pointer"
                    >
                      Reset Personalization
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4 aspect-[3/4] overflow-hidden border border-amber-900/10">
                      <img src={userProfile.image} alt={userProfile.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="md:col-span-8 space-y-4">
                      <p className="text-sm italic text-stone-605 font-serif">“{userProfile.quote}”</p>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{userProfile.fullDesc}</p>
                      
                      <div className="space-y-2 pt-2">
                        <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">Recommended styling coordinates:</span>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.stylingTips.map((tip, idx) => (
                            <span key={idx} className="bg-white px-3 py-2 border border-stone-200 text-xs text-stone-600 max-w-sm">
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* QUIZ TEASER BANNER */
                <div className="bg-stone-900 text-stone-100 p-6 md:p-10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-white" />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">Onboarding Consultation</span>
                    <h3 className="font-serif text-2xl font-light leading-snug">
                      Unpack your design coordinates. <br />
                      Find your boutique jewelry personality signature.
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs uppercase tracking-widest px-6 py-3.5 font-medium cursor-pointer shrink-0"
                  >
                    Take Jewellery Portrait Quiz
                  </button>
                </div>
              )}

              {/* CORE CATALOG DISC FEED */}
              <ProductsCatalog
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                wishlist={wishlist}
                cart={cart.map(item => item.id)}
                selectedAesthetic={userProfile?.name}
              />

              {/* STYLE COMBINATIONS LOOKBOOK MODULE (OCCASIONS BASED) */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase text-stone-450 tracking-widest">Occasion presets looks</span>
                  <h3 className="font-serif text-2xl font-light text-stone-900 mt-1">Discover Looks by Event</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Date Night Looks", tags: ["Sleek Slip", "Co-ord", "Candbalis"], image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80" },
                    { title: "Korean fits", tags: ["Structured Linens", "Delicate studs"], image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80" },
                    { title: "Festive looks", tags: ["Pure Organzas", "Traditional Chokers"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
                    { title: "Minimal Everyday looks", tags: ["Tees", "Cotton shirts", "Twist hoops"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" }
                  ].map((look, lIdx) => (
                    <button
                      key={lIdx}
                      onClick={() => {
                        setActiveTab('matcher');
                      }}
                      className="group relative aspect-[4/5] border border-stone-200 overflow-hidden text-left cursor-pointer"
                    >
                      <img src={look.image} alt={look.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300">Style Match</span>
                        <h4 className="font-serif text-sm leading-tight">{look.title}</h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: OUTFIT ANALYZER ("Style Similar" / match outfit -> jewelry) */}
          {activeTab === 'matcher' && (
            <motion.div
              key="matcher-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StyleSimilar
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                selectedAesthetic={userProfile?.name}
                cart={cart.map(item => item.id)}
              />
            </motion.div>
          )}

          {/* TAB 3: VISUAL STYLING MOODBOARD CANVAS */}
          {activeTab === 'virtual' && (
            <motion.div
              key="virtual-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VirtualStylingRoom
                wishlist={wishlist}
                cart={cart.map(item => item.id)}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {/* TAB 4: PERSONALIZED PORTRAIT QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PersonalityQuiz onQuizComplete={handleQuizComplete} />
            </motion.div>
          )}

          {/* TAB 5: CHAT ON-DEMAND GENERAL ASSISTANT */}
          {activeTab === 'assistant' && (
            <motion.div
              key="assistant-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AiStylist
                onAddToCart={handleAddToCart}
                cart={cart.map(item => item.id)}
                selectedAesthetic={userProfile?.name}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* LUXE EDITORIAL FOOTER */}
      <footer className="bg-[#FAF8F5] text-[#1A1A1A] py-16 border-t border-[#1A1A1A]/10 mt-20 font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-3xl tracking-tighter font-bold text-[#1A1A1A]">PATIKH</h4>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium fashion jewelry crafted in sustainable brass metals. Crafted for modern Indian expression, Seoul Korean aesthetics, and minimalist visual storyboards.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8279] mb-4">Discovery Maps</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('discover')} className="text-stone-600 hover:text-[#1A1A1A] hover:underline cursor-pointer">Discovery Feed</button></li>
              <li><button onClick={() => setActiveTab('matcher')} className="text-stone-600 hover:text-[#1A1A1A] hover:underline cursor-pointer">Outfit Matcher Tool</button></li>
              <li><button onClick={() => setActiveTab('virtual')} className="text-stone-600 hover:text-[#1A1A1A] hover:underline cursor-pointer">Assemble Moodboard</button></li>
              <li><button onClick={() => setActiveTab('assistant')} className="text-stone-600 hover:text-[#1A1A1A] hover:underline cursor-pointer">Consult AI Stylist</button></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8279] mb-4">Styling Presets</h5>
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {Object.keys(QUIZ_RESULTS).map(style => (
                <span key={style} className="bg-[#F0EBE5] text-[#1A1A1A] text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 border border-[#1A1A1A]/5 rounded-none">
                  {style}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8279] mb-4">Sharing Vibe</h5>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="text-stone-600 hover:text-[#1A1A1A] text-xs font-sans uppercase tracking-widest flex items-center gap-1 font-bold">
                Instagram
              </a>
              <span className="text-[#1A1A1A]/20">•</span>
              <a href="#" className="text-stone-600 hover:text-[#1A1A1A] text-xs font-sans uppercase tracking-widest font-bold">
                Pinterest
              </a>
            </div>
            <p className="text-[10px] text-stone-400 mt-4">Styled by Patikh Jewels Studio © 2026</p>
          </div>

        </div>
      </footer>

      {/* SHOPPING CART / MERCH BAG SIDE SLIDER DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop opacity */}
            <div 
              onClick={() => setIsCartOpen(false)} 
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-3xs" 
            />

            {/* Slider frame */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col justify-between"
              >
                
                {/* Header info */}
                <div className="px-4 py-5 bg-white border-b border-stone-200 sm:px-6 flex items-center justify-between">
                  <h3 className="font-serif text-xl font-light text-stone-900">Your Styling Cart</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 text-stone-400 hover:text-stone-705 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-24 text-stone-400 flex flex-col justify-center items-center h-full">
                      <ShoppingBag className="w-10 h-10 stroke-1 mb-2.5 text-stone-300" />
                      <p className="font-serif text-sm italic">Bag is presently empty</p>
                      <button
                        onClick={() => { setIsCartOpen(false); setActiveTab('discover'); }}
                        className="text-[11px] font-mono text-amber-900 uppercase tracking-widest mt-2 underline cursor-pointer"
                      >
                        Find Items to Style Link
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-white p-3 border border-stone-200 relative group"
                        >
                          <img src={item.image} alt={item.name} className="w-12 h-16 object-cover border" referrerPolicy="no-referrer" />
                          <div className="min-w-0 flex-1">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-800">
                              {item.aesthetic}
                            </span>
                            <h4 className="font-serif text-xs font-light text-stone-850 truncate leading-tight">
                              {item.name}
                            </h4>
                            <span className="text-xs font-mono text-stone-600 block mt-1">₹{item.price}</span>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-[10px] font-mono text-stone-400 hover:text-red-655 p-1 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Checkout frame */}
                {cart.length > 0 && (
                  <div className="bg-white border-t border-stone-200 px-4 py-6 sm:px-6 space-y-4">
                    <div className="flex items-center justify-between text-base">
                      <span className="font-mono text-xs uppercase tracking-wider text-stone-500">Styling Package Price Total</span>
                      <span className="font-mono font-bold text-stone-900">₹{totalPrice}</span>
                    </div>

                    <p className="text-[10px] text-stone-405 leading-relaxed text-center">
                      Ready to check style? Complete order secures free shipping plus elegant sustainable brass lookbook packaging.
                    </p>

                    <button
                      onClick={() => {
                        alert(`Successfully checked out! Prepared elegant packaging for ₹${totalPrice} and free lookbooks.`);
                        setCart([]);
                        setIsCartOpen(false);
                      }}
                      className="w-full bg-stone-950 hover:bg-stone-850 text-stone-50 text-xs font-mono uppercase tracking-widest py-3.5 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Process Styling Order <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
