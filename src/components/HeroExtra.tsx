import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import Activities from "/activities.jpeg";
import Destination from "/destination.jpeg";
import HeroExta from "/hero-exta.png";
import Planning from "/planning.jpeg";

const HeroExtra = () => {
  const { darkMode } = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme
  );
  // const offsetY = useParallax();

  const data = [
    {
      title: "Choiciest Destinations",
      content: "Explore some of the best destinations for elite travellers",
      image: Destination,
    },
    {
      title: "Hassle-Free Planning",
      content: "We provide you with the best itineries for a fun trip",
      image: Planning,
    },
    {
      title: "Fun Activities",
      content: "You will have so much to do and explore",
      image: Activities,
    },
  ];

  return (
    <div className="flex flex-col items-center md:grid grid-cols-2 gap-12">
      <div className="flex items-end justify-end lg:justify-center relative overflow-hidden">
        <img
          src={HeroExta}
          alt="travel website design"
          className="max-w-[300px] lg:max-w-[400px] basis-full"
        />
      </div>

      <div className="lg:basis-full h-fit flex flex-col items-start justify-between gap-8 relative">
        {data.map((item, index) => (
          <div className="flex items-start gap-2" key={index}>
            <p
              className={twMerge(
                "text-sm text-gray-600",
                darkMode && "text-white/80"
              )}
            >
              0{index + 1}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-xl h-20 w-20 object-cover"
              />
              <div className="">
                <p className="font-semibold text-xl text-primary">
                  {item.title}
                </p>
                <p
                  className={twMerge(
                    "text-gray-600 text-base break-words w-60 lg:w-full",
                    darkMode && "text-white/80"
                  )}
                >
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        <img
          src="./sunrise.png"
          alt="plane"
          className="h-14 absolute -right-0 -bottom-20 opacity-60"
        />
      </div>
    </div>
  );
};

export default HeroExtra;
