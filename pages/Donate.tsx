
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodDonation, FoodAIAnalysis } from '../types';
import { analyzeFoodImage } from '../services/geminiService';

interface DonateProps {
  onAddDonation: (donation: FoodDonation) => void;
}

const Donate: React.FC<DonateProps> = ({ onAddDonation }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [aiData, setAiData] = useState<FoodAIAnalysis | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Cooked Meal' as FoodDonation['category'],
    donorType: 'Individual' as FoodDonation['donorType'],
    isLargeBatch: false,
    quantity: '',
    expiryHours: 6,
    location: '',
    donorName: ''
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setImage(base64String);
        
        setAiAnalyzing(true);
        const analysis = await analyzeFoodImage(base64String);
        if (analysis) {
          setAiData(analysis);
          // Auto-toggle large batch if AI detects it's bulk
          if (analysis.isBulkSuitable) {
            setFormData(prev => ({ ...prev, isLargeBatch: true, donorType: 'Event' }));
          }
        }
        setAiAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newDonation: FoodDonation = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: image || undefined,
      status: 'available',
      timestamp: Date.now(),
      aiAnalysis: aiData || undefined
    };

    setTimeout(() => {
      onAddDonation(newDonation);
      setLoading(false);
      navigate('/find');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Rescue Surplus</h1>
        <p className="text-slate-600">Snap a photo of the leftovers. Our AI will handle the details.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-square rounded-[2rem] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
              image ? 'border-transparent' : 'border-slate-200 hover:border-emerald-300 bg-white shadow-inner'
            }`}
          >
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover" alt="Upload" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Change Image</span>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-camera text-2xl text-slate-400"></i>
                </div>
                <p className="text-slate-500 font-medium">Capture Food or Trays</p>
                <p className="text-slate-400 text-xs mt-2 italic">Essential for AI quality check</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          </div>

          {aiAnalyzing && (
            <div className="p-6 bg-white rounded-3xl border border-indigo-100 flex items-center gap-4 animate-pulse shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <i className="fas fa-dna animate-spin"></i>
              </div>
              <div>
                <p className="text-indigo-800 font-bold text-sm">Analyzing for NGO Suitability...</p>
                <p className="text-indigo-600 text-xs italic">Checking bulk volume and freshness</p>
              </div>
            </div>
          )}

          {aiData && !aiAnalyzing && (
            <div className={`p-6 bg-white rounded-3xl border space-y-4 shadow-sm ${aiData.isBulkSuitable ? 'border-indigo-100' : 'border-emerald-100'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-bold ${aiData.isBulkSuitable ? 'text-indigo-800' : 'text-emerald-800'}`}>
                  AI Validation {aiData.isBulkSuitable && "(Bulk)"}
                </h3>
                <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-md tracking-widest ${aiData.isBulkSuitable ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>Verified</span>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className={`flex justify-between text-xs mb-1 font-bold ${aiData.isBulkSuitable ? 'text-indigo-700' : 'text-emerald-700'}`}>
                    <span>Freshness Score</span>
                    <span>{aiData.freshnessScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${aiData.isBulkSuitable ? 'bg-indigo-500' : 'bg-emerald-500'}`} style={{ width: `${aiData.freshnessScore * 10}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Detected Items</p>
                <div className="flex flex-wrap gap-1.5">
                   {aiData.detectedFoodItems.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-700 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-2xl border ${aiData.isBulkSuitable ? 'bg-indigo-50 border-indigo-100' : 'bg-amber-50 border-amber-100'}`}>
                <p className={`text-[10px] font-bold uppercase mb-1 ${aiData.isBulkSuitable ? 'text-indigo-700' : 'text-amber-700'}`}>Safety Advice</p>
                <ul className="text-xs space-y-1">
                  {aiData.safetyTips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <i className={`fas fa-info-circle text-[10px] mt-1 ${aiData.isBulkSuitable ? 'text-indigo-400' : 'text-amber-400'}`}></i>
                      <span className="text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
              {(['Individual', 'Event', 'Business'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, donorType: type }))}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    formData.donorType === type 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <input 
                type="checkbox"
                id="largeBatch"
                checked={formData.isLargeBatch}
                onChange={e => setFormData(prev => ({ ...prev, isLargeBatch: e.target.checked }))}
                className="w-5 h-5 accent-indigo-600 rounded"
              />
              <label htmlFor="largeBatch" className="flex-1 cursor-pointer">
                <span className="block text-sm font-bold text-indigo-900">Large Batch / Bulk Quantity</span>
                <span className="block text-[10px] text-indigo-700 uppercase font-black">Recommended for NGO Pickup</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Donation Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g., Wedding Buffet Surplus" className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Quantity</label>
              <input required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g., 3 Trays, 10kg" className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Expires In (H)</label>
              <input type="number" required value={formData.expiryHours} onChange={e => setFormData({...formData, expiryHours: parseInt(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Pickup Location</label>
            <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Full address or venue name" className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Notes (Allergens, etc.)</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} placeholder="Contains nuts, ready to eat..." className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-xl transition-all ${
              loading ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 hover:-translate-y-1'
            }`}
          >
            {loading ? 'Posting Rescue...' : 'Post Donation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
