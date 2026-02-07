'use client';

import { TEMPLATES, TemplateConfig } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selected: string;
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {TEMPLATES.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selected === template.id}
          onClick={() => onSelect(template.id)}
        />
      ))}
    </div>
  );
}

function TemplateCard({ 
  template, 
  isSelected, 
  onClick 
}: { 
  template: TemplateConfig; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative rounded-lg overflow-hidden border-2 transition-all text-left',
        isSelected 
          ? 'border-blue-500 ring-2 ring-blue-200' 
          : 'border-slate-200 hover:border-slate-300'
      )}
    >
      {/* Preview */}
      <div 
        className="h-20 w-full"
        style={{ background: template.preview }}
      >
        {/* Mini invoice preview */}
        <div className="h-full w-full p-2 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-8 h-2 bg-white/40 rounded" />
            <div className="w-6 h-4 bg-white/60 rounded text-[6px] font-bold text-center text-slate-600">
              INV
            </div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-white/30 rounded" />
            <div className="w-3/4 h-1.5 bg-white/20 rounded" />
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-2 bg-white">
        <div className="font-medium text-sm text-slate-900">{template.name}</div>
        <div className="text-xs text-slate-500 truncate">{template.description}</div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  );
}
