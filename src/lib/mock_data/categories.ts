export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const MOCK_CATEGORIES: Category[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Latest mobile phones and accessories',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    productCount: 2
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    description: 'Professional and gaming laptops',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    productCount: 2
  },
  {
    slug: 'headphones',
    name: 'Headphones',
    description: 'Wireless and wired audio devices',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    productCount: 2
  },
  {
    slug: 'shoes',
    name: 'Shoes',
    description: 'Athletic and lifestyle footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    productCount: 2
  },
  {
    slug: 'cameras',
    name: 'Cameras',
    description: 'Professional photography equipment',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300',
    productCount: 0
  },
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Men and women fashion apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    productCount: 1
  },
  {
    slug: 'watches',
    name: 'Watches',
    description: 'Smart and traditional timepieces',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    productCount: 0
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    description: 'iPad and Android tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    productCount: 0
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    description: 'Gaming consoles and accessories',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300',
    productCount: 0
  }
];

// Helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return MOCK_CATEGORIES.find(category => category.slug === slug);
};

export const getCategoryNames = (): string[] => {
  return MOCK_CATEGORIES.map(category => category.slug);
};

export const getCategoriesWithProducts = (): Category[] => {
  return MOCK_CATEGORIES.filter(category => category.productCount > 0);
};

export const getMockCategoriesResponse = (): string[] => {
  return getCategoryNames();
};

export const getMockCategoryListResponse = (): { slug: string; name: string; url: string }[] => {
  return MOCK_CATEGORIES.map(category => ({
    slug: category.slug,
    name: category.name,
    url: `/category/${category.slug}`
  }));
};