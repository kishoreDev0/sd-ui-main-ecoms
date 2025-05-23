import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Package, Users, ShieldCheck, Heart, ShoppingCart } from "lucide-react"

const Dashboard = () => {
  // In a real app, you would fetch this data from your API
  const stats = [
    { title: "Total Products", value: 120, icon: Package, color: "bg-blue-100 text-blue-600" },
    { title: "Total Users", value: 543, icon: Users, color: "bg-green-100 text-green-600" },
    { title: "Roles", value: 3, icon: ShieldCheck, color: "bg-purple-100 text-purple-600" },
    { title: "Wishlist Items", value: 89, icon: Heart, color: "bg-pink-100 text-pink-600" },
    { title: "Cart Items", value: 32, icon: ShoppingCart, color: "bg-orange-100 text-orange-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">Product {item}</p>
                    <p className="text-sm text-muted-foreground">${Math.floor(Math.random() * 100) + 10}.99</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 100) + 10} in stock
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">User {item}</p>
                    <p className="text-sm text-muted-foreground">user{item}@example.com</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    Joined {Math.floor(Math.random() * 10) + 1} days ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
