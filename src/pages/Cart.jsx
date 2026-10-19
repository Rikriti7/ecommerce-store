import { Link, useNavigate } from "react-router-dom";
import { useCartStore, selectTotal } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectTotal);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="container">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="back-link">← Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Your cart</h1>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </div>
            <div className="qty">
              <button onClick={() => updateQuantity(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQuantity(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <p className="line-total">${(item.price * item.qty).toFixed(2)}</p>
            <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
        <button className="btn" onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </button>
      </div>
    </main>
  );
}

export default Cart;