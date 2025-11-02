import "../styles/Cards.css";
import { memo, useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export type Item = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type CardsProps = {
  items?: Item[];
};

const defaultItems: Item[] = [
  { id: "1", title: "Amethyst Balance Bracelet", price: 19.99, image: import.meta.env.BASE_URL + "images/products/test.png" },
  { id: "2", title: "Rose Quartz Calm Necklace", price: 24.5, image: import.meta.env.BASE_URL + "images/products/test1.png" },
  { id: "3", title: "Citrine Energy Ring", price: 14, image: import.meta.env.BASE_URL + "images/products/test2.png" },
  { id: "4", title: "Lapis Lazuli Focus Studs", price: 17.2, image: import.meta.env.BASE_URL + "images/products/test3.png" },
];

/** 🛒 Animated Add-to-Cart button that also pushes to global cart */
function CartButton({ item }: { item: Item }) {
  const { add } = useCart();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    const t = setTimeout(() => setClicked(false), 900);
    return () => clearTimeout(t);
  }, [clicked]);

  const onClick = () => {
    // map Item to ShopItem shape (id/title/price/image are identical)
    add({ id: item.id, title: item.title, price: item.price, image: item.image }, 1);
    setClicked(true);
  };

  return (
    <button
      type="button"
      className={`cart-button${clicked ? " clicked" : ""}`}
      onClick={onClick}
      aria-live="polite"
      aria-label={clicked ? "Added" : "Add to cart"}
    >
      <span className="add-to-cart">Add to cart</span>
      <span className="added">Added</span>

      {/* Cart icon */}
      <svg className="icon-cart" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1 1 0 0 0 9 18h10v-2H9.42l.93-1.67h6.45a1 1 0 0 0 .9-.56l3.24-6.49A.5.5 0 0 0 21.5 6H6.21l-.94-2z" />
        <circle cx="10.5" cy="20.5" r="1.5" />
        <circle cx="17.5" cy="20.5" r="1.5" />
      </svg>

      {/* Box icon */}
      <svg className="icon-box" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 16V8a1 1 0 0 0-.55-.89l-8-4a1 1 0 0 0-.9 0l-8 4A1 1 0 0 0 3 8v8a1 1 0 0 0 .55.89l8 4a1 1 0 0 0 .9 0l8-4A1 1 0 0 0 21 16zM12 4.15 18.53 7 12 9.85 5.47 7 12 4.15zM5 8.97l6 2.88v6.18l-6-3V8.97zm8 9.06v-6.18l6-2.88v6.06l-6 3z" />
      </svg>
    </button>
  );
}

function CardsBase({ items }: CardsProps) {
  const data = items && items.length ? items : defaultItems;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cards" ref={gridRef}>
      {data.map((item) => (
        <article key={item.id} className="card fade-card">
          <div className="card__media">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>

          <div className="card__body">
            <h3 className="card__title">{item.title}</h3>
            <p className="card__price">£{item.price.toFixed(2)}</p>

            <CartButton item={item} />
            <Link className="card__btn1" to={`/product/${encodeURIComponent(item.id)}`}> View Product </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

const Cards = memo(CardsBase);
export default Cards;
