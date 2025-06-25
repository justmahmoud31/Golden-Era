import GenderFilter from "@/components/Home-Sections/GenderFilter";
import Hero from "@/components/Home-Sections/Hero";
import Homecategory from "@/components/Home-Sections/Homecategory";
import Sakinah from "@/components/Home-Sections/Sakinah";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Hero />
      <Homecategory />
      <GenderFilter />
      <Sakinah />
    </div>
  );
}
