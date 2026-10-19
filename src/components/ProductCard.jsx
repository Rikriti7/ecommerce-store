import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <article className="product-card">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;