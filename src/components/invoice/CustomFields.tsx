'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { CustomField } from '@/lib/types/invoice';
import { generateId } from '@/lib/utils/invoice';

interface CustomFieldsProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

export function CustomFields({ fields, onChange }: CustomFieldsProps) {
  const addField = () => {
    onChange([...fields, { id: generateId(), label: '', value: '' }]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onChange(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    onChange(fields.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Custom Fields</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={addField}
          className="text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Field
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 text-center py-4 border border-dashed rounded-lg">
          No custom fields. Add fields like PO Number, Project Code, etc.
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="mb-1"
                />
                <Input
                  placeholder="Field Value"
                  value={field.value}
                  onChange={(e) => updateField(field.id, { value: e.target.value })}
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:text-red-600 mt-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
