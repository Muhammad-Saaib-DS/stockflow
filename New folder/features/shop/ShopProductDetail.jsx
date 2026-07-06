import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { addToCart } from '../cart/cartSlice';

function ShopProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productFromStore = useSelector((state) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  const { data: fetchedProduct, loading, error } = useFetch(
    productFromStore ? null : `/products/${id}`
  );

  const product = productFromStore || fetchedProduct;

  if (!productFromStore && loading) {
    return <p className="state-message">Loading product...</p>;
  }

  if (!product) {
    return (
      <div>
        <p className="state-message error-text">{error || 'Product not found.'}</p>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header"><h1>{product.title}</h1></div>

      <div className="card" style={{ maxWidth: '520px' }}>
        <div className="detail-field">
          <div className="label">Category</div>
          <div className="value">{product.category}</div>
        </div>
        <div className="detail-field">
          <div className="label">Price</div>
          <div className="value">${product.price}</div>
        </div>
        <div className="detail-field">
          <div className="label">Description</div>
          <div className="value">{product.description || 'No description available.'}</div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/shop">← Back to Shop</Link>
      </p>
    </div>
  );
}

export default ShopProductDetail;