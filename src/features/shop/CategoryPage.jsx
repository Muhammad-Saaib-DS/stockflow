import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../products/productsSlice';
import { addToCart } from '../cart/cartSlice';

function CategoryPage() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = items.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  function handleAddToCart(e, product) {
    e.preventDefault();
    dispatch(addToCart(product));
  }

  return (
    <div>
      <div className="page-header"><h1>{categoryName}</h1></div>

      {status === 'loading' && <p className="state-message">Loading products...</p>}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="state-message">No products found in this category.</p>
      )}

      <div className="product-grid">
        {filtered.map((product) => (
          <Link key={product.id} to={`/shop/${product.id}`} className="product-card">
            <h4>{product.title}</h4>
            <div className="price">${product.price}</div>
            <button className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }} onClick={(e) => handleAddToCart(e, product)}>
              Add to Cart
            </button>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/shop">← Back to Shop</Link>
      </p>
    </div>
  );
}

export default CategoryPage;