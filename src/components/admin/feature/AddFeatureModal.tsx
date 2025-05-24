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
import { createFeature } from '@/store/action/feature';
import { AppDispatch } from '@/store';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

// import { createFeature } from '@/store/action/features';

export const AddFeatureModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,   
      createdBy: 1, // replace with actual user ID from auth
    };
    try {
      const result = await dispatch(createFeature({ featureData: data })).unwrap();
      console.log(result)
      if(result?.statusCode === HttpStatusCode.Created){
        setOpen(false)
        toast.success(result?.message ?? "")
      }
      else{

      }
      
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-10 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
          <Plus className="h-6 w-6" />
          <span>Add Feature</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Feature</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Feature Name"
          />
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
