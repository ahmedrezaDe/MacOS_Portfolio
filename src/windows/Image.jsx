import WindowWrapper from "#/hoc/WindowWrapper.jsx";
import { WindowControls } from "#/components";
import useWindowStore from "#/store/window.js";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  // Validate imageUrl is a safe HTTP(S) URL
  const isValidUrl =
    imageUrl && (/^https?:\/\//i.test(imageUrl) || imageUrl.startsWith("/"));

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {isValidUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">No image available</p>
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
