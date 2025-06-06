"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Heart, Search, MoreHorizontal, Trash, ShoppingCart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog"
import { useToast } from "../../hooks/use-toast"
import { Badge } from "../../components/ui/badge"

const WishlistList = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Mock data - in a real app, you would fetch this from your API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      product_id: 1,
      product_name: "Smartphone X",
      user_id: 3,
      user_name: "jane_smith",
      status: "active",
      created_at: "2023-06-15T10:30:00Z",
    },
    {
      id: 2,
      product_id: 2,
      product_name: "Laptop Pro",
      user_id: 4,
      user_name: "robert_johnson",
      status: "active",
      created_at: "2023-06-20T14:45:00Z",
    },
    {
      id: 3,
      product_id: 3,
      product_name: "Wireless Earbuds",
      user_id: 5,
      user_name: "emily_davis",
      status: "inactive",
      created_at: "2023-06-25T09:15:00Z",
    },
    {
      id: 4,
      product_id: 4,
      product_name: "Smart Watch",
      user_id: 3,
      user_name: "jane_smith",
      status: "active",
      created_at: "2023-07-01T16:20:00Z",
    },
    {
      id: 5,
      product_id: 5,
      product_name: "Digital Camera",
      user_id: 4,
      user_name: "robert_johnson",
      status: "inactive",
      created_at: "2023-07-05T11:10:00Z",
    },
  ])

  const filteredItems = wishlistItems.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call your API to delete the wishlist item
    setWishlistItems(wishlistItems.filter((item) => item.id !== selectedItem.id))
    setDeleteDialogOpen(false)

    toast({
      title: "Wishlist item removed",
      description: `${selectedItem.product_name} has been removed from the wishlist.`,
    })
  }

  const handleAddToCart = (item) => {
    // In a real app, you would call your API to add the item to cart
    toast({
      title: "Added to cart",
      description: `${item.product_name} has been added to the cart.`,
    })
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600"
      case "inactive":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Wishlist</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search wishlist..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Heart className="h-10 w-10 mb-2" />
                    <p>No wishlist items found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product_name}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAddToCart(item)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(item)}>
                          <Trash className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from Wishlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{selectedItem?.product_name}" from the wishlist? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WishlistList
