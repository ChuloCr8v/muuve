import { tripsData } from "@/data";
import useTheme from "@/hooks/useTheme";
import { Button } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import useParallax from "../hooks/useParallax";

const Trips = () => {
  const { darkMode } = useTheme();
  const offsetY = useParallax();

  return (
    <div
      id="trips"
      className={twMerge(
        "flex flex-col justify-center items-center px-4 bg-white mt-48 md:mt-[20rem] relative",
        darkMode && "bg-gray-900"
      )}
    >
      <h2
        style={{ transform: `translateY(-${offsetY * 0.1}px)` }}
        className="font-semibold text-center text-3xl relative  md:-translate-y-20"
      >
        <span className="relative z-0 inline-block">Pick </span>{" "}
        <span className="relative z-0">A Journey</span>
      </h2>
      <img
        className="h-12 -translate-x-10 -translate-y-20 relative z-40"
        src="./cloud.webp"
        alt="website developer"
      />
      <div
        className="flex items-center gap-20 w-full justify-center -translate-y-20"
        // style={{ transform: `translateX(${offsetY * 0.2}px)` }}
      >
        <img
          className="h-32 -translate-y-20"
          src="./cloud.png"
          alt="website developer"
        />
        <img
          className="h-40 -translate-y-10 -translate-x-20 relative "
          src="./cloudy.png"
          alt="website developer"
        />
        <img
          className="h-32 -translate-y-20"
          src="./cloud.webp"
          alt="website developer"
        />
      </div>

      <div
        className="w-full flex justify-start relative z-20"
        style={{
          transform: `translateX(${offsetY * 0.3}px) translateY(-${
            offsetY * 0.3
          }px)`,
        }}
      >
        <img
          src="./airplane.png"
          alt="website designer"
          className="max-w-[350px] md:max-w-[550px] -scale-x-100 -translate-x-full md:-translate-x-20"
        />
      </div>

      <div
        className="flex flex-col justify-center items-center max-w-7xl w-full relative z-50 mt-48 md:mt-0"
        style={{ transform: `translateY(-${offsetY * 0.4}px)` }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-3 w-full">
          {tripsData.map((item, index) => (
            <div
              key={index}
              className={twMerge(
                "group card-rotate-wrapper perspective max-w-[400px] w-full md:w-56 h-96 md:h-72 relative rounded-lg cursor-pointer "
              )}
            >
              {/* Rotating Inner Container */}
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d card-rotate">
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                  <p className="absolute right-3 top-3 text-xs bg-white text-black rounded-full px-3 py-1 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-600" />
                    <span>{item.location}</span>
                  </p>
                  <img
                    src={item.picture}
                    alt={item.location}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 flex flex-col items-end justify-center bg-black text-white rotate-y-180 backface-hidden rounded-lg">
                  <img
                    src={item.picture}
                    alt={item.location}
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <p className="absolute left-3 top-3 text-xs bg-white text-black rounded-full px-3 py-1 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-600" />
                    <span>{item.location}</span>
                  </p>
                  <div className="absolute space-y-2 p- bottom-1 trip-details-animation">
                    <div className=" bg-black rounded-b-lg backdrop-blur-sm bg-opacity-50 p-2">
                      <p className="text-xs text-center">{item.description}</p>
                    </div>
                    <Button
                      type="primary"
                      className="w-full bg-orange-600 hover:!bg-orange-800 text-xs font-semibold"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trips;
