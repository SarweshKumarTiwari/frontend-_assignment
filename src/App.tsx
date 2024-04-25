import SearchBox from "./SearchBox";
import WeatherCards from "./WeatherCards";
import WetherProvider from "./context/WetherProvider";

function App() {
  return (
    <WetherProvider>
      <div className={`h-full w-full `}>
        <h2 className="m-auto p-2 my-8 text-4xl w-fit">Weather Report</h2>
        <SearchBox />
        <WeatherCards/>
      </div>
    </WetherProvider>
  );
}

export default App;
