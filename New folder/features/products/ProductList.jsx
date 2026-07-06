import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, setSearch, setCategoryFilter, setSortBy } from './productsSlice';
import useDebounce from '../../hooks/useDebounce';
import ProductForm from './ProductForm';

const PAGE_SIZE = 6;

function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error, filters } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.items);

  const debouncedSearch = useDebounce(filters.search, 400);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.category, filters.sortBy]);

  // 1. Filter by search text
  let processed = items.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // 2. Filter by category (case-insensitive - fixes the "Beauty" vs "beauty" bug)
  if (filters.category !== 'all') {
    processed = processed.filter(
      (product) => product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // 3. Sort
  if (filters.sortBy === 'priceAsc') {
    processed = [...processed].sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'priceDesc') {
    processed = [...processed].sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'lowStock') {
    processed = [...processed].sort(
      (a, b) => (a.quantity - a.lowStockThreshold) - (b.quantity - b.lowStockThreshold)
    );
  }

  // 4. Paginate
  const totalPages = Math.ceil(processed.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginated = processed.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <div className="page-header"><h1>Products</h1></div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <ProductForm />
      </div>

      <div className="filters-row">
        <input
          className="input"
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <select
          className="input"
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <select
          className="input"
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="default">Default Order</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="lowStock">Low Stock First</option>
        </select>
      </div>

      {status === 'loading' && <p className="state-message">Loading products...</p>}
      {status === 'failed' && <p className="state-message error-text">{error}</p>}
      {status === 'succeeded' && processed.length === 0 && (
        <p className="state-message">No products match your filters.</p>
      )}

      <div className="product-grid">
        {paginated.map((product) => {
          const isLowStock = product.quantity <= product.lowStockThreshold;
          return (
            <Link key={product.id} to={`/products/${product.id}`} className="product-card">
              <h4>{product.title}</h4>
              <div className="meta">{product.category} · {product.supplier}</div>
              <div className="price">${product.price}</div>
              <div className="meta">
                Qty: {product.quantity}
                {isLowStock && <span className="low-stock-badge">Low Stock</span>}
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;