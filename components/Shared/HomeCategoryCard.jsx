import Image from "next/image";
import Link from "next/link";

function HomeCategoryCard({ title, imageUrl }) {
  return (
    <Link href={`/category/${title}`} className="group relative w-full h-72 overflow-hidden border shadow-md cursor-pointer">
      {/* Background image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 transform group-hover:scale-110"
      />

      {/* Overlay on hover */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-500" /> */}

      {/* Category name */}
      <div className="absolute bottom-4 left-4 z-10">
        <h3 className="text-2xl font-semibold uppercase underline text-white tracking-wide transition-transform duration-500 transform group-hover:-translate-y-1">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default HomeCategoryCard;
