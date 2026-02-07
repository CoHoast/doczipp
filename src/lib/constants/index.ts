// QuickBill Constants

export const DOCUMENT_TYPES = [
  { value: 'invoice', label: 'Invoice' },
  { value: 'quote', label: 'Quote' },
  { value: 'estimate', label: 'Estimate' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'proforma', label: 'Proforma Invoice' },
] as const;

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
] as const;

export const TEMPLATES = [
  { id: 'clean', name: 'Clean', description: 'Minimal and modern' },
  { id: 'bold', name: 'Bold', description: 'Strong headers, high contrast' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'professional', name: 'Professional', description: 'Traditional business style' },
  { id: 'creative', name: 'Creative', description: 'Colorful and unique' },
] as const;

export const FONTS = [
  { id: 'inter', name: 'Inter', family: 'var(--font-inter), Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto', family: 'var(--font-roboto), Roboto, sans-serif' },
  { id: 'lato', name: 'Lato', family: 'var(--font-lato), Lato, sans-serif' },
  { id: 'poppins', name: 'Poppins', family: 'var(--font-poppins), Poppins, sans-serif' },
  { id: 'opensans', name: 'Open Sans', family: 'var(--font-opensans), Open Sans, sans-serif' },
  { id: 'montserrat', name: 'Montserrat', family: 'var(--font-montserrat), Montserrat, sans-serif' },
  { id: 'playfair', name: 'Playfair Display', family: 'var(--font-playfair), Playfair Display, serif' },
  { id: 'merriweather', name: 'Merriweather', family: 'var(--font-merriweather), Merriweather, serif' },
  { id: 'sourcesans', name: 'Source Sans 3', family: 'var(--font-sourcesans), Source Sans 3, sans-serif' },
  { id: 'raleway', name: 'Raleway', family: 'var(--font-raleway), Raleway, sans-serif' },
] as const;

export const DUE_DATE_PRESETS = [
  { value: 'due-on-receipt', label: 'Due on Receipt', days: 0 },
  { value: 'net-7', label: 'Net 7', days: 7 },
  { value: 'net-15', label: 'Net 15', days: 15 },
  { value: 'net-30', label: 'Net 30', days: 30 },
  { value: 'net-60', label: 'Net 60', days: 60 },
  { value: 'custom', label: 'Custom', days: null },
] as const;

export const DEFAULT_INVOICE_SETTINGS = {
  currency: 'USD',
  template: 'clean',
  primaryColor: '#1e40af', // Blue
  accentColor: '#10b981', // Green
  font: 'inter',
};

export const BRAND_COLORS = {
  primary: '#1e40af', // Professional blue
  accent: '#10b981', // Money green
  dark: '#0f172a',
  light: '#f8fafc',
};
