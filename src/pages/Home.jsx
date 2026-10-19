import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    let list = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <main className="container">
      <h1>Products</h1>

      <div className="filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="status">No products found.</p>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;