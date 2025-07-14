import Image from "next/image";
import Link from "next/link";

function HomeCategoryCard({ title, imageUrl }) {
  return (
    <div
      className="flex flex-col"
      style={{ fontFamily: "var(--font-spectral)" }}
    >
      <Link
        href={`/category/${title}`}
        className="group relative w-full h-52 rounded-md overflow-hidden border shadow-md cursor-pointer"
      >
        {/* Background image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 transform group-hover:scale-110"
        />
      </Link>
      <h3 className="text-2xl font-semibold   text-black tracking-wide transition-transform duration-500 transform group-hover:-translate-y-1">
        {title}
      </h3>
    </div>
  );
}

export default HomeCategoryCard;
