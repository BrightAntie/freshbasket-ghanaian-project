import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RecipeCardProps {
  recipe: Recipe;
  showQuickAdd?: boolean;
}

export const RecipeCard = ({ recipe, showQuickAdd = false }: RecipeCardProps) => {
  const totalPrice = recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

  return (
    <Card className="recipe-card group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {showQuickAdd && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/recipe/${recipe.id}`}>
              <Button variant="hero" size="sm" className="animate-bounce-in">
                Quick Add
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {recipe.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {recipe.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Total ingredients</span>
              <p className="price-text">₵{totalPrice.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">{recipe.ingredients.length} items</span>
              <p className="text-sm font-medium text-secondary">{recipe.difficulty}</p>
            </div>
          </div>

          <Link to={`/recipe/${recipe.id}`} className="block">
            <Button className="w-full" variant="warm">
              View Recipe
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};