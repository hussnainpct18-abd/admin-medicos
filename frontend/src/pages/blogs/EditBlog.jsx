import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById, updateBlog } from '../../services/dataService';
import { slugify } from '../../utils/helpers';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import ImageUpload from '../../components/ImageUpload';
import RichTextEditor from '../../components/RichTextEditor';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { status: 'Draft' },
  });

  const title = watch('title');

  // Auto-generate slug from title only when field is empty
  useEffect(() => {
    if (title) setValue('slug', slugify(title));
  }, [title, setValue]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        reset({
          title: data.title,
          slug: data.slug || '',
          status: data.status || 'Draft',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
        });
        if (data.description) setContent(data.description);
        if (data.image) setImage(data.image);
      } catch (e) {
        toast.error('Failed to load blog');
      }
    };
    fetchBlog();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateBlog(id, { ...data, content, image });
      toast.success('Blog updated successfully');
      navigate('/blogs');
    } catch (error) {
      toast.error('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Blogs', href: '/blogs' }, { label: 'Edit Blog' }]} />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left — main content */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <FormInput label="Blog Title" name="title" register={register} errors={errors} required />
              <FormInput label="Slug" name="slug" register={register} errors={errors} required />
              <RichTextEditor label="Blog Content" value={content} onChange={setContent} />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">SEO Meta</h2>
              <FormInput label="Meta Title" name="metaTitle" register={register} errors={errors} />
              <FormTextarea label="Meta Description" name="metaDescription" register={register} errors={errors} rows={3} />
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">Publish</h2>
              <FormSelect
                label="Status"
                name="status"
                register={register}
                errors={errors}
                options={[{ label: 'Published', value: 'Published' }, { label: 'Draft', value: 'Draft' }]}
              />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">Featured Image</h2>
              <ImageUpload onImageChange={setImage} currentImage={image} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Blog
          </button>
        </div>
      </form>
    </div>
  );
}
