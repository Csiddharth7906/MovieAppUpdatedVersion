import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";

const App = () => {
  return (
    <div className="bg-[#1F1E24] flex w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Trending />}></Route>
      </Routes>
    </div>
  );
};

export default App;
