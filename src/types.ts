
export interface FoodDonation {
  id: string;
  title: string;
  description: string;
  category: 'Cooked Meal' | 'Groceries' | 'Bakery' | 'Fruits & Veg' | 'Other';
  donorType: 'Individual' | 'Event' | 'Business';
  isLargeBatch: boolean; // Flag for NGO-suitable quantities
  quantity: string;
  expiryHours: number;
  location: string;
  imageUrl?: string;
  status: 'available' | 'reserved' | 'completed';
  donorName: string;
  timestamp: number;
  aiAnalysis?: FoodAIAnalysis;
}

export interface FoodAIAnalysis {
  freshnessScore: number;
  estimatedShelfLife: string;
  safetyTips: string[];
  detectedFoodItems: string[];
  suggestedUsage: string;
  isBulkSuitable: boolean; // AI's assessment if it's good for mass distribution
}

export interface NGO {
  id: string;
  name: string;
  mission: string;
  needs: string[];
  location: string;
  contact: string;
  verified: boolean;
}
