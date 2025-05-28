import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { createCart } from '@/store/action/cart'; // your redux action
import { AppDispatch, useAppSelector } from '@/store';
import { fetchAllUsers } from '@/store/action/user';
import { fetchAllProducts } from '@/store/action/products';
import { toast } from 'react-toastify';
import { HttpStatusCode } from '@/constants';

export const AddCartModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.userSelector);
  const { products } = useAppSelector((state) => state.productSelector);
  const [ selectedOptions, setSelectedOptions] = useState<any>([]);
    const [open, setOpen] = useState(false);
  

  const animatedComponents = makeAnimated();    

  // Select user for cart - default current logged user
  type UserOption = { label: string; value: number };
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const userOptions: UserOption[] = users.map((user) => {
    return { label: user.firstName ?? '', value: user.id ?? 0 };
  });
  const handleChange = (selected: any) => {
    console.log(selected)
    setSelectedOptions(selected); 
  };


  const productOptions =
    products?.map((prod) => ({
      value: prod.id,
      label: prod.name,
    })) || [];

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedUser ){
        toast.error('Select atleast one user')
        return;
    }
    if (selectedOptions.length === 0) {
        toast.error('Select atleast one product')
        return;
    }

    const cartData = {
      userId: selectedUser?.value ?? null,
      productIds: selectedOptions.map((p: { value: any; }) => p.value),
      createdBy: user?.id ?? 0,
    };
    try{
        const result = await dispatch(createCart({cartData: cartData})).unwrap();
        if(result.statusCode === HttpStatusCode.CREATED){
            toast.success(result.message ?? 'Cart sucessfully created')
            setSelectedUser(null)
            setSelectedOptions([])
            setOpen(false)
        }
        else{
             toast.success(result.message ?? 'Cart has not created')
        }

    }catch(error){
        console.log(error)
    }


  
    
  };
  useEffect(()=>{
        dispatch(fetchAllUsers())
        dispatch(fetchAllProducts())
    },[dispatch])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
        <Button onClick={()=> setOpen(true)} className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200">
          Add to Cart
        </Button>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Cart</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Optional user select if you want to choose user manually */}
         
            <div>
              <label className="block mb-1 text-sm font-medium">User</label>
              <Select
                components={animatedComponents}
                options={userOptions}
                value={selectedUser}
                onChange={(val) => setSelectedUser(val)}
                placeholder="Select user"
                isClearable
              />
            </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Products</label>
           <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={handleChange}
                        styles={{
                          control: (baseStyles, _) => ({
                            ...baseStyles,
                            backgroundColor: '#fff',
                            
                            color: '#000 ',
                          }
                          ),
                        }}
                        options={productOptions}
                      />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
              Add Cart
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
