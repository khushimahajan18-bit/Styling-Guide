import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Mock jewelry list for backend contextual prompting & fallback
const PATIKH_CATALOG = [
  { id: "pj-01", name: "Aetheria Korean Pearl Drops", price: 1450, type: "earrings", aesthetic: "Korean Chic", desc: "Cascading freshwater bar pearls suspended from gold-plated brass." },
  { id: "pj-02", name: "Sienna Brass Twist Choker", price: 1890, type: "necklace", aesthetic: "Luxe Contemporary", desc: "Organic twist rigid handcrafted brass choker with antique luster." },
  { id: "pj-03", name: "Yume Dewdrop Layered Neckpiece", price: 1650, type: "necklace", aesthetic: "Korean Chic", desc: "Double thin chain with zircon dewdrop pendants." },
  { id: "pj-04", name: "Nairiti Indo-Western Chandbalis", price: 2200, type: "earrings", aesthetic: "Indo-Western Muse", desc: "Contemporary crescent moon jhumkas with warm brass and modern ivory enamel." },
  { id: "pj-05", name: "Solitude Stackable Ribbed Rings", price: 850, type: "ring", aesthetic: "Modern Minimalist", desc: "Trio of ribbed, twisted, and lined brass rings." },
  { id: "pj-06", name: "Elysian Brass Cuff & Chain Link", price: 1100, type: "bracelet", aesthetic: "Everyday Elegant", desc: "Matte brass cuff and oversized box-chain link nodes." },
  { id: "pj-07", name: "Gilded Botanica Statement Studs", price: 1250, type: "earrings", aesthetic: "Soft Feminine", desc: "Oversized sculpted brass flower petals with a liquid-gold finish." },
  { id: "pj-08", name: "K-Street Bold Link Collar Chain", price: 1780, type: "necklace", aesthetic: "Trendy Glam", desc: "Industrial-chic cable chain with heavy link geometry." },
  { id: "pj-09", name: "Aarya Filigree Fusion Choker Set", price: 2450, type: "set", aesthetic: "Indo-Western Muse", desc: "Traditional filigree with raw pearl drops, includes studs and choker." },
  { id: "pj-10", name: "Nouveau Hoop Twist Earrings", price: 990, type: "earrings", aesthetic: "Modern Minimalist", desc: "Twist loops with delicate beads." },
  { id: "pj-11", name: "Sienna Fluid Cascade Bracelet", price: 1350, type: "bracelet", aesthetic: "Everyday Elegant", desc: "Molten brass droplets in a cascading organic chain." }
];

// Lazy-loaded Gemini AI client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("GEMINI_API_KEY is not defined. Falling back to the local premium styling engine.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. AI STYLIST ASSISTANT CHAT ROUTE
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { message, history = [], userAesthetic = "Modern Minimalist" } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful local stylist fallback with rules
      const lowerMessage = message.toLowerCase();
      let matchedIds: string[] = [];
      let reply = "";

      if (lowerMessage.includes("black dress") || lowerMessage.includes("satin dress")) {
        matchedIds = ["pj-02", "pj-05", "pj-10"];
        reply = "For a black dress, a clean Luxe Contemporary accent works marvels. I highly recommend drawing attention with our **Sienna Brass Twist Choker** paired with a stack of **Solitude Ribbed Rings** to frame the look with bold geometry.";
      } else if (lowerMessage.includes("korean") || lowerMessage.includes("minimal")) {
        matchedIds = ["pj-01", "pj-03", "pj-10"];
        reply = "Korean styling excels at delicate whispers. Pair a chic blazer or co-ord with the **Aetheria Pearl Drops** and a classic **Yume Dewdrop Neckpiece** to secure that elegant Pinterest mood.";
      } else if (lowerMessage.includes("saree") || lowerMessage.includes("indo-western") || lowerMessage.includes("festive")) {
        matchedIds = ["pj-04", "pj-09", "pj-07"];
        reply = "Fusion styling is beautiful for sarees! You should make a statement with our modern filigree work: the **Aarya Choker Set** or contemporary enamel **Nairiti Chandbalis** offer rich traditional depth without looking dated.";
      } else if (lowerMessage.includes("price") || lowerMessage.includes("cheap") || lowerMessage.includes("under") || lowerMessage.includes("₹")) {
        matchedIds = ["pj-05", "pj-10", "pj-06"];
        reply = "Styling on a budget is easy with Patikh! Here are our favorite minimal accents under ₹1200: **Solitude Stackable Rings** (₹850), the **Nouveau Hoop Twist** (₹990), or our **Elysian Bracelet** (₹1100).";
      } else {
        matchedIds = ["pj-01", "pj-02", "pj-07"];
        reply = `Hello! As your Patikh Jewels stylist, I think your aesthetic is delightful. Based on your profile emphasizing ${userAesthetic}, I've selected a few pieces that offer stunning versatility across western, co-ord, and ethnic ensembles alike. Try styling with delicate pearls or a polished brass collar.`;
      }

      const products = PATIKH_CATALOG.filter(p => matchedIds.includes(p.id));
      return res.json({
        text: reply + "\n\n*(Note: Currently operating in premium stylist mode. Connect your Gemini API Key in secrets to unleash a fully conversational LLM stylist!)*",
        suggestedProductIds: matchedIds
      });
    }

    // Configure system guidelines for the fashion modeling stylist AI
    const systemInstruction = `
You are the elite "Patikh Jewels Stylist Assistant" for a youthful, aesthetic, Pinterest-friendly jewellery brand focused on:
- Brass jewellery, Korean chic, minimal earrings, statement chokers, stacked rings, and everyday elegant items.
- Perfect for co-ords, sarees, dresses, and Indo-western modern ensembles.
The user's current discovered personality is: "${userAesthetic}". Include personalization when relevant.

Here is the entire available Patikh Jewels shop catalog. YOU MUST ONLY RECOMMEND ITEMS FROM THIS LIST BY THEIR EXACT ID:
${JSON.stringify(PATIKH_CATALOG, null, 2)}

Instructions:
1. Speak in a highly aesthetic, premium, warm, styling-forward, creative fashion-editor voice (NOT like a standard sales bot).
2. Recommend 2 to 3 appropriate items from the Patikh Jewels catalog. Explain exactly HOW to style them with the clothes discussed (neckline, color combos, hairstyles).
3. Do NOT invent new products. Only recommend from the provided real product list.
4. Always return the recommended item IDs in a final line with format: RECOMMENDED_IDS=[pj-01, pj-02] so the UI can highlight them.
    `;

    // Map history to Gemini format
    const formattedHistory = history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Generate output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...formattedHistory, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    const outputText = response.text || "";
    
    // Parse recommended product IDs
    let suggestedProductIds: string[] = [];
    const match = outputText.match(/RECOMMENDED_IDS=\s*\[(.*?)\]/);
    if (match && match[1]) {
      suggestedProductIds = match[1]
        .split(",")
        .map(id => id.replace(/["']/g, "").trim())
        .filter(id => PATIKH_CATALOG.some(p => p.id === id));
    } else {
      // Double check if name mentions are inside the text as backup
      PATIKH_CATALOG.forEach(p => {
        if (outputText.toLowerCase().includes(p.name.toLowerCase()) || outputText.toLowerCase().includes(p.id.toLowerCase())) {
          if (!suggestedProductIds.includes(p.id)) {
            suggestedProductIds.push(p.id);
          }
        }
      });
    }

    // Clean up the bracket notation from the text to keep it high fashion
    const cleanedText = outputText.replace(/RECOMMENDED_IDS=\s*\[.*?\]/, "").trim();

    return res.json({
      text: cleanedText,
      suggestedProductIds
    });

  } catch (error: any) {
    console.error("Gemini assistant error:", error);
    res.status(500).json({ error: "Failed to query aesthetic AI engine: " + error.message });
  }
});

// 2. "STYLE SIMILAR TO" / "OUTFIT TO JEWELLERY" ANALYZER ROUTE
app.post("/api/gemini/analyze-look", async (req, res) => {
  try {
    const { outfitDescription, userAesthetic = "Modern Minimalist", sampleOutfitId } = req.body;
    
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response generator
      let matchedIds: string[] = ["pj-01", "pj-03"];
      let aestheticVibe = "Korean Classic & Neutral Fluidity";
      let summary = "A beautiful look centering clean draperies and soft tones.";
      let stylingTips = [
        "Wear your hair back in a lazy silk scrunchie claw to show off the ear ornaments.",
        "Include brass ribbed rings to elevate the handbag hold.",
        "Add a thin box link chain as layer under collared linens."
      ];
      let colorPalette = ["#EFECE6", "#D7D2C7", "#9E9584", "#1F1E1B"];

      if (outfitDescription?.toLowerCase().includes("saree") || outfitDescription?.toLowerCase().includes("traditional") || sampleOutfitId === "outfit-01") {
        matchedIds = ["pj-04", "pj-09", "pj-07"];
        aestheticVibe = "Modern Indo-Western Grace";
        summary = "Classic fusion draping with clean structural accents that keep the look modern.";
        stylingTips = [
          "Choose deep-set necklines to let the neck choke piece shine independently.",
          "Keep arm decorations minimal—let the large enamel chandbalis frame the face.",
          "Perfect with clean center-parted buns."
        ];
        colorPalette = ["#FEF3C7", "#78350F", "#1A1A1E", "#9A3412"];
      } else if (outfitDescription?.toLowerCase().includes("black") || sampleOutfitId === "outfit-03") {
        matchedIds = ["pj-02", "pj-05", "pj-11"];
        aestheticVibe = "Liquid Metal Glamour";
        summary = "High fashion contrast using statement brushed collar brass hoops.";
        stylingTips = [
          "Rely on the Sienna twist choker as a structural border for the neckline.",
          "Add stacked ribbed rings for high contrast close up captures.",
          "Great with high-heeled modern sandals."
        ];
        colorPalette = ["#121214", "#3D3935", "#928472", "#F3EDE2"];
      }

      return res.json({
        aestheticVibe,
        summary,
        stylingTips,
        colorPalette,
        suggestedProductIds: matchedIds,
        notice: "Operating in fast rule-based styling mode."
      });
    }

    const systemInstruction = `
You are the elite "Patikh Jewels Vision Stylist". You analyze descriptions of outfits, screenshots, or celebrity looks, and compile a beautiful Pinterest-worthy style recipe.
You MUST select 2-3 matching pieces from our real catalog:
${JSON.stringify(PATIKH_CATALOG, null, 2)}

Return a JSON object matching this schema exactly. Do not output markdown backticks or text other than the valid JSON.

JSON Schema to return:
{
  "aestheticVibe": "Name of the fashion vibe (e.g. 'Effortless Korean Linen Chic')",
  "summary": "1-2 sentence gorgeous, fashion-forward visual summary explaining why this works",
  "stylingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "colorPalette": ["Hex1", "Hex2", "Hex3", "Hex4"],
  "suggestedProductIds": ["pj-01"]
}
`;

    const userPrompt = `
Analyze the following style request:
Outfit description: "${outfitDescription || 'A stylish fashion look'}"
User preference: "${userAesthetic}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);

  } catch (error: any) {
    console.error("Aesthetic analyzer error:", error);
    res.status(500).json({ error: "Failed to generate visual style report." });
  }
});

// Serve API check/health
app.get("/api/health", (req, res) => {
  res.json({ status: "alive", brand: "Patikh Jewels", hasKey: !!process.env.GEMINI_API_KEY });
});

// Configure Vite middleware for development vs static files for production
async function runServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Loading Vite in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving compiled production assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Patikh Jewels styling studio is live on http://localhost:${PORT}`);
  });
}

runServer();
