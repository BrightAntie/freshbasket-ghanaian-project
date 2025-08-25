import { useState } from 'react';
import { Package, DollarSign, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { currentUser, mockOrders } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SupplierDashboard = () => {
  const supplierOrders = mockOrders.filter(order => 
    order.supplierId === currentUser.id || 
    (currentUser.id === 'SUP001' && !order.supplierId) // Unassigned orders for demo
  );
  
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const statusFilters = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  
  const filteredOrders = selectedFilter === 'All' 
    ? supplierOrders 
    : supplierOrders.filter(order => order.status === selectedFilter);

  const getSupplierStats = () => {
    const totalOrders = supplierOrders.length;
    const pendingOrders = supplierOrders.filter(o => o.status === 'Pending').length;
    const completedOrders = supplierOrders.filter(o => o.status === 'Delivered').length;
    const totalEarnings = supplierOrders
      .filter(o => o.status === 'Delivered')
      .reduce((sum, order) => sum + (order.total * 0.15), 0); // 15% commission
    
    return { totalOrders, pendingOrders, completedOrders, totalEarnings };
  };

  const stats = getSupplierStats();

  const updateOrderStatus = (orderId: string, newStatus: 'Preparing' | 'Out for Delivery' | 'Delivered') => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Pending':
        return 'Preparing';
      case 'Preparing':
        return 'Out for Delivery';
      case 'Out for Delivery':
        return 'Delivered';
      default:
        return null;
    }
  };

  const getStatusAction = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Pending':
        return 'Mark as Preparing';
      case 'Preparing':
        return 'Mark Out for Delivery';
      case 'Out for Delivery':
        return 'Mark as Delivered';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Supplier Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome, {currentUser.name} - {currentUser.area}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-grid mb-8">
          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-500">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-secondary">{stats.completedOrders}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-accent">₵{stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card className="card-warm">
          <CardHeader>
            <CardTitle className="text-xl">Assigned Orders</CardTitle>
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
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {selectedFilter === 'All' ? 'No orders assigned' : `No ${selectedFilter.toLowerCase()} orders`}
                </h3>
                <p className="text-muted-foreground">
                  Orders will appear here when assigned to you
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <Card key={order.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{order.recipeName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id} • Customer: {order.customerName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Ingredients Required</h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {order.ingredients.map(ingredient => (
                              <div key={ingredient.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                                </span>
                                <span className="font-medium">₵{ingredient.price.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-3">Delivery Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm text-muted-foreground">Delivery Address</p>
                                <p className="text-sm font-medium">{order.deliveryAddress}</p>
                              </div>
                            </div>
                            <div className="pt-2">
                              <p className="text-sm text-muted-foreground">Order Total</p>
                              <p className="text-lg font-bold text-primary">₵{order.total.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">
                                Your commission: ₵{(order.total * 0.15).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{order.ingredients.length} ingredients</Badge>
                          <Badge variant="outline" className="text-primary">
                            ₵{(order.total * 0.15).toLocaleString()} commission
                          </Badge>
                        </div>
                        
                        {getNextStatus(order.status) && (
                          <Button 
                            variant="warm"
                            onClick={() => updateOrderStatus(order.id, getNextStatus(order.status) as any)}
                          >
                            {getStatusAction(order.status)}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierDashboard;