import GenderFilter from "@/components/Home-Sections/GenderFilter";
import Hero from "@/components/Home-Sections/Hero";
import Homecategory from "@/components/Home-Sections/Homecategory";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Hero />
      <Homecategory />
      <GenderFilter />
    </div>
  );
}
