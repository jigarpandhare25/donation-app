
import React from 'react';
import { FoodDonation } from '../types';

interface DonationCardProps {
  donation: FoodDonation;
  onReserve: (id: string) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation, onReserve }) => {
  const isAvailable = donation.status === 'available';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {donation.imageUrl ? (
          <img 
            src={donation.imageUrl} 
            alt={donation.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <i className="fas fa-image text-4xl"></i>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {donation.isLargeBatch && (
            <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-lg">
              <i className="fas fa-truck-ramp-box mr-1"></i> Large Batch
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            donation.category === 'Cooked Meal' ? 'bg-orange-100 text-orange-700' :
            donation.category === 'Bakery' ? 'bg-amber-100 text-amber-700' :
            donation.category === 'Fruits & Veg' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {donation.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{donation.title}</h3>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{donation.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-2">
             <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
              <i className="fas fa-user text-emerald-500"></i>
              <span className="truncate">{donation.donorType}</span>
            </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
              <i className="fas fa-box text-emerald-500"></i>
              <span className="truncate">{donation.quantity}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
            <i className="fas fa-map-marker-alt text-emerald-500"></i>
            <span className="truncate">{donation.location}</span>
          </div>

          {donation.aiAnalysis && (
            <div className={`p-2 rounded-lg border ${donation.aiAnalysis.isBulkSuitable ? 'bg-indigo-50 border-indigo-100' : 'bg-emerald-50 border-emerald-100'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-bold uppercase ${donation.aiAnalysis.isBulkSuitable ? 'text-indigo-700' : 'text-emerald-700'}`}>
                  {donation.aiAnalysis.isBulkSuitable ? 'Ideal for NGOs' : 'Individual Portions'}
                </span>
                <span className={`text-[9px] font-bold ${donation.aiAnalysis.isBulkSuitable ? 'text-indigo-700' : 'text-emerald-700'}`}>
                  {donation.aiAnalysis.freshnessScore}/10 Fresh
                </span>
              </div>
              <div className="w-full bg-white/50 h-1 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${donation.aiAnalysis.isBulkSuitable ? 'bg-indigo-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${donation.aiAnalysis.freshnessScore * 10}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={() => onReserve(donation.id)}
            disabled={!isAvailable}
            className={`w-full py-2.5 rounded-xl font-bold transition-all ${
              isAvailable 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isAvailable ? (donation.isLargeBatch ? 'Request Bulk Pickup' : 'Claim Food') : 'Already Reserved'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
