// src/Pages/Product.tsx
import "./Product.css";
import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SHOP_PRODUCTS, type ShopItem } from "../data/ShopProducts";
import { useCart } from "../context/CartContext";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findByIdOrTitle(id?: string, titleQ?: string): ShopItem | undefined {
  if (!id && !titleQ) return undefined;

  // 1) exact id
  if (id) {
    const byId = SHOP_PRODUCTS.find((p) => String(p.id) === String(id));
    if (byId) return byId;
  }

  // 2) fallback: normalized title search
  if (titleQ) {
    const q = norm(titleQ);
    const scored = SHOP_PRODUCTS
      .map((p) => {
        const hay = norm(
          [p.title, p.description, ...(p.tags ?? [])].filter(Boolean).join(" ")
        );
        const idx = hay.indexOf(q);
        return { p, score: idx < 0 ? Number.POSITIVE_INFINITY : idx };
      })
      .filter((x) => x.score !== Number.POSITIVE_INFINITY)
      .sort((a, b) => a.score - b.score);

    return scored[0]?.p;
  }
  return undefined;
}

export default function Product() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const qTitle = params.get("title") ?? undefined;
  const { add } = useCart();

  const product = useMemo(() => findByIdOrTitle(id, qTitle), [id, qTitle]);

  if (!product) {
    return (
      <section className="product">
        <div className="product-inner">
          <p className="product-breadcrumb">
            <Link to="/shop">← Back to Shop</Link>
          </p>
          <h1 className="product-title">Product not found</h1>
          <p className="product-desc">We couldn’t find that item. It may be sold out or moved.</p>
          <p>
            <Link className="product-secondary" to="/shop">Browse all products</Link>
          </p>
        </div>
      </section>
    );
  }

  const imgSrc = product.image && product.image.length > 0 ? product.image : "/vite.svg";

  return (
    <section className="product">
      <div className="product-inner">
        <p className="product-breadcrumb">
          <Link to="/shop">← Back to Shop</Link>
        </p>

        <div className="product-grid">
          <div className="product-media">
            <img
              src={imgSrc}
              alt={product.title}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith("/vite.svg")) img.src = "/vite.svg";
              }}
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">£{product.price.toFixed(2)}</p>

            {product.description && (
              <p className="product-desc">{product.description}</p>
            )}

            <div className="product-actions">
              <button className="product-add" onClick={() => add(product, 1)}>
                Add to cart
              </button>
              <Link to="/shop" className="product-secondary">Continue shopping</Link>
            </div>

            {product.tags?.length ? (
              <div className="product-tags">
                {product.tags.map((t: string) => (
                  <Link key={t} to={`/shop?crystal=${encodeURIComponent(t)}`} className="tag">
                    #{t.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
