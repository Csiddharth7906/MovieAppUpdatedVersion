import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="bg-[#1F1E24] flex w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />}></Route>\
      </Routes>
    </div>
  );
};

export default App;
