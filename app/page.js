import About from "@/components/Home-Sections/About";
import GenderFilter from "@/components/Home-Sections/GenderFilter";
import Hero from "@/components/Home-Sections/Hero";
import Homecategory from "@/components/Home-Sections/Homecategory";
import Sakinah from "@/components/Home-Sections/Sakinah";
import TestimonialsSlider from "@/components/Home-Sections/TestimonialsSlider";
import WhyUs from "@/components/Home-Sections/WhyUs";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Hero />
      <Homecategory />
      <GenderFilter />
      <Sakinah />
      <TestimonialsSlider />
      <About />
      <WhyUs />
    </div>
  );
}
