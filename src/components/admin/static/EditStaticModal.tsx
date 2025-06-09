import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import { updateStatic, fetchAllStatics } from '@/store/action/static';
import BasicDemo from '@/components/editor';
interface EditStaticModalProps {
  staticId: number;
  initialTitle: string;
  initialDescription: string;
  initialIsActive: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditStaticModal: React.FC<EditStaticModalProps> = ({
  staticId,
  initialTitle,
  initialDescription,
  initialIsActive,
  open,
  setOpen
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    if (open) {
      setForm({
        title: initialTitle,
        description: initialDescription,
        isActive: initialIsActive,
      });
    }
  }, [open, initialTitle, initialDescription, initialIsActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, isActive: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error('All fields are required');
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      isActive: form.isActive,
      updatedBy: user?.id ?? 0,
    };

    try {
      const result = await dispatch(updateStatic({ id: staticId, payload })).unwrap();
      if (result.statusCode === HttpStatusCode.Ok) {
        toast.success(result.message ?? 'Static updated successfully');
        dispatch(fetchAllStatics());
        setOpen(false);
      } else {
        toast.error(result.message ?? 'Failed to update static');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Static Info</DialogTitle>
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
              className="h-20 overflow-y-auto"
            /> */}
            <BasicDemo value={form.description} onChange={(value) => setForm({...form, description:value})} />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleCheckboxChange}
              className="rounded"
            />
            <label htmlFor="isActive" className="select-none">
              Active
            </label>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Update Static
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
