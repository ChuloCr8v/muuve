import React, { useState, useEffect } from "react";
import { menuItems } from "./MenuItems";
import SubMenu from "./Submenu";
import { CaretDownOutlined } from "@ant-design/icons";

// types of menuitems and submenus
interface Submenu {
  title: string;
  href: string;
  icon: string;
  hoverIcon: string;
}

interface MenuItem {
  title: string;
  submenus: Submenu[];
}

const Sidenav: React.FC = () => {
  // to expanded sections
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // State to set default expanded section
  useEffect(() => {
    const currentPath = window.location.pathname;
    const defaultExpanded = menuItems.reduce(
      (acc: Record<string, boolean>, item: MenuItem) => {
        const hasActiveSubmenu = item.submenus.some(
          (submenu) => submenu.href === currentPath
        );
        if (hasActiveSubmenu) {
          acc[item.title] = true;
        }
        return acc;
      },
      {}
    );
    setExpandedSections(defaultExpanded);
  }, []);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex flex-col w-full min-h-screen ">
      {/* <div className="w-full text-center mb-[28px]">
        <img src={Logo} alt="Logo" className="w-[70px] m-auto h-[32px]" />
        <span>Service Management</span>
      </div> */}
      <section className="space-y-[16px]">
        {menuItems.map((item: any, index) => {
          const hasActiveSubmenu = item.submenu?.some(
            (submenu: any) => window.location.pathname === submenu.href
          );
          return (
            <div key={index}>
              {/* section header */}
              <div
                className="px-[24px] mb-1 flex justify-between"
                onClick={() => toggleSection(item.title)}
              >
                <span
                  className={`text-[12px] font-semibold ${
                    hasActiveSubmenu ? "text-[#0A96CC] " : "text-[#595959]"
                  }`}
                >
                  {item.title.toUpperCase()}
                </span>
                <CaretDownOutlined
                  className={`text-[12px]  transform ${
                    expandedSections[item.title] ? "rotate-180 " : ""
                  }  ${
                    hasActiveSubmenu ? "text-[#0A96CC] " : "text-[#777777]"
                  }`}
                />
              </div>
              {/* submenu List */}
              {expandedSections[item.title] &&
                item.submenus.map((submenu: any, idx: number) => (
                  <SubMenu
                    key={idx}
                    href={submenu.href}
                    img={submenu.icon}
                    hoverImg={submenu.hoverIcon}
                    isSelected={window.location.pathname === submenu.href}
                    onSelect={() =>
                      setExpandedSections({
                        ...expandedSections,
                        [item.title]: true,
                      })
                    }
                  >
                    {submenu.title}
                  </SubMenu>
                ))}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Sidenav;
