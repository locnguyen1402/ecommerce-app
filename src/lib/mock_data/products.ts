import type { 
  ProductListItem, 
  ProductDetail,
  ProductsResponse,
  ProductAttribute,
  ProductVariant,
  ProductAttributeGroup 
} from '../api/types';
import { generateMockUUID } from '../utils/uuid';

// Mock Product List Items (for product listings)
export const MOCK_PRODUCT_LIST: ProductListItem[] = [
  {
    id: generateMockUUID('iphone-15-pro-max'),
    title: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and pro camera system.',
    category: 'smartphones',
    price: 1199,
    discountPercentage: 5,
    rating: 4.8,
    stock: 150,
    tags: ['premium', 'latest', 'flagship'],
    brand: 'Apple',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    availabilityStatus: 'In Stock',
    hasVariants: true
  },
  {
    id: generateMockUUID('samsung-galaxy-s24-ultra'),
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen and exceptional camera capabilities.',
    category: 'smartphones',
    price: 1299,
    discountPercentage: 8,
    rating: 4.7,
    stock: 85,
    tags: ['android', 'premium', 's-pen'],
    brand: 'Samsung',
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300',
    availabilityStatus: 'In Stock',
    hasVariants: true
  },
  {
    id: generateMockUUID('ao-nam-cotton-premium'),
    title: 'Áo Nam Cotton Premium',
    description: 'Áo thun nam chất liệu cotton cao cấp, thoáng mát và bền đẹp.',
    category: 'clothing',
    price: 45,
    discountPercentage: 15,
    rating: 4.5,
    stock: 200,
    tags: ['clothing', 'cotton', 'casual'],
    brand: 'FashionCo',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    availabilityStatus: 'In Stock',
    hasVariants: true
  },
  {
    id: generateMockUUID('macbook-pro-m3'),
    title: 'MacBook Pro M3',
    description: 'Professional laptop with M3 chip for ultimate performance and efficiency.',
    category: 'laptops',
    price: 1999,
    discountPercentage: 3,
    rating: 4.9,
    stock: 25,
    tags: ['macbook', 'm3', 'professional'],
    brand: 'Apple',
    thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    availabilityStatus: 'In Stock',
    hasVariants: false
  },
  {
    id: generateMockUUID('nike-air-max-270'),
    title: 'Nike Air Max 270',
    description: 'Lifestyle sneakers with Max Air cushioning for all-day comfort.',
    category: 'shoes',
    price: 150,
    discountPercentage: 20,
    rating: 4.5,
    stock: 300,
    tags: ['sneakers', 'lifestyle', 'comfortable'],
    brand: 'Nike',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    availabilityStatus: 'In Stock',
    hasVariants: true
  }
];

// Mock Product Details (for product detail page)
export const MOCK_PRODUCT_DETAILS: ProductDetail[] = [
  {
    id: generateMockUUID('iphone-15-pro-max'),
    title: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and pro camera system. Features include Dynamic Island, Action button, and the most powerful iPhone camera system.',
    category: 'smartphones',
    basePrice: 1199,
    discountPercentage: 5,
    rating: 4.8,
    totalStock: 150,
    tags: ['premium', 'latest', 'flagship'],
    brand: 'Apple',
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    returnPolicy: '14 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      barcode: '194253394427',
      qrCode: 'https://example.com/qr/iphone15pro'
    },
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    reviews: [
      {
        rating: 5,
        comment: 'Excellent phone with amazing camera quality!',
        date: '2024-01-15T10:30:00Z',
        reviewerName: 'John Smith',
        reviewerEmail: 'john@example.com'
      }
    ],
    attributeGroups: [
      {
        id: 'storage',
        name: 'storage',
        displayName: 'Storage',
        required: true,
        attributes: [
          { id: generateMockUUID('storage-256gb'), name: '256GB' },
          { id: generateMockUUID('storage-512gb'), name: '512GB' },
          { id: generateMockUUID('storage-1tb'), name: '1TB' }
        ]
      },
      {
        id: generateMockUUID('color-group'),
        name: 'color',
        displayName: 'Color',
        required: true,
        attributes: [
          { id: generateMockUUID('color-natural-titanium'), name: 'Natural Titanium' },
          { id: generateMockUUID('color-blue-titanium'), name: 'Blue Titanium' },
          { id: generateMockUUID('color-white-titanium'), name: 'White Titanium' },
          { id: generateMockUUID('color-black-titanium'), name: 'Black Titanium' }
        ]
      }
    ],
    variants: [
      {
        id: generateMockUUID('iphone15-256-natural'),
        sku: 'IP15PM-256-NT',
        price: 1199,
        stock: 25,
        attributes: [
          { id: generateMockUUID('storage-256gb'), name: '256GB' },
          { id: generateMockUUID('color-natural-titanium'), name: 'Natural Titanium' }
        ],
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
        ]
      },
      {
        id: generateMockUUID('iphone15-512-blue'),
        sku: 'IP15PM-512-BT',
        price: 1399,
        stock: 30,
        attributes: [
          { id: generateMockUUID('storage-512gb'), name: '512GB' },
          { id: generateMockUUID('color-blue-titanium'), name: 'Blue Titanium' }
        ],
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
        ]
      }
    ]
  },
  {
    id: generateMockUUID('ao-nam-cotton-premium'),
    title: 'Áo Nam Cotton Premium',
    description: 'Áo thun nam chất liệu cotton cao cấp, thoáng mát và bền đẹp. Thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày.',
    category: 'clothing',
    basePrice: 45,
    discountPercentage: 15,
    rating: 4.5,
    totalStock: 200,
    tags: ['clothing', 'cotton', 'casual'],
    brand: 'FashionCo',
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships in 2-3 business days',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
      barcode: '123456789012',
      qrCode: 'https://example.com/qr/shirt'
    },
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f37f4ec3?w=500'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    reviews: [
      {
        rating: 4,
        comment: 'Chất liệu cotton rất tốt, mặc thoáng mát.',
        date: '2024-01-20T14:15:00Z',
        reviewerName: 'Nguyễn Văn A',
        reviewerEmail: 'nguyenvana@example.com'
      }
    ],
    attributeGroups: [
      {
        id: generateMockUUID('size-group'),
        name: 'size',
        displayName: 'Size',
        required: true,
        attributes: [
          { id: generateMockUUID('size-m'), name: 'M' },
          { id: generateMockUUID('size-l'), name: 'L' },
          { id: generateMockUUID('size-xl'), name: 'XL' }
        ]
      },
      {
        id: generateMockUUID('color-group-shirt'),
        name: 'color',
        displayName: 'Color',
        required: true,
        attributes: [
          { id: generateMockUUID('color-yellow'), name: 'Yellow' },
          { id: generateMockUUID('color-red'), name: 'Red' },
          { id: generateMockUUID('color-grey'), name: 'Grey' }
        ]
      }
    ],
    variants: [
      {
        id: generateMockUUID('shirt-m-yellow'),
        sku: 'SHIRT-M-YL',
        price: 45,
        stock: 50,
        attributes: [
          { id: generateMockUUID('size-m'), name: 'M' },
          { id: generateMockUUID('color-yellow'), name: 'Yellow' }
        ],
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        ]
      },
      {
        id: generateMockUUID('shirt-m-red'),
        sku: 'SHIRT-M-RD',
        price: 45,
        stock: 30,
        attributes: [
          { id: generateMockUUID('size-m'), name: 'M' },
          { id: generateMockUUID('color-red'), name: 'Red' }
        ],
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f37f4ec3?w=500'
        ]
      },
      {
        id: generateMockUUID('shirt-l-grey'),
        sku: 'SHIRT-L-GR',
        price: 45,
        stock: 40,
        attributes: [
          { id: generateMockUUID('size-l'), name: 'L' },
          { id: generateMockUUID('color-grey'), name: 'Grey' }
        ],
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        ]
      }
    ]
  },
  {
    id: generateMockUUID('nike-air-max-270'),
    title: 'Nike Air Max 270',
    description: 'Lifestyle sneakers with Max Air cushioning for all-day comfort. Perfect for casual wear and light activities.',
    category: 'shoes',
    basePrice: 150,
    discountPercentage: 20,
    rating: 4.5,
    totalStock: 300,
    tags: ['sneakers', 'lifestyle', 'comfortable'],
    brand: 'Nike',
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships in 1-3 business days',
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-07T00:00:00Z',
      updatedAt: '2024-01-07T00:00:00Z',
      barcode: '194501238456',
      qrCode: 'https://example.com/qr/nikeairmax270'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    reviews: [
      {
        rating: 4,
        comment: 'Very comfortable for daily wear.',
        date: '2024-01-28T15:45:00Z',
        reviewerName: 'Alex Turner',
        reviewerEmail: 'alex@example.com'
      }
    ],
    attributeGroups: [
      {
        id: generateMockUUID('size-group-shoes'),
        name: 'size',
        displayName: 'Size',
        required: true,
        attributes: [
          { id: generateMockUUID('size-8'), name: 'US 8' },
          { id: generateMockUUID('size-9'), name: 'US 9' },
          { id: generateMockUUID('size-10'), name: 'US 10' },
          { id: generateMockUUID('size-11'), name: 'US 11' }
        ]
      },
      {
        id: generateMockUUID('color-group-shoes'),
        name: 'color',
        displayName: 'Color',
        required: true,
        attributes: [
          { id: generateMockUUID('color-white-black'), name: 'White/Black' },
          { id: generateMockUUID('color-blue-white'), name: 'Blue/White' },
          { id: generateMockUUID('color-black-red'), name: 'Black/Red' }
        ]
      }
    ],
    variants: [
      {
        id: generateMockUUID('nike-10-white-black'),
        sku: 'NIKE-270-10-WB',
        price: 150,
        stock: 80,
        attributes: [
          { id: generateMockUUID('size-10'), name: 'US 10' },
          { id: generateMockUUID('color-white-black'), name: 'White/Black' }
        ],
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
        ]
      },
      {
        id: generateMockUUID('nike-9-blue-white'),
        sku: 'NIKE-270-9-BW',
        price: 150,
        stock: 60,
        attributes: [
          { id: generateMockUUID('size-9'), name: 'US 9' },
          { id: generateMockUUID('color-blue-white'), name: 'Blue/White' }
        ],
        images: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
        ]
      }
    ]
  }
];

// Helper functions
export const getProductListById = (id: string): ProductListItem | undefined => {
  return MOCK_PRODUCT_LIST.find(product => product.id === id);
};

export const getProductDetailById = (id: string): ProductDetail | undefined => {
  return MOCK_PRODUCT_DETAILS.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): ProductListItem[] => {
  return MOCK_PRODUCT_LIST.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (query: string): ProductListItem[] => {
  const searchTerm = query.toLowerCase();
  return MOCK_PRODUCT_LIST.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getFeaturedProducts = (): ProductListItem[] => {
  // Return products with rating >= 4.5, sorted by rating
  return MOCK_PRODUCT_LIST
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

export const getMockProductsResponse = (
  params: {
    limit?: number;
    skip?: number;
    category?: string;
    search?: string;
  } = {}
): ProductsResponse => {
  const { limit = 20, skip = 0, category, search } = params;
  
  let filteredProducts = [...MOCK_PRODUCT_LIST];
  
  // Apply category filter
  if (category) {
    filteredProducts = getProductsByCategory(category);
  }
  
  // Apply search filter
  if (search) {
    filteredProducts = searchProducts(search);
  }
  
  // Apply pagination
  const total = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(skip, skip + limit);
  
  return {
    products: paginatedProducts,
    total,
    skip,
    limit
  };
};

// Variant helper functions
export const findVariantByAttributes = (
  product: ProductDetail, 
  selectedAttributes: ProductAttribute[]
): ProductVariant | undefined => {
  return product.variants.find(variant => {
    return selectedAttributes.every(selectedAttr => 
      variant.attributes.some(variantAttr => 
        variantAttr.id === selectedAttr.id
      )
    );
  });
};

export const getAvailableAttributesForGroup = (
  product: ProductDetail,
  groupId: string,
  selectedAttributes: ProductAttribute[]
): ProductAttribute[] => {
  const group = product.attributeGroups.find(g => g.id === groupId);
  if (!group) return [];

  // Filter out the current group's selected attribute
  const otherSelectedAttributes = selectedAttributes.filter(attr => 
    !group.attributes.some(groupAttr => groupAttr.id === attr.id)
  );

  // Find which attributes in this group have available variants
  return group.attributes.filter(attr => {
    const testAttributes = [...otherSelectedAttributes, attr];
    return product.variants.some(variant => {
      return testAttributes.every(testAttr => 
        variant.attributes.some(variantAttr => 
          variantAttr.id === testAttr.id
        )
      ) && variant.stock > 0;
    });
  });
};