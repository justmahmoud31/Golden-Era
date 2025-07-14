import React from "react";

function About() {
  return (
    <div
      className="flex flex-col-reverse lg:flex-row bg-[#f7f6ef] lg:p-0 pt-4 gap-8"
      style={{ fontFamily: "var(--font-spectral)" }}
    >
      <div className="lg:w-1/2 w-full ">
      <img
        src="https://images.pexels.com/photos/256643/pexels-photo-256643.jpeg"
        className="w-full"
      /></div>
      <div className="lg:w-1/2 w-full flex justify-center items-start flex-col px-4 gap-4">
        <p>Waterproof & Lifeproof</p>
        <h2 className="font-semibold lg:text-xl text-lg">
          Golen Era Lifetime Warranty
        </h2>
        <p>
          At Golden Era, we only use real 18k gold plating and pure nickel-free
          steel so only quality ever touches your skin. We're so confident in
          that quality, if you ever do experience fading or tarnish on your
          jewelry, we replace your item for free.
        </p>
      </div>
    </div>
  );
}

export default About;
