import { authService } from '../api/auth';
import { apiClient } from '../api/axios';
import { productsService } from '../api/products';

/**
 * Test all API connections to DummyJSON
 */
export const testApiConnections = async () => {
  console.log('🔍 Testing API connections...');

  try {
    // Test 1: Basic connectivity
    console.log('1. Testing basic connectivity...');
    const testResponse = await apiClient.get('/test');
    console.log('✅ Basic connectivity:', testResponse.data);

    // Test 2: Products endpoint
    console.log('2. Testing products endpoint...');
    const productsResponse = await productsService.getProducts({ limit: 5 });
    console.log(
      '✅ Products:',
      `${productsResponse.products.length} products loaded`,
    );

    // Test 3: Categories endpoint
    console.log('3. Testing categories endpoint...');
    const categoriesResponse = await productsService.getCategories();
    console.log(
      '✅ Categories:',
      `${categoriesResponse.length} categories loaded`,
    );

    // Test 4: Featured products
    console.log('4. Testing featured products...');
    const featuredResponse = await productsService.getFeaturedProducts();
    console.log(
      '✅ Featured products:',
      `${featuredResponse.length} featured products loaded`,
    );

    // Test 5: Search functionality
    console.log('5. Testing search functionality...');
    const searchResponse = await productsService.searchProducts({
      q: 'phone',
      limit: 3,
    });
    console.log(
      '✅ Search:',
      `${searchResponse.products.length} search results for "phone"`,
    );

    console.log('🎉 All API tests passed!');
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error);
    return false;
  }
};

/**
 * Test authentication flow
 */
export const testAuthFlow = async () => {
  console.log('🔐 Testing authentication flow...');

  try {
    // Test login with DummyJSON test user
    console.log('1. Testing login...');
    const loginResponse = await authService.login({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 30,
    });
    console.log(
      '✅ Login successful:',
      loginResponse.firstName,
      loginResponse.lastName,
    );

    // Test getting current user
    console.log('2. Testing get current user...');
    const userResponse = await authService.getCurrentUser();
    console.log(
      '✅ Current user:',
      userResponse.firstName,
      userResponse.lastName,
    );

    // Test refresh token
    console.log('3. Testing refresh token...');
    const refreshResponse = await authService.refreshToken({
      refreshToken: loginResponse.refreshToken,
      expiresInMins: 30,
    });
    console.log('✅ Token refreshed successfully');

    console.log('🎉 All auth tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Auth test failed:', error);
    return false;
  }
};

/**
 * Run all API tests
 */
export const runAllTests = async () => {
  console.log('🚀 Starting comprehensive API tests...');

  const apiTest = await testApiConnections();
  const authTest = await testAuthFlow();

  if (apiTest && authTest) {
    console.log('🎉 All tests passed! API integration is working correctly.');
  } else {
    console.log('❌ Some tests failed. Please check the errors above.');
  }

  return apiTest && authTest;
};
