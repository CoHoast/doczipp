'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Plus, Wand2, X } from 'lucide-react';
import { LineItem } from '@/lib/types/invoice';
import { generateId } from '@/lib/utils/invoice';

interface AISuggestionsProps {
  documentType: string;
  onAddLineItem: (item: LineItem) => void;
}

export function AISuggestions({ documentType, onAddLineItem }: AISuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{description: string, rate: number, quantity: number}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/suggest-line-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, documentType }),
      });
      
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = (suggestion: {description: string, rate: number, quantity: number}) => {
    const newItem: LineItem = {
      id: generateId(),
      description: suggestion.description,
      quantity: suggestion.quantity,
      rate: suggestion.rate,
      amount: suggestion.quantity * suggestion.rate,
    };
    onAddLineItem(newItem);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        AI Suggest Line Items
      </Button>
    );
  }

  return (
    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-blue-700">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium text-sm">AI Line Item Suggestions</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex gap-2 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your service (e.g., 'website design')"
          className="bg-white"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Suggest'}
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
            >
              <div className="flex-1 min-w-0 mr-3">
                <div className="text-sm font-medium text-slate-900 truncate">
                  {suggestion.description}
                </div>
                <div className="text-xs text-slate-500">
                  {suggestion.quantity} × ${suggestion.rate.toLocaleString()} = ${(suggestion.quantity * suggestion.rate).toLocaleString()}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAddSuggestion(suggestion)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {suggestions.length === 0 && !isLoading && query && (
        <p className="text-sm text-slate-500 text-center py-2">
          Enter a description and click Suggest to get AI-powered line item suggestions.
        </p>
      )}
    </div>
  );
}

interface AIExpandButtonProps {
  description: string;
  documentType: string;
  onExpand: (expanded: string) => void;
}

export function AIExpandButton({ description, documentType, onExpand }: AIExpandButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExpand = async () => {
    if (!description.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/expand-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, documentType }),
      });
      
      const data = await res.json();
      if (data.expanded) {
        onExpand(data.expanded);
      }
    } catch (error) {
      console.error('Failed to expand description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleExpand}
      disabled={isLoading || !description.trim()}
      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-auto py-1 px-2"
      title="Expand with AI"
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <>
          <Wand2 className="h-3 w-3 mr-1" />
          <span className="text-xs">Expand</span>
        </>
      )}
    </Button>
  );
}
