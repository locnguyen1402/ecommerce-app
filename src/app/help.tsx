import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer: 'You can track your order by going to the Orders tab in your account. Each order will show its current status and tracking information.',
    category: 'Orders',
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All payments are processed securely.',
    category: 'Payment',
  },
  {
    id: '3',
    question: 'How do I return an item?',
    answer: 'You can initiate a return within 30 days of purchase. Go to your order history and select "Return Item" next to the product.',
    category: 'Returns',
  },
  {
    id: '4',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping is available on orders over $50.',
    category: 'Shipping',
  },
  {
    id: '5',
    question: 'How do I change my password?',
    answer: 'Go to Profile Settings → Account Settings → Change Password. You\'ll need to enter your current password and new password.',
    category: 'Account',
  },
  {
    id: '6',
    question: 'Can I modify my order after placing it?',
    answer: 'Orders can be modified within 1 hour of placement. After that, you\'ll need to cancel and reorder or contact customer support.',
    category: 'Orders',
  },
];

export default function HelpScreen() {
  const { t } = useLanguage();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Orders', 'Payment', 'Returns', 'Shipping', 'Account'];

  const filteredFAQ = FAQ_DATA.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderFAQItem = (item: FAQItem) => (
    <View key={item.id} className='border border-border rounded mb-3'>
      <Button
        variant='ghost'
        className='w-full justify-between items-start p-4'
        onPress={() => toggleFAQ(item.id)}
      >
        <View className='flex-1 mr-4'>
          <Text className='font-medium text-left'>{item.question}</Text>
          <Text className='text-xs text-muted-foreground mt-1'>{item.category}</Text>
        </View>
        <Text className='text-muted-foreground'>
          {expandedFAQ === item.id ? '−' : '+'}
        </Text>
      </Button>
      
      {expandedFAQ === item.id && (
        <View className='px-4 pb-4 border-t border-border'>
          <Text className='text-muted-foreground leading-6 mt-3'>
            {item.answer}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView className='flex-1 bg-background px-4 py-6'>
      <Text className='text-2xl font-semibold mb-6'>Help & Support</Text>

      {/* Quick Actions */}
      <View className='mb-8'>
        <Text className='text-lg font-semibold mb-4'>Quick Actions</Text>
        
        <View className='grid grid-cols-2 gap-3'>
          <Button 
            variant='outline' 
            className='flex-1 h-16 justify-center'
            onPress={() => {
              // TODO: Implement live chat
              console.log('Open live chat');
            }}
          >
            <Text className='text-center text-sm'>💬 Live Chat</Text>
          </Button>
          
          <Button 
            variant='outline' 
            className='flex-1 h-16 justify-center'
            onPress={() => {
              // TODO: Implement call support
              console.log('Call support');
            }}
          >
            <Text className='text-center text-sm'>📞 Call Support</Text>
          </Button>
        </View>

        <View className='grid grid-cols-2 gap-3 mt-3'>
          <Button 
            variant='outline' 
            className='flex-1 h-16 justify-center'
            onPress={() => {
              // TODO: Implement email support
              console.log('Email support');
            }}
          >
            <Text className='text-center text-sm'>📧 Email Support</Text>
          </Button>
          
          <Button 
            variant='outline' 
            className='flex-1 h-16 justify-center'
            onPress={() => router.push('/home/orders')}
          >
            <Text className='text-center text-sm'>📋 Track Orders</Text>
          </Button>
        </View>
      </View>

      {/* FAQ Section */}
      <View className='mb-8'>
        <Text className='text-lg font-semibold mb-4'>Frequently Asked Questions</Text>
        
        {/* Search */}
        <Input
          placeholder='Search FAQs...'
          value={searchQuery}
          onChangeText={setSearchQuery}
          className='mb-4'
        />

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-4'>
          <View className='flex-row space-x-2'>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size='sm'
                onPress={() => setSelectedCategory(category)}
                className='mr-2'
              >
                <Text className='text-xs'>{category}</Text>
              </Button>
            ))}
          </View>
        </ScrollView>

        {/* FAQ Items */}
        {filteredFAQ.length === 0 ? (
          <View className='py-8 items-center'>
            <Text className='text-muted-foreground'>No FAQs found matching your search.</Text>
          </View>
        ) : (
          <View>
            {filteredFAQ.map(renderFAQItem)}
          </View>
        )}
      </View>

      {/* Contact Information */}
      <View className='mt-8 pt-6 border-t border-border'>
        <Text className='text-lg font-semibold mb-4'>Contact Information</Text>
        
        <View className='space-y-3'>
          <View className='flex-row items-center'>
            <Text className='w-20 text-muted-foreground'>📧 Email:</Text>
            <Text>support@ecommerce.com</Text>
          </View>
          
          <View className='flex-row items-center'>
            <Text className='w-20 text-muted-foreground'>📞 Phone:</Text>
            <Text>1-800-SUPPORT</Text>
          </View>
          
          <View className='flex-row items-center'>
            <Text className='w-20 text-muted-foreground'>🕒 Hours:</Text>
            <Text>Mon-Fri 9AM-6PM EST</Text>
          </View>
        </View>
      </View>

      {/* Still Need Help */}
      <View className='mt-8 pt-6 border-t border-border'>
        <Text className='text-lg font-semibold mb-4'>Still Need Help?</Text>
        <Text className='text-muted-foreground mb-4'>
          Can't find what you're looking for? Contact our support team directly.
        </Text>
        
        <Button
          className='w-full h-12'
          onPress={() => {
            // TODO: Implement contact form
            console.log('Open contact form');
          }}
        >
          <Text className='font-medium'>Contact Support</Text>
        </Button>
      </View>
    </ScrollView>
  );
}