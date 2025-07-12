import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useCartStore } from '~/lib/stores/cart';
import { useAuthStore } from '~/lib/stores/auth';
import { useOrdersStore, createOrderFromCart } from '~/lib/stores/orders';
import type { Address, PaymentMethod, OrderItem } from '~/lib/mock_data/orders';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function CheckoutScreen() {
  const { t } = useLanguage();
  const { items, totalPrice, totalDiscountedPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrdersStore();
  
  const [currentStep, setCurrentStep] = useState<'address' | 'payment' | 'review'>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Address form state
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Vietnam',
    phone: '',
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit_card',
    last4: '',
    brand: '',
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handlePlaceOrder = async () => {
    if (!user) return;
    
    setIsProcessing(true);
    
    try {
      // Convert cart items to order items
      const orderItems: OrderItem[] = items.map(item => ({
        productId: item.id,
        title: item.title,
        price: item.price * (1 - item.discountPercentage / 100),
        quantity: item.quantity,
        total: item.price * (1 - item.discountPercentage / 100) * item.quantity,
        thumbnail: item.thumbnail,
      }));

      // Calculate discount
      const discount = totalPrice - totalDiscountedPrice;

      // Create order data
      const orderData = createOrderFromCart({
        userId: user.id,
        items: orderItems,
        subtotal: totalPrice,
        discount: discount,
        shippingAddress: shippingAddress as Address,
        paymentMethod: paymentMethod,
      });

      // Add order to store
      addOrder(orderData);

      // Simulate order processing
      setTimeout(() => {
        // Clear cart and navigate to confirmation
        clearCart();
        router.replace('/(ordering)/order-success');
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Order creation failed:', error);
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <View className='flex-row justify-between mb-6'>
      {['address', 'payment', 'review'].map((step, index) => (
        <View key={step} className='flex-1 items-center'>
          <View 
            className={`w-8 h-8 rounded-full items-center justify-center ${
              currentStep === step ? 'bg-primary' : 
              ['address', 'payment', 'review'].indexOf(currentStep) > index ? 'bg-primary' : 'bg-muted border border-border'
            }`}
          >
            <Text className={`text-sm font-medium ${
              currentStep === step || ['address', 'payment', 'review'].indexOf(currentStep) > index 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground'
            }`}>
              {index + 1}
            </Text>
          </View>
          <Text className={`text-xs mt-1 ${
            currentStep === step ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {step === 'address' ? 'Address' : step === 'payment' ? 'Payment' : 'Review'}
          </Text>
          {index < 2 && (
            <View className={`absolute top-4 left-12 w-16 h-0.5 ${
              ['address', 'payment', 'review'].indexOf(currentStep) > index ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </View>
      ))}
    </View>
  );

  const renderAddressStep = () => (
    <View className='gap-4'>
      <Text className='text-lg font-semibold mb-2'>Shipping Address</Text>
      
      <View className='flex-row gap-3'>
        <Input
          placeholder='First Name'
          value={shippingAddress.firstName}
          onChangeText={(text) => setShippingAddress({...shippingAddress, firstName: text})}
          className='flex-1'
        />
        <Input
          placeholder='Last Name'
          value={shippingAddress.lastName}
          onChangeText={(text) => setShippingAddress({...shippingAddress, lastName: text})}
          className='flex-1'
        />
      </View>

      <Input
        placeholder='Address'
        value={shippingAddress.address}
        onChangeText={(text) => setShippingAddress({...shippingAddress, address: text})}
      />

      <View className='flex-row gap-3'>
        <Input
          placeholder='City'
          value={shippingAddress.city}
          onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
          className='flex-1'
        />
        <Input
          placeholder='State'
          value={shippingAddress.state}
          onChangeText={(text) => setShippingAddress({...shippingAddress, state: text})}
          className='flex-1'
        />
      </View>

      <View className='flex-row gap-3'>
        <Input
          placeholder='Postal Code'
          value={shippingAddress.postalCode}
          onChangeText={(text) => setShippingAddress({...shippingAddress, postalCode: text})}
          className='flex-1'
        />
        <Input
          placeholder='Phone'
          value={shippingAddress.phone}
          onChangeText={(text) => setShippingAddress({...shippingAddress, phone: text})}
          className='flex-1'
        />
      </View>

      <Button 
        onPress={() => setCurrentStep('payment')}
        className='w-full h-12 mt-4'
        disabled={!shippingAddress.firstName || !shippingAddress.address || !shippingAddress.city}
      >
        <Text className='font-medium'>Continue to Payment</Text>
      </Button>
    </View>
  );

  const renderPaymentStep = () => (
    <View className='gap-4'>
      <Text className='text-lg font-semibold mb-2'>Payment Method</Text>

      {/* Payment Type Selection */}
      <View className='gap-3'>
        {[
          { type: 'credit_card', label: 'Credit Card' },
          { type: 'debit_card', label: 'Debit Card' },
          { type: 'paypal', label: 'PayPal' },
        ].map((method) => (
          <Button
            key={method.type}
            variant={paymentMethod.type === method.type ? 'default' : 'outline'}
            onPress={() => setPaymentMethod({...paymentMethod, type: method.type as any})}
            className='w-full h-12'
          >
            <Text className='font-medium'>{method.label}</Text>
          </Button>
        ))}
      </View>

      {/* Card Details (for card payments) */}
      {(paymentMethod.type === 'credit_card' || paymentMethod.type === 'debit_card') && (
        <View className='gap-4 mt-4'>
          <Input
            placeholder='Card Number'
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails({...cardDetails, number: text})}
            keyboardType='numeric'
          />
          
          <Input
            placeholder='Cardholder Name'
            value={cardDetails.name}
            onChangeText={(text) => setCardDetails({...cardDetails, name: text})}
          />

          <View className='flex-row gap-3'>
            <Input
              placeholder='MM/YY'
              value={cardDetails.expiry}
              onChangeText={(text) => setCardDetails({...cardDetails, expiry: text})}
              className='flex-1'
              keyboardType='numeric'
            />
            <Input
              placeholder='CVV'
              value={cardDetails.cvv}
              onChangeText={(text) => setCardDetails({...cardDetails, cvv: text})}
              className='flex-1'
              keyboardType='numeric'
              secureTextEntry
            />
          </View>
        </View>
      )}

      <View className='flex-row gap-3 mt-4'>
        <Button 
          variant='outline'
          onPress={() => setCurrentStep('address')}
          className='flex-1 h-12'
        >
          <Text className='font-medium'>Back</Text>
        </Button>
        <Button 
          onPress={() => setCurrentStep('review')}
          className='flex-1 h-12'
        >
          <Text className='font-medium'>Review Order</Text>
        </Button>
      </View>
    </View>
  );

  const renderReviewStep = () => {
    const shipping = 25; // Mock shipping cost
    const tax = totalDiscountedPrice * 0.1; // 10% tax
    const finalTotal = totalDiscountedPrice + shipping + tax;

    return (
      <View className='gap-4'>
        <Text className='text-lg font-semibold mb-2'>Order Review</Text>

        {/* Order Items */}
        <View className='border border-border rounded p-4'>
          <Text className='font-medium mb-3'>Items ({items.length})</Text>
          {items.slice(0, 3).map((item) => (
            <View key={item.id} className='flex-row items-center mb-3 last:mb-0'>
              <View className='w-12 h-12 bg-muted rounded mr-3' />
              <View className='flex-1'>
                <Text className='text-sm font-medium' numberOfLines={1}>{item.title}</Text>
                <Text className='text-xs text-muted-foreground'>Qty: {item.quantity}</Text>
              </View>
              <Text className='font-medium'>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          {items.length > 3 && (
            <Text className='text-sm text-muted-foreground text-center'>
              and {items.length - 3} more items...
            </Text>
          )}
        </View>

        {/* Address Summary */}
        <View className='border border-border rounded p-4'>
          <Text className='font-medium mb-2'>Shipping Address</Text>
          <Text className='text-sm text-muted-foreground'>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </Text>
          <Text className='text-sm text-muted-foreground'>
            {shippingAddress.address}
          </Text>
          <Text className='text-sm text-muted-foreground'>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
          </Text>
        </View>

        {/* Payment Summary */}
        <View className='border border-border rounded p-4'>
          <Text className='font-medium mb-2'>Payment Method</Text>
          <Text className='text-sm text-muted-foreground capitalize'>
            {paymentMethod.type.replace('_', ' ')}
          </Text>
        </View>

        {/* Order Total */}
        <View className='border border-border rounded p-4'>
          <Text className='font-medium mb-3'>Order Total</Text>
          <View className='gap-2'>
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Subtotal</Text>
              <Text>${totalDiscountedPrice.toFixed(2)}</Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Shipping</Text>
              <Text>${shipping.toFixed(2)}</Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Tax</Text>
              <Text>${tax.toFixed(2)}</Text>
            </View>
            <View className='border-t border-border pt-2'>
              <View className='flex-row justify-between'>
                <Text className='font-semibold text-lg'>Total</Text>
                <Text className='font-semibold text-lg'>${finalTotal.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='flex-row gap-3 mt-4'>
          <Button 
            variant='outline'
            onPress={() => setCurrentStep('payment')}
            className='flex-1 h-12'
          >
            <Text className='font-medium'>Back</Text>
          </Button>
          <Button 
            onPress={handlePlaceOrder}
            className='flex-1 h-12'
            disabled={isProcessing}
          >
            <Text className='font-medium'>
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  if (items.length === 0) {
    return (
      <View className='flex-1 bg-background'>
        <View className='px-4 py-4 border-b border-border'>
          <View className='flex-row items-center'>
            <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>Checkout</Text>
          </View>
        </View>
        <View className='flex-1 items-center justify-center px-8'>
          <Text className='text-xl font-semibold mb-3'>Cart is Empty</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            Add some items to your cart before checking out
          </Text>
          <Button onPress={() => router.push('/home')} className='w-full h-12'>
            <Text className='font-medium'>Continue Shopping</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <View className='flex-row items-center'>
          <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
            <Text className='text-lg'>←</Text>
          </Button>
          <Text className='text-xl font-semibold'>Checkout</Text>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='px-4 py-6'>
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          {currentStep === 'address' && renderAddressStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'review' && renderReviewStep()}
        </View>
      </ScrollView>
    </View>
  );
}