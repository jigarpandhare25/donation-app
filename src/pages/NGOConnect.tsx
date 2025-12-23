
import React from 'react';
import { NGO } from '../types';

const NGOConnect: React.FC = () => {
  const ngos: NGO[] = [
    {
      id: 'n1',
      name: 'City Harvest Network',
      mission: 'Reducing hunger by rescuing surplus food from catering events and restaurants.',
      needs: ['Cooked Meals', 'Bulk Groceries'],
      location: 'Downtown Logistics Center',
      contact: '+1 800-RESCUE',
      verified: true
    },
    {
      id: 'n2',
      name: 'Second Chance Kitchen',
      mission: 'Transforming food waste into nutritious meals for low-income families.',
      needs: ['Vegetables', 'Fruits', 'Bakery Items'],
      location: 'Northside Community Hub',
      contact: 'hello@2ndchance.org',
      verified: true
    },
    {
      id: 'n3',
      name: 'The Graceful Table',
      mission: 'Serving nightly dinners to homeless individuals in the metropolitan area.',
      needs: ['Warm Meals', 'Water Bottles'],
      location: 'Park Lane Outreach',
      contact: 'contact@graceful.org',
      verified: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">NGO Partners</h1>
        <p className="text-slate-600 max-w-2xl">Connect directly with organizations that have the capacity to handle large event-scale food rescues.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ngos.map(ngo => (
          <div key={ngo.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {ngo.verified && (
              <div className="absolute top-0 right-0 p-4">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center" title="Verified NGO">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
            )}
            
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
              <i className="fas fa-building-ngo text-3xl"></i>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3">{ngo.name}</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3">{ngo.mission}</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Accepts</p>
                <div className="flex flex-wrap gap-2">
                  {ngo.needs.map((need, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">{need}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <i className="fas fa-map-marker-alt text-indigo-500"></i>
                <span>{ngo.location}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-phone"></i>
              Contact for Pickup
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Are you an NGO?</h2>
          <p className="text-indigo-100 mb-8">Register your organization to receive instant alerts when large-scale food rescues are posted near you.</p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors">
            Register Organization
          </button>
        </div>
        <div className="absolute -bottom-12 -right-12 text-[15rem] text-indigo-500 opacity-20">
          <i className="fas fa-hand-holding-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default NGOConnect;
