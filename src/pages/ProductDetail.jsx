import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p className="status">Loading product...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <main className="container">
      <Link to="/" className="back-link">← Back to products</Link>
      <div className="detail">
        <img src={product.thumbnail} alt={product.title} className="detail-img" />
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">${product.price}</p>
          <p>⭐ {product.rating} · {product.stock} in stock</p>
          <p>{product.description}</p>
          <button className="btn" disabled>Add to cart (Stage 4)</button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;