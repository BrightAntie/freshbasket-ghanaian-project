import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecipeCard } from '@/components/RecipeCard';
import { mockRecipes } from '@/data/mockData';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const featuredRecipes = mockRecipes.slice(0, 6);

  const steps = [
    {
      icon: Search,
      title: 'Browse Recipes',
      description: 'Discover delicious Ghanaian recipes with fresh ingredient lists'
    },
    {
      icon: ShoppingBag,
      title: 'Customize Ingredients',
      description: 'Select and customize ingredients to match your preferences'
    },
    {
      icon: Truck,
      title: 'Fresh Delivery',
      description: 'Get fresh ingredients delivered straight to your doorstep'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-warm-gradient overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="hero-text animate-fade-in">
            Fresh Ghanaian Ingredients
            <br />
            <span className="text-primary-glow">Delivered to Your Door</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover authentic Ghanaian recipes and get all the fresh ingredients 
            you need delivered straight to your kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link to="/recipes">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Explore Recipes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/recipes">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Browse Ingredients
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover popular Ghanaian dishes with fresh ingredients sourced from local suppliers
            </p>
          </div>

          <div className="recipes-grid mb-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="animate-fade-in">
                <RecipeCard recipe={recipe} showQuickAdd />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/recipes">
              <Button variant="warm" size="lg">
                View All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get fresh ingredients for your favorite recipes in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="card-warm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="card-warm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Cooking?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of home cooks who trust FreshBasket for their ingredient needs
              </p>
              <Link to="/recipes">
                <Button variant="hero" size="lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;