import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/store/action/products";
import { Category } from "@/store/types/categort";
import { fetchAllCategorys } from "@/store/action/category";
import { HttpStatusCode } from "@/constants";
import { fetchWishlistByUserId, updateWishlistlist } from "@/store/action/wishlist";
import { toast } from "react-toastify";

const HomePage = () => {
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { userList } = useAppSelector((state: RootState) => state.wishlistSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { categories } = useAppSelector((state: RootState) => state.categorySelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategorys());
    if(user?.id ) dispatch(fetchWishlistByUserId(user?.id ?? 0));
  }, [dispatch]);
 
  const handleToggleWishlist = async (e: { preventDefault: () => void }, productId: number) => {
    e.preventDefault();
    if(!user?.id ){
      toast.warning("Please login first")
      return ;
    }
    if(user?.id){
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
        if(user?.id )dispatch(fetchWishlistByUserId(user?.id ?? 0));
        dispatch(fetchAllProducts());
      } else {
        toast.error(response.message ?? "Wishlist has not updated");
      }
    } catch (error) {
      console.log(error);
    }
    }
  
  };

  

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-start text-white bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000"
          alt="Luxury Products"
          className="w-full h-full object-cover absolute inset-0 opacity-30"
        />
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Shop the Finest Collection</h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Discover premium products crafted for elegance and quality.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-red-700 rounded-md text-white font-medium">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md font-medium"
            >
              <Link to="/products">Explore More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <Carousel>
            <CarouselContent>
              {["New Releases", "Top Picks", "Exclusive Offers"].map((title, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-80 rounded-md overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000"
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                        <Button asChild variant="secondary" className="bg-blue-600 hover:bg-red-700 text-white rounded-md">
                          <Link to="/products">Discover {title}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full" />
            <CarouselNext className="right-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full" />
          </Carousel>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories &&
              categories.map((cate: Category) => (
                <Link
                  key={cate.id}
                  to="/products"
                  className="group relative overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000"
                    alt={cate.categoryName}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-white">{cate?.categoryName ?? ""}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="flex items-center text-blue-600 hover:text-red-700 font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products &&
              products.map((product) => {
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
        </div>
      </section>
    </div>
  );
};

export default HomePage;