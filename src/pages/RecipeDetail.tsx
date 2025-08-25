import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { mockRecipes, ingredientCategories, Ingredient } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = mockRecipes.find(r => r.id === id);
  
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>(
    recipe ? Object.fromEntries(recipe.ingredients.map(ing => [ing.id, !ing.optional])) : {}
  );
  
  const [quantities, setQuantities] = useState<Record<string, number>>(
    recipe ? Object.fromEntries(recipe.ingredients.map(ing => [ing.id, ing.quantity])) : {}
  );

  const groupedIngredients = useMemo(() => {
    if (!recipe) return {};
    
    const grouped: Record<string, Ingredient[]> = {};
    recipe.ingredients.forEach(ingredient => {
      if (!grouped[ingredient.category]) {
        grouped[ingredient.category] = [];
      }
      grouped[ingredient.category].push(ingredient);
    });
    return grouped;
  }, [recipe]);

  const totalPrice = useMemo(() => {
    if (!recipe) return 0;
    return recipe.ingredients.reduce((sum, ingredient) => {
      if (selectedIngredients[ingredient.id]) {
        const quantity = quantities[ingredient.id] || ingredient.quantity;
        const ratio = quantity / ingredient.quantity;
        return sum + (ingredient.price * ratio);
      }
      return sum;
    }, 0);
  }, [recipe, selectedIngredients, quantities]);

  const selectedCount = Object.values(selectedIngredients).filter(Boolean).length;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-warm-gradient flex items-center justify-center">
        <Card className="card-warm max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Recipe Not Found</h2>
            <Link to="/recipes">
              <Button variant="warm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const updateQuantity = (ingredientId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [ingredientId]: Math.max(1, (prev[ingredientId] || 1) + change)
    }));
  };

  const toggleIngredient = (ingredientId: string, checked: boolean) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredientId]: checked
    }));
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/recipes">
            <Button variant="ghost" className="hover-lift">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="card-warm overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {recipe.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe.name}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle>About This Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {recipe.description}
                </p>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Ingredients Customization */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="card-warm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Customize Ingredients</span>
                  <Badge variant="secondary">{selectedCount} selected</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <p className="price-text">₵{totalPrice.toLocaleString()}</p>
                </div>
                
                <Button className="w-full" variant="hero" size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button className="w-full" variant="outline">
                  Save for Later
                </Button>
              </CardContent>
            </Card>

            {/* Ingredients by Category */}
            <div className="space-y-4">
              {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                <Card key={category} className="card-warm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {ingredients.map((ingredient) => {
                      const isSelected = selectedIngredients[ingredient.id];
                      const currentQuantity = quantities[ingredient.id] || ingredient.quantity;
                      const ratio = currentQuantity / ingredient.quantity;
                      const adjustedPrice = ingredient.price * ratio;

                      return (
                        <div key={ingredient.id} className="space-y-2">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => toggleIngredient(ingredient.id, checked as boolean)}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {ingredient.name}
                                  {ingredient.optional && (
                                    <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
                                  )}
                                </h4>
                                <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                                  ₵{adjustedPrice.toLocaleString()}
                                </span>
                              </div>
                              
                              {isSelected && (
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(ingredient.id, -1)}
                                      disabled={currentQuantity <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="min-w-[3rem] text-center text-sm">
                                      {currentQuantity} {ingredient.unit}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(ingredient.id, 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {ingredient !== ingredients[ingredients.length - 1] && (
                            <Separator className="my-2" />
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;