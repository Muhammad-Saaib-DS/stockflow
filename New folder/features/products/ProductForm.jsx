import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from './productsSlice';

function ProductForm({ existingProduct, onSuccess }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  const isEditMode = Boolean(existingProduct);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    quantity: '',
    lowStockThreshold: '',
    supplier: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title || '',
        category: existingProduct.category || '',
        price: existingProduct.price ?? '',
        quantity: existingProduct.quantity ?? '',
        lowStockThreshold: existingProduct.lowStockThreshold ?? '',
        supplier: existingProduct.supplier || '',
      });
    }
  }, [existingProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product name is required.';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }
    if (formData.price === '' || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a number greater than 0.';
    }
    if (formData.quantity === '' || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater.';
    }
    if (formData.lowStockThreshold === '' || Number(formData.lowStockThreshold) < 0) {
      newErrors.lowStockThreshold = 'Low stock threshold must be 0 or greater.';
    }
    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier name is required.';
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      lowStockThreshold: Number(formData.lowStockThreshold),
      supplier: formData.supplier.trim(),
    };

    let result;
    if (isEditMode) {
      result = await dispatch(
        updateProduct({ id: existingProduct.id, isLocal: existingProduct.isLocal, ...payload })
      );
    } else {
      result = await dispatch(createProduct(payload));
    }

    setSubmitting(false);

    const actionCreator = isEditMode ? updateProduct : createProduct;
    if (actionCreator.fulfilled.match(result)) {
      if (!isEditMode) {
        setFormData({ title: '', category: '', price: '', quantity: '', lowStockThreshold: '', supplier: '' });
      }
      if (onSuccess) onSuccess();
    } else {
      setErrors({ form: 'Something went wrong saving the product.' });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>

      <div className="form-group">
        <label>Product Name</label>
        <input className="input" type="text" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Category</label>
        <select className="input" name="category" value={formData.category} onChange={handleChange}>
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        {errors.category && <p className="error-text">{errors.category}</p>}
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input className="input" type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <p className="error-text">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label>Quantity in Stock</label>
        <input className="input" type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        {errors.quantity && <p className="error-text">{errors.quantity}</p>}
      </div>

      <div className="form-group">
        <label>Low Stock Threshold</label>
        <input className="input" type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} />
        {errors.lowStockThreshold && <p className="error-text">{errors.lowStockThreshold}</p>}
      </div>

      <div className="form-group">
        <label>Supplier</label>
        <input className="input" type="text" name="supplier" value={formData.supplier} onChange={handleChange} />
        {errors.supplier && <p className="error-text">{errors.supplier}</p>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Product'}
      </button>

      {errors.form && <p className="error-text">{errors.form}</p>}
    </form>
  );
}

export default ProductForm;