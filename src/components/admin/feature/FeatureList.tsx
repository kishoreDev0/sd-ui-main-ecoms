import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { AddFeatureModal } from './AddFeatureModal';
import { useDispatch } from 'react-redux';
import { fetchAllFeatures } from '@/store/action/feature';
import { AppDispatch } from '@/store';

interface Feature {
  name: string;
  productId: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export const FeatureList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [feature, setFeature] = useState<Feature>({
    name: '',
    productId: 0,
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  })


  // const filteredFeatures = feature.filter((f) =>
  //   f.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  useEffect(()=>{
      async function fetchStart(){
        dispatch(fetchAllFeatures())
      }
      fetchStart();
  },[])

  return (
    <div className="space-y-6 dashmain">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <p className="text-gray-500">Manage features for product #</p>
        </div>
        <AddFeatureModal  />
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {filteredFeatures.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
