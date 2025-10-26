import { useState, useRef, useLayoutEffect } from "react";
import { HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import GridIcon from "@/components/GridIcon";

type Tab = "about" | "experiences" | "recommended";

const ProfileWidget = () => {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  // We'll use this state to store the position of the sliding pill
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // This ref is for the navigation container
  const navRef = useRef<HTMLDivElement>(null);

  const content = {
    about: {
      text: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.

I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters — Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. This is a .really exciting (and slightly chaotic!) time for our family. Juggling work and family life is its own art form, as I'm sure you know!

When I’m not on daddy duty or helping clients here at Salesforce, I try to take full advantage of the Santa Carla lifestyle. I'm an avid cyclist, so you can usually find me on the coastal trails on Saturday mornings. I'm also a huge foodie, always on the hunt for the best local taco spot—recommendations are always welcome!

Professionally, what I love most about my role is connecting with people. For me, it's not just about selling software; it's about understanding your specific goals and figuring out how we can partner up to help you achieve them.`,
    },
    experiences: {
      text: `Senior Sales Representative at Salesforce (2021 - Present)

Managing enterprise accounts and building long-term relationships with key clients. Consistently exceeding quarterly targets.

Previous experience includes roles at various tech companies where I developed expertise in B2B sales and customer success...`,
    },
    recommended: {
      text: `I highly recommend connecting with industry leaders in the SaaS space. Here are some resources:

• Salesforce Trailhead for continuous learning
• Sales podcasts for staying updated
• Networking events in the Bay Area

Feel free to reach out if you'd like to discuss collaboration opportunities...`,
    },
  };

  // This function finds the active tab and sets the slider position
  const moveSliderToActiveTab = () => {
    if (!navRef.current) return;

    const activeTabEl = navRef.current.querySelector(
      `[data-tab="${activeTab}"]`
    ) as HTMLButtonElement | null;

    if (activeTabEl) {
      setSliderStyle({
        left: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
        opacity: 1,
      });
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => moveSliderToActiveTab(), 50);

    window.addEventListener("resize", moveSliderToActiveTab);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", moveSliderToActiveTab);
    };
  }, [activeTab]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSliderStyle({
      left: e.currentTarget.offsetLeft,
      width: e.currentTarget.offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    moveSliderToActiveTab();
  };

  return (
    <div className="relative bg-widget rounded-3xl p-8 shadow-widget backdrop-blur-sm">
      <button className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
        <HelpCircle size={20} />
      </button>

      <div className="flex justify-center mb-8">
        <div
          ref={navRef}
          className="relative inline-flex bg-primary rounded-full p-1.5 gap-1"
          onMouseLeave={handleMouseLeave}
        >
          {/* Sliding Pill */}
          <div
            className="absolute top-1.5 h-[calc(100%-0.75rem)] rounded-full bg-widget shadow-md transition-all duration-300 ease-in-out"
            style={sliderStyle}
          />

          {/* Tab Buttons */}
          <button
            onClick={() => setActiveTab("about")}
            onMouseEnter={handleMouseEnter}
            data-tab="about"
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "about"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About Me
          </button>

          <button
            onClick={() => setActiveTab("experiences")}
            onMouseEnter={handleMouseEnter}
            data-tab="experiences"
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "experiences"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Experiences
          </button>

          <button
            onClick={() => setActiveTab("recommended")}
            onMouseEnter={handleMouseEnter}
            data-tab="recommended"
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "recommended"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Recommended
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex gap-6 items-center">
        <GridIcon className="flex-shrink-0" />

        <ScrollArea className="h-48 pr-4 flex-1">
          <div className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
            {content[activeTab].text}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileWidget;
