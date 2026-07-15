import HeroContent from "./HeroContent";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <HeroSlider />
      <HeroContent />
    </section>
  );
}