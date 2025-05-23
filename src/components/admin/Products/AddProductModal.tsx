import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {createProduct} from '@/store/action/products';

export const AddProductModal: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    name: '',
    description: '',
    collectionImage: '',
    price: 0,
    stock: 0,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImages(fileList);
      setPreviewUrls(fileList.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formdata);
    console.log('Images:', images);
    const data = {
      name: formdata.name,
      description: formdata.description,
      collectionImage: images,
      price: formdata.price,
      stock: formdata.stock

    }
    try{
      // dispatch(createProduct({productData:data}))

    }catch(error){
      console.log(error)
    }
    
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="  w-10 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
          <Plus className="h-6 w-6" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input required name='name' onChange={handleChange} value={formdata.name} placeholder="Product Name" />
            <Input required name='price' onChange={handleChange} type="number" value={formdata.price} placeholder="Price" min="0" />
            <Input required name='stock' onChange={handleChange} type="number" value={formdata.stock} placeholder="Stock Quantity" min="0" />
          </div>
          <Textarea required name='description' onChange={handleChange} value={formdata.description} placeholder="Product Description" />
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Upload Images</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {previewUrls.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="h-24 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
