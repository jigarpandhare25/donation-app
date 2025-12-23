
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import FindFood from './pages/FindFood';
import NGOConnect from './pages/NGOConnect';
import Impact from './pages/Impact';
import { FoodDonation } from './types';

const App: React.FC = () => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    const mockData: FoodDonation[] = [
      {
        id: '1',
        title: 'Wedding Buffet Leftovers',
        description: 'Large trays of chicken piccata, roasted vegetables, and rice. Perfectly safe, stored in hot-hold trays.',
        category: 'Cooked Meal',
        donorType: 'Event',
        isLargeBatch: true,
        quantity: '4 Large Trays',
        expiryHours: 4,
        location: 'Grand Plaza Hotel',
        imageUrl: 'https://picsum.photos/seed/buffet/800/600',
        status: 'available',
        donorName: 'Catering Team A',
        timestamp: Date.now(),
        aiAnalysis: {
          freshnessScore: 10,
          estimatedShelfLife: "4 hours",
          safetyTips: ["Maintain temp above 60C or chill immediately", "Ideal for NGO pickup"],
          detectedFoodItems: ["Chicken", "Vegetables", "Rice"],
          suggestedUsage: "Serve at community dinner.",
          isBulkSuitable: true
        }
      },
      {
        id: '2',
        title: 'Bakery Surplus Bag',
        description: 'Assorted pastries and bread from end of day.',
        category: 'Bakery',
        donorType: 'Business',
        isLargeBatch: false,
        quantity: '1 Large Bag',
        expiryHours: 24,
        location: 'Downtown Bakery',
        imageUrl: 'https://picsum.photos/seed/bread/800/600',
        status: 'available',
        donorName: 'Marie G.',
        timestamp: Date.now() - 3600000,
        aiAnalysis: {
          freshnessScore: 9,
          estimatedShelfLife: "24 hours",
          safetyTips: ["Keep dry"],
          detectedFoodItems: ["Bread", "Pastries"],
          suggestedUsage: "Good for next day breakfast.",
          isBulkSuitable: false
        }
      }
    ];
    setDonations(mockData);
  }, []);

  const addDonation = (newDonation: FoodDonation) => {
    setDonations(prev => [newDonation, ...prev]);
  };

  const reserveDonation = (id: string) => {
    setDonations(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'reserved' } : d
    ));
    alert("Food reserved! Please contact the donor for pickup details.");
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 pb-12">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate onAddDonation={addDonation} />} />
            <Route path="/find" element={<FindFood donations={donations} onReserve={reserveDonation} />} />
            <Route path="/ngos" element={<NGOConnect />} />
            <Route path="/impact" element={<Impact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
