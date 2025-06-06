import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { RootState } from "@/store/reducer";
import { AppDispatch, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/store/action/products";
import { fetchAllCategorys } from "@/store/action/category";
import { fetchWishlistByUserId, updateWishlistlist } from "@/store/action/wishlist";

import { toast } from "react-toastify";
import { HttpStatusCode } from "@/constants";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { categories } = useAppSelector((state: RootState) => state.categorySelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { userList } = useAppSelector((state: RootState) => state.wishlistSelector);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || String(product?.category?.id) === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategorys());
    async function startFetch() {
      if (user?.id !== undefined) {
        await dispatch(fetchWishlistByUserId(user.id)).unwrap();
      }
    }
    startFetch();
  }, [dispatch]);

  const handleToggleWishlist = async (e: { preventDefault: () => void }, productId: number) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please login first!");
      return;
    }

    try {
      const response = await dispatch(
        updateWishlistlist({
          id: user?.id ?? 0,
          payload: {
            productId,
            updatedBy: user?.id ?? 0,
          },
        })
      ).unwrap();
      if (response.statusCode === HttpStatusCode.OK) {
        toast.success(response.message ?? "Wishlist successfully updated");
      } else {
        toast.error(response.message ?? "Wishlist has not updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Collection</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Browse our curated selection of premium products, crafted with elegance and precision.
          </p>
        </div>

        {/* Mobile Filters Toggle */}
        <Button
          variant="outline"
          className="w-full mb-6 flex items-center justify-between md:hidden bg-white border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="font-medium">Filters & Sorting</span>
          {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 space-y-6 ${showFilters ? "block" : "hidden"} md:block`}>
            {/* Categories Filter */}
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="all" className="ml-2 text-sm text-gray-700">All Categories</label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={String(category.id)}
                      name="category"
                      checked={selectedCategory === String(category.id)}
                      onChange={() => setSelectedCategory(String(category.id))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-600"
                    />
                    <label className="ml-2 text-sm text-gray-700 capitalize">{category?.categoryName ?? ""}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h2>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200000]}
                  max={200000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort By Filter */}
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-gray-300 rounded-md focus:ring-blue-600">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4">
            {sortedProducts.length === 0 ? (
              <div className="h-60 flex items-center justify-center bg-white rounded-md shadow-sm">
                <p className="text-gray-600">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => {
                  const isWishlisted = userList ? userList.includes(String(product.id)) : false;
                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={"loco.png"}
                      inStock={product.inStock}
                      isWishlisted={isWishlisted}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;