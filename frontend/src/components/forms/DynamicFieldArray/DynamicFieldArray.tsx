// Dynamic field array component for adding/removing items

import type { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DynamicFieldArrayProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
  emptyMessage?: string;
  maxItems?: number;
}

export function DynamicFieldArray<T>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = 'Add Item',
  emptyMessage = 'No items added yet.',
  maxItems,
}: DynamicFieldArrayProps<T>) {
  const canAddMore = !maxItems || items.length < maxItems;

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <Card className="border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </Card>
      ) : (
        items.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">{renderItem(item, index)}</div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))
      )}
      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        disabled={!canAddMore}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        {addLabel}
        {maxItems && ` (${items.length}/${maxItems})`}
      </Button>
    </div>
  );
}
