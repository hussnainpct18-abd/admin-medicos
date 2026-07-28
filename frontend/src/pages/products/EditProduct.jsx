import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ImageUpload from '../../components/ImageUpload';
import RichTextEditor from '../../components/RichTextEditor';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';
import { fetchCategories } from '../categories/categories.api';
import { getProductById, updateProduct } from '../../services/dataService';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { status: 'Active', unit: 'Piece' },
  });

  // Load categories and existing product data
  useEffect(() => {
    fetchCategories().then(data => {
      setCategories(data.map(c => ({ label: c.name, value: c.name })));
    });

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        reset({
          name: data.name || data.title,
          category: data.categoryName || data.category,
          brand: data.brand,
          sku: data.sku,
          status: data.status || 'Active',
          price: data.price,
          discountPrice: data.discountPrice,
          quantity: data.quantity,
          unit: data.unit || 'Piece',
        });
        if (data.description) setContent(data.description);
        if (data.image) setImage(data.image);
      } catch (e) {
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProduct(id, {
        ...data,
        description: content,
        image: typeof image === 'string' ? image : image,
      });
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Edit Product' }]} />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column — main info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">General Information</h2>
              <FormInput label="Product Name" name="name" register={register} errors={errors} required />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect label="Category" name="category" register={register} errors={errors} options={categories} required />
                <FormInput label="Brand" name="brand" register={register} errors={errors} required />
                <FormInput label="SKU" name="sku" register={register} errors={errors} required />
                <FormSelect
                  label="Status"
                  name="status"
                  register={register}
                  errors={errors}
                  options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]}
                />
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

          {/* Right column — image */}
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-700">Product Image</h2>
              <ImageUpload
                label="Product Image"
                onImageChange={setImage}
                currentImage={image}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
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
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
