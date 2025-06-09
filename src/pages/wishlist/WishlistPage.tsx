import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash, ShoppingCart, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { fetchWishlistByUserId, moveWishlistlist, updateWishlistlist } from "@/store/action/wishlist";
import { fetchAllProducts } from "@/store/action/products";
import { HttpStatusCode } from "@/constants";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const { userList } = useAppSelector((state: RootState) => state.wishlistSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const [filterProd, setFilterProd] = useState<any[]>();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async (item: { id: number; name: string; price: number; image: string }) => {
    try {
      const result = await dispatch(
        moveWishlistlist({
          id: user?.id ?? 0,
          payload: {
            productId: item.id,
            updatedBy: user?.id ?? 0,
          },
        })
      ).unwrap();
      if (result.statusCode === HttpStatusCode.OK) {
        toast.success(result?.message ?? "Product moved to cart successfully");
      } else {
        toast.error(result?.message ?? "Product has not moved to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchWishlistByUserId(user?.id ?? 0));
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!userList || userList.length === 0) return;
    const productIds = userList.map((id: string | number) => Number(id));
    const filteredWish = products.filter((product) => productIds.includes(product.id));
    setFilterProd(filteredWish);
  }, [userList, products]);

  const handleToggleWishlist = async (e: { preventDefault: () => void }, productId: number) => {
    e.preventDefault();
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
        dispatch(fetchAllProducts());
        dispatch(fetchWishlistByUserId(user?.id ?? 0));
        toast.success(response.message ?? "Wishlist successfully updated");
      } else {
        toast.error(response.message ?? "Wishlist has not updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filterProd)

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Items you've saved for future consideration.
        </p>

        {filterProd && filterProd === undefined ? (
          <div className="text-center py-16 bg-white rounded-md shadow-sm">
            <Heart className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Browse our collection and add your favorite items to your wishlist.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-red-700 text-white rounded-md py-2 px-6 text-sm font-medium">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-md shadow-sm mb-6">
              <div className="hidden md:grid grid-cols-5 py-4 px-6 bg-gray-50 border-b border-gray-200 font-semibold text-gray-900 text-sm">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div className="col-span-2">Actions</div>
              </div>

              {filterProd &&
                filterProd.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-5 py-4 px-6 gap-4 items-center border-b border-gray-200"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-2 flex items-center gap-4">
                      <Link to={`/products/${item.id}`} className="h-16 w-16 flex-shrink-0">
                        <img
                          src={"item.image"}
                          alt={item.name}
                          className="h-full w-full object-cover rounded-sm"
                        />
                      </Link>
                      <Link
                        to={`/products/${item.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="text-sm font-semibold text-gray-900">
                      ${item.price.toLocaleString()}
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex flex-wrap gap-3">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-blue-600 hover:bg-red-700 text-white rounded-md py-2 px-4 text-sm font-medium"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => handleToggleWishlist(e, item.id)}
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md py-2 px-4 text-sm font-medium"
                      >
                        <Trash className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                asChild
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md py-2 px-4 text-sm font-medium"
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;