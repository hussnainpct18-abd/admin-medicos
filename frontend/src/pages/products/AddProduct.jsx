import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProduct, getCategories } from '../../services/dataService';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import ImageUpload from '../../components/ImageUpload';
import RichTextEditor from '../../components/RichTextEditor';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { status: 'Active', unit: 'Piece' },
  });

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data.map(c => ({ label: c.name, value: c.name })));
    });
  }, []);

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }
    setLoading(true);
    try {
      await createProduct({ ...data, description: content, image: URL.createObjectURL(images[0]) });
      toast.success('Product created successfully');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Add Product' }]} />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">General Information</h2>
              <FormInput label="Product Name" name="name" register={register} errors={errors} required />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect label="Category" name="category" register={register} errors={errors} options={categories} required />
                <FormInput label="Brand" name="brand" register={register} errors={errors} required />
                <FormInput label="SKU" name="sku" register={register} errors={errors} required />
                <FormSelect label="Status" name="status" register={register} errors={errors} options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]} />
              </div>
              <RichTextEditor label="Description" value={content} onChange={setContent} />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput label="Price ($)" type="number" name="price" step="0.01" register={register} errors={errors} required />
                <FormInput label="Discount Price ($)" type="number" name="discountPrice" step="0.01" register={register} errors={errors} />
                <FormInput label="Quantity" type="number" name="quantity" register={register} errors={errors} required />
                <FormInput label="Unit" name="unit" register={register} errors={errors} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">Product Images</h2>
              <ImageUpload multiple onImageChange={setImages} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/products')} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-70">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
