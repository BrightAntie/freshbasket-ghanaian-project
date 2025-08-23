// Mock data for FreshBasket marketplace

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  optional: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  recipeName: string;
  ingredients: Ingredient[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  orderDate: string;
  deliveryAddress: string;
  supplierId?: string;
  supplierName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Supplier' | 'Admin';
  avatar?: string;
  area?: string;
}

// Mock recipes data
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Jollof Rice',
    description: 'Aromatic Nigerian rice dish with tomatoes, peppers, and spices, served with chicken and plantains.',
    image: '/src/assets/jollof-rice.jpg',
    prepTime: '45 minutes',
    servings: 4,
    category: 'Nigerian',
    difficulty: 'Medium',
    ingredients: [
      { id: '1', name: 'Long grain rice', quantity: 3, unit: 'cups', price: 800, category: 'Grains', optional: false },
      { id: '2', name: 'Tomatoes', quantity: 4, unit: 'pieces', price: 400, category: 'Vegetables', optional: false },
      { id: '3', name: 'Red bell peppers', quantity: 2, unit: 'pieces', price: 300, category: 'Vegetables', optional: false },
      { id: '4', name: 'Onions', quantity: 2, unit: 'pieces', price: 200, category: 'Vegetables', optional: false },
      { id: '5', name: 'Chicken (cut pieces)', quantity: 1, unit: 'kg', price: 2500, category: 'Proteins', optional: false },
      { id: '6', name: 'Plantains', quantity: 2, unit: 'pieces', price: 300, category: 'Vegetables', optional: true },
      { id: '7', name: 'Curry powder', quantity: 2, unit: 'tsp', price: 150, category: 'Spices', optional: false },
      { id: '8', name: 'Thyme', quantity: 1, unit: 'tsp', price: 100, category: 'Spices', optional: false },
    ],
    instructions: ['Wash and parboil rice', 'Blend tomatoes and peppers', 'Season and cook chicken', 'Fry plantains', 'Combine and cook jollof rice']
  },
  {
    id: '2',
    name: 'Egusi Soup',
    description: 'Rich Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meat.',
    image: '/src/assets/egusi-soup.jpg',
    prepTime: '60 minutes',
    servings: 6,
    category: 'Nigerian',
    difficulty: 'Medium',
    ingredients: [
      { id: '9', name: 'Ground egusi (melon seeds)', quantity: 2, unit: 'cups', price: 1000, category: 'Seeds', optional: false },
      { id: '10', name: 'Spinach', quantity: 1, unit: 'bunch', price: 200, category: 'Vegetables', optional: false },
      { id: '11', name: 'Beef', quantity: 500, unit: 'g', price: 3000, category: 'Proteins', optional: false },
      { id: '12', name: 'Stockfish', quantity: 200, unit: 'g', price: 1500, category: 'Proteins', optional: true },
      { id: '13', name: 'Palm oil', quantity: 150, unit: 'ml', price: 400, category: 'Oils', optional: false },
      { id: '14', name: 'Pepper (blended)', quantity: 3, unit: 'tbsp', price: 200, category: 'Spices', optional: false },
    ],
    instructions: ['Cook beef and stockfish', 'Fry egusi in palm oil', 'Add blended pepper', 'Add vegetables', 'Simmer until done']
  },
  {
    id: '3',
    name: 'Pepper Soup',
    description: 'Spicy Nigerian soup with assorted meat or fish, perfect for cold weather.',
    image: '/src/assets/pepper-soup.jpg',
    prepTime: '30 minutes',
    servings: 4,
    category: 'Nigerian',
    difficulty: 'Easy',
    ingredients: [
      { id: '15', name: 'Catfish (cut pieces)', quantity: 1, unit: 'kg', price: 2800, category: 'Proteins', optional: false },
      { id: '16', name: 'Pepper soup spice', quantity: 2, unit: 'tbsp', price: 300, category: 'Spices', optional: false },
      { id: '17', name: 'Ginger', quantity: 1, unit: 'piece', price: 150, category: 'Spices', optional: false },
      { id: '18', name: 'Garlic', quantity: 3, unit: 'cloves', price: 100, category: 'Spices', optional: false },
      { id: '19', name: 'Uziza leaves', quantity: 10, unit: 'pieces', price: 200, category: 'Herbs', optional: true },
    ],
    instructions: ['Clean and season fish', 'Boil with spices', 'Add pepper soup spice', 'Garnish with uziza leaves', 'Serve hot']
  },
  {
    id: '4',
    name: 'Suya',
    description: 'Spicy grilled meat skewers with traditional Nigerian spice blend.',
    image: '/src/assets/suya.jpg',
    prepTime: '25 minutes',
    servings: 4,
    category: 'Nigerian',
    difficulty: 'Easy',
    ingredients: [
      { id: '20', name: 'Beef (thin slices)', quantity: 500, unit: 'g', price: 3500, category: 'Proteins', optional: false },
      { id: '21', name: 'Suya spice (yaji)', quantity: 3, unit: 'tbsp', price: 250, category: 'Spices', optional: false },
      { id: '22', name: 'Onions (sliced)', quantity: 1, unit: 'piece', price: 100, category: 'Vegetables', optional: false },
      { id: '23', name: 'Tomatoes (sliced)', quantity: 2, unit: 'pieces', price: 200, category: 'Vegetables', optional: true },
      { id: '24', name: 'Vegetable oil', quantity: 2, unit: 'tbsp', price: 100, category: 'Oils', optional: false },
    ],
    instructions: ['Marinate beef with oil and half the spice', 'Thread onto skewers', 'Grill over charcoal', 'Sprinkle remaining spice', 'Serve with onions and tomatoes']
  },
  {
    id: '5',
    name: 'Pounded Yam with Oha Soup',
    description: 'Traditional Nigerian swallow with delicious Oha leaf soup.',
    image: '/src/assets/pounded-yam-oha.jpg',
    prepTime: '50 minutes',
    servings: 4,
    category: 'Nigerian',
    difficulty: 'Hard',
    ingredients: [
      { id: '25', name: 'White yam', quantity: 2, unit: 'tubers', price: 1200, category: 'Tubers', optional: false },
      { id: '26', name: 'Oha leaves', quantity: 1, unit: 'bunch', price: 500, category: 'Vegetables', optional: false },
      { id: '27', name: 'Assorted meat', quantity: 500, unit: 'g', price: 2500, category: 'Proteins', optional: false },
      { id: '28', name: 'Cocoyam (thickener)', quantity: 3, unit: 'pieces', price: 300, category: 'Tubers', optional: false },
      { id: '29', name: 'Ogiri (seasoning)', quantity: 1, unit: 'piece', price: 200, category: 'Seasonings', optional: false },
    ],
    instructions: ['Peel and boil yam', 'Pound yam until smooth', 'Cook meat until tender', 'Prepare oha soup base', 'Add oha leaves and simmer']
  },
  {
    id: '6',
    name: 'Nigerian Fried Rice',
    description: 'Colorful rice dish with mixed vegetables and proteins.',
    image: '/src/assets/fried-rice.jpg',
    prepTime: '40 minutes',
    servings: 5,
    category: 'Nigerian',
    difficulty: 'Medium',
    ingredients: [
      { id: '30', name: 'Long grain rice', quantity: 3, unit: 'cups', price: 800, category: 'Grains', optional: false },
      { id: '31', name: 'Mixed vegetables (carrots, peas, green beans)', quantity: 2, unit: 'cups', price: 600, category: 'Vegetables', optional: false },
      { id: '32', name: 'Chicken liver', quantity: 300, unit: 'g', price: 800, category: 'Proteins', optional: false },
      { id: '33', name: 'Prawns', quantity: 200, unit: 'g', price: 1200, category: 'Proteins', optional: true },
      { id: '34', name: 'Soy sauce', quantity: 3, unit: 'tbsp', price: 200, category: 'Sauces', optional: false },
    ],
    instructions: ['Parboil rice with curry', 'Stir-fry vegetables', 'Cook liver and prawns', 'Combine with rice', 'Season and serve']
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    customerName: 'Adunni Adebayo',
    recipeName: 'Classic Jollof Rice',
    ingredients: mockRecipes[0].ingredients,
    total: 4750,
    status: 'Delivered',
    orderDate: '2024-01-15',
    deliveryAddress: '15 Allen Avenue, Ikeja, Lagos',
    supplierId: 'SUP001',
    supplierName: 'Fresh Foods Lagos'
  },
  {
    id: 'ORD002',
    customerId: 'CUST002',
    customerName: 'Emeka Okafor',
    recipeName: 'Egusi Soup',
    ingredients: mockRecipes[1].ingredients,
    total: 5300,
    status: 'Out for Delivery',
    orderDate: '2024-01-16',
    deliveryAddress: '42 Victoria Island, Lagos',
    supplierId: 'SUP002',
    supplierName: 'Island Fresh Market'
  },
  {
    id: 'ORD003',
    customerId: 'CUST003',
    customerName: 'Fatima Aliyu',
    recipeName: 'Pepper Soup',
    ingredients: mockRecipes[2].ingredients,
    total: 3550,
    status: 'Preparing',
    orderDate: '2024-01-17',
    deliveryAddress: '28 Garki Area, Abuja',
    supplierId: 'SUP003',
    supplierName: 'Abuja Fresh Supplies'
  },
  {
    id: 'ORD004',
    customerId: 'CUST004',
    customerName: 'Kemi Odunsi',
    recipeName: 'Suya',
    ingredients: mockRecipes[3].ingredients,
    total: 4150,
    status: 'Pending',
    orderDate: '2024-01-18',
    deliveryAddress: '67 Ring Road, Ibadan',
  }
];

// Mock users data
export const mockUsers: User[] = [
  { id: 'CUST001', name: 'Adunni Adebayo', email: 'adunni@email.com', role: 'Customer' },
  { id: 'CUST002', name: 'Emeka Okafor', email: 'emeka@email.com', role: 'Customer' },
  { id: 'SUP001', name: 'Fresh Foods Lagos', email: 'contact@freshfoods.com', role: 'Supplier', area: 'Lagos' },
  { id: 'SUP002', name: 'Island Fresh Market', email: 'info@islandfresh.com', role: 'Supplier', area: 'Victoria Island' },
  { id: 'ADM001', name: 'Sarah Admin', email: 'admin@freshbasket.com', role: 'Admin' }
];

// Current user (can be changed to simulate different roles)
export let currentUser: User = mockUsers[0]; // Default to customer

export const setCurrentUser = (user: User) => {
  currentUser = user;
};

// Ingredient categories for filtering
export const ingredientCategories = [
  'All',
  'Proteins',
  'Vegetables', 
  'Grains',
  'Spices',
  'Tubers',
  'Oils',
  'Seeds',
  'Herbs',
  'Seasonings',
  'Sauces'
];

// Recipe categories for filtering
export const recipeCategories = [
  'All',
  'Nigerian',
  'Continental',
  'Asian',
  'Vegetarian'
];