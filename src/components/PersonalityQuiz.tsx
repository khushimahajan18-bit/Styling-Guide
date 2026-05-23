import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../data';
import { Sparkles, ArrowRight, RefreshCw, Share2, Instagram, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PersonalityQuizProps {
  onQuizComplete: (result: QuizResult) => void;
}

export default function PersonalityQuiz({ onQuizComplete }: PersonalityQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is Cover Slide
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [calculatedResult, setCalculatedResult] = useState<QuizResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleStart = () => {
    setAnswers({});
    setCalculatedResult(null);
    setCurrentStep(0);
  };

  const handleSelectOption = (questionId: number, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    // Auto-advance or compute result
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 350);
    } else {
      // Complete! Tally answers
      setTimeout(() => {
        calculateAesthetic(updated);
      }, 400);
    }
  };

  const calculateAesthetic = (finalAnswers: Record<number, string>) => {
    const tallies: Record<string, number> = {};
    
    // Tally up matching scores
    Object.values(finalAnswers).forEach(val => {
      tallies[val] = (tallies[val] || 0) + 1;
    });

    // Find the highest tally
    let maxCount = 0;
    let pickedAesthetic = "Modern Minimalist"; // Default fallback
    
    Object.entries(tallies).forEach(([aes, count]) => {
      if (count > maxCount) {
        maxCount = count;
        pickedAesthetic = aes;
      }
    });

    const result = QUIZ_RESULTS[pickedAesthetic] || QUIZ_RESULTS["Modern Minimalist"];
    setCalculatedResult(result);
    setCurrentStep(QUIZ_QUESTIONS.length); // Results page step
  };

  const handleShareResult = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleApplyPersonalization = () => {
    if (calculatedResult) {
      onQuizComplete(calculatedResult);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <AnimatePresence mode="wait">
        
        {/* STEP -1: THE LUXURY COVER PAGE */}
        {currentStep === -1 && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center p-8 border border-[#1A1A1A]/10 bg-[#FAF8F5] py-14 relative overflow-hidden"
          >
            {/* Decors */}
            <div className="absolute right-0 top-0 w-24 h-24 border-r border-t border-[#1A1A1A]/10" />
            <div className="absolute left-0 bottom-0 w-24 h-24 border-l border-b border-[#1A1A1A]/10" />

            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0EBE5] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.25em] font-bold border border-[#1A1A1A]/5">
              <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" /> DIGITAL STYLING STUDIO
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mt-3 tracking-tighter">
              Discover Your <br />
              <span className="italic font-normal">Jewellery Vibe</span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-6 leading-relaxed font-sans">
              Skip traditional shopping parameters. Decode your design signature, preferred styles, and aesthetic coordinates to discover your bespoke Patikh jewelry portrait.
            </p>

            <button
              onClick={handleStart}
              className="mt-10 bg-[#1A1A1A] hover:bg-[#333] text-white rounded-full text-[11px] uppercase tracking-[0.2em] px-10 py-5 font-sans font-semibold transition-all duration-300 cursor-pointer shadow-xs"
            >
              Begin Personal Consultation
            </button>

            <div className="mt-12 text-[9px] font-sans font-bold uppercase tracking-[0.15em] text-[#8C8279]">
              Curation time: 2 minutes • 4 Style Queries
            </div>
          </motion.div>
        )}

        {/* ACTIVE QUESTIONS */}
        {currentStep >= 0 && currentStep < QUIZ_QUESTIONS.length && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="border border-[#1A1A1A]/10 bg-[#FAF8F5] p-6 md:p-8 relative"
          >
            {/* Question Progress Header */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#8C8279] font-bold">
                STUDIO QUERY {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-6 transition-colors ${
                      idx <= currentStep ? 'bg-[#1A1A1A]' : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="font-serif text-2xl text-stone-900 font-light leading-relaxed mb-6">
              {QUIZ_QUESTIONS[currentStep].text}
            </h2>

            {/* Structured interactive options */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((option, oIdx) => {
                const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === option.value;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, option.value)}
                    className={`w-full text-left p-4 border transition-all text-sm leading-relaxed flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-amber-900 bg-amber-900/5 text-amber-950 font-medium'
                        : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/50 text-stone-700'
                    }`}
                  >
                    <span>{option.text}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 opacity-20" />
                  </button>
                );
              })}
            </div>

            {/* Manual Back Navigation */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-6 text-xs text-stone-400 font-mono flex items-center gap-1.5 hover:text-stone-700 cursor-pointer"
              >
                ← Back to previous question
              </button>
            )}
          </motion.div>
        )}

        {/* RESULTS PAGE - VISUAL EDITORIAL CARD */}
        {currentStep === QUIZ_QUESTIONS.length && calculatedResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* The Shareable Card */}
            <div className="border border-stone-200 bg-white overflow-hidden shadow-xs relative p-6 md:p-8">
              
              {/* Grid Background aesthetic */}
              <div className="absolute inset-0 opacity-15 pointer-events-none editorial-grid" />

              {/* Branding Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                <span className="font-serif italic font-semibold text-lg text-amber-950 tracking-wider">Patikh Jewels</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-0.5">
                  Style Card #{calculatedResult.id.toUpperCase()}
                </span>
              </div>

              {/* Grid Content */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Visual */}
                <div className="md:col-span-5 aspect-[3/4] bg-stone-100 border border-stone-300 relative overflow-hidden">
                  <img
                    src={calculatedResult.image}
                    alt={calculatedResult.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-stone-900/10" />
                </div>

                {/* Personality Copy */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-900">Your Signature Style Profile</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-950 tracking-tight mt-1">
                      {calculatedResult.name}
                    </h2>
                    <p className="text-sm italic text-stone-600 mt-1 font-serif">
                      "{calculatedResult.tagline}"
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-sans">
                    {calculatedResult.fullDesc}
                  </p>

                  {/* Aesthetic Color Palettes */}
                  <div>
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-2">Preferred Palette Notes</h4>
                    <div className="flex gap-2">
                      {calculatedResult.colors.map((color, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: color }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote partition */}
              <div className="relative z-10 mt-8 py-5 border-y border-stone-250 italic text-stone-700 text-center font-serif text-base max-w-xl mx-auto">
                “{calculatedResult.quote}”
              </div>

              {/* Tips Section */}
              <div className="relative z-10 mt-6 space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-amber-900 font-semibold mb-2">
                  Editorial Curators' Styling Tips & Guidelines
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculatedResult.stylingTips.map((tip, tIdx) => (
                    <li key={tIdx} className="bg-stone-50 p-3.5 border border-stone-200 text-xs text-stone-600 flex flex-col justify-between">
                      <span className="font-mono text-stone-300 text-lg font-black mb-1">0{tIdx + 1}</span>
                      <p className="leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Branding stamp */}
              <div className="relative z-10 mt-8 pt-4 border-t border-stone-100 flex justify-between items-center text-[10px] font-mono text-stone-400">
                <span>PATIKH JEWELS DIGITAL CONSULTATION</span>
                <span>© 2026</span>
              </div>
            </div>

            {/* Styling Control Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-900/5 p-4 border border-amber-900/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStart}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 flex items-center gap-1 border border-stone-200 bg-white cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Re-Consult
                </button>
                <button
                  onClick={handleShareResult}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 flex items-center gap-1 border border-stone-200 bg-white cursor-pointer"
                >
                  {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedLink ? "Copied" : "Share Style"}
                </button>
              </div>

              <button
                onClick={handleApplyPersonalization}
                className="w-full sm:w-auto bg-amber-950 hover:bg-amber-900 text-stone-50 font-mono text-xs uppercase py-3 px-6 tracking-widest inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Apply Custom Curation <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
