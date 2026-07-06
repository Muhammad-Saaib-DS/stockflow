import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <div className="page-header"><h1>Your Cart</h1></div>
        <p className="state-message">Your cart is empty. <Link to="/shop">Go shopping →</Link></p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header"><h1>Your Cart</h1></div>

      <div className="card">
        {items.map((item) => (
          <div key={item.id} className="detail-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="value">{item.title}</div>
              <div className="label">${item.price} each</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                className="input"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                style={{ width: '70px' }}
              />
              <span className="value">${(item.price * item.quantity).toFixed(2)}</span>
              <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="detail-field" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
          <h3>Total</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;