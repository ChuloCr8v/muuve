import useParallax from "@/hooks/useParallax";
import useTheme from "@/hooks/useTheme";
import { Button, Input } from "antd";
import { FaPaperPlane } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const Newsletter = () => {
  const { darkMode } = useTheme();
  const offsetY = useParallax();

  return (
    <div
      id="newsletter"
      className={twMerge(
        "flex flex-col justify-center items-center -translate-y-[90rem] md:-translate-y-[20rem] relative"
        // darkMode && "bg-black/20"
      )}
    >
      <div
        style={{ transform: `translateX(${offsetY * 0.205}px)` }}
        className="mt-72 md:mt-56"
      >
        <div className="flex items-center -translate-x-[250%] md:-translate-x-[100%] lg:-translate-x-full">
          <div className="max-w-4xl w-full md:-translate-x-28">
            <div className="flex flex-col items-end justify-between gap-4 w-full">
              <div className="space-y-2 bg-gray-200 p-4 text-right md:pl-20 relative z-10 shadow-xl">
                <p className="text-2xl md:text-3xl text-primary font-semibold">
                  Join Our Newsletter
                </p>
                <p className={twMerge("text-sm text-gray-600")}>
                  Get the latest tips and updates on what matters in the
                  adventure world right in <br className="hidden md:flex"></br>{" "}
                  your inbox.{" "}
                </p>
              </div>
              <div className="space-y-2 bg-gray-200 p-4 text-right w-[350px] md:max-w-[500px] md:w-full -rotate-[10deg] relative z-0 shadow-xl -mt-6">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  size="large"
                  className={twMerge("w-full rounded-full")}
                />
                <div className="flex items-center justify-between">
                  <p
                    className={twMerge(
                      "text-sm  text-left ml-4 italic text-gray-600",
                      darkMode && "text-primary"
                    )}
                  >
                    Enter your valid email to recieve updates.
                  </p>
                  <Button
                    size="small"
                    className="!w-[40px] shadow-xl"
                    type="primary"
                    icon={<FaPaperPlane />}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center relative">
            <div className="h-1 w-36 md:w-40 border-t border-b bg-white border-black absolute -left-28 -mt-2 md:-mt-0"></div>
            <img
              src="./dragging_plane.png"
              alt="agency website"
              className="relative z-20 max-w-60"
            />
          </div>
        </div>
      </div>

      {/* <div
        className={twMerge(
          "flex items-center gap-20 w-full justify-center absolute top-[20%]"
        )}
        style={{
          transform: `translateY(${offsetY * 0.1}px)`,
        }}
      >
        <img
          className="h-32 xl:h-20 translate-x-20"
          src="./cloud.webp"
          alt="website developer"
        />
        <img
          className="h-24 lg:h-60 place-self-center translate-y-10"
          src="./cloud.png"
          alt="website developer"
        />
        <img
          className="h-40 -translate-y-12 translat-x-20"
          src="./cloudy.png"
          alt="website developer"
        />

        <img className="h-20" src="./cloud.webp" alt="website developer" />
      </div>

      <img
        className="h-20 z-50 max-w-[450px] absolute top-[210%]"
        src="./cloud.webp"
        alt="website developer"
      /> */}
    </div>
  );
};

export default Newsletter;
