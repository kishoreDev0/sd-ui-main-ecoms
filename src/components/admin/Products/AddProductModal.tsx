import React, { useEffect, useState, useCallback } from 'react';
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
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/store/action/products';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AppDispatch, useAppSelector } from '@/store';
import { fetchAllCategorys } from '@/store/action/category';
import { fetchAllFeatures } from '@/store/action/feature';
import { HttpStatusCode } from '@/constants';
import { toast } from 'react-toastify';

export const AddProductModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categorySelector);
  const { features } = useAppSelector((state) => state.featureSelector);

  // Form state
  const [selectedOptions1, setSelectedOptions1] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    noOfStock: '',
    inStock: true,
  });

  // Image files and previews
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const animatedComponents = makeAnimated();

  // Drag-and-drop sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle image input change: set files and generate preview URLs
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);

      // Clean up old previews before setting new ones to avoid memory leaks
      previews.forEach(url => URL.revokeObjectURL(url));

      setImages(fileList);
      const previewUrls = fileList.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Handle drag end event for image reordering
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = previews.findIndex(p => p === active.id);
      const newIndex = previews.findIndex(p => p === over.id);
      setPreviews((prev) => arrayMove(prev, oldIndex, newIndex));
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  // Convert File[] to base64 strings array
  const convertFilesToBase64 = useCallback((files: File[]): Promise<string[]> =>
    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          })
      )
    ), []);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imagesBase64 = await convertFilesToBase64(images);
      const data = {
        ...formData,
        categoryId: Number(formData.categoryId),
        price: parseFloat(formData.price),
        noOfStock: Number(formData.noOfStock),
        features: selectedOptions1.map((option: { value: any }) => option.value) ?? [],
        createdBy: user?.id ?? 0,
        imagesPath: imagesBase64,
        inStock: Boolean(formData.inStock),
      };

      // Dispatch redux action to create product
     const result = await dispatch(createProduct({ productData: data })).unwrap();
      if(result.statusCode === HttpStatusCode.CREATED){
          // Reset form and previews after successful submit
          setFormData({
            name: '',
            description: '',
            categoryId: '',
            price: '',
            noOfStock: '',
            inStock: true,
          });
          setImages([]);
          previews.forEach(url => URL.revokeObjectURL(url)); // Clean up URLs
          setPreviews([]);
          setSelectedOptions1([]);
          toast.success(result.message ?? 'Product successfully created')
      }
      else{
          toast.success(result.message ?? 'Product has not created')

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle text input and select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle multi-select change for features
  const handleChangeSelect1 = (selected: any) => {
    setSelectedOptions1(selected ?? []);
  };

  // Map features for react-select options
  const options1 = features?.map((feature: { id: any; name: any }) => ({
    value: feature.id,
    label: feature.name,
  })) || [];

  // Fetch categories and features on mount
  useEffect(() => {
    dispatch(fetchAllCategorys());
    dispatch(fetchAllFeatures());

    // Clean up URLs on unmount to prevent memory leaks
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [dispatch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="promain">
            <div className="prodiv1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Product Name</label>
                  <Input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Price</label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Stock Quantity</label>
                  <Input
                    required
                    type="number"
                    name="noOfStock"
                    value={formData.noOfStock}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Category</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option disabled value="">
                      Select the category
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName ?? 'Uncategorized'}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <label className="text-sm">In Stock</label>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <Textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Features</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={handleChangeSelect1}
                  value={selectedOptions1}
                  options={options1}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                    }),
                  }}
                />
              </div>
            </div>
            <div className="prodiv2">
              <div>
                <label className="block mb-1 text-sm font-medium">Upload Images</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previews.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={previews}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {previews.map((src) => (
                          <SortableImage key={src} id={src} src={src} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SortableImage = ({ id, src }: { id: string; src: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move"
    >
      <img
        src={src}
        alt="preview"
        className="h-24 w-full object-cover rounded-lg border"
      />
    </div>
  );
};
