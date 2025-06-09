import React, { use, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import {
  fetchAllStatics,
  deleteStatic,
} from '@/store/action/static';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { EditStaticModal } from './EditStaticModal';
import { AddStaticModal } from './AddStaticModal';
import { Static } from '@/store/types/static';

export const StaticList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { statics } = useAppSelector((state) => state.staticSelector);

  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState<Static | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllStatics());
  }, [dispatch]);

  const filteredList = statics.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteStatic(deleteId)).unwrap();
      toast.success('Static deleted successfully');
      setDeleteId(null);
      dispatch(fetchAllStatics());
    } catch {
      toast.error('Failed to delete');
    } finally {
      setConfirmDialogOpen(false);
    }
  };
 

  return (
    <div className="space-y-6">
      <div className="flex items-center dashmain justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Static Pages</h2>
          <p className="text-gray-500">Manage your static content pages</p>
        </div>
        <AddStaticModal />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              {/* <TableHead>Description</TableHead> */}
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  {/* <TableCell className='description'>{item.description ?? 'N/A'}</TableCell> */}
                  <TableCell>{item.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => {setEditItem(item); setOpen(true);}}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => {
                          setDeleteId(item.id);
                          setConfirmDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No static pages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Static"
        description="Are you sure you want to delete this static content?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {editItem && (
        <EditStaticModal
          staticId={editItem.id}
          initialTitle={editItem.title}
          initialDescription={editItem.description ?? ''}
          initialIsActive={editItem.isActive}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};
