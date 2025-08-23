import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentUser, setCurrentUser, mockUsers } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [cartCount] = useState(3); // Mock cart count

  const isActive = (path: string) => location.pathname === path;

  const getNavItems = () => {
    const commonItems = [
      { name: 'Home', path: '/' },
      { name: 'Recipes', path: '/recipes' },
    ];

    switch (currentUser.role) {
      case 'Customer':
        return [...commonItems, { name: 'Dashboard', path: '/dashboard' }];
      case 'Supplier':
        return [...commonItems, { name: 'Supplier', path: '/supplier' }];
      case 'Admin':
        return [...commonItems, { name: 'Admin', path: '/admin' }];
      default:
        return commonItems;
    }
  };

  const handleRoleSwitch = (newRole: 'Customer' | 'Supplier' | 'Admin') => {
    const user = mockUsers.find(u => u.role === newRole);
    if (user) {
      setCurrentUser(user);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">FreshBasket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser.role === 'Customer' && (
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="font-medium">
                  {currentUser.name}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-muted-foreground">
                  {currentUser.role}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleSwitch('Customer')}>
                  Switch to Customer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('Supplier')}>
                  Switch to Supplier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('Admin')}>
                  Switch to Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link to="/login">
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-3">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary px-2 py-1 ${
                    isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">{currentUser.name}</span>
                {currentUser.role === 'Customer' && (
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};