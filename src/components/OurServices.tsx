import { services } from "@/data";
import { twMerge } from "tailwind-merge";
import useParallax from "../hooks/useParallax";
import useTheme from "@/hooks/useTheme";
// import Ballon from "/ballon.webp";

const OurServices = () => {
  const images = [
    "./trip.jpg",
    "./trip2.jpeg",
    "./road_trip.jpg",
    "./flight.webp",
  ];

  const offsetY = useParallax();

  const { darkMode } = useTheme();

  return (
    <div
      style={{ transform: `translateY(-${offsetY * 0.4}px)` }}
      id="services"
      className="flex flex-col items-center justify-start w-full relative z-[9999] -translate-y-full mt-20 xl:mt-96"
    >
      <div
        className={twMerge(
          "flex items-center gap-20 w-full justify-between translate-y-40",
          darkMode && "opacity-40"
        )}
        // style={{
        //   transform: `translateY(-${offsetY * 0.2}px)`,
        // }}
      >
        <div className="flex items-center gap-20 w-full justify-between -translate-y-[150px] lg:-translate-y-48 xl:-translate-y-[30rem]">
          <img className="h-32" src="./cloud.webp" alt="website developer" />
          <img
            className="h-24 lg:h-32 place-self-center "
            src="./cloud.png"
            alt="website developer"
          />
          <img
            className="h-40 translate-y-12"
            src="./cloudy.png"
            alt="website developer"
          />

          <img className="h-20" src="./cloud.webp" alt="website developer" />
        </div>
      </div>
      <div
        className={twMerge(
          "w-full bg-wite relative z-[9999] px-4 pb-20 -mt-[calc(100vh+300px)] md:-mt-[calc(100vh-500px)] lg:-mt-[calc(100vh-50px)] "
          // darkMode && "bg-gray-900"
        )}
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-32">
          <div className="flex flex-col md:items-start gap-6 max-w-[400px] md:max-w-[500px]">
            <p className="text-center md:text-left font-semibold capitalize text-2xl lg:text-3xl">
              <span className="block text-orange-500 text-xl font-normal">
                Explore the World with Ease
              </span>
              Our Premium Travel Services
            </p>
            <div className="space-y-4">
              {services.map((item, index) => (
                <div className="space-y-2" key={index}>
                  <p className="font-semibold text-lg lg:text-xl">
                    {" "}
                    <span className="mr-2 font-normal text-base">
                      0{index + 1}.
                    </span>
                    {item.title}
                  </p>
                  <p
                    className={twMerge(
                      "text-gray-600 text-base text-justify",
                      darkMode && "text-gray-400"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-6">
            {images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="travel agency website. website developer"
                className={twMerge(
                  "rounded-full h-60 w-60 object-cover object-center duration-1000",
                  [1, 2].includes(index) && "lg:h-40 lg:w-40",
                  index === 2 && "place-self-end self-start",
                  index === 1 && "self-end",
                  index === 0 && "place-self-end"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
