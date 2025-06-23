import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, ShoppingCart } from 'lucide-react';

// --- MOCK DATA ---
const restaurantData = {
  name: "The Artisan Eatery",
  imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  rating: 4.8,
  reviewCount: 512,
  cuisine: "Modern European",
  address: "456 Gastronomy Ave, Flavor Town",
  hours: "12:00 PM - 10:00 PM",
};

const menuData = [
  {
    category: "Appetizers",
    items: [
      { id: "app1", name: "Truffle Parmesan Fries", description: "Crispy fries tossed in truffle oil, parmesan, and fresh parsley.", price: 9.50, imageUrl: "https://images.unsplash.com/photo-1598679253544-2c974249141f?q=80&w=1974&auto=format&fit=crop" },
      { id: "app2", name: "Spicy Tuna Crispy Rice", description: "Crispy rice topped with spicy tuna tartar and a slice of jalapeño.", price: 14.00, imageUrl: "https://images.unsplash.com/photo-1625944192994-a43a8532938a?q=80&w=1964&auto=format&fit=crop" },
    ],
  },
  {
    category: "Main Courses",
    items: [
      { id: "main1", name: "Pan-Seared Salmon", description: "Served with asparagus, lemon-dill sauce, and quinoa.", price: 26.00, imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop" },
      { id: "main2", name: "Wagyu Burger", description: "8oz Wagyu beef patty, brioche bun, aged cheddar, and house sauce.", price: 22.50, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop" },
      { id: "main3", name: "Mushroom Risotto", description: "Creamy arborio rice with a medley of wild mushrooms and parmesan cheese.", price: 19.00, imageUrl: "https://images.unsplash.com/photo-1641919508596-03c08558b735?q=80&w=1964&auto=format&fit=crop" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { id: "des1", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center, served with vanilla ice cream.", price: 11.00, imageUrl: "https://images.unsplash.com/photo-1586985289936-f84ae4c639f2?q=80&w=1964&auto=format&fit=crop" },
    ],
  },
];

const mockCartItems = [
    { name: "Wagyu Burger", quantity: 1, price: 22.50 },
    { name: "Truffle Parmesan Fries", quantity: 1, price: 9.50 },
];
const cartSubtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{restaurantData.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Restaurant Header Section */}
          <Card className="overflow-hidden mb-8 shadow-sm">
            <div className="md:flex">
                <div className="md:w-1/3">
                    <img src={restaurantData.imageUrl} alt={restaurantData.name} className="h-48 w-full object-cover md:h-full" />
                </div>
                <div className="p-6 md:w-2/3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurantData.name}</h1>
                    <p className="text-muted-foreground mt-1">{restaurantData.cuisine}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                            <span className="font-semibold">{restaurantData.rating}</span>
                            <span className="text-muted-foreground">({restaurantData.reviewCount} reviews)</span>
                        </div>
                         <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{restaurantData.hours}</span>
                        </div>
                    </div>
                     <p className="text-sm text-muted-foreground mt-2">{restaurantData.address}</p>
                </div>
            </div>
          </Card>

          {/* Menu Tabs Section */}
          <Tabs defaultValue={menuData[0].category} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
              {menuData.map((category) => (
                <TabsTrigger key={category.category} value={category.category}>{category.category}</TabsTrigger>
              ))}
            </TabsList>
            
            {menuData.map((category) => (
              <TabsContent key={category.category} value={category.category}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Cart Sheet Component */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Open Cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Order</SheetTitle>
            <SheetDescription>
              Review your items before proceeding to checkout.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            {mockCartItems.map(item => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
             <Separator />
            <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
            </div>
          </div>
          <SheetFooter>
            <Button asChild className="w-full">
              <Link to="/cart">Go to Cart</Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;