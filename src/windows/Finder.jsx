import { WindowControls } from "#/components";
import { Search } from "lucide-react";
import WindowWrapper from "#/hoc/WindowWrapper.jsx";
import { locations } from "#/constants";
import useLocationStore from "#/store/location.jsx";
import clsx from "clsx";
import useWindowStore from "#/store/window.js";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      try {
        const url = new URL(item.href, window.location.origin);
        if (url.protocol === "http:" || url.protocol === "https:") {
          return window.open(url.href, "_blank");
        }
      } catch (e) {
        console.error("Invalid URL:", item.href, e);
      }
      return;
    }

    if (!item.fileType || !item.kind) {
      console.error("Invalid item: missing fileType or kind", item);
      return;
    }
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveLocation(item);
              }
            }}
            role="button"
            tabIndex={0}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {locations.work?.children &&
            renderList("My Projects", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position || ""}
              onClick={() => openItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openItem(item);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
