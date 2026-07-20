import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/dataService';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormSelect from '../../components/FormSelect';
import ImageUpload from '../../components/ImageUpload';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

export default function AddCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { status: 'Active' },
  });

  const onSubmit = async (data) => {
    if (!image) {
      toast.error('Please upload a category image');
      return;
    }
    setLoading(true);
    try {
      await createCategory({ ...data, image: URL.createObjectURL(image) });
      toast.success('Category created successfully');
      navigate('/categories');
    } catch (error) {
      toast.error('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Categories', href: '/categories' }, { label: 'Add Category' }]} />
          <h1 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">Add New Category</h1>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <FormInput
                label="Category Name"
                name="name"
                register={register}
                errors={errors}
                required
                placeholder="e.g., Surgical Instruments"
              />
              <FormSelect
                label="Status"
                name="status"
                register={register}
                errors={errors}
                options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]}
              />
              <FormTextarea
                label="Description"
                name="description"
                register={register}
                errors={errors}
                placeholder="Brief description of the category..."
              />
            </div>
            <div>
              <ImageUpload
                label="Category Image"
                onImageChange={setImage}
                className="h-full"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-700">
            <button type="button" onClick={() => navigate('/categories')} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
