// src/components/Hero.tsx
import { IconChevronRight } from './Icon';


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Handcrafted Crystal Jewelry for
          <br className="br-md" />
          Your Spiritual Journey
        </h1>

        <p className="hero-sub">
          Ethically sourced crystals designed to promote balance, healing, and positive energy.
        </p>

        <div className="hero-ctas">
          <a className="btn btn-solid" href="https://osmeron.github.io/yur_chakra/#/shop">Shop Collection</a>
          <a className="btn btn-outline" href="https://osmeron.github.io/yur_chakra/#/meanings">Discover meanings </a>
        </div>
      </div>
    </section>
  );
}
