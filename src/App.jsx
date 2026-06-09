import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Navbar, Welcome } from "#/components";
import { Terminal } from "./windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold italic"></h1>
      </div>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
};
export default App;
