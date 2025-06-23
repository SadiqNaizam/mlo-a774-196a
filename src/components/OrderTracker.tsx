import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChefHat, Bike, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the possible statuses for an order
export type OrderStatus = 'confirmed' | 'kitchen' | 'delivery' | 'delivered';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

// Define the stages of the order process
const stages = [
  {
    id: 'confirmed',
    label: 'Order Confirmed',
    icon: (props: React.SVGProps<SVGSVGElement>) => <CheckCircle2 {...props} />,
  },
  {
    id: 'kitchen',
    label: 'In the Kitchen',
    icon: (props: React.SVGProps<SVGSVGElement>) => <ChefHat {...props} />,
  },
  {
    id: 'delivery',
    label: 'Out for Delivery',
    icon: (props: React.SVGProps<SVGSVGElement>) => <Bike {...props} />,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    icon: (props: React.SVGProps<SVGSVGElement>) => <PackageCheck {...props} />,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStatusIndex = stages.findIndex(stage => stage.id === currentStatus);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-200">
             <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStatusIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stage Icons and Labels */}
          {stages.map((stage, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={stage.id} className="z-10 flex flex-col items-center text-center w-24">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 transition-all duration-300',
                    isCompleted ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-300',
                    isCurrent && 'animate-pulse'
                  )}
                >
                  {stage.icon({
                    className: cn(
                      'w-6 h-6 sm:w-8 sm:h-8',
                      isCompleted ? 'text-white' : 'text-gray-500'
                    )
                  })}
                </div>
                <p className={cn(
                  'mt-2 text-xs sm:text-sm font-semibold',
                  isCompleted ? 'text-gray-800' : 'text-gray-500'
                )}>
                  {stage.label}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;