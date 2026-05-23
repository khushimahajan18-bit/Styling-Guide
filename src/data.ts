import { JewelryProduct, QuizQuestion, QuizResult, OutfitOption } from './types';

export const PATIKH_PRODUCTS: JewelryProduct[] = [
  {
    id: "pj-01",
    name: "Aetheria Korean Pearl Drops",
    price: 1450,
    type: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    description: "Delicate cascading freshwater bar pearls suspended from lightweight micro-gilded brass threads. Inspired by modern Hanok minimalist architecture.",
    aesthetic: "Korean Chic",
    compatibility: {
      outfits: ["dresses", "co-ord", "casual-chic"],
      necklines: ["V-neck", "off-shoulder", "sweetheart"],
      colors: ["pastel", "white", "black"],
      occasions: ["date-night", "brunch", "casual"]
    },
    details: ["Freshwater Baroque Pearls", "18k Gold Plated Hypoallergenic Brass", "Length: 5.2 cm"]
  },
  {
    id: "pj-02",
    name: "Sienna Brass Twist Choker",
    price: 1890,
    type: "necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "An editorial organic twist rigid choker, sculpted in repurposed premium brass with an antique hand-brushed luster. Ideal for layering.",
    aesthetic: "Luxe Contemporary",
    compatibility: {
      outfits: ["co-ord", "dresses", "sarees", "indo-western"],
      necklines: ["scoop", "sweetheart", "off-shoulder", "V-neck"],
      colors: ["earth-tones", "black", "white", "bold-jewel"],
      occasions: ["party", "cocktail-night", "concert"]
    },
    details: ["Handmade Sculptural Brass", "Antitarnish Brushed Lacquer Protection", "Adjustable secure flex collar"]
  },
  {
    id: "pj-03",
    name: "Yume Dewdrop Layered Neckpiece",
    price: 1650,
    type: "necklace",
    image: "https://images.unsplash.com/photo-1620215175664-cb9e8e50b163?auto=format&fit=crop&w=600&q=80",
    description: "Double thin chain necklace holding miniature organic bezel-set zircon dewdrop pendants. Captures Seoul's morning-mist aesthetic.",
    aesthetic: "Korean Chic",
    compatibility: {
      outfits: ["co-ord", "casual-chic", "dresses"],
      necklines: ["scoop", "V-neck", "collared"],
      colors: ["pastel", "white", "black"],
      occasions: ["brunch", "casual", "vacation"]
    },
    details: ["Korean Grade Premium Alloy", "Layered Multi-Chain structure", "Zircon crystals", "Length: 38cm + 45cm"]
  },
  {
    id: "pj-04",
    name: "Nairiti Indo-Western Chandbalis",
    price: 2200,
    type: "earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    description: "Intricately detailed contemporary crescent moon jhumkas made of textured warm brass and finished with modern ivory enamel inlays.",
    aesthetic: "Indo-Western Muse",
    compatibility: {
      outfits: ["sarees", "indo-western", "dresses"],
      necklines: ["high-neck", "boat-neck", "V-neck"],
      colors: ["gold", "bold-jewel", "black", "white"],
      occasions: ["festive", "wedding-guest", "party", "college-farewell"]
    },
    details: ["Artisan-Poured Yellow Brass", "Premium Ivory Cold Enamel Work", "Weight: 14g pair"]
  },
  {
    id: "pj-05",
    name: "Solitude Stackable Ribbed Rings",
    price: 850,
    type: "ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    description: "A trilogy of ribbed, twisted, and parallel lined brass rings designed for versatile modular styling. Perfect for multi-finger stacking.",
    aesthetic: "Modern Minimalist",
    compatibility: {
      outfits: ["casual-chic", "co-ord", "dresses", "sarees"],
      necklines: ["any"],
      colors: ["pastel", "earth-tones", "white", "black"],
      occasions: ["casual", "brunch", "office", "date-night"]
    },
    details: ["Reclaimed Eco-Friendly Brass", "Set of 3 modular bands", "Sizes: Adjustable comfort fit"]
  },
  {
    id: "pj-06",
    name: "Elysian Brass Cuff & Chain Link",
    price: 1100,
    type: "bracelet",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    description: "A dual-texture bangle bracelet featuring half solid matte brass cuff and half fluid oversized box-chain nodes.",
    aesthetic: "Everyday Elegant",
    compatibility: {
      outfits: ["casual-chic", "co-ord", "dresses"],
      necklines: ["any"],
      colors: ["earth-tones", "white", "black"],
      occasions: ["casual", "office", "brunch"]
    },
    details: ["Hard-wearing premium brushed brass", "Oversized utility link pattern", "Hinged box locking clip"]
  },
  {
    id: "pj-07",
    name: "Gilded Botanica Statement Studs",
    price: 1250,
    type: "earrings",
    image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2922?auto=format&fit=crop&w=600&q=80",
    description: "Oversized sculpted brass flower petals with a rich liquid-gold finish. Creates a magnificent luminous framing for your face.",
    aesthetic: "Soft Feminine",
    compatibility: {
      outfits: ["dresses", "sarees", "co-ord"],
      necklines: ["off-shoulder", "sweetheart", "high-neck"],
      colors: ["pastel", "white", "earth-tones", "gold"],
      occasions: ["party", "date-night", "brunch", "wedding-guest"]
    },
    details: ["Liquid Wax Scuplt Cast", "18k Heavy Gold Electropainted finish", "Diameter: 3.5cm"]
  },
  {
    id: "pj-08",
    name: "K-Street Bold Link Collar Chain",
    price: 1780,
    type: "necklace",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
    description: "An industrial-chic cable chain necklace with heavy link geometry. Gives your outfit an instant editorial Instagram fashion edge.",
    aesthetic: "Trendy Glam",
    compatibility: {
      outfits: ["co-ord", "casual-chic", "indo-western"],
      necklines: ["collared", "scoop", "high-neck"],
      colors: ["black", "silver", "bold-jewel"],
      occasions: ["party", "concert", "cocktail-night"]
    },
    details: ["Gunmetal & Brass Dual-Toned Alloy", "Length: 42cm + extender", "Hand-stamped toggle loop clasp"]
  },
  {
    id: "pj-09",
    name: "Aarya Filigree Fusion Choker Set",
    price: 2450,
    type: "set",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
    description: "An elegant fusion necklace and ear studs set. Features delicate brass wire-wrapping and modern tiny raw pearl drops styled for neo-ethnic outfits.",
    aesthetic: "Indo-Western Muse",
    compatibility: {
      outfits: ["sarees", "indo-western", "dresses"],
      necklines: ["boat-neck", "sweetheart", "V-neck"],
      colors: ["bold-jewel", "black", "gold"],
      occasions: ["festive", "wedding-guest", "college-farewell"]
    },
    details: ["Intricate traditional Karigari filigree", "Includes adjustable choker & matching studs", "Freshwater seed pearls"]
  },
  {
    id: "pj-10",
    name: "Nouveau Hoop Twist Earrings",
    price: 990,
    type: "earrings",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
    description: "A clean twist on the classic hoop earring, wrapping polished brass loops with delicate beaded fine lines. Essential everyday styling.",
    aesthetic: "Modern Minimalist",
    compatibility: {
      outfits: ["casual-chic", "co-ord", "dresses", "sarees"],
      necklines: ["any"],
      colors: ["white", "black", "pastel"],
      occasions: ["casual", "office", "brunch", "vacation"]
    },
    details: ["Pure Yellow Brass base", "Nickel-free and Lead-free for sensitive ears", "Sleek clickable latching post"]
  },
  {
    id: "pj-11",
    name: "Sienna Fluid Cascade Bracelet",
    price: 1350,
    type: "bracelet",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    description: "Molten brass droplets wired in a cascading organic chain. Captures natural flow, reflecting light beautifully on the wrist.",
    aesthetic: "Everyday Elegant",
    compatibility: {
      outfits: ["dresses", "co-ord", "casual-chic"],
      necklines: ["any"],
      colors: ["white", "pastel", "earth-tones"],
      occasions: ["brunch", "date-night", "vacation"]
    },
    details: ["Gold-Dipped liquid wax molds", "Length: 17cm + adjustment nodes"]
  }
];

export const PRESET_OUTFITS: OutfitOption[] = [
  {
    id: "outfit-01",
    name: "Chiffon Midnight Saree",
    type: "sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Indo-Western Muse",
    neckline: "sweetheart",
    color: "black",
    occasions: ["party", "cocktail-night", "festive", "wedding-guest"]
  },
  {
    id: "outfit-02",
    name: "Linen Minimal Co-ord Set",
    type: "co-ord",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Korean Chic",
    neckline: "collared",
    color: "white",
    occasions: ["brunch", "casual", "vacation", "brunch"]
  },
  {
    id: "outfit-03",
    name: "Sleek Cowl Neck Satin Slip",
    type: "dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Luxe Contemporary",
    neckline: "off-shoulder",
    color: "earth-tones",
    occasions: ["date-night", "party", "cocktail-night"]
  },
  {
    id: "outfit-04",
    name: "Pastel Silk Organza Ghagra",
    type: "indo-western",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Soft Feminine",
    neckline: "V-neck",
    color: "pastel",
    occasions: ["festive", "wedding-guest", "college-farewell"]
  },
  {
    id: "outfit-05",
    name: "Chic Blazer & Pleated Skirt Fit",
    type: "casual-chic",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Modern Minimalist",
    neckline: "V-neck",
    color: "pastel",
    occasions: ["office", "brunch", "casual"]
  },
  {
    id: "outfit-06",
    name: "Embellished Corset & Palazzo",
    type: "indo-western",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    aesthetic: "Trendy Glam",
    neckline: "off-shoulder",
    color: "bold-jewel",
    occasions: ["party", "cocktail-night", "wedding-guest"]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Which visual atmosphere triggers your fashion senses most?",
    options: [
      { text: "Seoul streetwear: clean blazers, white sneakers, crisp collars & quiet confidence", value: "Korean Chic" },
      { text: "Neutral linen grids, thin wire hoops, and an empty structural studio aesthetic", value: "Modern Minimalist" },
      { text: "Flowy pastel organzas, vintage lace, floral scents, and tea party vibe", value: "Soft Feminine" },
      { text: "A fusion of handspun mulberry silk with structural contemporary jewelry", value: "Indo-Western Muse" },
      { text: "Chunky dual-tone chains, bold lip liners, high contrast flash photography, and fashion week front rows", value: "Trendy Glam" }
    ]
  },
  {
    id: 2,
    text: "Select your dream outfit color scheme for a starry dinner date:",
    options: [
      { text: "Soft pastels: champagne rose, pearly ivory, light butter cup", value: "Soft Feminine" },
      { text: "Monochromatic sleekness: deep sand, jet black, or stark bone white", value: "Modern Minimalist" },
      { text: "Warm Indian spices: rich mustard, vermillion red, or raw amber gold", value: "Indo-Western Muse" },
      { text: "Modern Korean tones: sage green, soft lilac, cream wool", value: "Korean Chic" },
      { text: "Glow in the dark: metallic silver, deep navy blue, or emerald green", value: "Luxe Contemporary" }
    ]
  },
  {
    id: 3,
    text: "How do you prefer your jewelry metal finish & statement volume?",
    options: [
      { text: "Delicate, whisper-thin gold chains and micro sparkles that capture light only when you move", value: "Everyday Elegant" },
      { text: "Sleek, textured hand-hammered organic gold shapes carrying deliberate weight", value: "Luxe Contemporary" },
      { text: "Layered necklaces, thick links, or bold double-hoops that command conversational attention", value: "Trendy Glam" },
      { text: "Asymmetrical bar pearls or tiny mismatched floral studs that look like personal art", value: "Korean Chic" },
      { text: "Handcasted brass in fusion silhouettes, like large stylish ear-crescent chandbalis with enamel", value: "Indo-Western Muse" }
    ]
  },
  {
    id: 4,
    text: "Who represents your ultimate style model?",
    options: [
      { text: "Jennie (BLACKPINK) — mixing streetwear with luxury minimal accessories", value: "Korean Chic" },
      { text: "Sonam Kapoor — breathtaking fusion drapes, bold statement necklaces, sheer modern grandeur", value: "Indo-Western Muse" },
      { text: "Hailey Bieber — oversized gold domes, stacked rings, and effortless clean girl look", value: "Luxe Contemporary" },
      { text: "Zendaya — high-octane conceptual glam, bold metal collars, dramatic sculptural earrings", value: "Trendy Glam" },
      { text: "Lana Del Rey — delicate pearls, floral laces, and soft romantic charm", value: "Soft Feminine" }
    ]
  }
];

export const QUIZ_RESULTS: Record<string, QuizResult> = {
  "Korean Chic": {
    id: "korean-chic",
    name: "Korean Chic",
    tagline: "Effortless, clean silhouettes paired with bespoke micro details.",
    description: "You love polished tailoring, soft oversized fits, and delicate asymmetric jewels.",
    fullDesc: "Your style is deeply anchored in modern Seoul aesthetics. You lean toward crisp shirts, cozy knits, structured tailoring, and co-ords. You favor quiet sparkles—thin nested chains, irregular dewdrop baroque pearls, and clean shapes that feel comfortable yet look editorial. You style jewellery to whisper, rather than yell, and the results are incredibly polished and Instagram-friendly.",
    quote: "Simplicity is the ultimate sophistication, served with a modern street-edge.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    colors: ["#FAFAF9", "#F5F5F4", "#EDE9FE", "#D1FAE5"],
    stylingTips: [
      "Layer delicate necklaces of different lengths rather than wearing one chunky set.",
      "Pair asymmetrical pearl earrings with a sleek high-ponytail or modern bob.",
      "Match brass cuff bracelets over your fitted blazer sleeve for an instant editorial look."
    ]
  },
  "Modern Minimalist": {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    tagline: "Structural geometry, clean lines, and architectural poise.",
    description: "You believe that less is exponentially more, preferring sleek gold wire and ribbed details.",
    fullDesc: "Your closet is a serene garden of rich neutrals, sleek pantsuits, and cowl slips. You look for structural jewellery with geometric integrity. A single twist ring, crisp ribbon hoop, or thin plain torque necklace makes you look immensely luxurious. You represent high-contrast refinement, styled with absolute deliberation.",
    quote: "Everything is pared back; what remains is exquisite design integrity.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    colors: ["#F9F8F6", "#ECEAE4", "#2E2A25", "#A8A29E"],
    stylingTips: [
      "Stick to one primary jewelry metal (warm gold brass) to maintain a cohesive palette.",
      "Focus focus on a single focal accessory—either a clean torque choker or bold double rings.",
      "Elevate your casual everyday looks with thick, lightweight hollow hoops."
    ]
  },
  "Soft Feminine": {
    id: "soft-feminine",
    name: "Soft Feminine",
    tagline: "Floral whispers, romantic drapes, and dream-world textures.",
    description: "You love flowing silhouettes, pastel silks, lace, and organic petal shapes.",
    fullDesc: "You possess a romantic, poetic style spirit. You are drawn to dresses, soft linen blouses, floral motifs, and pearls. You love the gentle, high-fashion translation of nature: gold petals casting warm light onto your cheekbones, small pearls dangling elegantly, and stacked rings with soft curves. Your styling is inherently delicate and radiant.",
    quote: "A modern romance styled in satin whispers, fresh pearls, and sunshine gold.",
    image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2922?auto=format&fit=crop&w=600&q=80",
    colors: ["#FFF5F5", "#FCE7F3", "#FEE2E2", "#E0F2FE"],
    stylingTips: [
      "Embrace floral-sculpted earrings to frame your face when rocking sweetheart necklines.",
      "Incorporate bar pearls into your outfit styling, letting them cascade naturally on dresses.",
      "Pair delicate rings on middle and index fingers for a soft, youthful visual flow."
    ]
  },
  "Indo-Western Muse": {
    id: "indo-western-muse",
    name: "Indo-Western Muse",
    tagline: "The supreme dance between traditional craftsmanship and modern utility.",
    description: "You adore traditional motifs reimagined in clean, contemporary, structured silhouettes.",
    fullDesc: "Your styling is highly dramatic, artistic, and culturally rich. You are comfortable styling heavy silk sarees with crisp white cotton crop tops, or sporting detailed jhumkas with solid neutral power-suits. You appreciate the deep heritage of brass filigree, cold enamel work, and traditional motifs, but you demand they be rendered alongside minimal lines. You are the epitome of Indian contemporary high fashion.",
    quote: "Weaving ancient heritage threads with bold, modern structural lines.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    colors: ["#FEF3C7", "#FDE68A", "#D97706", "#78350F"],
    stylingTips: [
      "Wear structural crescent chandbalis with a simple monochrome turtleneck or black silk slip dress.",
      "Layer a contemporary gold torque choker over a boat-neck saree blouse for supreme elegance.",
      "Pair statement filigree rings with a neutral pastel fusion co-ord set."
    ]
  },
  "Luxe Contemporary": {
    id: "luxe-contemporary",
    name: "Luxe Contemporary",
    tagline: "Sleek, fluid, liquid metals and heavy sculptural statement pieces.",
    description: "You adore expensive-looking drapes, organic molten metal, and premium brass collars.",
    fullDesc: "You look like you stepped out of a high-end luxury editorial. Your style centers on glossy slips, draping blazers, structured denim, and warm solid colors. In jewellery, you prefer heavy, polished statement elements: a molten twist choker, a wide cuff with architectural thickness, or heavy layered chains. It's bold, deeply confident, and incredibly glamorous.",
    quote: "Fluid metallic sculptures designed to catch light and conquer rooms.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    colors: ["#FAF7F2", "#E7E2D6", "#3F3931", "#928472"],
    stylingTips: [
      "Choose deep V-necklines to show off wide sculptural collars and coiled chokers.",
      "Style with chunky asymmetrical rings on your thumb or ring fingers.",
      "A sleek, back-swept hairstyle lets metallic chokers and thick ear cuffs take center stage."
    ]
  },
  "Trendy Glam": {
    id: "trendy-glam",
    name: "Trendy Glam",
    tagline: "High contrast, bold link chains, and statement fashion authority.",
    description: "You are the style experimentalist, mixing heavy links with futuristic shapes.",
    fullDesc: "You love setting trends, styling neon or deep dark colors, and posting aesthetic outfit checks on your socials. You aren't afraid of contrast—you easily layer massive link chains, metallic cuffs, and geometric hoops together. Your style is deeply Gen Z, playful, high-contrast, and always aligned with current international runway energy.",
    quote: "Why choose when you can wear it all with absolute styling conviction?",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
    colors: ["#FDF2F8", "#F472B6", "#1E1B4B", "#312E81"],
    stylingTips: [
      "Pair bold double-link chain sets with casual graphic tees or modern minimal blazers.",
      "Stack multiple thick, polished rings for an expressive, high-fashion hand profile.",
      "Combine textured ear cuffs on your cartilage to complement thick statement hoops."
    ]
  },
  "Everyday Elegant": {
    id: "everyday-elegant",
    name: "Everyday Elegant",
    tagline: "Effortless morning-to-night modularity with lightweight gold grace.",
    description: "You prefer delicate, comfortable, and timeless pieces designed for daily luxury.",
    fullDesc: "Your style represents effortless beauty. You love soft cashmere, premium denims, linen shirts, and comfortable loafers. Your jewelry consists of light twisted gold chains, mini ribbed hoops, and simple brass wire bands. These pieces coordinate perfectly with everything, feel weightless, and add a quick glow to your casual outfit styling.",
    quote: "Everyday luxury styled effortlessly into the rhythms of your beautiful life.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    colors: ["#FAF8F5", "#F4EFEA", "#4B5563", "#D1D5DB"],
    stylingTips: [
      "Layer a thin twisted wire necklace with a slightly longer delicate pearl drop pendant.",
      "Opt for small, ribbed click hoops that look beautiful during office work and shine on dinner dates.",
      "Stack a clean brass wire link bracelet with your timeless watch model."
    ]
  }
};

// Simple, fast Rule-Based local AI Stylist Engine
export function getRecommendedJewelryForOutfit(params: {
  color: string;
  aesthetic: string;
  type: string;
  neckline: string;
}): JewelryProduct[] {
  const { color, aesthetic, neckline } = params;
  
  // Filter core products
  const products = [...PATIKH_PRODUCTS];
  
  // Calculate a matching score for each product
  const scored = products.map(product => {
    let score = 0;
    
    // Map outfit values to product properties
    if (product.aesthetic.toLowerCase() === aesthetic.toLowerCase()) {
      score += 5;
    }
    
    // Check neckline compatibility (necklaces should match well, earrings are universally more open)
    if (product.compatibility.necklines && product.compatibility.necklines.includes(neckline)) {
      score += 4;
    }
    
    // Check outfit type compatibility
    if (product.compatibility.outfits.includes(params.type)) {
      score += 3;
    }
    
    // Check color compatibility
    if (product.compatibility.colors && product.compatibility.colors.includes(color)) {
      score += 3;
    }
    
    return { product, score };
  });
  
  // Sort by score descending and return top 4
  return scored
    .sort((a, b) => b.score - a.score)
    .map(s => s.product);
}
