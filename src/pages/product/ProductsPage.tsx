
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
import { fetchWishlistByUserId,  updateWishlistlist } from "@/store/action/wishlist";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch<AppDispatch>();


  const { products } = useAppSelector((state:RootState)=> state.productSelector);
  const { categories } = useAppSelector((state:RootState)=> state.categorySelector);
  const { user } = useAppSelector((state:RootState)=> state.auth);
  const { userList } = useAppSelector((state:RootState)=> state.wishlistSelector)
  
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
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



  useEffect( ()=>{
        dispatch(fetchAllProducts());
        dispatch(fetchAllCategorys());
       async function startFetch(){
         if (user?.id !== undefined) {
           await dispatch(fetchWishlistByUserId(user.id)).unwrap();
          
        }
       }
       startFetch();
         
  },[dispatch]);
  
    const handleToggleWishlist = async (e: { preventDefault: () => void; }, productId: number) => {
      e.preventDefault();
      console.log(productId);

      try {
        const response = await dispatch(
          updateWishlistlist({
            id: user?.id ?? 0,
            payload: {
              productId,
              updatedBy: user?.id ?? 0
            } 
          })
        ).unwrap();
        if(response.statusCode === HttpStatusCode.Ok){
          toast.success(response.message ?? 'Wishlist successfully updated')
        }
        else{
          toast.error(response.message ?? 'Wishlist has not updated')
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Our Collection</h1>
          <p className="text-muted-foreground">
            Discover our curated selection of luxury pieces, each crafted with exceptional attention to detail.
          </p>
        </div>
        
        {/* Mobile Filters Toggle */}
        <Button
          variant="outline"
          className="w-full mb-4 flex items-center justify-between md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters & Sorting</span>
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="font-medium text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="mr-2"
                  />
                  <label htmlFor="all" className="text-sm">All Categories</label>
                </div>
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={String(category.id)}
                      name="category"
                      checked={selectedCategory === String(category.id)}
                      onChange={() => setSelectedCategory(String(category.id))}
                      className="mr-2"
                    />
                    <label  className="text-sm capitalize">{category?.categoryName ?? ''}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="font-medium text-lg mb-4">Price Range</h2>
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
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="font-medium text-lg mb-4">Sort By</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
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
              <div className="h-60 flex items-center justify-center">
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products && products.map(product => {
                        const isWishlisted = userList 
                          ? userList.includes(String(product.id))
                          : false;
                        return (
                          <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={"loco.png"}
                            inStock={product.inStock}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}  // pass handler here
                          />
                        );
                      })}
                    </div>
            )}
          </div>
        </div>
      </div>
      

    </>
  );
};

export default ProductsPage;
