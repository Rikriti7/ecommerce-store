import { Link } from "react-router-dom";
import { useCartStore, selectCount } from "../store/cartStore";


function Navbar() {
  const count = useCartStore(selectCount);

  return (
    <header className="navbar">
      <Link to="/" className="logo">ShopEasy</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({count})</Link>
      </nav>
    </header>
  );
}

export default Navbar;