import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import CuisineFilterChip from '@/components/CuisineFilterChip';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// Icons
import { Search } from 'lucide-react';

// Mock Data for Restaurants
const mockRestaurants = [
  {
    id: '1',
    name: 'The Gilded Spoon',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400',
    cuisineTags: ['Italian', 'Pasta', 'Pizza'],
    rating: 4.7,
    reviewCount: 250,
    deliveryTime: 25,
  },
  {
    id: '2',
    name: 'Sizzle & Spice Grill',
    imageUrl: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=400',
    cuisineTags: ['Burgers', 'American', 'Fries'],
    rating: 4.5,
    reviewCount: 180,
    deliveryTime: 20,
  },
  {
    id: '3',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400',
    cuisineTags: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.8,
    reviewCount: 320,
    deliveryTime: 22,
  },
  {
    id: '4',
    name: 'The Noodle House',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-fb69269d9ba1?q=80&w=400',
    cuisineTags: ['Asian', 'Noodles', 'Ramen'],
    rating: 4.6,
    reviewCount: 195,
    deliveryTime: 30,
  },
  {
    id: '5',
    name: 'Green Leaf Eatery',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=400',
    cuisineTags: ['Vegan', 'Salads', 'Healthy'],
    rating: 4.9,
    reviewCount: 150,
    deliveryTime: 15,
  },
  {
    id: '6',
    name: 'The Royal Curry',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400',
    cuisineTags: ['Indian', 'Curry', 'Spicy'],
    rating: 4.7,
    reviewCount: 210,
    deliveryTime: 35,
  },
];

const cuisineFilters = ['Italian', 'Mexican', 'Asian', 'Burgers', 'Vegan', 'Indian'];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine((prev) => (prev === cuisine ? null : cuisine));
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesCuisine = selectedCuisine ? restaurant.cuisineTags.includes(selectedCuisine) : true;
    const matchesSearch = searchTerm ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container py-6 sm:py-8 lg:py-12">
          {/* Hero/Search Section */}
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Find your next favorite meal</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Discover top-rated restaurants and fast-food delivery near you.</p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for a restaurant..."
                className="pl-9 h-11 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </section>

          {/* Filter Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">Or browse by cuisine</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 w-24 rounded-full" />
                ))
              ) : (
                cuisineFilters.map(cuisine => (
                  <CuisineFilterChip
                    key={cuisine}
                    cuisine={cuisine}
                    isSelected={selectedCuisine === cuisine}
                    onSelect={handleCuisineSelect}
                  />
                ))
              )}
            </div>
          </section>

          {/* Restaurant Grid Section */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              {selectedCuisine ? `${selectedCuisine} Restaurants` : "All Restaurants"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
              ) : (
                filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))
              )}
            </div>
            {!isLoading && filteredRestaurants.length === 0 && (
                <div className="col-span-full text-center py-16">
                    <p className="text-muted-foreground">No restaurants found. Try a different search or filter.</p>
                </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;