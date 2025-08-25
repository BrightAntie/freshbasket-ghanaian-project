import { useState } from 'react';
import { Users, DollarSign, Package, TrendingUp, Eye, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { mockOrders, mockUsers } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminDashboard = () => {
  const [selectedOrderFilter, setSelectedOrderFilter] = useState('All');
  
  const statusFilters = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  
  const filteredOrders = selectedOrderFilter === 'All' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedOrderFilter);

  const getAdminStats = () => {
    const totalOrders = mockOrders.length;
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const activeSuppliers = mockUsers.filter(u => u.role === 'Supplier').length;
    const totalCustomers = mockUsers.filter(u => u.role === 'Customer').length;
    const pendingOrders = mockOrders.filter(o => o.status === 'Pending').length;
    
    return { totalOrders, totalRevenue, activeSuppliers, totalCustomers, pendingOrders };
  };

  const stats = getAdminStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const assignSupplier = (orderId: string, supplierId: string) => {
    // In a real app, this would make an API call
    console.log(`Assigning order ${orderId} to supplier ${supplierId}`);
  };

  const getAvailableSuppliers = () => {
    return mockUsers.filter(u => u.role === 'Supplier');
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage orders, suppliers, and monitor platform performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="dashboard-grid mb-8">
          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                  <p className="text-xs text-green-600 font-medium">+12% from last month</p>
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
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-secondary">₵{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 font-medium">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Suppliers</p>
                  <p className="text-2xl font-bold text-accent">{stats.activeSuppliers}</p>
                  <p className="text-xs text-green-600 font-medium">+2 new this month</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-orange-500">{stats.totalCustomers}</p>
                  <p className="text-xs text-green-600 font-medium">+15% from last month</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Management */}
          <div className="lg:col-span-2">
            <Card className="card-warm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                  {stats.pendingOrders > 0 && (
                    <Badge variant="destructive">
                      {stats.pendingOrders} pending assignment
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {statusFilters.map(filter => (
                    <Button
                      key={filter}
                      variant={selectedOrderFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedOrderFilter(filter)}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>

                {/* Orders Table */}
                <div className="space-y-4">
                  {filteredOrders.slice(0, 10).map(order => (
                    <Card key={order.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{order.recipeName}</h3>
                            <p className="text-sm text-muted-foreground">
                              #{order.id} • {order.customerName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.orderDate)} • {order.deliveryAddress}
                            </p>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              {order.ingredients.length} items
                            </span>
                            <span className="font-medium text-primary">
                              ₵{order.total.toLocaleString()}
                            </span>
                            {order.supplierName && (
                              <Badge variant="outline">
                                {order.supplierName}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!order.supplierId && order.status === 'Pending' && (
                              <Select
                                onValueChange={(value) => assignSupplier(order.id, value)}
                              >
                                <SelectTrigger className="w-[180px] h-8">
                                  <SelectValue placeholder="Assign supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getAvailableSuppliers().map(supplier => (
                                    <SelectItem key={supplier.id} value={supplier.id}>
                                      {supplier.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats and Actions */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Order Fulfillment</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Customer Satisfaction</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Supplier Response</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-[78%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Suppliers */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="text-lg">Top Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getAvailableSuppliers().map((supplier, index) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">{supplier.area}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {Math.floor(Math.random() * 20) + 5} orders
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(Math.random() * 5 + 4).toFixed(1)}★
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="text-foreground">New supplier registered</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-foreground">Order #ORD004 delivered</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="text-foreground">Customer support ticket resolved</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;