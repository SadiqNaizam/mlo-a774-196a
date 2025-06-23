import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from 'lucide-react';
import { toast } from "sonner";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  // In a real application, a callback like this would update a global cart state.
  // onCartChange?: (itemId: string, newQuantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  const [quantity, setQuantity] = useState(0);
  console.log('MenuItemCard loaded for:', name);

  const handleSetQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && quantity === 0) {
      toast.success(`${name} added to cart!`);
    }
    // Optional: notify on removal
    // if (newQuantity === 0 && quantity > 0) {
    //   toast.info(`${name} removed from cart.`);
    // }
    setQuantity(newQuantity);
    // onCartChange?.(id, newQuantity);
    console.log(`Item ${id} quantity set to ${newQuantity}`);
  };

  const handleIncrement = () => {
    handleSetQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      handleSetQuantity(quantity - 1);
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between">
        <div className="p-4 flex flex-col flex-1">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
          <div className="flex justify-between items-end mt-4 flex-grow">
            <p className="font-semibold text-base">${price.toFixed(2)}</p>
            {quantity === 0 ? (
              <Button onClick={() => handleSetQuantity(1)}>
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleDecrement} className="h-9 w-9">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={handleIncrement} className="h-9 w-9">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        {imageUrl && (
          <div className="w-24 md:w-32 flex-shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover h-full w-full"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MenuItemCard;