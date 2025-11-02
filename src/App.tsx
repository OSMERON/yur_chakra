// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollShowcase from "./components/ScrollShowcase";
import Shop from "./Pages/Shop";
import ChakraMeanings from "./Pages/ChakraMeanings";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart"; 
import About from "./Pages/About";

function Home() {
  return (
    <main>
      <Hero />
      <ScrollShowcase />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/meanings" element={<ChakraMeanings />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />     
        <Route path="/contact" element={<About />} />
      </Routes>
    </>
  );
}
