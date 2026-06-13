import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Navbar, Welcome } from "#/components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact } from "./windows";

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
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
        <Contact />
    </main>
  );
};
export default App;
