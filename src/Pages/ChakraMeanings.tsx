// src/Pages/ChakraMeanings.tsx
import "../styles/Cards.css";
import "./ChakraMeanings.css";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

type Chakra = {
  id: string;
  name: string;
  color: string;
  description: string;
  image: string;
  crystals: { name: string; slug: string }[];
};

const CHAKRAS: Chakra[] = [
  {
    id: "root",
    name: "Root Chakra (Muladhara)",
    color: "#B71C1C",
    description:
      "The Root Chakra, or Muladhara, is the first energy center located at the base of the spine. It represents stability, security, and connection to the physical world. Its color is red and its element is earth, symbolizing strength and grounding. When the Root Chakra is balanced, you feel safe, confident, and in control of your life. You trust yourself and your environment. When it is blocked, you may feel anxious, fearful, or unstable, and struggle with money or physical health. To strengthen it, spend time in nature, practice grounding yoga poses like Mountain or Tree, eat root vegetables, and focus on slow breathing at the base of the spine. Repeating affirmations such as “I am safe” or “I belong” also helps build a strong sense of security and balance.",
    image: import.meta.env.BASE_URL + "images/chakras/root.jpeg",
    crystals: [
      { name: "Red Jasper", slug: "red-jasper" },
      { name: "Hematite", slug: "hematite" },
      { name: "Black Tourmaline", slug: "black-tourmaline" },
    ],
  },
  {
    id: "sacral",
    name: "Sacral Chakra (Svadhisthana)",
    color: "#E65100",
    description:
      "The Sacral Chakra, or Svadhisthana, is the second energy center located just below the navel. It governs creativity, pleasure, emotions, and relationships. Its color is orange and its element is water, symbolizing flow and adaptability. When balanced, you feel emotionally open, creative, and confident in your relationships. You enjoy life’s pleasures without guilt and express your feelings easily. When blocked, you may feel emotionally numb, lack motivation, or struggle with intimacy and passion. To strengthen it, engage in creative activities like art, music, or dance, spend time near water, and practice hip-opening yoga poses such as Pigeon or Bound Angle. Eating orange foods like oranges, mangoes, and carrots, and repeating affirmations like “I honor my emotions” or “I embrace joy” also support balance in this chakra.",
    image: import.meta.env.BASE_URL + "images/chakras/Sacral.jpeg",
    crystals: [
      { name: "Carnelian", slug: "carnelian" },
      { name: "Orange Calcite", slug: "orange-calcite" },
      { name: "Sunstone", slug: "sunstone" },
    ],
  },
  {
    id: "solar",
    name: "Solar Plexus (Manipura)",
    color: "#FBC02D",
    description:
      "The Solar Plexus Chakra, or Manipura, is the third energy center located in the upper abdomen, near the stomach. It represents personal power, confidence, and self-discipline. Its color is yellow and its element is fire, symbolizing energy and transformation. When balanced, you feel strong, motivated, and capable of achieving your goals. You act with purpose and maintain healthy boundaries. When blocked, you may feel insecure, powerless, or overly controlling. To strengthen it, spend time in sunlight, practice core-strengthening yoga poses like Boat or Plank, and focus on deep breathing into the belly. Eating yellow foods such as bananas, corn, and pineapple, and repeating affirmations like “I am confident” or “I take action with courage” helps restore balance and build inner strength.",
    image: import.meta.env.BASE_URL + "images/chakras/Solar.jpeg",
    crystals: [
      { name: "Citrine", slug: "citrine" },
      { name: "Tiger’s Eye", slug: "tigers-eye" },
      { name: "Yellow Jasper", slug: "yellow-jasper" },
    ],
  },
  {
    id: "heart",
    name: "Heart Chakra (Anahata)",
    color: "#2E7D32",
    description:
      "The Heart Chakra, or Anahata, is the fourth energy center located in the center of the chest. It represents love, compassion, and emotional balance. Its color is green and its element is air, symbolizing openness and connection. When balanced, you feel loving, kind, and at peace with yourself and others. You forgive easily and maintain healthy relationships. When blocked, you may feel lonely, bitter, or closed off from affection. To strengthen it, practice gratitude, spend time with loved ones, and do heart-opening yoga poses like Camel or Cobra. Eating green foods such as spinach, avocado, and kiwi, and repeating affirmations like “I give and receive love freely” or “My heart is open and balanced” helps restore harmony and emotional warmth.",
    image: import.meta.env.BASE_URL + "images/chakras/Heart.jpeg",
    crystals: [
      { name: "Rose Quartz", slug: "rose-quartz" },
      { name: "Green Aventurine", slug: "green-aventurine" },
      { name: "Malachite", slug: "malachite" },
    ],
  },
  {
    id: "throat",
    name: "Throat Chakra (Vishuddha)",
    color: "#1565C0",
    description:
      "The Throat Chakra, or Vishuddha, is the fifth energy center located at the throat. It represents communication, truth, and self-expression. Its color is blue and its element is ether, symbolizing clarity and expansion. When balanced, you speak clearly, listen well, and express your thoughts with honesty and confidence. You communicate with purpose and authenticity. When blocked, you may struggle to speak up, feel misunderstood, or fear judgment. To strengthen it, practice mindful speech, sing or chant, and do neck and shoulder stretches. Drinking water, eating blue foods like blueberries, and repeating affirmations such as “I speak my truth” or “My voice matters” help restore balance and confidence in communication.",
    image: import.meta.env.BASE_URL + "images/chakras/Throat.jpeg",
    crystals: [
      { name: "Lapis Lazuli", slug: "lapis-lazuli" },
      { name: "Aquamarine", slug: "aquamarine" },
      { name: "Blue Lace Agate", slug: "blue-lace-agate" },
    ],
  },
  {
    id: "third-eye",
    name: "Third Eye (Ajna)",
    color: "#4527A0",
    description:
      "The Third Eye Chakra, or Ajna, is the sixth energy center located between the eyebrows. It represents intuition, insight, and mental clarity. Its color is indigo and its element is light, symbolizing awareness and perception. When balanced, you trust your intuition, think clearly, and see situations with wisdom. You stay mentally focused and connected to your inner guidance. When blocked, you may feel confused, disconnected from intuition, or overthink decisions. To strengthen it, practice meditation, visualization, and mindful breathing. Limiting screen time, spending quiet moments in reflection, and repeating affirmations like “I trust my intuition” or “I see with clarity” help open and balance this chakra, deepening self-awareness and inner vision.",
    image: import.meta.env.BASE_URL + "images/chakras/Third_Eye.jpeg",
    crystals: [
      { name: "Amethyst", slug: "amethyst" },
      { name: "Labradorite", slug: "labradorite" },
      { name: "Sodalite", slug: "sodalite" },
    ],
  },
  {
    id: "crown",
    name: "Crown Chakra (Sahasrara)",
    color: "#6A1B9A",
    description:
      "The Crown Chakra, or Sahasrara, is the seventh energy center located at the top of the head. It represents spiritual connection, awareness, and enlightenment. Its color is violet or white and its element is thought, symbolizing consciousness and unity. When balanced, you feel connected to something greater than yourself and experience inner peace and purpose. You approach life with wisdom and detachment from ego. When blocked, you may feel lost, disconnected, or spiritually empty. To strengthen it, spend time in silence, meditate regularly, and practice gratitude. Limiting material distractions, connecting with nature, and repeating affirmations like “I am connected to universal energy” or “I trust the flow of life” help align and open this chakra for spiritual clarity and balance.",
    image: import.meta.env.BASE_URL + "images/chakras/Crown.jpeg",
    crystals: [
      { name: "Clear Quartz", slug: "clear-quartz" },
      { name: "Selenite", slug: "selenite" },
      { name: "Lepidolite", slug: "lepidolite" },
    ],
  },
];

/** normalize many possible inputs to your IDs */
function normalizeParamToId(q: string | null): string | null {
  if (!q) return null;
  const s = q.toLowerCase().replace(/\s+/g, "-");
  if (s === "solar-plexus" || s === "solarplexus") return "solar";
  if (s === "third" || s === "third-eye" || s === "thirdeye" || s === "ajna") return "third-eye";
  // allow exact ids or common names
  const direct = ["root", "sacral", "solar", "heart", "throat", "third-eye", "crown"];
  if (direct.includes(s)) return s;
  // attempt fuzzy match by prefix
  const hit = direct.find(d => d.startsWith(s));
  return hit ?? null;
}

export default function ChakraMeanings() {
  const [params, setParams] = useSearchParams();
  const selectedId = useMemo(() => normalizeParamToId(params.get("chakra")), [params]);

  const visible = useMemo(() => {
    if (!selectedId) return CHAKRAS;
    return CHAKRAS.filter(c => c.id === selectedId);
  }, [selectedId]);

  const clearFilter = () => {
    params.delete("chakra");
    setParams(params, { replace: true });
  };

  return (
    <section className="chakra-meanings">
      <div className="chakra-inner">
        <h1 className="chakra-title">Chakra Meanings</h1>
        <p className="chakra-sub">
          {selectedId ? (
            <>
              Showing: <strong className="pill">
                {visible[0]?.name ?? selectedId}
              </strong>
              <button className="reset-btn" onClick={clearFilter} aria-label="Show all chakras">
                Show all
              </button>
            </>
          ) : (
            <>Learn the seven energy centres and shop crystals that support each one.</>
          )}
        </p>

        <div className="cards">
          {visible.map((ch) => (
            <article
              key={ch.id}
              className={`card fade-card visible chakra-card ${selectedId ? "pop" : ""}`}
            >
              <div className="card__media">
                <img src={ch.image} alt={ch.name} />
              </div>

              <div className="card__body">
                <h3 className="card__title" style={{ color: ch.color }}>
                  {ch.name}
                </h3>
                <p className="chakra-desc">{ch.description}</p>

                <div className="chakra-crystals">
                  {ch.crystals.map((cr) => (
                    <Link
                      key={cr.slug}
                      to={`/shop?crystal=${encodeURIComponent(cr.slug)}`}
                      className="chakra-link"
                    >
                      {cr.name}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
