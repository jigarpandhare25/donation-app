
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] opacity-30"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
            Special: Event Catering Waste Rescue
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Feeding Communities, <br/>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">One Event at a Time</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rescuing surplus food from weddings, corporate functions, and restaurants. We bridge the gap between waste and local NGOs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/donate" 
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all"
            >
              Donate Surplus
            </Link>
            <Link 
              to="/ngos" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
            >
              For NGOs
            </Link>
          </div>
        </div>
      </section>

      {/* Target Focus Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Preventing Mass Waste at Events</h2>
            <p className="text-slate-600 leading-relaxed">
              Functions often result in significant quantities of perfectly good, prepared food being discarded. ShareBite uses AI to verify safety and connects you with high-capacity NGOs ready to transport and distribute buffet trays immediately.
            </p>
            <ul className="space-y-4">
              {[
                { icon: 'fa-check', text: 'AI-Verified food safety for cooked meals' },
                { icon: 'fa-check', text: 'Real-time alerts to nearby registered NGOs' },
                { icon: 'fa-check', text: 'Tax donation receipts for businesses & catering companies' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-100 rounded-[3rem] aspect-video overflow-hidden shadow-inner flex items-center justify-center border-8 border-white">
             <i className="fas fa-users-viewfinder text-[8rem] text-slate-200"></i>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 pb-16">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <i className="fas fa-truck-moving text-xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-4">Bulk Logistics</h3>
          <p className="text-slate-600 leading-relaxed">
            Our platform flags large batches specifically for organizations with refrigerated transport.
          </p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <i className="fas fa-shield-heart text-xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-4">NGO Verification</h3>
          <p className="text-slate-600 leading-relaxed">
            Only verified NGOs can request large-scale cooked food to ensure professional handling.
          </p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-4">Instant Match</h3>
          <p className="text-slate-600 leading-relaxed">
            Notifications are sent to nearby soup kitchens as soon as you snap a photo of the surplus.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
