import { useState } from 'react';
import { ShoppingBag, Clock, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { currentUser, mockOrders } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userOrders = mockOrders.filter(order => order.customerName === currentUser.name);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const statusFilters = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  
  const filteredOrders = selectedFilter === 'All' 
    ? userOrders 
    : userOrders.filter(order => order.status === selectedFilter);

  const getOrderStats = () => {
    const total = userOrders.length;
    const delivered = userOrders.filter(o => o.status === 'Delivered').length;
    const pending = userOrders.filter(o => o.status === 'Pending').length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    
    return { total, delivered, pending, totalSpent };
  };

  const stats = getOrderStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your orders and discover new recipes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-grid mb-8">
          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold text-secondary">{stats.delivered}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-accent">₵{stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">₵</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Orders Section */}
          <div className="lg:col-span-3">
            <Card className="card-warm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Order History</CardTitle>
                  <Link to="/recipes">
                    <Button variant="warm" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Order
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {statusFilters.map(filter => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {selectedFilter === 'All' ? 'No orders yet' : `No ${selectedFilter.toLowerCase()} orders`}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start by browsing our delicious recipes
                    </p>
                    <Link to="/recipes">
                      <Button variant="warm">
                        Browse Recipes
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map(order => (
                      <Card key={order.id} className="border transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">{order.recipeName}</h3>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <StatusBadge status={order.status} />
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p className="font-medium">{formatDate(order.orderDate)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Items</p>
                              <p className="font-medium">{order.ingredients.length} ingredients</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total</p>
                              <p className="font-medium text-primary">₵{order.total.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" className="hover-lift">
                                <RotateCcw className="mr-2 h-3 w-3" />
                                Reorder
                              </Button>
                            </div>
                          </div>
                          
                          {order.deliveryAddress && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-xs text-muted-foreground">Delivery Address</p>
                              <p className="text-sm">{order.deliveryAddress}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/recipes">
                  <Button className="w-full justify-start" variant="ghost">
                    <Plus className="mr-2 h-4 w-4" />
                    Browse Recipes
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="ghost">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reorder Favorites
                </Button>
              </CardContent>
            </Card>

            {stats.pending > 0 && (
              <Card className="card-warm border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground mb-2">Pending Orders</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You have {stats.pending} order{stats.pending !== 1 ? 's' : ''} being processed
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Track Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;