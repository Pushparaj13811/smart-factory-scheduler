// Dynamic form builder component

import type { ReactNode } from 'react';
import type { UseFormReturn, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchableSelect, type SearchableSelectOption } from '@/components/forms/SearchableSelect';
import { MultiSelect, type MultiSelectOption } from '@/components/forms/MultiSelect';
import { DateTimePicker } from '@/components/forms/DateTimePicker';
import { QuantityInput } from '@/components/forms/QuantityInput';

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'searchable-select'
  | 'multi-select'
  | 'checkbox'
  | 'switch'
  | 'date'
  | 'datetime'
  | 'quantity'
  | 'custom';

export interface FieldConfig<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  customRender?: (field: ControllerRenderProps<TFieldValues>) => ReactNode;
}

interface FormBuilderProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  fields: FieldConfig<TFieldValues>[];
  columns?: 1 | 2 | 3;
}

export function FormBuilder<TFieldValues extends FieldValues = FieldValues>({
  form,
  fields,
  columns = 1
}: FormBuilderProps<TFieldValues>) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  const renderField = (fieldConfig: FieldConfig<TFieldValues>) => {
    return (
      <FormField
        key={fieldConfig.name}
        control={form.control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              {(() => {
                switch (fieldConfig.type) {
                  case 'text':
                  case 'email':
                  case 'password':
                    return (
                      <Input
                        type={fieldConfig.type}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        {...field}
                      />
                    );

                  case 'number':
                    return (
                      <Input
                        type="number"
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        min={fieldConfig.min}
                        max={fieldConfig.max}
                        step={fieldConfig.step}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    );

                  case 'textarea':
                    return (
                      <Textarea
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        {...field}
                      />
                    );

                  case 'select':
                    return (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={fieldConfig.disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={fieldConfig.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldConfig.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case 'searchable-select':
                    return (
                      <SearchableSelect
                        options={fieldConfig.options as SearchableSelectOption[]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                      />
                    );

                  case 'multi-select':
                    return (
                      <MultiSelect
                        options={fieldConfig.options as MultiSelectOption[]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                      />
                    );

                  case 'checkbox':
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={fieldConfig.disabled}
                        />
                      </div>
                    );

                  case 'switch':
                    return (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={fieldConfig.disabled}
                      />
                    );

                  case 'date':
                    return (
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                      />
                    );

                  case 'datetime':
                    return (
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        withTime
                      />
                    );

                  case 'quantity':
                    return (
                      <QuantityInput
                        value={field.value || 0}
                        onChange={field.onChange}
                        min={fieldConfig.min}
                        max={fieldConfig.max}
                        step={fieldConfig.step}
                        disabled={fieldConfig.disabled}
                        unit={fieldConfig.unit}
                      />
                    );

                  case 'custom':
                    return fieldConfig.customRender?.(field);

                  default:
                    return (
                      <Input
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        {...field}
                      />
                    );
                }
              })()}
            </FormControl>
            {fieldConfig.description && (
              <FormDescription>{fieldConfig.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {fields.map((fieldConfig) => renderField(fieldConfig))}
      </div>
    </Form>
  );
}
