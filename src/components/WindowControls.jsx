import useWindowStore from "#/store/window.js";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls" className="flex items-center gap-2">
      {/* RED - Close */}
      <div
        className="size-3.5 rounded-full cursor-pointer"
        style={{ backgroundColor: "#ff6157" }}
        onClick={() => closeWindow(target)}
        title="Close"
      />

      {/* YELLOW - Minimize */}
      <div
        className="size-3.5 rounded-full"
        style={{ backgroundColor: "#ffc030" }}
        title="Minimize"
      />

      {/* GREEN - Maximize */}
      <div
        className="size-3.5 rounded-full"
        style={{ backgroundColor: "#2acb42" }}
        title="Maximize"
      />
    </div>
  );
};
export default WindowControls;
