import { HttpStatusCode } from "@/constants";
import { AppDispatch, useAppSelector } from "@/store";
import { subscribeOrder } from "@/store/action/order";
import { RootState } from "@/store/reducer";
import { Toast } from "@radix-ui/react-toast";
import { ChangeEvent, MouseEvent as ReactMouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Footer() {
  const { user } = useAppSelector((state:RootState)=> state.auth);
   const dispatch = useDispatch<AppDispatch>();
   const[formData , setFormData] = useState({
    email:"",
  }
  ) 
  const handleSubscribe = async(e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    console.log(formData);
    if(user?.id ){
       const response = await dispatch(subscribeOrder({ id: user?.id, payload: { email: formData.email } })).unwrap();
       if(response.statusCode === HttpStatusCode.OK){
         toast.success("Subscribed Successfully")
       }
       else{
        toast.error("Something went wrong")
       }
    }else{
     toast.error("Please login first")
    }
       
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    const {name , value} =  e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Deflux</h2>
            <p className="text-sm text-gray-400">
              Luxury redefined. Exceptional quality and unparalleled craftsmanship since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-us" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
            <p className="text-sm text-gray-400">Subscribe to receive updates, exclusive offers, and more.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={(e)=> handleChange(e)}
                className="p-2 text-sm rounded-md bg-gray-600 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                onClick={(e) => handleSubscribe(e)}
                className="p-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-red-700 text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Deflux. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}