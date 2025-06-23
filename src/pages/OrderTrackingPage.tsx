import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker, { OrderStatus } from '@/components/OrderTracker';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const orderStatuses: OrderStatus[] = ['confirmed', 'kitchen', 'delivery', 'delivered'];

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    // Simulate the order progressing through the stages
    if (statusIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setStatusIndex(prevIndex => prevIndex + 1);
      }, 5000); // Move to the next stage every 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [statusIndex]);

  const currentStatus = orderStatuses[statusIndex];
  const progressValue = (statusIndex / (orderStatuses.length - 1)) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              {currentStatus === 'delivered' ? "Your order has arrived!" : "Your order is on its way!"}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Order ID: #FD-12345XYZ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6 sm:p-8">
            {/* Main Order Tracker Component */}
            <OrderTracker currentStatus={currentStatus} />

            {/* Estimated Delivery and Progress Bar */}
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">
                Estimated Arrival: <span className="text-primary">8:30 PM - 8:45 PM</span>
              </p>
              <Progress value={progressValue} className="w-full h-2" />
            </div>

            <Separator />

            {/* Map Placeholder */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">Live Driver Location</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://placehold.co/800x450/e2e8f0/4a5568?text=Live+Map+View" 
                  alt="A placeholder map showing the delivery driver's location" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-900/50 p-6">
            <p className="text-sm text-muted-foreground">Having trouble? Contact support.</p>
            <div className="flex gap-2">
              <Button variant="outline">Help Center</Button>
              <Button asChild>
                <Link to="/">Order Again</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;