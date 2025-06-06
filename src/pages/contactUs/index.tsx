import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { AppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createContact } from "@/store/action/contact";
import { HttpStatusCode } from "@/constants";

const ContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    queryOn: "",
    orderId: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAppSelector((state:RootState)=> state.auth)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (submitted) {
      // Re-validate on change if form has already been submitted
      if (e.target.value.trim() === "" && ["firstName", "lastName", "email", "message"].includes(e.target.name)) {
        setErrors(prev => ({ ...prev, [e.target.name]: "Please enter this field" }));
      } else {
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
      }
    }
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Please enter this field";
    if (!formData.lastName.trim()) newErrors.lastName = "Please enter this field";
    if (!formData.email.trim()) newErrors.email = "Please enter this field";
    if (!formData.description.trim()) newErrors.description = "Please enter this field";
    console.log(errors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // You can handle the API call here
        if(user?.id){
                const response = await dispatch(createContact({categoryData: {
                  ...formData,
                  isActive: true,
                  createdBy: user?.id 
                }})).unwrap();
                if(response.statusCode === HttpStatusCode.CREATED){
                  toast.success("Your inquiry has been sent successfully")
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    companyName: "",
                    queryOn: "",
                    orderId: "",
                    description: "",
                  })
                }else{

                }
        }
        else{
            toast.error('Login to submit your request')
        }
    }
  };

  return (
    <main className="bg-white min-h-screen font-sans relative overflow-hidden">
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row gap-10 animate-fade-in">
        <section className="flex justify-center flex-col space-y-6 width-40%">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Contact Us</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            We work with many e-commerce businesses to provide seamless shopping experiences.
          </p>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Email Address</h3>
            <p className="text-base sm:text-lg font-medium text-blue-600">inquiry@deflux.com</p>
          </div>
          <Button
            
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-semibold transition-transform duration-300"
          >
            Book a Calendy Call
          </Button>
        </section>

        <section className=" width-60% bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6 animate-fade-in w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                  placeholder="Enter your first name..."
                />
                {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                  placeholder="Enter your last name..."
                />
                {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                  placeholder="Enter your email..."
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Email and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                  placeholder="Enter your company name..."
                />
              </div>
               <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  What are you interested in?
                </label>
                <select
                  id="interest"
                  name="queryOn"
                  value={formData.queryOn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                >
                  <option value="">Select an option...</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="order-support">Order Support</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 outline-none transition-all duration-300"
                  placeholder="Enter your order number..."
                />
              </div>
            </div>

            {/* Interest and Order Number */}
           

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Main Message*
              </label>
              <textarea
                id="message"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 outline-none transition-all duration-300"
                rows={5}
                placeholder="Enter your main message..."
              />
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-4 text-base font-semibold uppercase tracking-wide transition-transform duration-300"
            >
              <Send className="mr-2 h-5 w-5" /> Submit Form
            </Button>
          </form>
        </section>
      </div>

      
    </main>
  );
};

export default ContactUs;
