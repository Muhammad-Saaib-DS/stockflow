import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { deleteProduct } from './productsSlice';
import ProductForm from './ProductForm';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const canEdit = role === 'manager' || role === 'admin';

  const productFromStore = useSelector((state) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  const { data: fetchedProduct, loading, error } = useFetch(
    productFromStore ? null : `/products/${id}`
  );

  const product = productFromStore || fetchedProduct;

  const [isEditing, setIsEditing] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    const result = await dispatch(deleteProduct(product));

    if (deleteProduct.fulfilled.match(result)) {
      navigate('/products');
    }
  }

  if (!productFromStore && loading) {
    return <p className="state-message">Loading product...</p>;
  }

  if (!product) {
    return (
      <div>
        <p className="state-message error-text">{error || 'Product not found.'}</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="card">
        <ProductForm
          existingProduct={product}
          onSuccess={() => setIsEditing(false)}
        />
        <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ marginTop: '0.75rem' }}>
          Cancel
        </button>
      </div>
    );
  }

  const isLowStock = product.quantity <= product.lowStockThreshold;

  return (
    <div>
      <div className="page-header"><h1>Product Detail</h1></div>

      <div className="card">
        <div className="detail-field">
          <div className="label">Name</div>
          <div className="value">{product.title}</div>
        </div>
        <div className="detail-field">
          <div className="label">Category</div>
          <div className="value">{product.category}</div>
        </div>
        <div className="detail-field">
          <div className="label">Price</div>
          <div className="value">${product.price}</div>
        </div>
        <div className="detail-field">
          <div className="label">Quantity in Stock</div>
          <div className="value">
            {product.quantity}
            {isLowStock && <span className="low-stock-badge">Low Stock</span>}
          </div>
        </div>
        <div className="detail-field">
          <div className="label">Low Stock Threshold</div>
          <div className="value">{product.lowStockThreshold}</div>
        </div>
        <div className="detail-field">
          <div className="label">Supplier</div>
          <div className="value">{product.supplier}</div>
        </div>

        {canEdit ? (
          <div className="detail-actions">
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <p className="view-only-note">
            You have view-only access. Contact a manager or admin to make changes.
          </p>
        )}
      </div>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/products">← Back to Products</Link>
      </p>
    </div>
  );
}

export default ProductDetail;