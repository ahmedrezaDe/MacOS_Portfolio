import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Keep this configuration object separate
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 100, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={`${className} inline-block`}
      style={{
        "--wght": baseWeight,
        fontVariationSettings: `'wght' var(--wght)`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  // OPTIMIZATION: Cache bounding rectangles to stop layout thrashing
  let cachedDimensions = [];

  const updateCachedDimensions = () => {
    const { left: containerLeft } = container.getBoundingClientRect();
    cachedDimensions = Array.from(letters).map((letter) => {
      const { left: letterLeft, width } = letter.getBoundingClientRect();
      return {
        letter,
        letterCenter: letterLeft - containerLeft + width / 2,
      };
    });
  };

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      "--wght": weight,
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e) => {
    const { left: containerLeft } = container.getBoundingClientRect();
    const mouseX = e.clientX - containerLeft;

    // If dimensions haven't been cached yet, run it once safely
    if (cachedDimensions.length === 0) updateCachedDimensions();

    cachedDimensions.forEach(({ letter, letterCenter }) => {
      const distance = Math.abs(mouseX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    cachedDimensions = []; // Clear cache when mouse leaves
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  // Update layout positions on window resize so coordinates stay precise
  window.addEventListener("resize", updateCachedDimensions);
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    window.removeEventListener("resize", updateCachedDimensions);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Secure context execution by running inside the proper React lifecycle
  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []); // Empty array is fine here as useGSAP handles element visibility changes smoothly

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Erza!! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("macfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only</p>
      </div>
    </section>
  );
};

export default Welcome;
