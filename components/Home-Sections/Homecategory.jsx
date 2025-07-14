import React from "react";
import HomeCategoryCard from "../Shared/HomeCategoryCard";


const categories = [
  {
    title: "Necklaces",
    imageUrl: "https://images.pexels.com/photos/4735885/pexels-photo-4735885.jpeg",
  },
  {
    title: "Rings",
    imageUrl: "https://images.pexels.com/photos/1670723/pexels-photo-1670723.jpeg",
  },
  {
    title: "Bracelets",
    imageUrl: "https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg",
  },
  {
    title: "Earrings",
    imageUrl: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg",
  },
  {
    title: "Men",
    imageUrl: "https://images.pexels.com/photos/204427/pexels-photo-204427.jpeg",
  },
  {
    title: "Watches",
    imageUrl: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
  },
];

function Homecategory() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 lg:px-8 px-6 gap-4 my-12">
        {categories.map((category, index) => (
          <HomeCategoryCard
            key={index}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Homecategory;
