import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, selectTotal } from "../store/cartStore";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (items.length === 0) {
    return (
      <main className="container">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="back-link">← Continue shopping</Link>
      </main>
    );
  }

  const onSubmit = async (data) => {
    // Fake API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const orderId = Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigate("/success", { state: { orderId, name: data.fullName } });
  };

  return (
    <main className="container">
      <h1>Checkout</h1>

      <div className="checkout">
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
            />
            {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              {...register("address", {
                required: "Address is required",
                minLength: { value: 8, message: "Enter your full address" },
              })}
            />
            {errors.address && <span className="field-error">{errors.address.message}</span>}
          </div>

          <div className="field">
            <label htmlFor="cardNumber">Card number</label>
            <input
              id="cardNumber"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              {...register("cardNumber", {
                required: "Card number is required",
                validate: (v) =>
                  /^\d{16}$/.test(v.replace(/\s/g, "")) || "Card must be 16 digits",
              })}
            />
            {errors.cardNumber && <span className="field-error">{errors.cardNumber.message}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="expiry">Expiry (MM/YY)</label>
              <input
                id="expiry"
                placeholder="08/28"
                {...register("expiry", {
                  required: "Expiry is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Use MM/YY format",
                  },
                })}
              />
              {errors.expiry && <span className="field-error">{errors.expiry.message}</span>}
            </div>

            <div className="field">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                inputMode="numeric"
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: { value: /^\d{3,4}$/, message: "3 or 4 digits" },
                })}
              />
              {errors.cvv && <span className="field-error">{errors.cvv.message}</span>}
            </div>
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>{item.title} × {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;