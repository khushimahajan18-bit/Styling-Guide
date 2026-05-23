import React, { useState, useEffect } from 'react';
import { JewelryProduct, Moodboard } from '../types';
import { PATIKH_PRODUCTS } from '../data';
import { Folder, Plus, Trash, Sparkles, Image, Palette, Download, Save, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VirtualStylingRoomProps {
  wishlist: string[];
  cart: string[];
  onAddToCart: (product: JewelryProduct) => void;
}

const SHAPED_FOLDERS = [
  "Korean Fits",
  "Minimal Everyday Looks",
  "Party Styling",
  "Festive Looks",
  "Saree Styling",
  "Date Night Looks",
  "Vacation Looks",
  "Indo-Western Looks"
];

const PRESET_PALETTES = [
  ["#FAF8F5", "#D7D2C7", "#9E9584", "#2E2A25"], // Neutral Luxe
  ["#FFF5F5", "#FCE7F3", "#F2D4D7", "#704F50"], // Dusty Rose Glam
  ["#F5F7FB", "#DFE5F2", "#B3BED9", "#3C486B"], // Slate Calm
  ["#FEF3C7", "#D97706", "#78350F", "#1F2937"], // Festive Amber
  ["#121214", "#3D3935", "#928472", "#E1D9CD"]  // High Fashion Charcoal
];

export default function VirtualStylingRoom({
  wishlist,
  cart,
  onAddToCart
}: VirtualStylingRoomProps) {
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("Korean Fits");
  
  // Board editor state
  const [boardName, setBoardName] = useState<string>('My Dream Look');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [boardNotes, setBoardNotes] = useState<string>('');
  const [selectedPalette, setSelectedPalette] = useState<string[]>(PRESET_PALETTES[0]);
  const [collageLayout, setCollageLayout] = useState<'classic' | 'asymmetric' | 'minimal'>('classic');
  const [exportComplete, setExportComplete] = useState<boolean>(false);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);

  // Load existing moodboards from localstorage
  useEffect(() => {
    const saved = localStorage.getItem('patikh_moodboards');
    if (saved) {
      try {
        setMoodboards(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Bootstrap with a sample board
      const sample: Moodboard = {
        id: 'sample-01',
        name: 'Midnight Elegance Saree Fit',
        folder: 'Saree Styling',
        products: [PATIKH_PRODUCTS[3], PATIKH_PRODUCTS[8]], // Nairiti & Aarya Set
        colorPalette: ["#121214", "#FEF3C7", "#D97706", "#78350F"],
        notes: 'Combine our heritage Ivory Chandbalis with a textured black silk drape. Keep hair styled in an intricate low bun with silver roses.',
        createdAt: new Date().toISOString()
      };
      setMoodboards([sample]);
      localStorage.setItem('patikh_moodboards', JSON.stringify([sample]));
    }
  }, []);

  // Save changes back
  const saveMoodboardsToStorage = (newBoards: Moodboard[]) => {
    setMoodboards(newBoards);
    localStorage.setItem('patikh_moodboards', JSON.stringify(newBoards));
  };

  const handleCreateOrUpdateBoard = () => {
    if (!boardName.trim()) return;

    const boardProducts = PATIKH_PRODUCTS.filter(p => selectedProductIds.includes(p.id));

    if (activeBoardId) {
      // Update
      const updated = moodboards.map(b => {
        if (b.id === activeBoardId) {
          return {
            ...b,
            name: boardName,
            folder: activeFolder,
            products: boardProducts,
            notes: boardNotes,
            colorPalette: selectedPalette
          };
        }
        return b;
      });
      saveMoodboardsToStorage(updated);
      alert('Moodboard compilation updated successfully!');
    } else {
      // Create new
      const newBoard: Moodboard = {
        id: 'mb-' + Date.now(),
        name: boardName,
        folder: activeFolder,
        products: boardProducts,
        notes: boardNotes,
        colorPalette: selectedPalette,
        createdAt: new Date().toISOString()
      };
      saveMoodboardsToStorage([newBoard, ...moodboards]);
      setActiveBoardId(newBoard.id);
      alert('New moodboard collage created and added to folder!');
    }
  };

  const handleLoadBoard = (board: Moodboard) => {
    setActiveBoardId(board.id);
    setBoardName(board.name);
    setActiveFolder(board.folder);
    setSelectedProductIds(board.products.map(p => p.id));
    setBoardNotes(board.notes);
    setSelectedPalette(board.colorPalette);
  };

  const handleResetEditor = () => {
    setActiveBoardId(null);
    setBoardName('My Dream Look');
    setSelectedProductIds([]);
    setBoardNotes('');
    setSelectedPalette(PRESET_PALETTES[0]);
  };

  const handleDeleteBoard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this styling moodboard?')) {
      const filtered = moodboards.filter(b => b.id !== id);
      saveMoodboardsToStorage(filtered);
      if (activeBoardId === id) {
        handleResetEditor();
      }
    }
  };

  const handleProductToggle = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const currentFolderBoards = moodboards.filter(b => b.folder === activeFolder);
  const activeProducts = PATIKH_PRODUCTS.filter(p => selectedProductIds.includes(p.id));

  const simulateExport = () => {
    setExportComplete(true);
    setTimeout(() => {
      setExportComplete(false);
    }, 4000);
  };

  return (
    <div className="space-y-8" id="moodboard-studio">
      
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1A1A]/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#8C8279] block">
            BOARD CREATION STUDIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-[#1A1A1A] mt-2 italic font-serif">
            Visual Styling Room
          </h2>
          <p className="text-xs text-stone-500 mt-2 font-sans max-w-xl">
            Scribble, select, and orchestrate jewelry pieces alongside outfit themes, color notes, and bespoke styling textures.
          </p>
        </div>

        {/* Action reset */}
        <button
          onClick={handleResetEditor}
          className="text-[10px] uppercase tracking-[0.15em] font-sans font-bold border border-[#1A1A1A] rounded-full px-5 py-2.5 hover:bg-[#F0EBE5] transition-all cursor-pointer"
        >
          + Design New Collage
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLLAGE CANVAS (Left Panel) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 p-6 relative min-h-[500px] flex flex-col justify-between">
          
          {/* Aesthetic grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none editorial-grid" />

          {/* Canvas Header watermark */}
          <div className="relative z-10 flex items-center justify-between border-b border-stone-105 pb-3.5 mb-6 text-stone-400">
            <span className="font-serif text-[#928472] italic font-semibold tracking-wider text-base">Patikh Jewels Editorial Board</span>
            <span className="font-mono text-[9px] uppercase tracking-widest">
              Folder: {activeFolder}
            </span>
          </div>

          {/* Canvas Dynamic Layout */}
          <div className="relative z-10 flex-1 flex flex-col">
            
            {/* Empty Warning */}
            {activeProducts.length === 0 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center py-24 text-stone-450 border border-stone-100 bg-stone-50/20 mb-6">
                <Image className="w-10 h-10 text-stone-300 stroke-1 mb-2.5" />
                <h4 className="font-serif text-base text-stone-600 font-light">An Empty Canvas Awaiting</h4>
                <p className="text-xs text-stone-400 max-w-xs mt-1 leading-relaxed">
                  Pin jewelry catalog pieces using the selector drawer on the right side. Design beautiful collages.
                </p>
              </div>
            )}

            {/* Visual Mosaic */}
            {activeProducts.length > 0 && (
              <div className="flex-1 mb-6">
                {collageLayout === 'classic' && (
                  <div className="grid grid-cols-12 gap-4 h-full min-h-[300px]">
                    {/* Main Piece Left */}
                    <div className="col-span-7 border border-stone-300 relative overflow-hidden bg-stone-50">
                      <img src={activeProducts[0].image} alt={activeProducts[0].name} className="w-full h-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
                      <div className="absolute bottom-2 left-2 bg-white/95 text-[9px] font-mono tracking-widest px-2 py-0.5 border">
                        {activeProducts[0].name}
                      </div>
                    </div>
                    {/* Stack Right */}
                    <div className="col-span-5 flex flex-col gap-4">
                      {activeProducts.slice(1, 3).map((prod, idx) => (
                        <div key={prod.id} className="flex-1 border border-stone-300 relative overflow-hidden bg-stone-100 min-h-[140px]">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-2 left-2 bg-white/95 text-[8px] font-mono tracking-widest px-1.5 py-0.5 border truncate max-w-[90%]">
                            {prod.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {collageLayout === 'asymmetric' && (
                  <div className="grid grid-cols-3 gap-3">
                    {activeProducts.slice(0, 3).map((prod, idx) => (
                      <div key={prod.id} className={`border border-stone-300 relative overflow-hidden bg-stone-50 ${idx === 1 ? 'translate-y-4' : ''}`}>
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover aspect-[3/4]" referrerPolicy="no-referrer" />
                        <div className="absolute bottom-2 inset-x-2 bg-white/95 text-[8px] font-mono tracking-widest px-1.5 py-0.5 text-center border truncate">
                          {prod.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {collageLayout === 'minimal' && (
                  <div className="flex flex-col items-center justify-center p-6 bg-stone-50 border border-stone-200">
                    <img src={activeProducts[0].image} alt={activeProducts[0].name} className="w-48 h-64 object-cover border border-stone-300 shadow-sm" referrerPolicy="no-referrer" />
                    <span className="font-serif text-lg text-stone-800 mt-4 leading-tight">{activeProducts[0].name}</span>
                    <span className="font-mono text-xs text-stone-400 mt-1">₹{activeProducts[0].price} • {activeProducts[0].aesthetic}</span>
                  </div>
                )}
              </div>
            )}

            {/* Custom Notes Section */}
            <div className="border-t border-stone-157 pt-5 space-y-4 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-light text-stone-900">
                    {boardName}
                  </h3>
                  {boardNotes ? (
                    <p className="text-xs text-stone-550 italic font-serif leading-relaxed mt-1 whitespace-pre-line max-w-lg">
                      “{boardNotes}”
                    </p>
                  ) : (
                    <p className="text-xs text-stone-400 italic font-serif leading-relaxed mt-1">
                      No styling notations logged yet. Configure thoughts below.
                    </p>
                  )}
                </div>

                {/* Color Palette Display */}
                <div className="shrink-0 space-y-1">
                  <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-widest text-right">Color Palette</span>
                  <div className="flex gap-1.5">
                    {selectedPalette.map((col, idx) => (
                      <span key={idx} className="w-4 h-4 rounded-full border border-stone-200 block" style={{ backgroundColor: col }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Collages Control stamps footer */}
          <div className="relative z-10 mt-8 pt-4 border-t border-stone-105 flex justify-between items-center text-[9px] font-mono text-stone-400">
            <span>STYLING BOARD GENERATOR</span>
            <span className="uppercase text-amber-900 tracking-widest">Styled by Patikh Jewels</span>
          </div>
        </div>

        {/* BOARD CONTROLLER SETTINGS (Right Panel) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Folder selection and library */}
          <div className="bg-stone-50 border border-stone-200 p-5 space-y-4">
            <h3 className="font-serif text-lg font-light text-stone-900">
              Studio Folders
            </h3>
            <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              {SHAPED_FOLDERS.map((folder, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFolder(folder)}
                  className={`px-3 py-1.5 text-[11px] font-sans border transition-all inline-flex items-center gap-1 cursor-pointer ${
                    activeFolder === folder
                      ? 'bg-amber-950 text-amber-50 border-amber-950'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Folder className="w-3 h-3" /> {folder}
                </button>
              ))}
            </div>

            {/* List saved board templates in current folder */}
            {currentFolderBoards.length > 0 && (
              <div className="space-y-1 pt-3 border-t border-stone-200">
                <span className="block text-[9px] font-mono uppercase tracking-widest text-stone-400 mb-1.5">Saved Collages in Folder ({currentFolderBoards.length})</span>
                {currentFolderBoards.map(board => (
                  <button
                    key={board.id}
                    onClick={() => handleLoadBoard(board)}
                    className={`w-full text-left p-2 border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      activeBoardId === board.id 
                        ? 'bg-amber-900/5 border-amber-900 text-amber-950 font-medium' 
                        : 'bg-white border-stone-100 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="truncate">{board.name}</span>
                    <button
                      onClick={(e) => handleDeleteBoard(board.id, e)}
                      className="text-stone-300 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash className="w-3 h-3" />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Editor Options */}
          <div className="bg-white border border-stone-200 p-5 space-y-4">
            <h4 className="font-serif text-base text-stone-900 border-b border-stone-100 pb-2">
              Collage Options
            </h4>

            {/* Collage Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Collage Name</label>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="e.g. Dream Saree Style"
                className="w-full bg-stone-50 border border-stone-200 p-2.5 text-xs text-stone-800 outline-none focus:border-stone-400"
              />
            </div>

            {/* Collage Layout toggler */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Visual Composition Style</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'classic', label: 'Classic Mosaic' },
                  { id: 'asymmetric', label: 'Asymmetrical' },
                  { id: 'minimal', label: 'Single Focus' }
                ].map(lay => (
                  <button
                    key={lay.id}
                    onClick={() => setCollageLayout(lay.id as any)}
                    className={`px-2 py-1.5 border text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
                      collageLayout === lay.id
                        ? 'border-amber-900 bg-amber-900/5 text-amber-950 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    {lay.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pin Products to Canvas */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest flex items-center justify-between">
                <span>Pin Patikh Jewellery</span>
                <span className="text-stone-300 font-normal">({selectedProductIds.length} pinned)</span>
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {PATIKH_PRODUCTS.map(product => {
                  const isPinned = selectedProductIds.includes(product.id);
                  return (
                    <button
                      key={product.id}
                      onClick={() => handleProductToggle(product.id)}
                      className={`p-1.5 border text-left text-[11px] font-sans flex items-center gap-2 transition-all cursor-pointer truncate ${
                        isPinned
                          ? 'border-amber-950 bg-amber-950/5 text-stone-900 font-medium'
                          : 'border-stone-100 hover:border-stone-200 text-stone-600 bg-stone-50'
                      }`}
                    >
                      <img src={product.image} className="w-5 h-7 object-cover border border-stone-200 shrink-0" referrerPolicy="no-referrer" />
                      <span className="truncate">{product.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Styling Notes TextArea */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Styling Notations</label>
              <textarea
                value={boardNotes}
                onChange={(e) => setBoardNotes(e.target.value)}
                placeholder="Write matching hairstyles, saree fabrics, dress drapings, shoe pairings, or mood descriptions here..."
                className="w-full bg-stone-50 border border-stone-200 p-2.5 text-xs text-stone-800 outline-none focus:border-stone-400 resize-none h-16"
              />
            </div>

            {/* Preset Color Palettes Selector */}
            <div className="space-y-1 pt-1">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <Palette className="w-3 h-3 text-stone-500" /> Color Concept
              </label>
              <div className="flex gap-2">
                {PRESET_PALETTES.map((palette, pIdx) => {
                  const isSelected = selectedPalette.join(',') === palette.join(',');
                  return (
                    <button
                      key={pIdx}
                      onClick={() => setSelectedPalette(palette)}
                      className={`p-0.5 border rounded-full transition-all cursor-pointer ${
                        isSelected ? 'border-amber-900 ring-2 ring-amber-900/15' : 'border-stone-200 hover:scale-105'
                      }`}
                    >
                      <div className="flex gap-0.5 rounded-full overflow-hidden p-0.5 bg-stone-100">
                        {palette.slice(0, 3).map((col, cIdx) => (
                          <span key={cIdx} className="w-3.5 h-3.5 rounded-full block" style={{ backgroundColor: col }} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Collage Action */}
            <button
              onClick={handleCreateOrUpdateBoard}
              className="w-full bg-amber-950 hover:bg-amber-900 text-stone-50 uppercase tracking-widest font-mono text-xs py-3.5 mt-2 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              {activeBoardId ? 'Update Moodboard Collage' : 'Save To Folder Library'}
            </button>

            {/* Export and Download Actions */}
            {activeProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-1.5 pt-2 border-t border-stone-100">
                <button
                  onClick={simulateExport}
                  className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-250 text-xs py-2.5 font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" /> Export HQ
                </button>
                <button
                  onClick={() => {
                    activeProducts.forEach(p => onAddToCart(p));
                    alert('All moodboard pinned merchandise queued into styling cart!');
                  }}
                  className="bg-stone-100 hover:bg-stone-150 text-stone-900 text-xs py-2.5 font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Shop Mood
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Floating Export Alert Simulation */}
      <AnimatePresence>
        {exportComplete && (
          <div className="fixed inset-0 bg-stone-950/70 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-300 p-8 max-w-md text-center shadow-2xl relative"
            >
              <div className="absolute top-2 inset-x-0 flex justify-center">
                <div className="w-12 h-1 bg-amber-600" />
              </div>
              <Sparkles className="w-10 h-10 text-amber-600 mx-auto mb-4 stroke-1" />
              <h3 className="font-serif text-2xl font-light text-stone-900 mb-2">Editorial Card Exported</h3>
              <p className="text-xs text-stone-550 leading-relaxed mb-6">
                Your high-fashion collage has been converted to an Instagram & Pinterest-ready editorial sheet branded as **"PATIKH JEWELS"**. Download completes in the background.
              </p>
              
              <div className="bg-stone-50 p-3 border border-stone-200 flex flex-col gap-2 mb-6">
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Share look onto</p>
                <div className="flex justify-center gap-4">
                  <span className="text-xs font-mono text-stone-605 cursor-pointer hover:text-amber-900">Pinterest</span>
                  <span className="text-xs font-mono text-stone-605 cursor-pointer hover:text-amber-900">Instagram Stories</span>
                  <span className="text-xs font-mono text-stone-605 cursor-pointer hover:text-amber-900">WhatsApp Feed</span>
                </div>
              </div>

              <button
                onClick={() => setExportComplete(false)}
                className="bg-stone-900 hover:bg-stone-850 text-stone-50 text-xs tracking-wider uppercase font-mono px-6 py-2.5 cursor-pointer"
              >
                Back to Studio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
