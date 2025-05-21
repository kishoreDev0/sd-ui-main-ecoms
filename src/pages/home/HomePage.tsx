
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/product";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <>
    <div className="caroudiv">
      <Carousel>
        <CarouselContent>
          <CarouselItem> 
            <section className="py-25 relative flex items-center justify-center text-white">
              <div className="absolute inset-0 bg-luxury-navy z-0">
                <img 
                  src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000" 
                  alt="Luxury Products" 
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="container mx-auto px-4 z-10 text-center">
                <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Redefining Luxury</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Discover our curated collection of the finest luxury goods 
                  crafted with unparalleled attention to detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90">
                    <Link to="/products">Shop Collection</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/products" className="text-black">Explore New Arrivals</Link>
                  </Button>
                </div>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem >
            <section className="py-25 relative flex items-center justify-center text-white">
              <div className="absolute inset-0 bg-luxury-navy z-0">
                <img 
                  src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000" 
                  alt="Luxury Products" 
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="container mx-auto px-4 z-10 text-center">
                <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Redefining Luxury</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Discover our curated collection of the finest luxury goods 
                  crafted with unparalleled attention to detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90">
                    <Link to="/products">Shop Collection</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/products" className="text-black">Explore New Arrivals</Link>
                  </Button>
                </div>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem > 
            <section className="py-25 relative flex items-center justify-center text-white">
              <div className="absolute inset-0 bg-luxury-navy z-0">
                <img 
                  src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000" 
                  alt="Luxury Products" 
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="container mx-auto px-4 z-10 text-center">
                <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Redefining Luxury</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Discover our curated collection of the finest luxury goods 
                  crafted with unparalleled attention to detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90">
                    <Link to="/products">Shop Collection</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/products" className="text-black">Explore New Arrivals</Link>
                  </Button>
                </div>
              </div>
            </section>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious  className="cprev"/>
        <CarouselNext className="cnext" />
      </Carousel>
    </div>
    
      
      {/* Hero Section */}
      
      {/* <section className="py-25 relative flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-luxury-navy z-0">
          <img 
            src="https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?q=80&w=1000" 
            alt="Luxury Products" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Redefining Luxury</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our curated collection of the finest luxury goods 
            crafted with unparalleled attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90">
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/products" className="text-black">Explore New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section> */}
      
      {/* Categories Section */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000" 
                alt="Jewelry" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-medium text-white mb-3">Jewelry</h3>
                  <Button asChild variant="secondary">
                    <Link to="/products">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544117519-cc4b5c5b9696?q=80&w=1000" 
                alt="Watches" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-medium text-white mb-3">Watches</h3>
                  <Button asChild variant="secondary">
                    <Link to="/products">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000" 
                alt="Accessories" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-medium text-white mb-3">Accessories</h3>
                  <Button asChild variant="secondary">
                    <Link to="/products">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-luxury-gold hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                inStock={product.inStock}
              />
            ))}
          </div>
        </div>
      </section>
      
    
    </>
  );
};

export default HomePage;
