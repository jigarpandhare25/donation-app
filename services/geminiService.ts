
import { GoogleGenAI, Type } from "@google/genai";
import { FoodAIAnalysis } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeFoodImage = async (base64Image: string): Promise<FoodAIAnalysis | null> => {
  if (!API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: "Analyze this food item for a donation platform. Determine the freshness, estimated shelf life, specific food items detected, safety tips for consumption. Crucially, determine if this is a 'bulk suitable' donation (like a catering tray or buffet leftovers) that would be ideal for an NGO or soup kitchen versus a small individual portion.",
          }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            freshnessScore: { type: Type.NUMBER },
            estimatedShelfLife: { type: Type.STRING },
            safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            detectedFoodItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedUsage: { type: Type.STRING },
            isBulkSuitable: { type: Type.BOOLEAN, description: "True if the quantity looks large/bulk like a catering pan." },
          },
          required: ["freshnessScore", "estimatedShelfLife", "safetyTips", "detectedFoodItems", "suggestedUsage", "isBulkSuitable"]
        },
      },
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};
