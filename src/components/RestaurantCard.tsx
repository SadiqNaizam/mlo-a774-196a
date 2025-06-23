import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTags: string[];
  rating: number; // e.g., 4.5
  reviewCount: number;
  deliveryTime: number; // in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  imageUrl,
  cuisineTags,
  rating,
  reviewCount,
  deliveryTime,
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    // The entire card is a link to the restaurant's menu page, as per user journey and App.tsx routes.
    <Link to="/restaurant-menu" className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={`Image of ${name}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
          {/* Top section: Name and Rating */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 flex-grow">{name}</h3>
            <div className="flex items-center gap-1.5 text-sm shrink-0 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-xs">({reviewCount})</span>
            </div>
          </div>

          {/* Middle section: Cuisine Tags */}
          <div className="flex flex-wrap gap-1.5 py-1">
            {cuisineTags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Bottom section: Delivery Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1 mt-auto">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime} - {deliveryTime + 10} min</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;