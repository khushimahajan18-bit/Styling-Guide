export interface JewelryProduct {
  id: string;
  name: string;
  price: number;
  type: 'earrings' | 'necklace' | 'ring' | 'bracelet' | 'set';
  image: string;
  description: string;
  aesthetic: string; // e.g. "Modern Minimalist", "Korean Chic", "Soft Feminine", "Luxe Contemporary", "Indo-Western Muse", "Trendy Glam", "Everyday Elegant"
  compatibility: {
    outfits: string[]; // ['saree', 'dress', 'co-ord', 'indo-western', 'casual-chic', 'formal']
    necklines?: string[]; // ['V-neck', 'collared', 'scoop', 'sweetheart', 'off-shoulder', 'high-neck']
    colors?: string[]; // ['white', 'black', 'pastel', 'gold', 'silver', 'earth-tones', 'bold-jewel']
    occasions: string[]; // ['date-night', 'party', 'vacation', 'festive', 'casual', 'office']
  };
  details: string[];
}

export interface OutfitOption {
  id: string;
  name: string;
  type: string;
  image: string;
  aesthetic: string;
  neckline: string;
  color: string;
  occasions: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: string; // The aesthetic keyword
    image?: string;
  }[];
}

export interface QuizResult {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDesc: string;
  quote: string;
  image: string;
  colors: string[];
  stylingTips: string[];
}

export interface Moodboard {
  id: string;
  name: string;
  folder: string; // "Korean Fits", "Minimal Everyday", "Party Styling", "Festive", etc.
  products: JewelryProduct[];
  outfitImage?: string;
  outfitDetails?: {
    color: string;
    aesthetic: string;
    neckline: string;
  };
  colorPalette: string[]; // Hex codes
  notes: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  suggestedProducts?: JewelryProduct[];
  isSuggestingOutfits?: boolean;
  suggestedOutfits?: {
    title: string;
    colors: string[];
    style: string;
    hairstyle: string;
    image: string;
  }[];
}
