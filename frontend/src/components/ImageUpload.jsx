import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ImageUpload({ label, onImageChange, currentImage, multiple = false, className }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [previews, setPreviews] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!multiple) {
      setPreview(currentImage || null);
    }
  }, [currentImage, multiple]);

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    if (multiple) {
      const urls = Array.from(files).map(f => URL.createObjectURL(f));
      setPreviews(prev => [...prev, ...urls]);
      onImageChange?.(Array.from(files));
    } else {
      const url = URL.createObjectURL(files[0]);
      setPreview(url);
      onImageChange?.(files[0]);
    }
  };

  const removeImage = (idx) => {
    if (multiple) {
      setPreviews(prev => prev.filter((_, i) => i !== idx));
    } else {
      setPreview(null);
      if (fileRef.current) fileRef.current.value = '';
      onImageChange?.(null);
    }
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}

      {!multiple && preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-32 w-32 rounded-xl border border-slate-200 object-cover dark:border-slate-600" />
          <button
            type="button"
            onClick={() => removeImage()}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}

      {multiple && previews.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt={`Preview ${i}`} className="h-24 w-24 rounded-xl border border-slate-200 object-cover dark:border-slate-600" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {(!preview || multiple) && (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 transition-colors hover:border-primary hover:bg-blue-50/50 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-blue-400 dark:hover:bg-blue-900/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Upload className="h-5 w-5 text-primary dark:text-blue-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Click to upload {multiple ? 'images' : 'image'}
          </p>
          <p className="mt-1 text-xs text-slate-400">PNG, JPG, WEBP up to 5MB</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
}
