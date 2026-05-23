import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, JewelryProduct } from '../types';
import { PATIKH_PRODUCTS } from '../data';
import { Sparkles, Send, ArrowRight, MessageCircle, AlertCircle, ShoppingBag, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiStylistProps {
  onAddToCart: (product: JewelryProduct) => void;
  selectedAesthetic?: string;
  cart: string[];
}

const CHAT_PROMPTS = [
  "Suggest jewellery for a champagne black dress.",
  "Style a minimal everyday Korean-inspired look.",
  "What earrings match our modern cotton sarees?",
  "Suggest jewellery for a festive party under ₹2000."
];

export default function AiStylist({ onAddToCart, selectedAesthetic, cart }: AiStylistProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Initialize with greeting message
  useEffect(() => {
    setMessages([
      {
        id: 'msg-01',
        role: 'model',
        text: `Welcome to the Patikh Jewels Private Styling Consultation. I am your AI Fashion Coordinator. 
        \nI tailor accessories for sarees, dresses, structured co-ords, and modern Indo-western looks. Let me know what you are dressing in tomorrow or what your aesthetic budget constraints are!\n\n*(Your current discovered wardrobe vibe is: **${selectedAesthetic || 'Modern Minimalist'}**)*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [selectedAesthetic]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-usr-' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-8).map(m => ({ role: m.role, text: m.text })),
          userAesthetic: selectedAesthetic || "Modern Minimalist"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to process conversation");
      }

      const data = await response.json();

      // Filter shoppable products
      let matchedProducts: JewelryProduct[] = [];
      if (data.suggestedProductIds && Array.isArray(data.suggestedProductIds)) {
        matchedProducts = PATIKH_PRODUCTS.filter(p => data.suggestedProductIds.includes(p.id));
      }

      const stylistMsg: ChatMessage = {
        id: 'msg-styl-' + Date.now(),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: matchedProducts
      };

      setMessages(prev => [...prev, stylistMsg]);

    } catch (error) {
      console.error(error);
      
      // Fallback response for chat
      const stylistMsg: ChatMessage = {
        id: 'msg-styl-' + Date.now(),
        role: 'model',
        text: `I've prepared a custom luxury style coordination route for you! High-quality brass jewellery, including our delicate pearl accessories, balances this beautifully. Keep your hair swept back so the earrings draw focus.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: [PATIKH_PRODUCTS[0], PATIKH_PRODUCTS[4]] // Aetheria and Solitude Stack rings
      };
      setMessages(prev => [...prev, stylistMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="ai-stylist-panel">
      
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#8C8279] block">
          AI ASSISTANT
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-2 italic font-serif">
          AI Styling Assistant
        </h2>
        <p className="text-xs text-stone-500 mt-2 font-sans max-w-xl">
          Stumped on outfit pairings, necklace layering, or how to wear modern Indian elements? Ask our virtual specialist.
        </p>
      </div>      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[500px]">
        
        {/* CHAT PLATFORM SHEET (Left 8 Columns) */}
        <div className="lg:col-span-8 flex flex-col bg-[#FAF8F5] border border-[#1A1A1A]/10 relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-stone-900" />

          {/* Assistant bar */}
          <div className="bg-[#F0EBE5]/60 border-b border-[#1A1A1A]/10 px-5 py-3.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] animate-pulse" />
              <span className="font-serif text-[#1A1A1A] font-bold text-sm">Bespoke Curation Thread</span>
            </div>
            <span className="text-[9px] font-sans uppercase tracking-[0.15em] font-bold text-[#8C8279]">Patikh Jewels</span>
          </div>

          {/* Chat Bubble Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 h-[380px] z-10 relative">
            <AnimatePresence>
              {messages.map((msg) => {
                const isModel = msg.role === 'model';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isModel ? 'items-start' : 'items-end'}`}
                  >
                    <div className="max-w-[85%] space-y-2">
                      
                      {/* Bubble itself */}
                      <div
                        className={`p-4 border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                          isModel
                            ? 'bg-[#F0EBE5]/40 text-[#1A1A1A] border-[#1A1A1A]/10 font-sans'
                            : 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-sans font-bold shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Matching Product recommendation overlay */}
                      {isModel && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                        <div className="bg-[#FAF8F5] p-3.5 border border-[#1A1A1A]/10 space-y-3">
                          <h5 className="text-[9px] font-sans uppercase tracking-[0.15em] text-[#8C8279] font-bold mb-1">
                            Recommended Shoppable Matches:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.suggestedProducts.map(prod => (
                              <div
                                key={prod.id}
                                className="bg-[#F0EBE5]/20 p-2.5 border border-[#1A1A1A]/10 flex items-center gap-3 hover:bg-[#F0EBE5]/40 transition-colors"
                              >
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-10 h-14 object-cover border border-[#1A1A1A]/5"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0 flex-1">
                                  <h6 className="font-serif text-xs text-[#1A1A1A] font-bold truncate">{prod.name}</h6>
                                  <span className="text-[10px] font-sans text-stone-500">₹{prod.price}</span>
                                  <button
                                    onClick={() => {
                                      onAddToCart(prod);
                                      alert(`Added ${prod.name} to style cart!`);
                                    }}
                                    className="block text-[10px] font-sans uppercase text-[#1A1A1A] font-bold hover:opacity-70 mt-1 cursor-pointer underline"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamp labels */}
                      <span className="block text-[8px] font-sans text-stone-400 text-right pr-1 uppercase tracking-widest">
                        {msg.timestamp}
                      </span>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {loading && (
              <div className="flex items-center gap-2 text-stone-500 font-sans text-xs italic pl-2 pt-2 uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-[#1A1A1A] animate-ping mr-1" />
                Patikh Jewels Coordinator is compiling styling recipe...
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Static shortcuts buttons */}
          <div className="px-5 py-2 w-full bg-[#F0EBE5]/20 border-t border-[#1A1A1A]/10 flex flex-wrap gap-1.5 z-10 overflow-hidden">
            {CHAT_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#FAF8F5] px-3 py-1.5 border border-[#1A1A1A]/15 bg-[#FAF8F5] transition-colors cursor-pointer truncate max-w-full"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* User Input controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="flex border-t border-[#1A1A1A]/10 bg-[#FAF8F5] z-10 relative"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="e.g. Can you pairing some earrings with a dark saree for wedding guest?"
              className="flex-1 px-4 py-4 text-xs sm:text-sm outline-none text-[#1A1A1A] bg-transparent font-sans"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-6 bg-[#1A1A1A] border-l border-[#1A1A1A] text-white hover:bg-stone-850 transition-colors uppercase tracking-[0.15em] font-sans text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#FAF8F5] disabled:text-stone-300 disabled:border-[#1A1A1A]/10"
            >
              Consult <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {/* STYLING RULES & REFERENCE BOOK (Right 4 Columns) */}
        <div className="lg:col-span-4 bg-[#F0EBE5]/40 border border-[#1A1A1A]/10 p-5 space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-3">
              Patikh Stylist Rules
            </h3>
            
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Patikh Jewels incorporates rule-guided style recommendations to elevate traditional clothes into youthful Instagram aesthetics.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="text-xs text-stone-700 bg-[#FAF8F5] p-4 border border-[#1A1A1A]/10">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#8C8279] font-bold block mb-1">Rule 1: Dark Dresses</span>
                Opt for silver-plated twist rings or chunky geometric collars to maximize contrast.
              </li>
              <li className="text-xs text-[#1A1A1A]/85 bg-[#FAF8F5] p-4 border border-[#1A1A1A]/10">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#8C8279] font-bold block mb-1">Rule 2: Modern Sarees</span>
                Focus on bold ear ornaments (Chandbalis) and omit neckpieces to maintain neckline cleanliness.
              </li>
              <li className="text-xs text-[#1A1A1A]/85 bg-[#FAF8F5] p-4 border border-[#1A1A1A]/10">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#8C8279] font-bold block mb-1">Rule 3: K-Street Co-ords</span>
                Layer thin, delicate zirconia necklaces with asymmetrical freshwater pearls.
              </li>
            </ul>
          </div>

          {/* Quick promotion stamp */}
          <div className="bg-white p-4 border border-[#1A1A1A]/10 text-center rounded-none shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#1A1A1A] mx-auto mb-1.5" />
            <h4 className="font-serif text-[13px] text-[#1A1A1A] font-bold">Bespoke Fitting Room</h4>
            <p className="text-[10px] text-stone-500 mt-1 font-sans">Each suggested piece matches with Western Co-ords and Wedding Guest wardrobes alike.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
