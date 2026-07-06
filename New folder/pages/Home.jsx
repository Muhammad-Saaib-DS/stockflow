import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const featured = products.slice(0, 4);

  return (
    <div>
      <div className="about-hero">
        <h1>Welcome to StockFlow Shop</h1>
        <p>Browse our full catalog, add items to your cart, and check out — all in one place.</p>
        
        {/* Start Shopping button */}
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
          Start Shopping
        </Link>

        {/* Login button */}
        <button 
          onClick={() => navigate("/login")} 
          className="btn btn-secondary" 
          style={{ marginTop: '1rem', marginLeft: '1rem', display: 'inline-flex' }}
        >
          Login
        </button>
      </div>

      <div className="about-section-title">Shop by Category</div>
      <div className="tech-pills" style={{ marginBottom: '2rem' }}>
        {categories.map((cat) => (
          <Link key={cat.id} to={`/category/${encodeURIComponent(cat.name)}`} className="tech-pill">
            <span className="dot"></span>
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="product-grid">
  {featured.map((product) => (
    <Link key={product.id} to={`/shop/${product.id}`} className="product-card">
      <div className="image-container">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="product-image"
        />
        <div className="overlay">
          <button className="overlay-btn">View Details</button>
          <button className="overlay-btn">Add to Cart</button>
        </div>
      </div>
      <h4>{product.title}</h4>
      <div className="meta">{product.category}</div>
      <div className="price">${product.price}</div>
    </Link>
  ))}
</div>





      <div className="about-section-title">Featured Products</div>
      <div className="product-grid">
        {featured.map((product) => (
          <Link key={product.id} to={`/shop/${product.id}`} className="product-card">
            <h4>{product.title}</h4>
            <div className="meta">{product.category}</div>
            <div className="price">${product.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
