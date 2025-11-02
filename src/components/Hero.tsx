// src/components/Hero.tsx
import { IconChevronRight,IconChevronLeft } from './Icon';


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
          <a className="btn btn-solid" href="Shop">
            Shop Collection
            <IconChevronRight className="ml-8" />
          </a>
          <a className="btn btn-outline" href="https://osmeron.github.io/yur_chakra/meanings">Discover meanings 
            <IconChevronLeft className="mr-8" />
 </a>
        </div>
      </div>
    </section>
  );
}
