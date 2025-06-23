import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

// Icons
import { Trash2, Plus, Minus } from 'lucide-react';

// Define the type for a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurant: string;
}

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();

  // Placeholder cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'item-1', name: 'Classic Margherita Pizza', price: 14.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407ab8c515a3?w=500&q=80', restaurant: "Tony's Pizzeria" },
    { id: 'item-2', name: 'Cheesy Garlic Bread', price: 6.50, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1627308595186-e6336f35313a?w=500&q=80', restaurant: "Tony's Pizzeria" },
    { id: 'item-3', name: 'Diet Soda', price: 2.75, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=500&q=80', restaurant: "Tony's Pizzeria" },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const removeItem = (id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };
  
  const { subtotal, deliveryFee, taxes, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const fee = sub > 0 ? 5.99 : 0;
    const tax = sub * 0.08; // 8% tax
    const tot = sub + fee + tax;
    return {
      subtotal: sub,
      deliveryFee: fee,
      taxes: tax,
      total: tot,
    };
  }, [cartItems]);

  const handleCheckout = () => {
    // Navigate to the checkout page as defined in App.tsx
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Your Cart</h1>
        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Review Your Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60%]">Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} ea.</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                             </Button>
                             <Input type="number" value={item.quantity} readOnly className="h-8 w-12 text-center" />
                             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                             </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-5 w-5 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Order Summary Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="link" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;