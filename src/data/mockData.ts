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
    name: 'Ghanaian Jollof Rice',
    description: 'Authentic Ghanaian jollof rice with aromatic spices, tomatoes, and served with grilled chicken and kelewele.',
    image: '/src/assets/jollof-rice.jpg',
    prepTime: '50 minutes',
    servings: 4,
    category: 'Ghanaian',
    difficulty: 'Medium',
    ingredients: [
      { id: '1', name: 'Jasmine rice', quantity: 3, unit: 'cups', price: 15, category: 'Grains', optional: false },
      { id: '2', name: 'Fresh tomatoes', quantity: 5, unit: 'pieces', price: 8, category: 'Vegetables', optional: false },
      { id: '3', name: 'Red bell peppers', quantity: 2, unit: 'pieces', price: 6, category: 'Vegetables', optional: false },
      { id: '4', name: 'Large onions', quantity: 2, unit: 'pieces', price: 4, category: 'Vegetables', optional: false },
      { id: '5', name: 'Chicken (whole cut)', quantity: 1, unit: 'kg', price: 45, category: 'Proteins', optional: false },
      { id: '6', name: 'Plantains', quantity: 3, unit: 'pieces', price: 8, category: 'Vegetables', optional: true },
      { id: '7', name: 'Ginger', quantity: 1, unit: 'piece', price: 3, category: 'Spices', optional: false },
      { id: '8', name: 'Bay leaves', quantity: 3, unit: 'pieces', price: 2, category: 'Spices', optional: false },
    ],
    instructions: ['Parboil rice with salt', 'Blend tomatoes, peppers and onions', 'Season and fry chicken', 'Cook jollof base', 'Combine rice and simmer', 'Serve with kelewele']
  },
  {
    id: '2',
    name: 'Banku with Tilapia',
    description: 'Traditional Ghanaian fermented corn and cassava dough served with grilled tilapia and spicy pepper sauce.',
    image: '/src/assets/banku-tilapia.jpg',
    prepTime: '40 minutes',
    servings: 4,
    category: 'Ghanaian',
    difficulty: 'Medium',
    ingredients: [
      { id: '9', name: 'Corn dough', quantity: 2, unit: 'cups', price: 12, category: 'Grains', optional: false },
      { id: '10', name: 'Cassava dough', quantity: 1, unit: 'cup', price: 8, category: 'Tubers', optional: false },
      { id: '11', name: 'Fresh tilapia', quantity: 2, unit: 'whole', price: 35, category: 'Proteins', optional: false },
      { id: '12', name: 'Tomatoes', quantity: 4, unit: 'pieces', price: 8, category: 'Vegetables', optional: false },
      { id: '13', name: 'Scotch bonnet pepper', quantity: 2, unit: 'pieces', price: 4, category: 'Spices', optional: false },
      { id: '14', name: 'Ginger', quantity: 1, unit: 'piece', price: 3, category: 'Spices', optional: false },
      { id: '15', name: 'Garlic', quantity: 4, unit: 'cloves', price: 2, category: 'Spices', optional: false },
    ],
    instructions: ['Mix corn and cassava dough', 'Cook banku while stirring', 'Clean and season tilapia', 'Grill fish until golden', 'Prepare shito (pepper sauce)', 'Serve hot together']
  },
  {
    id: '3',
    name: 'Kelewele',
    description: 'Spicy fried plantains seasoned with ginger, pepper, and aromatic spices - a popular Ghanaian street food.',
    image: '/src/assets/kelewele.jpg',
    prepTime: '20 minutes',
    servings: 4,
    category: 'Ghanaian',
    difficulty: 'Easy',
    ingredients: [
      { id: '16', name: 'Ripe plantains', quantity: 4, unit: 'pieces', price: 12, category: 'Vegetables', optional: false },
      { id: '17', name: 'Fresh ginger', quantity: 1, unit: 'piece', price: 3, category: 'Spices', optional: false },
      { id: '18', name: 'Cayenne pepper', quantity: 1, unit: 'tsp', price: 2, category: 'Spices', optional: false },
      { id: '19', name: 'Garlic powder', quantity: 1, unit: 'tsp', price: 2, category: 'Spices', optional: false },
      { id: '20', name: 'Salt', quantity: 1, unit: 'tsp', price: 1, category: 'Seasonings', optional: false },
      { id: '21', name: 'Vegetable oil', quantity: 500, unit: 'ml', price: 8, category: 'Oils', optional: false },
      { id: '22', name: 'Groundnuts', quantity: 100, unit: 'g', price: 5, category: 'Nuts', optional: true },
    ],
    instructions: ['Cut plantains into cubes', 'Mix spices with ginger', 'Marinate plantains with spices', 'Heat oil and deep fry', 'Garnish with groundnuts']
  },
  {
    id: '4',
    name: 'Fufu with Light Soup',
    description: 'Traditional Ghanaian staple made from cassava and plantain, served with clear light soup with fish and vegetables.',
    image: '/src/assets/fufu-light-soup.jpg',
    prepTime: '60 minutes',
    servings: 4,
    category: 'Ghanaian',
    difficulty: 'Hard',
    ingredients: [
      { id: '23', name: 'Cassava', quantity: 1, unit: 'kg', price: 15, category: 'Tubers', optional: false },
      { id: '24', name: 'Green plantains', quantity: 3, unit: 'pieces', price: 8, category: 'Vegetables', optional: false },
      { id: '25', name: 'Fresh fish (red snapper)', quantity: 500, unit: 'g', price: 40, category: 'Proteins', optional: false },
      { id: '26', name: 'Tomatoes', quantity: 3, unit: 'pieces', price: 6, category: 'Vegetables', optional: false },
      { id: '27', name: 'Onions', quantity: 1, unit: 'piece', price: 2, category: 'Vegetables', optional: false },
      { id: '28', name: 'Scotch bonnet pepper', quantity: 1, unit: 'piece', price: 2, category: 'Spices', optional: false },
      { id: '29', name: 'Ginger', quantity: 1, unit: 'piece', price: 3, category: 'Spices', optional: false },
    ],
    instructions: ['Boil cassava and plantains', 'Pound until smooth and stretchy', 'Clean and season fish', 'Prepare clear soup base', 'Add vegetables and simmer', 'Serve fufu with soup']
  },
  {
    id: '5',
    name: 'Waakye',
    description: 'Popular Ghanaian rice and beans dish cooked with millet leaves, served with spaghetti, egg, and stew.',
    image: '/src/assets/waakye.jpg',
    prepTime: '45 minutes',
    servings: 5,
    category: 'Ghanaian',
    difficulty: 'Medium',
    ingredients: [
      { id: '30', name: 'Rice', quantity: 2, unit: 'cups', price: 10, category: 'Grains', optional: false },
      { id: '31', name: 'Black-eyed peas', quantity: 1, unit: 'cup', price: 8, category: 'Legumes', optional: false },
      { id: '32', name: 'Millet leaves (dried)', quantity: 5, unit: 'pieces', price: 3, category: 'Herbs', optional: false },
      { id: '33', name: 'Spaghetti', quantity: 200, unit: 'g', price: 5, category: 'Grains', optional: true },
      { id: '34', name: 'Boiled eggs', quantity: 4, unit: 'pieces', price: 8, category: 'Proteins', optional: true },
      { id: '35', name: 'Gari (cassava flakes)', quantity: 100, unit: 'g', price: 3, category: 'Tubers', optional: true },
      { id: '36', name: 'Beef stew', quantity: 300, unit: 'g', price: 25, category: 'Proteins', optional: false },
    ],
    instructions: ['Soak beans overnight', 'Cook beans with millet leaves', 'Add rice and cook together', 'Boil spaghetti separately', 'Prepare beef stew', 'Serve with all accompaniments']
  },
  {
    id: '6',
    name: 'Red Red',
    description: 'Delicious Ghanaian black-eyed peas stew cooked in palm oil, served with fried plantains and gari.',
    image: '/src/assets/red-red.jpg',
    prepTime: '35 minutes',
    servings: 4,
    category: 'Ghanaian',
    difficulty: 'Easy',
    ingredients: [
      { id: '37', name: 'Black-eyed peas (cooked)', quantity: 2, unit: 'cups', price: 12, category: 'Legumes', optional: false },
      { id: '38', name: 'Palm oil', quantity: 150, unit: 'ml', price: 8, category: 'Oils', optional: false },
      { id: '39', name: 'Onions', quantity: 2, unit: 'pieces', price: 4, category: 'Vegetables', optional: false },
      { id: '40', name: 'Tomatoes', quantity: 4, unit: 'pieces', price: 8, category: 'Vegetables', optional: false },
      { id: '41', name: 'Ripe plantains', quantity: 3, unit: 'pieces', price: 8, category: 'Vegetables', optional: false },
      { id: '42', name: 'Scotch bonnet pepper', quantity: 1, unit: 'piece', price: 2, category: 'Spices', optional: false },
      { id: '43', name: 'Gari', quantity: 100, unit: 'g', price: 3, category: 'Tubers', optional: true },
    ],
    instructions: ['Heat palm oil in pot', 'Fry onions until golden', 'Add tomatoes and pepper', 'Add cooked beans and simmer', 'Fry plantains separately', 'Serve with gari']
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    customerName: 'Akosua Mensah',
    recipeName: 'Ghanaian Jollof Rice',
    ingredients: mockRecipes[0].ingredients,
    total: 89,
    status: 'Delivered',
    orderDate: '2024-01-15',
    deliveryAddress: '15 Oxford Street, Osu, Accra',
    supplierId: 'SUP001',
    supplierName: 'Fresh Foods Accra'
  },
  {
    id: 'ORD002',
    customerId: 'CUST002',
    customerName: 'Kwame Asante',
    recipeName: 'Banku with Tilapia',
    ingredients: mockRecipes[1].ingredients,
    total: 72,
    status: 'Out for Delivery',
    orderDate: '2024-01-16',
    deliveryAddress: '42 Cantonments, Accra',
    supplierId: 'SUP002',
    supplierName: 'Coastal Fresh Market'
  },
  {
    id: 'ORD003',
    customerId: 'CUST003',
    customerName: 'Ama Osei',
    recipeName: 'Kelewele',
    ingredients: mockRecipes[2].ingredients,
    total: 33,
    status: 'Preparing',
    orderDate: '2024-01-17',
    deliveryAddress: '28 Ashongman Estate, Accra',
    supplierId: 'SUP003',
    supplierName: 'Ashanti Fresh Supplies'
  },
  {
    id: 'ORD004',
    customerId: 'CUST004',
    customerName: 'Efua Boateng',
    recipeName: 'Waakye',
    ingredients: mockRecipes[4].ingredients,
    total: 59,
    status: 'Pending',
    orderDate: '2024-01-18',
    deliveryAddress: '67 Tema Station, Accra',
  }
];

// Mock users data
export const mockUsers: User[] = [
  { id: 'CUST001', name: 'Akosua Mensah', email: 'akosua@email.com', role: 'Customer' },
  { id: 'CUST002', name: 'Kwame Asante', email: 'kwame@email.com', role: 'Customer' },
  { id: 'SUP001', name: 'Fresh Foods Accra', email: 'contact@freshfoods.com', role: 'Supplier', area: 'Accra' },
  { id: 'SUP002', name: 'Coastal Fresh Market', email: 'info@coastalfresh.com', role: 'Supplier', area: 'Tema' },
  { id: 'ADM001', name: 'Abena Admin', email: 'admin@freshbasket.com', role: 'Admin' }
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
  'Legumes',
  'Nuts',
  'Herbs',
  'Seasonings'
];

// Recipe categories for filtering
export const recipeCategories = [
  'All',
  'Ghanaian',
  'Continental',
  'Asian',
  'Vegetarian'
];