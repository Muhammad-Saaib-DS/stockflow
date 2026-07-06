import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../products/productsSlice';
import { addToCart } from '../cart/cartSlice';
import useDebounce from '../../hooks/useDebounce';

const PAGE_SIZE = 8;

function Shop() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.items);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  let filtered = items.filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
  if (category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  function handleAddToCart(e, product) {
    e.preventDefault(); // prevent navigating to the product page when clicking the button
    dispatch(addToCart(product));
  }

  return (
    <div>
      <div className="page-header"><h1>Shop</h1></div>

      <div className="filters-row">
        <input
          className="input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {status === 'loading' && <p className="state-message">Loading products...</p>}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="state-message">No products match your search.</p>
      )}

      <div className="product-grid">
        {paginated.map((product) => (
          <Link key={product.id} to={`/shop/${product.id}`} className="product-card">
            <h4>{product.title}</h4>
            <div className="meta">{product.category}</div>
            <div className="price">${product.price}</div>
            <button className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }} onClick={(e) => handleAddToCart(e, product)}>
              Add to Cart
            </button>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-secondary" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn btn-secondary" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Shop;