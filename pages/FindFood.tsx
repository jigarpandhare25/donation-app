
import React, { useState } from 'react';
import DonationCard from '../components/DonationCard';
import { FoodDonation } from '../types';

interface FindFoodProps {
  donations: FoodDonation[];
  onReserve: (id: string) => void;
}

const FindFood: React.FC<FindFoodProps> = ({ donations, onReserve }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [scaleFilter, setScaleFilter] = useState<'All' | 'Small' | 'Large'>('All');

  const categories = ['All', 'Cooked Meal', 'Bakery', 'Fruits & Veg', 'Groceries', 'Other'];

  const filteredDonations = donations.filter(d => {
    const matchesCat = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesScale = scaleFilter === 'All' || 
                         (scaleFilter === 'Large' ? d.isLargeBatch : !d.isLargeBatch);
    return matchesCat && matchesScale;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Food Rescues</h1>
          <p className="text-slate-600">Find fresh surplus in your neighborhood.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
           <div className="flex bg-slate-200/50 p-1 rounded-xl mr-2">
            {(['All', 'Small', 'Large'] as const).map(scale => (
              <button
                key={scale}
                onClick={() => setScaleFilter(scale)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  scaleFilter === scale ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {scale === 'Large' ? 'Bulk / Event' : scale === 'Small' ? 'Individual' : 'All Sizes'}
              </button>
            ))}
          </div>
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  categoryFilter === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredDonations.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map(donation => (
            <DonationCard 
              key={donation.id} 
              donation={donation} 
              onReserve={onReserve} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <i className="fas fa-magnifying-glass text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No matching rescues</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Try broadening your filters or check back in a few hours.</p>
          <button 
            onClick={() => { setCategoryFilter('All'); setScaleFilter('All'); }}
            className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FindFood;
