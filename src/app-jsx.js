import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Filter, X } from 'lucide-react';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupermarket, setSelectedSupermarket] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const naBeers = [
    { name: 'Heineken 0.0', abv: '0.0%', style: 'Lager' },
    { name: 'Brewdog Nanny State', abv: '0.5%', style: 'Pale Ale' },
    { name: 'Peroni Libera', abv: '0.0%', style: 'Lager' },
    { name: 'Ghost Ship 0.5%', abv: '0.5%', style: 'Pale Ale' },
    { name: 'Lucky Saint', abv: '0.5%', style: 'Lager' },
    { name: 'Erdinger Alkoholfrei', abv: '0.5%', style: 'Wheat Beer' },
    { name: 'Becks Blue', abv: '0.05%', style: 'Lager' },
    { name: 'Bavaria 0.0%', abv: '0.0%', style: 'Lager' },
    { name: 'Infinite Session IPA', abv: '0.5%', style: 'IPA' },
    { name: 'Punk AF', abv: '0.5%', style: 'IPA' },
  ];

  const supermarkets = [
    { id: 1, name: 'Tesco Extra', chain: 'Tesco', city: 'Edinburgh', postcode: 'EH1 3EG', lat: 55.9533, lng: -3.1883, beers: naBeers.slice(0, 8) },
    { id: 2, name: 'Sainsburys', chain: 'Sainsburys', city: 'Edinburgh', postcode: 'EH2 2BY', lat: 55.9520, lng: -3.1950, beers: naBeers.slice(0, 7) },
    { id: 3, name: 'Asda Superstore', chain: 'Asda', city: 'Glasgow', postcode: 'G1 3AW', lat: 55.8642, lng: -4.2518, beers: naBeers.slice(0, 9) },
    { id: 4, name: 'Morrisons', chain: 'Morrisons', city: 'Glasgow', postcode: 'G2 4JR', lat: 55.8605, lng: -4.2590, beers: naBeers.slice(1, 8) },
    { id: 5, name: 'Tesco Metro', chain: 'Tesco', city: 'Aberdeen', postcode: 'AB10 1XP', lat: 57.1497, lng: -2.0943, beers: naBeers.slice(0, 6) },
    { id: 6, name: 'Waitrose', chain: 'Waitrose', city: 'Edinburgh', postcode: 'EH12 5HD', lat: 55.9350, lng: -3.2700, beers: naBeers.slice(2, 10) },
    { id: 7, name: 'Lidl', chain: 'Lidl', city: 'Dundee', postcode: 'DD1 4HN', lat: 56.4620, lng: -2.9707, beers: naBeers.slice(0, 5) },
    { id: 8, name: 'Aldi', chain: 'Aldi', city: 'Dundee', postcode: 'DD2 3PT', lat: 56.4698, lng: -2.9930, beers: naBeers.slice(0, 4) },
    { id: 9, name: 'Co-op Food', chain: 'Co-op', city: 'Inverness', postcode: 'IV1 1PX', lat: 57.4778, lng: -4.2247, beers: naBeers.slice(0, 6) },
    { id: 10, name: 'M&S Food Hall', chain: 'M&S', city: 'Edinburgh', postcode: 'EH1 1BQ', lat: 55.9533, lng: -3.1903, beers: naBeers.slice(3, 10) },
    { id: 11, name: 'Tesco Superstore', chain: 'Tesco', city: 'Stirling', postcode: 'FK8 2EA', lat: 56.1165, lng: -3.9369, beers: naBeers.slice(0, 7) },
    { id: 12, name: 'Asda', chain: 'Asda', city: 'Perth', postcode: 'PH1 3AF', lat: 56.3959, lng: -3.4366, beers: naBeers.slice(0, 8) },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: 55.9533, lng: -3.1883 });
        }
      );
    } else {
      setUserLocation({ lat: 55.9533, lng: -3.1883 });
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const filteredStores = supermarkets
    .filter(store => 
      (selectedSupermarket === 'all' || store.chain === selectedSupermarket) &&
      (searchTerm === '' || 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.beers.some(beer => beer.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .map(store => ({
      ...store,
      distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, store.lat, store.lng) : 0
    }))
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'beers') return b.beers.length - a.beers.length;
      return a.name.localeCompare(b.name);
    });

  const chains = ['all', ...new Set(supermarkets.map(s => s.chain))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">🍺 Scotland NA Beer Finder</h1>
          <p className="text-gray-600">Discover non-alcoholic beers at supermarkets near you</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search beers or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedSupermarket}
              onChange={(e) => setSelectedSupermarket(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              {chains.map(chain => (
                <option key={chain} value={chain}>
                  {chain === 'all' ? 'All Supermarkets' : chain}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="beers">Sort by Selection</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-600" />
              Store Locations
            </h2>
            <div className="relative w-full h-[500px] bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  <path d="M 400 50 L 450 100 L 480 150 L 500 200 L 490 280 L 470 350 L 440 420 L 400 480 L 360 500 L 320 480 L 280 440 L 260 380 L 250 320 L 260 260 L 280 200 L 320 140 L 360 90 Z" 
                    fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" />
                  
                  {filteredStores.map((store) => {
                    const x = 250 + (store.lng + 4.5) * 80;
                    const y = 500 - (store.lat - 55.5) * 200;
                    return (
                      <g key={store.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r={selectedStore?.id === store.id ? 12 : 8}
                          fill={selectedStore?.id === store.id ? "#f59e0b" : "#ef4444"}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:r-10 transition-all"
                          onClick={() => setSelectedStore(store)}
                        />
                        {selectedStore?.id === store.id && (
                          <text x={x} y={y - 20} textAnchor="middle" className="text-xs font-bold fill-gray-800">
                            {store.chain}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  
                  {userLocation && (
                    <circle
                      cx={250 + (userLocation.lng + 4.5) * 80}
                      cy={500 - (userLocation.lat - 55.5) * 200}
                      r="10"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="3"
                    />
                  )}
                </svg>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm">Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm">Supermarkets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {filteredStores.length} Stores Found
            </h2>
            
            <div className="space-y-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedStore?.id === store.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{store.name}</h3>
                      <p className="text-gray-600 text-sm">{store.city}, {store.postcode}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full">
                      <Navigation className="w-4 h-4 text-amber-700" />
                      <span className="font-semibold text-amber-700">{store.distance} mi</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {store.chain}
                    </span>
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {store.beers.length} NA beers
                    </span>
                  </div>

                  {selectedStore?.id === store.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="font-semibold text-sm text-gray-700 mb-2">Available Beers:</p>
                      <div className="grid grid-cols-1 gap-1">
                        {store.beers.map((beer, idx) => (
                          <div key={idx} className="text-sm text-gray-600 flex justify-between">
                            <span>• {beer.name}</span>
                            <span className="text-xs text-gray-500">{beer.abv} | {beer.style}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-100 border border-amber-300 rounded-xl p-4 text-sm text-amber-900">
          <p className="font-semibold mb-1">ℹ️ About this data</p>
          <p>This is a demonstration app showing sample data. Availability may vary by store and season. Please contact stores directly to confirm stock. Beers labeled 0.5% ABV may contain trace amounts of alcohol.</p>
        </div>
      </div>
    </div>
  );
};

export default App;