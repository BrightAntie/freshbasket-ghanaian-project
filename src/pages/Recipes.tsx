import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes, recipeCategories } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recipe Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Nigerian recipes with fresh ingredients
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {recipeCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden p-4 bg-card rounded-lg border animate-slide-up">
              <h3 className="font-medium mb-3">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {recipeCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Category Buttons */}
          <div className="hidden md:flex flex-wrap gap-2">
            {recipeCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "warm" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe, index) => (
              <div 
                key={recipe.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCard recipe={recipe} showQuickAdd />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;