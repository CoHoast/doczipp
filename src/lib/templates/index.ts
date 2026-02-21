// Invoice Templates Configuration

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string; // Preview gradient
  styles: {
    headerLayout: 'split' | 'stacked' | 'centered';
    tableStyle: 'striped' | 'bordered' | 'minimal' | 'modern';
    accentPosition: 'top' | 'left' | 'none';
    fontWeight: 'normal' | 'bold';
    borderRadius: 'none' | 'sm' | 'md' | 'lg';
    headerBg: boolean; // Show colored background in header
  };
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimal and modern design',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    styles: {
      headerLayout: 'split',
      tableStyle: 'striped',
      accentPosition: 'none',
      fontWeight: 'normal',
      borderRadius: 'sm',
      headerBg: false,
    },
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong headers, high contrast',
    preview: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
    styles: {
      headerLayout: 'split',
      tableStyle: 'bordered',
      accentPosition: 'top',
      fontWeight: 'bold',
      borderRadius: 'none',
      headerBg: true,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple with whitespace',
    preview: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    styles: {
      headerLayout: 'stacked',
      tableStyle: 'minimal',
      accentPosition: 'none',
      fontWeight: 'normal',
      borderRadius: 'none',
      headerBg: false,
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional business style',
    preview: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    styles: {
      headerLayout: 'split',
      tableStyle: 'bordered',
      accentPosition: 'left',
      fontWeight: 'normal',
      borderRadius: 'sm',
      headerBg: false,
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful and unique',
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    styles: {
      headerLayout: 'centered',
      tableStyle: 'striped',
      accentPosition: 'top',
      fontWeight: 'bold',
      borderRadius: 'lg',
      headerBg: true,
    },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium corporate look',
    preview: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    styles: {
      headerLayout: 'split',
      tableStyle: 'modern',
      accentPosition: 'left',
      fontWeight: 'bold',
      borderRadius: 'md',
      headerBg: true,
    },
  },
];

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
