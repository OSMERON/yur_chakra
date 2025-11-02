import  { useEffect, useRef } from "react";
import FeaturedCollection from "./FeaturedCollection";
import "../styles/ScrollShowcase.css";

export default function ScrollShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = showcaseRef.current?.querySelectorAll(".scroll-slide");
    if (!sections) return;

    // 🧠 Intersection Observer to fade between collections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("active");
          } else {
            target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // 💎 Example data arrays (replace or import)
  const featured = [
    { id: "1", title: "Amethyst Balance Bracelet", price: 19.99, image:import.meta.env.BASE_URL + "images/products/test.png" },
    { id: "2", title: "Rose Quartz Calm Necklace", price: 24.5, image:import.meta.env.BASE_URL + "images/products/test1.png" },
    { id: "3", title: "Citrine Energy Ring", price: 14.0, image:import.meta.env.BASE_URL +  "images/products/test2.png" },
    { id: "4", title: "Clear Quartz Clarity Chain", price: 29.0, image:import.meta.env.BASE_URL + "images/products/test4.png" },
  ];

  const newArrivals = [
    { id: "5", title: "Aventurine Luck Pendant", price: 28.0, image:import.meta.env.BASE_URL + "images/products/test4.png" },
    { id: "6", title: "Selenite Cleansing Ring", price: 18.5, image:import.meta.env.BASE_URL + "images/products/test2.png" },
    { id: "7", title: "Labradorite Mystic Earrings", price: 24.0, image:import.meta.env.BASE_URL + "images/products/test3.png" },
    { id: "8", title: "Smoky Quartz Grounding Ring", price: 21.5, image:import.meta.env.BASE_URL + "images/products/test1.png" },
  ];

  const bestSellers = [
    { id: "9", title: "Tiger’s Eye Strength Beads", price: 24.99, image:import.meta.env.BASE_URL + "images/products/test1.png" },
    { id: "10", title: "Lapis Lazuli Focus Studs", price: 17.5, image:import.meta.env.BASE_URL + "images/products/test3.png" },
    { id: "11", title: "Chakra Healing Bracelet Set", price: 34.0, image:import.meta.env.BASE_URL + "images/products/test4.png" },
    { id: "12", title: "Moonstone Clarity Necklace", price: 26.0, image:import.meta.env.BASE_URL + "images/products/test2.png" },
  ];

  return (
    <div ref={showcaseRef} className="scroll-showcase">
      {/* 🌿 Featured */}
      <section className="scroll-slide slide-featured">
        <FeaturedCollection title="Featured Collection" items={featured} />
      </section>

      {/* 🌸 New Arrivals */}
      <section className="scroll-slide slide-new">
        <FeaturedCollection title="New Arrivals" items={newArrivals} />
      </section>

      {/* 💫 Best Sellers */}
      <section className="scroll-slide slide-best">
        <FeaturedCollection title="Best Sellers" items={bestSellers} />
      </section>
    </div>
  );
}
