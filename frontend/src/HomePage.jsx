import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Hotel, Phone, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hotels } from '@/data/hotel-data';

const HomePage = () => {
  const [search, setSearch] = useState('');

  const filteredHotels = hotels.filter(
    (hotel) => hotel.isValid && hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to convert hotel name into a URL-friendly slug
  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="container mx-auto p-6 transition-all duration-300 bg-white text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Hotels</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search hotels..."
          className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-gray-500">Verified Hotel</span>
                  </div>
                </div>
                <Hotel className="h-6 w-6 text-gray-600" />
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{hotel.phoneNo}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{hotel.location}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Link to={`/${toSlug(hotel.name)}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
