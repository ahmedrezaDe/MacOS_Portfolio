import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

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
    const mouseX = e.clientX - containerLeft; // Relative to container

    letters.forEach((letter) => {
      const { left: letterLeft, width } = letter.getBoundingClientRect();
      // Transform letter position to be relative to the container as well
      const letterCenter = letterLeft - containerLeft + width / 2;
      const distance = Math.abs(mouseX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

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
        {renderText("Macfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only</p>
      </div>
    </section>
  );
};
export default Welcome;
