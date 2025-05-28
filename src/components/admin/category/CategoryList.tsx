import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { AddCategoryModal } from './AddCategoryModal';
import { useDispatch } from 'react-redux';
import { deleteCategory, fetchAllCategorys, updateCategory } from '@/store/action/category';
import { AppDispatch, useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { HttpStatusCode } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import ConfirmationDialog from '@/components/confirmation-dialog';

interface Category {
  id: number;
  categoryName: string;
  description: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export const CategoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useAppSelector((state: RootState) => state.categorySelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const filteredCategories = categories.filter((cat: Category) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllCategorys());
  }, [dispatch]);

  const openEditDialog = (category: Category) => {
    setEditCategory(category);
    setEditName(category.categoryName);
    setEditDescription(category.description);
    setEditIsActive(category.isActive);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!editCategory) return;
    try {
      const result = await dispatch(
        updateCategory({
          id: editCategory.id,
          payload: {
            categoryName: editName,
            description: editDescription,
            isActive: editIsActive,
            updatedBy: user?.id ?? 0,
          },
        })
      ).unwrap();

      if (result.statusCode === HttpStatusCode.OK) {
        // Optionally show success toast
        toast.success(result.message || 'Category updated successfully');
      }
      else{
        // Show error toast if the update failed
        toast.error(result.message || 'Failed to update category');
      }
    } catch (error) {
      console.log(error);
    }

    setEditOpen(false);
    setEditCategory(null);
  };
  const handleDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      const result = await dispatch(deleteCategory(deleteCategoryId)).unwrap();
      if (result.statusCode === HttpStatusCode.OK) {
        console.log("deleted succesfully")
        toast.success(result.message || 'Category deleted successfully');
        dispatch(fetchAllCategorys())
      } else {
        toast.error(result.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }

    setConfirmDialogOpen(false);
  }

  return (
    <div className="space-y-6 dashmain">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-500">Manage product categories</p>
        </div>
        <AddCategoryModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
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
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((cat: Category) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.categoryName}</TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>{cat.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(cat)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => {setConfirmDialogOpen(true);setDeleteCategoryId(cat.id)}} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete category"
        description="Are you sure you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="category-name" className="font-semibold">
                Name
              </label>
              <Input
                id="category-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category-description" className="font-semibold">
                Description
              </label>
              <Input
                id="category-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="is-active"
                checked={editIsActive}
                onCheckedChange={(checked) => setEditIsActive(!!checked)}
              />
              <label htmlFor="is-active" className="text-sm font-medium">
                Active
              </label>
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
