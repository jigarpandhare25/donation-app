
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const Impact: React.FC = () => {
  const data = [
    { date: 'Mon', meals: 12, waste: 4 },
    { date: 'Tue', meals: 19, waste: 6 },
    { date: 'Wed', meals: 15, waste: 5 },
    { date: 'Thu', meals: 28, waste: 9 },
    { date: 'Fri', meals: 35, waste: 12 },
    { date: 'Sat', meals: 42, waste: 15 },
    { date: 'Sun', meals: 38, waste: 13 },
  ];

  const categoryData = [
    { name: 'Bakery', value: 45, color: '#f59e0b' },
    { name: 'Meals', value: 30, color: '#10b981' },
    { name: 'Produce', value: 20, color: '#3b82f6' },
    { name: 'Other', value: 5, color: '#6366f1' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Growing Impact</h1>
        <p className="text-slate-600">Every donation counts. Here is how our community is making a difference.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Meals Saved', value: '1,284', icon: 'fa-utensils', color: 'bg-emerald-100 text-emerald-600' },
          { label: 'Waste Prevented', value: '450kg', icon: 'fa-trash-arrow-up', color: 'bg-blue-100 text-blue-600' },
          { label: 'CO2 Offset', value: '1.2 Tons', icon: 'fa-cloud', color: 'bg-purple-100 text-purple-600' },
          { label: 'Active Rescuers', value: '342', icon: 'fa-users', color: 'bg-orange-100 text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Weekly Meals Rescued</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="meals" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorMeals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Rescue by Type</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 600, fontSize: 13}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-slate-400 font-medium italic">* Bakery items account for the highest volume of daily waste in urban areas.</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-600 rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Want to offset your CO2 footprint?</h2>
          <p className="text-emerald-50 opacity-90 leading-relaxed">
            Reducing food waste is one of the top 3 solutions for climate change. Every meal you share prevents methane emissions from landfills.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-colors">
            Share Impact Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impact;
