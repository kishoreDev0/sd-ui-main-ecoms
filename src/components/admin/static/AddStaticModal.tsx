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
import { AppDispatch, useAppSelector } from '@/store';
import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import { createStatic, fetchAllStatics } from '@/store/action/static';

export const AddStaticModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !form.title || !form.description) {
      toast.error('All fields are required');
      return;
    }

    const payload = {
      ...form,
      createdBy: user?.id ?? 0,
    };

    try {
      const result = await dispatch(createStatic({ staticData: payload })).unwrap();
      if (result.statusCode === HttpStatusCode.Created) {
        toast.success(result.message ?? 'Static added successfully');
        dispatch(fetchAllStatics());
        setForm({ isActive: false, title: '', description: '' });
        setOpen(false);
      } else {
        toast.error(result.message ?? 'Failed to add static');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="h-5 w-5" />
          Add Static
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Static Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <Input
              name="title"
              placeholder="Enter static title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            {/* <Textarea
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              className='h-20 overflow-y-auto'
            /> */}
            
           
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Static
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
