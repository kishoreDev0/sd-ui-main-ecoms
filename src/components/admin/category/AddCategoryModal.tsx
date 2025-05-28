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
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createCategory } from '@/store/action/category';
import { AppDispatch, useAppSelector } from '@/store';
import { HttpStatusCode } from '@/constants';
import { toast } from 'react-toastify';
import { Checkbox } from '@/components/ui/checkbox';

export const AddCategoryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [categoryName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      categoryName,
      description,
      isActive,
      createdBy: user?.id ?? 1,
    };

    try {
      const result = await dispatch(createCategory({ categoryData: data })).unwrap();
      if (result?.statusCode === HttpStatusCode.CREATED) {
        setOpen(false);
        setName('');
        setDescription('');
        setIsActive(true);
        toast.success(result?.message ?? 'Category created');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="category-name" className="font-medium text-sm text-gray-700">
              Name
            </label>
            <Input
              id="category-name"
              required
              value={categoryName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category-description" className="font-medium text-sm text-gray-700">
              Description
            </label>
            <Input
              id="category-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category Description"
            />
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="is-active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(!!checked)}
            />
            <label htmlFor="is-active" className="text-sm font-medium">
              Active
            </label>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
