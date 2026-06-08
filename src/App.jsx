import { Dock, Navbar, Welcome } from "#/components";

const App = () => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold italic"></h1>
      </div>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
};
export default App;
