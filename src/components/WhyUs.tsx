import { whyUs } from "@/data";
import useParallax from "@/hooks/useParallax";
import useTheme from "@/hooks/useTheme";
import { twMerge } from "tailwind-merge";

const WhyUs = () => {
  const offsetY = useParallax();
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center relative -translate-y-[80rem] md:-translate-y-[30rem] md:mt-40">
      <img
        className="h-20 md:h-32 md:-translate-x-20 lg:translate-y-10 lg:left-56 z-[99999] absolute"
        src="./cloud.webp"
        alt="website developer"
      />
      <div
        className={twMerge(
          "flex items-center gap-20 w-full justify-between absolute translate-y-12 lg:translate-y-10"
        )}
        // style={{
        //   transform: `translateX(${offsetY * 0.2}px)`,
        // }}
      >
        <img
          className="h-40 opacity-"
          src="./cloudy.png"
          alt="website developer"
        />

        <img
          className="h-32 lg:h-40 lg:-translate-x-96"
          src="./cloud.png"
          alt="website developer"
        />
        <img
          className="h-56 place-self-center -translate-y-10 relative z-[99999]"
          src="./cloudy.png"
          alt="website developer"
        />

        <img
          className="h-20 -translate-y-6"
          src="./cloud.webp"
          alt="website developer"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <div className="z-0 relative">
          <img
            src="./parachute.png"
            alt="unique website design"
            className="-translate-y-[70rem] md:-translate-y-[650px] max-w-80 md:max-w-[500px] w-full relative z-0"
          />
        </div>

        <div
          // style={{
          //   transform: `translateY(${offsetY * 0.4}px)`,
          // }}
          className="flex items-center justify-start -translate-y-[70rem] md:-translate-y-[650px] w-full"
        >
          <div className="flex flex-col md:flex-row items-start gap-3 h-full w-full px-4">
            {whyUs.map((item, index) => (
              <div
                className={twMerge(
                  "border bg-white rounded-lg px-4 py-6 max-w-[400px] md:max-w-[450px] w-full shadow-md space-y-3 h-full",
                  index === 0 && "border-primary shadow-pink-500 ",
                  index === 1 && "border-pink-500 shadow-primary",
                  index === 2 && "border-orange-500 shadow-pink-500",
                  darkMode && "bg-gray-900"
                )}
                key={index}
              >
                <div
                  className={twMerge(
                    " p-2 rounded border w-fit",
                    index === 0 &&
                      "border-primary shadow-pink-500 text-primary",
                    index === 1 &&
                      "border-pink-500 shadow-primary text-pink-500",
                    index === 2 &&
                      "border-orange-500 shadow-pink-500 text-orange-500"
                  )}
                >
                  <item.icon className="text-2xl" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex items-center">
          <div className="h-0.5 w-[144px] bg-gray-400 border-t border-b border-black"></div>
          <img
            src="./dragging_plane.png"
            alt="landing page designer"
            className="-ml-16 max-w-80"
          />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
