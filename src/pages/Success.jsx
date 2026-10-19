import { Link, useLocation } from "react-router-dom";

function Success() {
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="container">
        <p className="status">No recent order found.</p>
        <Link to="/" className="back-link">← Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="container success">
      <h1>🎉 Thank you, {state.name}!</h1>
      <p>Your order <strong>#{state.orderId}</strong> has been placed.</p>
      <Link to="/" className="btn-link">Continue shopping</Link>
    </main>
  );
}

export default Success;