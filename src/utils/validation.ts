import * as yup from 'yup';

// Common validation patterns
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const postalCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/; // US postal code format

// Custom validation messages
const messages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  password: {
    min: 'Password must be at least 8 characters',
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
    special: 'Password must contain at least one special character',
  },
  match: 'Passwords do not match',
  positive: 'Must be a positive number',
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be at most ${max}`,
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
};

// Base field validations
export const validations = {
  email: yup
    .string()
    .required(messages.required)
    .matches(emailRegex, messages.email),
    
  password: yup
    .string()
    .required(messages.required)
    .min(8, messages.password.min)
    .matches(/[a-z]/, messages.password.lowercase)
    .matches(/[A-Z]/, messages.password.uppercase)
    .matches(/\d/, messages.password.number)
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, messages.password.special),
    
  confirmPassword: (passwordField = 'password') => 
    yup
      .string()
      .required(messages.required)
      .oneOf([yup.ref(passwordField)], messages.match),
      
  firstName: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(50, messages.maxLength(50)),
    
  lastName: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(50, messages.maxLength(50)),
    
  phone: yup
    .string()
    .matches(phoneRegex, messages.phone),
    
  postalCode: yup
    .string()
    .required(messages.required)
    .matches(postalCodeRegex, 'Please enter a valid postal code'),
    
  address: yup
    .string()
    .required(messages.required)
    .min(5, messages.minLength(5))
    .max(200, messages.maxLength(200)),
    
  city: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(100, messages.maxLength(100)),
    
  state: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(100, messages.maxLength(100)),
    
  country: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(100, messages.maxLength(100)),
    
  quantity: yup
    .number()
    .required(messages.required)
    .positive(messages.positive)
    .integer('Must be a whole number')
    .min(1, messages.min(1)),
    
  price: yup
    .number()
    .required(messages.required)
    .positive(messages.positive)
    .min(0.01, 'Price must be at least $0.01'),
};

// Authentication schemas
export const loginSchema = yup.object().shape({
  email: validations.email,
  password: yup.string().required(messages.required), // Less strict for login
});

export const registerSchema = yup.object().shape({
  firstName: validations.firstName,
  lastName: validations.lastName,
  email: validations.email,
  password: validations.password,
  confirmPassword: validations.confirmPassword(),
});

export const forgotPasswordSchema = yup.object().shape({
  email: validations.email,
});

export const resetPasswordSchema = yup.object().shape({
  password: validations.password,
  confirmPassword: validations.confirmPassword(),
});

// Profile schemas
export const profileSchema = yup.object().shape({
  firstName: validations.firstName,
  lastName: validations.lastName,
  phone: validations.phone.optional(),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(messages.required),
  newPassword: validations.password,
  confirmPassword: validations.confirmPassword('newPassword'),
});

// Address schemas
export const addressSchema = yup.object().shape({
  type: yup.string().oneOf(['billing', 'shipping']).required(messages.required),
  firstName: validations.firstName,
  lastName: validations.lastName,
  company: yup.string().optional(),
  address1: validations.address,
  address2: yup.string().optional(),
  city: validations.city,
  state: validations.state,
  postalCode: validations.postalCode,
  country: validations.country,
  phone: validations.phone.optional(),
  isDefault: yup.boolean().default(false),
});

// Product schemas
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.required)
    .min(3, messages.minLength(3))
    .max(200, messages.maxLength(200)),
  description: yup
    .string()
    .required(messages.required)
    .min(10, messages.minLength(10))
    .max(2000, messages.maxLength(2000)),
  price: validations.price,
  originalPrice: yup
    .number()
    .positive(messages.positive)
    .optional(),
  category: yup.string().required(messages.required),
  brand: yup.string().optional(),
  inStock: yup.boolean().required(messages.required),
  images: yup
    .array()
    .of(yup.string().url('Must be a valid URL'))
    .min(1, 'At least one image is required'),
  tags: yup.array().of(yup.string()).optional(),
});

// Cart schemas
export const addToCartSchema = yup.object().shape({
  productId: yup.string().required(messages.required),
  quantity: validations.quantity,
  selectedVariants: yup.object().optional(),
});

export const updateCartItemSchema = yup.object().shape({
  quantity: validations.quantity,
});

// Checkout schemas
export const checkoutSchema = yup.object().shape({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentMethod: yup.string().required(messages.required),
  notes: yup.string().max(500, messages.maxLength(500)).optional(),
});

// Search schemas
export const searchSchema = yup.object().shape({
  query: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(100, messages.maxLength(100)),
  category: yup.string().optional(),
  sortBy: yup.string().optional(),
  minPrice: yup.number().positive(messages.positive).optional(),
  maxPrice: yup.number().positive(messages.positive).optional(),
});

// Review schemas
export const reviewSchema = yup.object().shape({
  productId: yup.string().required(messages.required),
  rating: yup
    .number()
    .required(messages.required)
    .min(1, messages.min(1))
    .max(5, messages.max(5))
    .integer('Rating must be a whole number'),
  title: yup
    .string()
    .required(messages.required)
    .min(5, messages.minLength(5))
    .max(100, messages.maxLength(100)),
  comment: yup
    .string()
    .required(messages.required)
    .min(10, messages.minLength(10))
    .max(1000, messages.maxLength(1000)),
});

// Contact schemas
export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.required)
    .min(2, messages.minLength(2))
    .max(100, messages.maxLength(100)),
  email: validations.email,
  subject: yup
    .string()
    .required(messages.required)
    .min(5, messages.minLength(5))
    .max(200, messages.maxLength(200)),
  message: yup
    .string()
    .required(messages.required)
    .min(10, messages.minLength(10))
    .max(2000, messages.maxLength(2000)),
});

// Newsletter subscription schema
export const newsletterSchema = yup.object().shape({
  email: validations.email,
  preferences: yup.object().shape({
    products: yup.boolean().default(true),
    promotions: yup.boolean().default(true),
    news: yup.boolean().default(false),
  }),
});

// Custom validation helpers
export const validateField = async (
  schema: yup.AnySchema,
  value: any
): Promise<{ isValid: boolean; error?: string }> => {
  try {
    await schema.validate(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validateForm = async (
  schema: yup.ObjectSchema<any>,
  data: any
): Promise<{ isValid: boolean; errors?: Record<string, string> }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
