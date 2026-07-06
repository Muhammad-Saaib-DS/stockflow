import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from './ordersSlice';
import { clearCart } from '../cart/cartSlice';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({ fullName: '', address: '', city: '', phone: '' });
  const [errors, setErrors] = useState({});

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!/^\d{7,15}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid phone number (digits only).';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (items.length === 0) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    dispatch(placeOrder({ items, total, shippingInfo: formData }));
    dispatch(clearCart());
    navigate('/orders');
  }

  if (items.length === 0) {
    return <p className="state-message">Your cart is empty — nothing to check out.</p>;
  }

  return (
    <div>
      <div className="page-header"><h1>Checkout</h1></div>

      <div className="card" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input className="input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input className="input" type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label>City</label>
            <input className="input" type="text" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input className="input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="detail-field" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
            <h3>Total</h3>
            <h3>${total.toFixed(2)}</h3>
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;