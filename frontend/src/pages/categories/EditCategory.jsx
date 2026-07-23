import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from './categories.hook';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import ImageUpload from '../../components/ImageUpload';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategoryById, updateCategory } = useCategories();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { status: 'Active' },
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategoryById(id);
        reset({
          name: data.name,
          description: data.description,
          status: data.status,
        });
        // keep existing image if any
      } catch (e) {
        toast.error('Failed to load category');
      }
    };
    fetch();
  }, [id, getCategoryById, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data, image };
      await updateCategory(id, payload);
      toast.success('Category updated successfully');
      navigate('/categories');
    } catch (e) {
      toast.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Categories', href: '/categories' }, { label: 'Edit Category' }]} />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <FormInput label="Category Name" name="name" register={register} errors={errors} required />
            <FormSelect label="Status" name="status" register={register} errors={errors} options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]} />
            <FormTextarea label="Description" name="description" register={register} errors={errors} />
          </div>
          <div>
            <ImageUpload label="Category Image" onImageChange={setImage} className="h-full" />
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
  );
}
