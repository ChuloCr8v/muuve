import useParallax from "@/hooks/useParallax";
import useTheme from "@/hooks/useTheme";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";

const CTA = () => {
  const offsetY = useParallax();
  const { darkMode } = useTheme();
  return (
    <div
      id="cta"
      className="relative flex flex-col justify-center items-center px-4 -translate-y-[82rem] md:-translate-y-[20rem]"
    >
      <img
        src="./ballon.webp"
        alt="travel agency website designer"
        className="absolute max-w-[500px] md:max-w-[700px] -z-20 -top-[70%] md:-top-[80%]"
        style={{ transform: `translateY(${offsetY * 0.37}px)` }}
      />
      <div
        className={twMerge(
          "flex flex-col items-center justify-start md:w-full mt-[80rem] md:mt-[700px] border rounded-3xl lg:rounded-[80px] px-4 py-8 max-w-4xl place-self-center bg-white/20 backdrop-blur-md shadow-xl",
          darkMode && "bg-black/20"
        )}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="transition-transform duration-500">
            <img
              className="max-w-80 md:max-w-40 lg:max-w-52"
              src="./plane_window.png"
              alt="travel agency website developer"
            />
          </div>
          <div className="space-y-4 max-w-[350px] md:max-w-[500px] w-full flex flex-col justify-center items-center lg:items-start">
            <p className="font-semibold text-3xl md:text-2xl text-center md:text-left lg:text-3xl">
              Your Next Adventure Starts Here!
            </p>
            <p
              className={twMerge(
                "text-black text-justify",
                darkMode && "text-gray-200"
              )}
            >
              Discover breathtaking destinations, seamless travel experiences,
              and unforgettable memories with us. Whether you're planning a
              relaxing getaway, a thrilling adventure, or a business trip, we've
              got you covered. Book now and let your journey begin! 🚀
            </p>

            <Button type="primary" className=" !mt-8 w-[144px] font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
