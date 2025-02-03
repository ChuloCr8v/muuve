import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Boat from "/boat.webp";
import Capture from "/capture.jpeg";
import Travel from "/travel.jpg";
import { useState, useEffect } from "react";

const Hero = () => {
  const travelData = [
    {
      title: "Visit Places",
      image: Travel,
    },
    {
      title: "Capture Exciting Moments",
      image: Capture,
    },
    {
      title: "Make Unforgottable Memories",
      image: Boat,
    },
  ];

  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="hero"
      className="py-48 flex flex-col items-center justify-center space-y-12 overflow-x-hidden"
    >
      <p className="flex flex-col md:gap-2 items-center text-center font-semibold text-xl lg:text-3xl capitalize">
        Visit Places{" "}
        <span className="block font-semibold lg:font-bold text-2xl lg:text-4xl">
          Capture Exciting Moments
        </span>{" "}
        <span className="block font-bold lg:font-black text-2xl md:text-4xl lg:text-5xl">
          Make unforgettable Memories
        </span>
      </p>

      <div className="flex items-center gap-3">
        {travelData.map((item) => (
          <div className="border rounded-lg overflow-hidden h-28 w-28 md:h-40 md:w-60 hover:scale-105 shadow-xl duration-200 transition ease-in-out">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="space-x-3 flex items-center">
        <Button
          type="primary"
          className="rounded-full group"
          icon={
            <FaArrowRight className="group-hover:translate-x-1 duration-200" />
          }
          iconPosition="end"
        >
          MUUVE
        </Button>
        <button
          className={twMerge(
            "rounded-full group flex items-center gap-2 hover:bg-gray-100 px-3 py-2"
            // darkMode ? "text-white hover:text-white/80" : "!text-black"
          )}
        >
          Get Started
          <FaArrowRight className="group-hover:translate-x-1 duration-200" />
        </button>
      </div>
      <div
        className="fixed -z-50 opacity-10"
        style={{
          transform: `translateX(-${offsetY * 0.3}px) translateY(-${
            offsetY * 0.3
          }px)`,
        }}
      >
        <img
          src="./airplane.png"
          alt="agency website developer"
          className="max-w-[700px] md:max-w-[1200px] "
        />
      </div>
    </div>
  );
};

export default Hero;
