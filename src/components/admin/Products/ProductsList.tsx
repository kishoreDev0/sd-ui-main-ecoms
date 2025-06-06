
// import React, { useEffect, useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
// import {AddProductModal} from './AddProductModal';
// import { useDispatch } from 'react-redux';
// import { AppDispatch, useAppSelector } from '@/store';
// import { fetchAllProducts } from '@/store/action/products';
// import { RootState } from '@/store/reducer';
// import { ProductDetails } from '@/store/types/products';
// import { Dialog } from '@/components/ui/dialog';
// import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';



// export const ProductsList: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   // const [products] = useState<Product[]>([]);
//   const { products } = useAppSelector((state: RootState) => state.productSelector);
//   const dispatch = useDispatch<AppDispatch>();

//   // For edit dialog state
//     const [editOpen, setEditOpen] = useState(false);
  

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
//   );

//   useEffect(()=>{
//     dispatch(fetchAllProducts()); 
//   },[dispatch])
//   const handleSave = () => {
//     // Logic to save the edited product
//     setEditOpen(false);
//   };
//    ;

//   return (
//     <div className="space-y-6 dashmain">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Products</h2>
//           <p className="text-gray-500">Manage your product inventory</p>
//         </div>
//              <AddProductModal />
//       </div>

//       <Card className="p-6">
//         <div className="flex items-center gap-4 mb-6">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {/* {filteredProducts.map((product) => (
//                 <TableRow key={product.id}>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-10 h-10 rounded-lg object-cover bg-gray-100"
//                       />
//                       <span className="font-medium">{product.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>{product.category}</TableCell>
//                   <TableCell>${product.price}</TableCell>
//                   <TableCell>
//                     <span className={product.stock === 0 ? 'text-blue-600' : 'text-gray-900'}>
//                       {product.stock}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
//                       {product.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button variant="ghost" size="icon">
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon">
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon" className="text-blue-600 hover:text-red-700">
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))} */}
//               {
//                 filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell>
//                         <div className="flex items-center gap-3">
//                           {/* <img
//                             src={product.images[0] || '/placeholder.png'}
//                             alt={product.name}
//                             className="w-10 h-10 rounded-lg object-cover bg-gray-100"
//                           /> */}
//                           <span className="font-medium">{product.name}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{product.category?.id}</TableCell>
//                       <TableCell>${product.price}</TableCell>
//                       <TableCell>
//                         <span className={product.noOfStock === 0 ? 'text-blue-600' : 'text-gray-900'}>
//                           {product.noOfStock}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={product.inStock  ? 'default' : 'secondary'}>
//                           {product.inStock ? 'In Stock' : 'Out of Stock'}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Button variant="ghost" size="icon">
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon"
                         
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" className="text-blue-600 hover:text-red-700">
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center">
//                       No products found.
//                     </TableCell>
//                   </TableRow>
//                 )
//               }
//             </TableBody>
//           </Table>
//         </div>
//       </Card>

//       {/* Edit Feature Dialog */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Product</DialogTitle>
//             <DialogDescription>Update the feature's name below.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <label htmlFor="feature-name" className="font-semibold">
//                 Name
//               </label>
             
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button onClick={handleSave}>Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>



//     </div>
    
//   );
// };

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { AddProductModal } from './AddProductModal';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { fetchAllProducts, updateProduct, deleteProduct } from '@/store/action/products';
import { RootState } from '@/store/reducer';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import { toast } from 'sonner';

export const ProductsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { categories } = useAppSelector((state: RootState) => state.categorySelector);
  const dispatch = useDispatch<AppDispatch>();

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditDialog = (product: any) => {
    // Clone product to avoid direct mutation
    setEditData({ ...product, categoryId: product.category?.id, images: product.images || [] });
    setEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    setEditData((prev: any) => prev ? {
      ...prev,
      [name]: type === 'checkbox' && target instanceof HTMLInputElement ? target.checked : value
    } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const readers = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Remove the "data:image/xxx;base64," prefix
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(images => {
      setEditData((prev: any) => prev ? { ...prev, images } : null);
    });
  };

  const handleSave = () => {
    if (editData) {
      const payload = {
        name: editData.name,
        description: editData.description,
        imagesPath: editData.images || [],
        categoryId: Number(editData.categoryId),
        features: editData.features.map(Number) || [],
        price: Number(editData.price),
        noOfStock: Number(editData.noOfStock),
        totalNoOfStock: Number(editData.noOfStock ?? 0),
        inStock: Boolean(editData.inStock),
        updatedBy: Number(user?.id ?? 0)
      };
      dispatch(updateProduct({ id: editData.id, payload }));
      setEditOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    try{
        const result = await dispatch(deleteProduct(id)).unwrap();
        if (result.statusCode === 200) {
          // Optionally, you can show a success message or refresh the product list
          dispatch(fetchAllProducts());
          toast.success(result.message ?? 'Product deleted successfully');
          dispatch(fetchAllProducts());
        }
        else{
           toast.success(result.message ?? 'Product deleted successfully');
        }

    }catch (error) {
      console.log(error)
    }
  };


  


  return (
    <div className="space-y-6 dashmain">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <AddProductModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img
                          src={`data:image/jpeg;base64,${product?.images[0]}`}
                          alt={product?.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        />
                      )}
                      <span className="font-medium">{product?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product?.category?.categoryName ?? 'N/A'}</TableCell>
                  <TableCell>${product?.price}</TableCell>
                   <TableCell>{product?.totalNoOfStock}</TableCell>
                  <TableCell>
                    <span className={product?.noOfStock === 0 ? 'text-blue-600' : 'text-gray-900'}>
                      {product?.noOfStock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product?.inStock ? 'default' : 'secondary'}>
                      {product?.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      
      <Dialog  open={editOpen} onOpenChange={setEditOpen} >
        <DialogContent className='max-w-6xl'>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Modify the fields below and save changes.</DialogDescription>
          </DialogHeader>
              <div className="promain">
                  <div className="prodiv1">
                       <Input
              name="name"
              value={editData?.name ?? ''}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="description"
              value={editData?.description ?? ''}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <Input
              type="number"
              name="price"
              value={editData?.price ?? 0}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <Input
              type="number"
              name="noOfStock"
              value={editData?.noOfStock ?? 0}
              onChange={handleInputChange}
              placeholder="Stock"
            />
            <select
              name="categoryId"
              value={editData?.categoryId ?? ''}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
            >
              <option value="" disabled>Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <label>In Stock:</label>
              <input
                type="checkbox"
                name="inStock"
                checked={editData?.inStock ?? false}
                onChange={handleInputChange}
              />
            </div>
                  </div>
                  <div className="prodiv2">
                      <div className="grid gap-4 py-4">
           
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap gap-2">
              {editData?.images?.map((img: string, idx: number) => (
                
                <img
                  key={idx}
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`preview-${idx}`}
                  className="w-16 h-16 rounded object-cover"
                />
              ))}
             

            </div>
          </div>
                  </div>
              </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
