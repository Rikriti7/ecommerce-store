import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<p className="status">Cart (coming in Stage 4)</p>} />
        <Route path="/checkout" element={<p className="status">Checkout (coming in Stage 5)</p>} />
        <Route path="*" element={<p className="status">Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;