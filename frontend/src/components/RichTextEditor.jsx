import { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image } from 'lucide-react';
import { cn } from '../utils/cn';

const ToolButton = ({ icon: Icon, active, onClick, title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={cn(
      'flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-white',
      active && 'bg-blue-100 text-primary dark:bg-blue-900/30 dark:text-blue-400'
    )}
  >
    <Icon className="h-4 w-4" />
  </button>
);

export default function RichTextEditor({ label, value = '', onChange, placeholder = 'Write your content here...', className }) {
  const [content, setContent] = useState(value);

  const handleChange = (e) => {
    setContent(e.target.innerHTML);
    onChange?.(e.target.innerHTML);
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-600">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-600 dark:bg-slate-700/50">
          <ToolButton icon={Bold} title="Bold" onClick={() => document.execCommand('bold')} />
          <ToolButton icon={Italic} title="Italic" onClick={() => document.execCommand('italic')} />
          <ToolButton icon={Underline} title="Underline" onClick={() => document.execCommand('underline')} />
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-600" />
          <ToolButton icon={List} title="Bullet List" onClick={() => document.execCommand('insertUnorderedList')} />
          <ToolButton icon={ListOrdered} title="Numbered List" onClick={() => document.execCommand('insertOrderedList')} />
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-600" />
          <ToolButton icon={AlignLeft} title="Align Left" onClick={() => document.execCommand('justifyLeft')} />
          <ToolButton icon={AlignCenter} title="Align Center" onClick={() => document.execCommand('justifyCenter')} />
          <ToolButton icon={AlignRight} title="Align Right" onClick={() => document.execCommand('justifyRight')} />
        </div>
        {/* Editor */}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange}
          data-placeholder={placeholder}
          className="min-h-[200px] bg-white px-4 py-3 text-sm text-slate-800 outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] dark:bg-slate-700 dark:text-white dark:empty:before:text-slate-400"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
}
