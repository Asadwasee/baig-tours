import HeroContent from "./HeroContent";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroSlider />
      <HeroContent />
    </section>
  );
}