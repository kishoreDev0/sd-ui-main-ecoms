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
import { Search,  Edit, Trash2 } from 'lucide-react';
import { AddFeatureModal } from './AddFeatureModal';
import { useDispatch } from 'react-redux';
import { fetchAllFeatures, updateFeature } from '@/store/action/feature';
import { AppDispatch, useAppSelector } from '@/store';
import { RootState } from '@/store/reducer';

// Import Dialog components from shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { HttpStatusCode } from '@/constants';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { toast } from 'sonner';
import { deleteCategory } from '@/store/action/category';

interface Feature {
  id: number;
  name: string;
  productId: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}


export const FeatureList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { features } = useAppSelector((state: RootState) => state.featureSelector);
    const { user } = useAppSelector((state: RootState) => state.auth);


  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  
  

  // For edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editFeature, setEditFeature] = useState<Feature | null>(null);
  const [editName, setEditName] = useState('');

  const filteredFeatures = features.filter((f: Feature) => {
    if (f?.name) {
      return f.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  useEffect(() => {
    dispatch(fetchAllFeatures());
  }, [dispatch]);

  // Open dialog and set form values
  const openEditDialog = (feature: Feature) => {
    setEditFeature(feature);
    setEditName(feature.name);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!editFeature) return;
    try {
      const result = await dispatch(
        updateFeature({
          id: editFeature.id,
          payload: {
            name: editName,
            updatedBy: user?.id ?? 0
          },
        })
      ).unwrap();
      if(result.statusCode === HttpStatusCode.OK){

      }
    } catch (error) {
      console.log(error);
    }

    setEditOpen(false);
    setEditFeature(null);
  };

  const handleDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      const result = await dispatch(deleteCategory(deleteCategoryId)).unwrap();
      if (result.statusCode === HttpStatusCode.OK) {
        console.log("deleted succesfully")
        toast.success(result.message || 'Category deleted successfully');
        dispatch(fetchAllFeatures())
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
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <p className="text-gray-500">Manage features for products</p>
        </div>
        <AddFeatureModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search features..."
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
                <TableHead>Created by</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature: Feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>{feature.createdBy?.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(feature)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-red-700"
                        onClick={() => {setConfirmDialogOpen(true);setDeleteCategoryId(feature.id)}}
                      >
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
      {/* delete dialog */}
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

      {/* Edit Feature Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
            <DialogDescription>Update the feature's name below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="feature-name" className="font-semibold">
                Name
              </label>
              <Input
                id="feature-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
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
