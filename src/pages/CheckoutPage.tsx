import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Home } from 'lucide-react';

// Zod schema for form validation
const checkoutFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  zip: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
  paymentMethod: z.enum(['credit-card', 'paypal'], { required_error: "You need to select a payment method." }),
  promoCode: z.string().optional(),
});

// Placeholder data for the order summary
const orderItems = [
  { id: '1', name: 'Margherita Pizza', price: 14.99, quantity: 1 },
  { id: '2', name: 'Garlic Bread', price: 5.49, quantity: 2 },
  { id: '3', name: 'Coke', price: 2.00, quantity: 2 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      zip: '',
      paymentMethod: 'credit-card',
      promoCode: '',
    },
  });

  const onSubmit = (data: z.infer<typeof checkoutFormSchema>) => {
    console.log('Order submitted:', data);
    toast.success('Order Placed Successfully!', {
      description: 'We are preparing your food. You can track its progress now.',
      duration: 5000,
    });
    // Redirect to the order tracking page as per the user journey
    navigate('/order-tracking');
  };

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = 5.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Checkout</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-2">
                <Accordion type="multiple" defaultValue={['address', 'payment']} className="w-full">
                  <AccordionItem value="address">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5"/> Delivery Address
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Pizza Lane" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Foodville" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="zip" render={({ field }) => (
                          <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment">
                    <AccordionTrigger className="text-lg font-semibold">
                       <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5"/> Payment Method
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="credit-card" /></FormControl>
                                <FormLabel className="font-normal">Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                       <div className="flex items-center gap-2">
                          <Input id="promo" placeholder="Enter Promo Code" className="flex-grow"/>
                          <Button type="button" variant="outline">Apply</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      {orderItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>
                    <Separator />
                     <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" size="lg">Place Order</Button>
                  </CardFooter>
                </Card>
              </div>

            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;